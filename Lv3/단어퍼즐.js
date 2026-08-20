function solution(strs, t) {
    const pieces = new Set(strs);
    const minimumPieces = Array(t.length + 1).fill(Infinity);
    minimumPieces[0] = 0;

    for (let end = 1; end <= t.length; end++) {
        for (let length = 1; length <= 5 && length <= end; length++) {
            const start = end - length;
            if (!pieces.has(t.slice(start, end))) continue;

            minimumPieces[end] = Math.min(
                minimumPieces[end],
                minimumPieces[start] + 1,
            );
        }
    }

    return Number.isFinite(minimumPieces[t.length])
        ? minimumPieces[t.length]
        : -1;
}
