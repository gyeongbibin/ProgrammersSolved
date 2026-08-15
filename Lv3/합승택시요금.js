function solution(n, s, a, b, fares) {
    const distance = Array.from({ length: n }, () => Array(n).fill(Infinity));
    for (let node = 0; node < n; node++) distance[node][node] = 0;

    for (const [first, second, fare] of fares) {
        distance[first - 1][second - 1] = fare;
        distance[second - 1][first - 1] = fare;
    }

    for (let middle = 0; middle < n; middle++) {
        for (let from = 0; from < n; from++) {
            for (let to = 0; to < n; to++) {
                distance[from][to] = Math.min(
                    distance[from][to],
                    distance[from][middle] + distance[middle][to]
                );
            }
        }
    }

    let answer = Infinity;
    for (let split = 0; split < n; split++) {
        answer = Math.min(
            answer,
            distance[s - 1][split] + distance[split][a - 1] + distance[split][b - 1]
        );
    }
    return answer;
}
