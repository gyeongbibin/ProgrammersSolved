function solution(n, roads, sources, destination) {
    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [first, second] of roads) {
        graph[first].push(second);
        graph[second].push(first);
    }

    const distance = Array(n + 1).fill(-1);
    const queue = new Int32Array(n);
    let head = 0;
    let tail = 0;
    queue[tail++] = destination;
    distance[destination] = 0;

    while (head < tail) {
        const current = queue[head++];

        for (const next of graph[current]) {
            if (distance[next] !== -1) continue;
            distance[next] = distance[current] + 1;
            queue[tail++] = next;
        }
    }

    return sources.map((source) => distance[source]);
}
