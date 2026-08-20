function solution(k, tangerine) {
    const counts = new Map();

    for (const size of tangerine) {
        counts.set(size, (counts.get(size) ?? 0) + 1);
    }

    const frequencies = [...counts.values()].sort((a, b) => b - a);
    let selected = 0;

    for (let kinds = 0; kinds < frequencies.length; kinds++) {
        selected += frequencies[kinds];
        if (selected >= k) return kinds + 1;
    }
}
