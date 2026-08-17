function solution(places) {
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    function followsDistancing(room) {
        for (let row = 0; row < 5; row++) {
            for (let column = 0; column < 5; column++) {
                if (room[row][column] !== "P") continue;

                const visited = Array.from({ length: 5 }, () => Array(5).fill(false));
                const queue = [[row, column, 0]];
                visited[row][column] = true;

                for (let index = 0; index < queue.length; index++) {
                    const [currentRow, currentColumn, distance] = queue[index];
                    if (distance === 2) continue;

                    for (const [rowDelta, columnDelta] of directions) {
                        const nextRow = currentRow + rowDelta;
                        const nextColumn = currentColumn + columnDelta;
                        if (nextRow < 0 || nextRow >= 5 || nextColumn < 0 || nextColumn >= 5) continue;
                        if (visited[nextRow][nextColumn] || room[nextRow][nextColumn] === "X") continue;
                        if (room[nextRow][nextColumn] === "P") return false;

                        visited[nextRow][nextColumn] = true;
                        queue.push([nextRow, nextColumn, distance + 1]);
                    }
                }
            }
        }
        return true;
    }

    return places.map((room) => followsDistancing(room) ? 1 : 0);
}
