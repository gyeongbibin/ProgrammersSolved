function solution(relation) {
    const columnCount = relation[0].length;
    const candidates = [];
    const masks = Array.from({ length: (1 << columnCount) - 1 }, (_, index) => index + 1)
        .sort((a, b) => countBits(a) - countBits(b));

    function countBits(mask) {
        let count = 0;
        while (mask > 0) {
            count += mask & 1;
            mask >>= 1;
        }
        return count;
    }

    for (const mask of masks) {
        if (candidates.some((candidate) => (candidate & mask) === candidate)) continue;

        const rows = new Set();
        for (const row of relation) {
            const selected = [];
            for (let col = 0; col < columnCount; col++) {
                if ((mask & (1 << col)) !== 0) selected.push(row[col]);
            }
            rows.add(JSON.stringify(selected));
        }

        if (rows.size === relation.length) candidates.push(mask);
    }

    return candidates.length;
}
