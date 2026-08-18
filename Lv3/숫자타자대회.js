function solution(numbers) {
    const coordinates = [
        [3, 1], [0, 0], [0, 1], [0, 2], [1, 0],
        [1, 1], [1, 2], [2, 0], [2, 1], [2, 2],
    ];
    const costs = Array.from({ length: 10 }, () => Array(10).fill(0));

    for (let from = 0; from < 10; from++) {
        for (let to = 0; to < 10; to++) {
            if (from === to) {
                costs[from][to] = 1;
                continue;
            }
            const rowGap = Math.abs(coordinates[from][0] - coordinates[to][0]);
            const columnGap = Math.abs(coordinates[from][1] - coordinates[to][1]);
            const diagonal = Math.min(rowGap, columnGap);
            costs[from][to] = diagonal * 3 + (Math.max(rowGap, columnGap) - diagonal) * 2;
        }
    }

    let current = new Float64Array(100);
    current.fill(Infinity);
    current[4 * 10 + 6] = 0;

    for (const character of numbers) {
        const target = Number(character);
        const next = new Float64Array(100);
        next.fill(Infinity);

        for (let state = 0; state < 100; state++) {
            const total = current[state];
            if (total === Infinity) continue;

            const left = Math.floor(state / 10);
            const right = state % 10;
            if (target === left || target === right) {
                next[state] = Math.min(next[state], total + 1);
                continue;
            }

            const moveLeft = target * 10 + right;
            const moveRight = left * 10 + target;
            next[moveLeft] = Math.min(next[moveLeft], total + costs[left][target]);
            next[moveRight] = Math.min(next[moveRight], total + costs[right][target]);
        }

        current = next;
    }

    return Math.min(...current);
}
