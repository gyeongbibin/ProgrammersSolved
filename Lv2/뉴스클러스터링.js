function solution(str1, str2) {
    function createMultiset(text) {
        const counts = new Map();
        const lower = text.toLowerCase();

        for (let i = 0; i < lower.length - 1; i++) {
            const pair = lower.slice(i, i + 2);
            if (!/^[a-z]{2}$/.test(pair)) continue;
            counts.set(pair, (counts.get(pair) || 0) + 1);
        }

        return counts;
    }

    const first = createMultiset(str1);
    const second = createMultiset(str2);
    const pairs = new Set([...first.keys(), ...second.keys()]);
    let intersection = 0;
    let union = 0;

    for (const pair of pairs) {
        const firstCount = first.get(pair) || 0;
        const secondCount = second.get(pair) || 0;
        intersection += Math.min(firstCount, secondCount);
        union += Math.max(firstCount, secondCount);
    }

    if (union === 0) return 65536;
    return Math.floor((intersection * 65536) / union);
}
