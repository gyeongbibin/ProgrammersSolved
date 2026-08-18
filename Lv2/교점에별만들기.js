function solution(line) {
    const pointKeys = new Set();
    const points = [];
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (let first = 0; first < line.length; first++) {
        const [a, b, e] = line[first];

        for (let second = first + 1; second < line.length; second++) {
            const [c, d, f] = line[second];
            const denominator = a * d - b * c;
            if (denominator === 0) continue;

            const xNumerator = b * f - e * d;
            const yNumerator = e * c - a * f;
            if (xNumerator % denominator !== 0 || yNumerator % denominator !== 0) continue;

            const x = xNumerator / denominator;
            const y = yNumerator / denominator;
            const pointKey = `${x},${y}`;
            if (pointKeys.has(pointKey)) continue;

            pointKeys.add(pointKey);
            points.push([x, y]);
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        }
    }

    const board = Array.from(
        { length: maxY - minY + 1 },
        () => Array(maxX - minX + 1).fill("."),
    );

    for (const [x, y] of points) {
        board[maxY - y][x - minX] = "*";
    }

    return board.map((row) => row.join(""));
}
