function solution(n, paths, gates, summits) {
    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [from, to, weight] of paths) {
        graph[from].push([to, weight]);
        graph[to].push([from, weight]);
    }

    const isSummit = new Uint8Array(n + 1);
    for (const summit of summits) isSummit[summit] = 1;

    const intensity = Array(n + 1).fill(Infinity);
    const heap = [];

    function push(entry) {
        heap.push(entry);
        let child = heap.length - 1;

        while (child > 0) {
            const parent = Math.floor((child - 1) / 2);
            if (heap[parent][0] <= entry[0]) break;
            heap[child] = heap[parent];
            child = parent;
        }

        heap[child] = entry;
    }

    function pop() {
        const root = heap[0];
        const last = heap.pop();
        if (heap.length === 0) return root;

        let parent = 0;
        while (parent * 2 + 1 < heap.length) {
            let child = parent * 2 + 1;
            if (child + 1 < heap.length && heap[child + 1][0] < heap[child][0]) {
                child += 1;
            }
            if (heap[child][0] >= last[0]) break;
            heap[parent] = heap[child];
            parent = child;
        }
        heap[parent] = last;

        return root;
    }

    for (const gate of gates) {
        intensity[gate] = 0;
        push([0, gate]);
    }

    while (heap.length > 0) {
        const [currentIntensity, current] = pop();
        if (currentIntensity !== intensity[current]) continue;
        if (isSummit[current]) continue;

        for (const [next, weight] of graph[current]) {
            const nextIntensity = Math.max(currentIntensity, weight);
            if (nextIntensity >= intensity[next]) continue;

            intensity[next] = nextIntensity;
            push([nextIntensity, next]);
        }
    }

    summits.sort((a, b) => a - b);
    let selectedSummit = summits[0];
    for (const summit of summits) {
        if (intensity[summit] < intensity[selectedSummit]) {
            selectedSummit = summit;
        }
    }

    return [selectedSummit, intensity[selectedSummit]];
}
