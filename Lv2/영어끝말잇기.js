function solution(n, words) {
    const spoken = new Set([words[0]]);

    for (let index = 1; index < words.length; index++) {
        const previous = words[index - 1];
        const current = words[index];
        const disconnected = previous[previous.length - 1] !== current[0];

        if (disconnected || spoken.has(current)) {
            return [index % n + 1, Math.floor(index / n) + 1];
        }
        spoken.add(current);
    }

    return [0, 0];
}
