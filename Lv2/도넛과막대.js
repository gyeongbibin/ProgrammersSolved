function solution(edges) {
    const indegree = new Map();
    const outdegree = new Map();

    for (const [from, to] of edges) {
        outdegree.set(from, (outdegree.get(from) || 0) + 1);
        indegree.set(to, (indegree.get(to) || 0) + 1);

        if (!indegree.has(from)) indegree.set(from, indegree.get(from) || 0);
        if (!outdegree.has(to)) outdegree.set(to, outdegree.get(to) || 0);
    }

    let created = 0;
    let stick = 0;
    let eight = 0;

    const nodes = new Set([...indegree.keys(), ...outdegree.keys()]);

    for (const node of nodes) {
        const inCnt = indegree.get(node) || 0;
        const outCnt = outdegree.get(node) || 0;

        if (inCnt === 0 && outCnt >= 2) {
            created = node;
        } else if (outCnt === 0) {
            stick += 1;
        } else if (inCnt >= 2 && outCnt === 2) {
            eight += 1;
        }
    }

    const donut = (outdegree.get(created) || 0) - stick - eight;

    return [created, donut, stick, eight];
}