function solution(board) {
    const size = board.length;
    const map = Array.from({ length: size + 2 }, () => Array(size + 2).fill(1));

    for (let row = 0; row < size; row++) {
        for (let column = 0; column < size; column++) {
            map[row + 1][column + 1] = board[row][column];
        }
    }

    const queue = [[1, 1, 0, 0]];
    const visited = new Set(["1,1,0"]);
    let head = 0;

    function add(row, column, orientation, time) {
        const key = `${row},${column},${orientation}`;
        if (visited.has(key)) return;
        visited.add(key);
        queue.push([row, column, orientation, time]);
    }

    while (head < queue.length) {
        const [row, column, orientation, time] = queue[head++];

        if (orientation === 0 && row === size && column + 1 === size) return time;
        if (orientation === 1 && row + 1 === size && column === size) return time;

        const dr = [-1, 1, 0, 0];
        const dc = [0, 0, -1, 1];

        for (let direction = 0; direction < 4; direction++) {
            const nextRow = row + dr[direction];
            const nextColumn = column + dc[direction];
            const canMove = orientation === 0
                ? map[nextRow][nextColumn] === 0 && map[nextRow][nextColumn + 1] === 0
                : map[nextRow][nextColumn] === 0 && map[nextRow + 1][nextColumn] === 0;

            if (canMove) add(nextRow, nextColumn, orientation, time + 1);
        }

        if (orientation === 0) {
            for (const offset of [-1, 1]) {
                if (map[row + offset][column] !== 0 || map[row + offset][column + 1] !== 0) continue;
                const nextRow = Math.min(row, row + offset);
                add(nextRow, column, 1, time + 1);
                add(nextRow, column + 1, 1, time + 1);
            }
        } else {
            for (const offset of [-1, 1]) {
                if (map[row][column + offset] !== 0 || map[row + 1][column + offset] !== 0) continue;
                const nextColumn = Math.min(column, column + offset);
                add(row, nextColumn, 0, time + 1);
                add(row + 1, nextColumn, 0, time + 1);
            }
        }
    }
}
