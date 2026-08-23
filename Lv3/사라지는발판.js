function solution(board, aloc, bloc) {
    const rows = board.length;
    const columns = board[0].length;
    let initialBoard = 0;

    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            if (board[row][column]) initialBoard |= 1 << (row * columns + column);
        }
    }

    const memo = new Map();
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    function play(remainingBoard, current, opponent) {
        if ((remainingBoard & (1 << current)) === 0) return [false, 0];

        const key = `${remainingBoard},${current},${opponent}`;
        if (memo.has(key)) return memo.get(key);

        const row = Math.floor(current / columns);
        const column = current % columns;
        let canMove = false;
        let canWin = false;
        let shortestWin = Infinity;
        let longestLoss = 0;

        for (let direction = 0; direction < 4; direction++) {
            const nextRow = row + dr[direction];
            const nextColumn = column + dc[direction];
            if (nextRow < 0 || nextRow >= rows || nextColumn < 0 || nextColumn >= columns) continue;

            const next = nextRow * columns + nextColumn;
            if ((remainingBoard & (1 << next)) === 0) continue;
            canMove = true;

            const nextBoard = remainingBoard & ~(1 << current);
            const [opponentWins, moves] = play(nextBoard, opponent, next);

            if (!opponentWins) {
                canWin = true;
                shortestWin = Math.min(shortestWin, moves + 1);
            } else if (!canWin) {
                longestLoss = Math.max(longestLoss, moves + 1);
            }
        }

        let result;
        if (!canMove) result = [false, 0];
        else if (canWin) result = [true, shortestWin];
        else result = [false, longestLoss];

        memo.set(key, result);
        return result;
    }

    const a = aloc[0] * columns + aloc[1];
    const b = bloc[0] * columns + bloc[1];
    return play(initialBoard, a, b)[1];
}
