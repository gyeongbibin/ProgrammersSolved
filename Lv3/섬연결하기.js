function solution(n, costs) {
    const parent = Array.from({ length: n }, (_, index) => index);
    const rank = Array(n).fill(0);

    function find(node) {
        if (parent[node] !== node) parent[node] = find(parent[node]);
        return parent[node];
    }

    function union(first, second) {
        let firstRoot = find(first);
        let secondRoot = find(second);

        if (firstRoot === secondRoot) return false;

        if (rank[firstRoot] < rank[secondRoot]) {
            [firstRoot, secondRoot] = [secondRoot, firstRoot];
        }

        parent[secondRoot] = firstRoot;
        if (rank[firstRoot] === rank[secondRoot]) rank[firstRoot] += 1;
        return true;
    }

    costs.sort((a, b) => a[2] - b[2]);

    let answer = 0;
    let connected = 0;

    for (const [first, second, cost] of costs) {
        if (!union(first, second)) continue;

        answer += cost;
        connected += 1;
        if (connected === n - 1) break;
    }

    return answer;
}
