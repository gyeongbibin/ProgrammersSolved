function solution(game_board, table) {
    const size = game_board.length;
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    function extractShapes(grid, target) {
        const visited = Array.from({ length: size }, () => Array(size).fill(false));
        const shapes = [];

        for (let row = 0; row < size; row++) {
            for (let column = 0; column < size; column++) {
                if (visited[row][column] || grid[row][column] !== target) continue;

                const queue = [[row, column]];
                const shape = [];
                visited[row][column] = true;

                for (let head = 0; head < queue.length; head++) {
                    const [currentRow, currentColumn] = queue[head];
                    shape.push([currentRow, currentColumn]);

                    for (const [dr, dc] of directions) {
                        const nextRow = currentRow + dr;
                        const nextColumn = currentColumn + dc;

                        if (
                            nextRow < 0 || nextRow >= size
                            || nextColumn < 0 || nextColumn >= size
                            || visited[nextRow][nextColumn]
                            || grid[nextRow][nextColumn] !== target
                        ) continue;

                        visited[nextRow][nextColumn] = true;
                        queue.push([nextRow, nextColumn]);
                    }
                }

                shapes.push(shape);
            }
        }

        return shapes;
    }

    function normalize(shape) {
        const minimumRow = Math.min(...shape.map(([row]) => row));
        const minimumColumn = Math.min(...shape.map(([, column]) => column));

        return shape
            .map(([row, column]) => [row - minimumRow, column - minimumColumn])
            .sort(([rowA, columnA], [rowB, columnB]) => rowA - rowB || columnA - columnB);
    }

    function canonical(shape) {
        let rotated = normalize(shape);
        const rotations = [];

        for (let turn = 0; turn < 4; turn++) {
            rotated = normalize(rotated);
            rotations.push(rotated.map(([row, column]) => `${row},${column}`).join(';'));
            rotated = rotated.map(([row, column]) => [column, -row]);
        }

        rotations.sort();
        return rotations[0];
    }

    const pieceCounts = new Map();
    for (const piece of extractShapes(table, 1)) {
        const key = canonical(piece);
        pieceCounts.set(key, (pieceCounts.get(key) || 0) + 1);
    }

    let filled = 0;
    for (const hole of extractShapes(game_board, 0)) {
        const key = canonical(hole);
        const count = pieceCounts.get(key) || 0;
        if (count === 0) continue;

        filled += hole.length;
        pieceCounts.set(key, count - 1);
    }

    return filled;
}
