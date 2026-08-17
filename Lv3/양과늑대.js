function solution(info, edges) {
    const children = new Int32Array(info.length);
    for (const [parent, child] of edges) {
        children[parent] |= 1 << child;
    }

    const explored = new Uint8Array(1 << info.length);
    let answer = 0;

    function search(visited, candidates, sheep, wolves) {
        if (explored[visited]) return;
        explored[visited] = 1;
        answer = Math.max(answer, sheep);

        for (let node = 0; node < info.length; node++) {
            const bit = 1 << node;
            if ((candidates & bit) === 0) continue;

            const nextSheep = sheep + (info[node] === 0 ? 1 : 0);
            const nextWolves = wolves + (info[node] === 1 ? 1 : 0);
            if (nextWolves >= nextSheep) continue;

            search(
                visited | bit,
                (candidates & ~bit) | children[node],
                nextSheep,
                nextWolves,
            );
        }
    }

    search(0, 1, 0, 0);
    return answer;
}
