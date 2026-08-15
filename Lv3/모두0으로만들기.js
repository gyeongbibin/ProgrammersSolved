function solution(a, edges) {
    const weights = a.slice();
    if (weights.reduce((sum, weight) => sum + weight, 0) !== 0) return -1;

    const graph = Array.from({ length: weights.length }, () => []);
    for (const [first, second] of edges) {
        graph[first].push(second);
        graph[second].push(first);
    }

    const parent = new Int32Array(weights.length);
    parent[0] = -1;
    const order = [0];

    for (let index = 0; index < order.length; index++) {
        const node = order[index];
        for (const nextNode of graph[node]) {
            if (nextNode === parent[node]) continue;
            parent[nextNode] = node;
            order.push(nextNode);
        }
    }

    let operations = 0;
    for (let index = order.length - 1; index > 0; index--) {
        const node = order[index];
        operations += Math.abs(weights[node]);
        weights[parent[node]] += weights[node];
    }

    return operations;
}
