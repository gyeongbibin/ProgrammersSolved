function solution(m, n, board) {
    const grid = board.map((row) => row.split(''));
    let removedCount = 0;

    while (true) {
        const removable = new Set();

        for (let row = 0; row < m - 1; row++) {
            for (let column = 0; column < n - 1; column++) {
                const block = grid[row][column];
                if (!block) continue;

                if (
                    grid[row][column + 1] === block
                    && grid[row + 1][column] === block
                    && grid[row + 1][column + 1] === block
                ) {
                    removable.add(row * n + column);
                    removable.add(row * n + column + 1);
                    removable.add((row + 1) * n + column);
                    removable.add((row + 1) * n + column + 1);
                }
            }
        }

        if (removable.size === 0) break;
        removedCount += removable.size;

        for (const position of removable) {
            grid[Math.floor(position / n)][position % n] = null;
        }

        for (let column = 0; column < n; column++) {
            let destination = m - 1;

            for (let row = m - 1; row >= 0; row--) {
                if (!grid[row][column]) continue;
                grid[destination][column] = grid[row][column];
                if (destination !== row) grid[row][column] = null;
                destination--;
            }

            while (destination >= 0) grid[destination--][column] = null;
        }
    }

    return removedCount;
}
