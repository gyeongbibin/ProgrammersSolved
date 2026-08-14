function solution(n, stations, w) {
    const coverage = 2 * w + 1;
    let coveredUntil = 0;
    let answer = 0;

    for (const station of stations) {
        const uncoveredLength = station - w - coveredUntil - 1;
        if (uncoveredLength > 0) {
            answer += Math.ceil(uncoveredLength / coverage);
        }
        coveredUntil = Math.max(coveredUntil, station + w);
    }

    if (coveredUntil < n) {
        answer += Math.ceil((n - coveredUntil) / coverage);
    }

    return answer;
}
