function solution(target) {
    const scoreValues = new Map();

    function addScore(score, isSingleOrBull) {
        scoreValues.set(score, Math.max(scoreValues.get(score) ?? 0, isSingleOrBull));
    }

    for (let number = 1; number <= 20; number++) {
        addScore(number, 1);
        addScore(number * 2, 0);
        addScore(number * 3, 0);
    }
    addScore(50, 1);

    const throws = [...scoreValues.entries()];
    const minimumDarts = new Int32Array(target + 1);
    const singleOrBullCount = new Int32Array(target + 1);
    minimumDarts.fill(target + 1);
    singleOrBullCount.fill(-1);
    minimumDarts[0] = 0;
    singleOrBullCount[0] = 0;

    for (let score = 1; score <= target; score++) {
        for (const [throwScore, isSingleOrBull] of throws) {
            if (throwScore > score) continue;

            const previous = score - throwScore;
            const darts = minimumDarts[previous] + 1;
            const favorable = singleOrBullCount[previous] + isSingleOrBull;

            if (darts < minimumDarts[score]) {
                minimumDarts[score] = darts;
                singleOrBullCount[score] = favorable;
            } else if (darts === minimumDarts[score]) {
                singleOrBullCount[score] = Math.max(singleOrBullCount[score], favorable);
            }
        }
    }

    return [minimumDarts[target], singleOrBullCount[target]];
}
