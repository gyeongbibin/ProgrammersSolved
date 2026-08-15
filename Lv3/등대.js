function solution(n, lighthouse) {
    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [first, second] of lighthouse) {
        graph[first].push(second);
        graph[second].push(first);
    }

    const parent = new Int32Array(n + 1);
    parent[1] = -1;
    const order = [1];

    for (let index = 0; index < order.length; index++) {
        const node = order[index];
        for (const next of graph[node]) {
            if (next === parent[node]) continue;
            parent[next] = node;
            order.push(next);
        }
    }

    const lightOn = new Int32Array(n + 1);
    const lightOff = new Int32Array(n + 1);

    for (let index = order.length - 1; index >= 0; index--) {
        const node = order[index];
        lightOn[node] = 1;

        for (const next of graph[node]) {
            if (parent[next] !== node) continue;
            lightOn[node] += Math.min(lightOn[next], lightOff[next]);
            lightOff[node] += lightOn[next];
        }
    }

    return Math.min(lightOn[1], lightOff[1]);
}
