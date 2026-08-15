function solution(e, starts) {
    const divisorCounts = new Int32Array(e + 1);

    for (let divisor = 1; divisor <= e; divisor++) {
        for (let multiple = divisor; multiple <= e; multiple += divisor) {
            divisorCounts[multiple]++;
        }
    }

    const bestFrom = new Int32Array(e + 1);
    let best = e;
    for (let value = e; value >= 1; value--) {
        if (divisorCounts[value] >= divisorCounts[best]) best = value;
        bestFrom[value] = best;
    }

    return starts.map((start) => bestFrom[start]);
}
