function solution(n, m, edgeList, k, gpsLog) {
    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [first, second] of edgeList) {
        graph[first].push(second);
        graph[second].push(first);
    }

    let previous = Array(n + 1).fill(Infinity);
    previous[gpsLog[0]] = 0;

    for (let time = 1; time < k; time++) {
        const current = Array(n + 1).fill(Infinity);

        for (let node = 1; node <= n; node++) {
            let bestPrevious = previous[node];
            for (const neighbor of graph[node]) {
                bestPrevious = Math.min(bestPrevious, previous[neighbor]);
            }

            if (bestPrevious !== Infinity) {
                current[node] = bestPrevious + (node === gpsLog[time] ? 0 : 1);
            }
        }

        previous = current;
    }

    const answer = previous[gpsLog[k - 1]];
    return answer === Infinity ? -1 : answer;
}
