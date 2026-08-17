function solution(n, m, x, y, r, c, k) {
    const initialDistance = Math.abs(x - r) + Math.abs(y - c);
    if (initialDistance > k || (k - initialDistance) % 2 !== 0) return "impossible";

    const directions = [
        [1, 0, "d"],
        [0, -1, "l"],
        [0, 1, "r"],
        [-1, 0, "u"],
    ];
    let row = x;
    let column = y;
    let path = "";

    for (let step = 0; step < k; step++) {
        const remaining = k - step - 1;

        for (const [rowDelta, columnDelta, command] of directions) {
            const nextRow = row + rowDelta;
            const nextColumn = column + columnDelta;
            if (nextRow < 1 || nextRow > n || nextColumn < 1 || nextColumn > m) continue;

            const distance = Math.abs(nextRow - r) + Math.abs(nextColumn - c);
            if (distance > remaining || (remaining - distance) % 2 !== 0) continue;

            row = nextRow;
            column = nextColumn;
            path += command;
            break;
        }
    }

    return path;
}
