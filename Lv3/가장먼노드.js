function solution(n, edge) {
    const graph = Array.from({ length: n + 1 }, () => []);

    for (const [first, second] of edge) {
        graph[first].push(second);
        graph[second].push(first);
    }

    const distance = Array(n + 1).fill(-1);
    const queue = [1];
    distance[1] = 0;

    let maxDistance = 0;
    let answer = 1;

    for (let head = 0; head < queue.length; head++) {
        const current = queue[head];

        for (const next of graph[current]) {
            if (distance[next] !== -1) continue;

            distance[next] = distance[current] + 1;
            queue.push(next);

            if (distance[next] > maxDistance) {
                maxDistance = distance[next];
                answer = 1;
            } else if (distance[next] === maxDistance) {
                answer += 1;
            }
        }
    }

    return answer;
}
