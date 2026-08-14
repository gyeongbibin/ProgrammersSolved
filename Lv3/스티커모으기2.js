function solution(sticker) {
    if (sticker.length === 1) return sticker[0];

    function collectMaximum(start, end) {
        let twoBack = 0;
        let oneBack = 0;

        for (let i = start; i < end; i++) {
            const current = Math.max(oneBack, twoBack + sticker[i]);
            twoBack = oneBack;
            oneBack = current;
        }

        return oneBack;
    }

    return Math.max(
        collectMaximum(0, sticker.length - 1),
        collectMaximum(1, sticker.length)
    );
}
