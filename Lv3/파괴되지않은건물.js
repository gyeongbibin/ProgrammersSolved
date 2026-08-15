function solution(board, skill) {
    const rowCount = board.length;
    const columnCount = board[0].length;
    const changes = Array.from({ length: rowCount + 1 }, () => new Int32Array(columnCount + 1));

    for (const [type, r1, c1, r2, c2, degree] of skill) {
        const value = type === 1 ? -degree : degree;
        changes[r1][c1] += value;
        changes[r1][c2 + 1] -= value;
        changes[r2 + 1][c1] -= value;
        changes[r2 + 1][c2 + 1] += value;
    }

    for (let row = 0; row < rowCount; row++) {
        for (let col = 1; col < columnCount; col++) {
            changes[row][col] += changes[row][col - 1];
        }
    }
    for (let col = 0; col < columnCount; col++) {
        for (let row = 1; row < rowCount; row++) {
            changes[row][col] += changes[row - 1][col];
        }
    }

    let answer = 0;
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < columnCount; col++) {
            if (board[row][col] + changes[row][col] > 0) answer++;
        }
    }
    return answer;
}
