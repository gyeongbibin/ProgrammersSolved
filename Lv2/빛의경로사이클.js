function solution(grid) {
    const rowCount = grid.length;
    const columnCount = grid[0].length;
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    const visited = new Uint8Array(rowCount * columnCount * 4);
    const cycles = [];

    function stateIndex(row, column, direction) {
        return (row * columnCount + column) * 4 + direction;
    }

    for (let startRow = 0; startRow < rowCount; startRow++) {
        for (let startColumn = 0; startColumn < columnCount; startColumn++) {
            for (let startDirection = 0; startDirection < 4; startDirection++) {
                if (visited[stateIndex(startRow, startColumn, startDirection)]) continue;

                let row = startRow;
                let column = startColumn;
                let direction = startDirection;
                let length = 0;

                while (!visited[stateIndex(row, column, direction)]) {
                    visited[stateIndex(row, column, direction)] = 1;
                    length++;

                    if (grid[row][column] === "L") direction = (direction + 3) % 4;
                    if (grid[row][column] === "R") direction = (direction + 1) % 4;

                    row = (row + directions[direction][0] + rowCount) % rowCount;
                    column = (column + directions[direction][1] + columnCount) % columnCount;
                }

                cycles.push(length);
            }
        }
    }

    return cycles.sort((a, b) => a - b);
}
