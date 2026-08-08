function solution(board) {
    const rows = board.length;
    const cols = board[0].length;
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    let startRow = 0;
    let startCol = 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (board[row][col] === 'R') {
                startRow = row;
                startCol = col;
            }
        }
    }

    const queue = [[startRow, startCol, 0]];
    visited[startRow][startCol] = true;

    for (let head = 0; head < queue.length; head++) {
        const [row, col, moves] = queue[head];

        if (board[row][col] === 'G') return moves;

        for (const [dr, dc] of directions) {
            let nextRow = row;
            let nextCol = col;

            while (true) {
                const movedRow = nextRow + dr;
                const movedCol = nextCol + dc;

                if (
                    movedRow < 0 || movedRow >= rows ||
                    movedCol < 0 || movedCol >= cols ||
                    board[movedRow][movedCol] === 'D'
                ) {
                    break;
                }

                nextRow = movedRow;
                nextCol = movedCol;
            }

            if (!visited[nextRow][nextCol]) {
                visited[nextRow][nextCol] = true;
                queue.push([nextRow, nextCol, moves + 1]);
            }
        }
    }

    return -1;
}
