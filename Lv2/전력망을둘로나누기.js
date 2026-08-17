function solution(n, wires) {
    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [first, second] of wires) {
        graph[first].push(second);
        graph[second].push(first);
    }

    const parent = new Int32Array(n + 1);
    const order = [1];
    parent[1] = -1;

    for (let index = 0; index < order.length; index++) {
        const node = order[index];
        for (const next of graph[node]) {
            if (next === parent[node]) continue;
            parent[next] = node;
            order.push(next);
        }
    }

    const subtreeSize = new Int32Array(n + 1);
    subtreeSize.fill(1);
    let answer = n;

    for (let index = order.length - 1; index > 0; index--) {
        const node = order[index];
        answer = Math.min(answer, Math.abs(n - subtreeSize[node] * 2));
        subtreeSize[parent[node]] += subtreeSize[node];
    }

    return answer;
}
