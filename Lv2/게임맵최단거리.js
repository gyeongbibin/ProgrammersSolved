function solution(maps) {
    const rows = maps.length;
    const columns = maps[0].length;
    const size = rows * columns;
    const distance = new Int32Array(size);
    distance.fill(-1);

    const queue = new Int32Array(size);
    let head = 0;
    let tail = 0;
    queue[tail++] = 0;
    distance[0] = 1;

    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    while (head < tail) {
        const current = queue[head++];
        if (current === size - 1) return distance[current];

        const row = Math.floor(current / columns);
        const column = current % columns;

        for (let direction = 0; direction < 4; direction++) {
            const nextRow = row + dr[direction];
            const nextColumn = column + dc[direction];

            if (nextRow < 0 || nextRow >= rows || nextColumn < 0 || nextColumn >= columns) continue;
            if (maps[nextRow][nextColumn] === 0) continue;

            const next = nextRow * columns + nextColumn;
            if (distance[next] !== -1) continue;

            distance[next] = distance[current] + 1;
            queue[tail++] = next;
        }
    }

    return -1;
}
