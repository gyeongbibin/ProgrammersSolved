function solution(rectangle, characterX, characterY, itemX, itemY) {
    const width = 102;
    const boundary = new Uint8Array(width * width);

    for (const [left, bottom, right, top] of rectangle) {
        for (let x = left * 2; x <= right * 2; x++) {
            for (let y = bottom * 2; y <= top * 2; y++) {
                boundary[y * width + x] = 1;
            }
        }
    }

    for (const [left, bottom, right, top] of rectangle) {
        for (let x = left * 2 + 1; x < right * 2; x++) {
            for (let y = bottom * 2 + 1; y < top * 2; y++) {
                boundary[y * width + x] = 0;
            }
        }
    }

    const start = characterY * 2 * width + characterX * 2;
    const target = itemY * 2 * width + itemX * 2;
    const distance = new Int16Array(width * width);
    distance.fill(-1);

    const queue = new Int16Array(width * width);
    let head = 0;
    let tail = 0;
    queue[tail++] = start;
    distance[start] = 0;

    const moves = [-width, width, -1, 1];
    while (head < tail) {
        const current = queue[head++];
        if (current === target) return distance[current] / 2;

        for (const move of moves) {
            const next = current + move;
            if (next < 0 || next >= boundary.length) continue;
            if (boundary[next] === 0 || distance[next] !== -1) continue;

            distance[next] = distance[current] + 1;
            queue[tail++] = next;
        }
    }
}
