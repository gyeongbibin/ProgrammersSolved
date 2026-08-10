class MinHeap {
    constructor(compare) {
        this.values = [];
        this.compare = compare;
    }

    get size() {
        return this.values.length;
    }

    push(value) {
        this.values.push(value);
        let index = this.values.length - 1;

        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (!this.compare(this.values[index], this.values[parent])) break;

            [this.values[index], this.values[parent]] = [this.values[parent], this.values[index]];
            index = parent;
        }
    }

    pop() {
        const top = this.values[0];
        const last = this.values.pop();

        if (this.values.length > 0) {
            this.values[0] = last;
            let index = 0;

            while (true) {
                const left = index * 2 + 1;
                const right = left + 1;
                let smallest = index;

                if (left < this.values.length && this.compare(this.values[left], this.values[smallest])) {
                    smallest = left;
                }
                if (right < this.values.length && this.compare(this.values[right], this.values[smallest])) {
                    smallest = right;
                }
                if (smallest === index) break;

                [this.values[index], this.values[smallest]] = [this.values[smallest], this.values[index]];
                index = smallest;
            }
        }

        return top;
    }
}

function solution(jobs) {
    const waiting = new MinHeap((a, b) => (
        a.duration < b.duration ||
        (a.duration === b.duration && a.request < b.request) ||
        (a.duration === b.duration && a.request === b.request && a.index < b.index)
    ));
    const requests = jobs
        .map(([request, duration], index) => ({ request, duration, index }))
        .sort((a, b) => a.request - b.request || a.index - b.index);

    let time = 0;
    let next = 0;
    let completed = 0;
    let totalTurnaround = 0;

    while (completed < jobs.length) {
        if (waiting.size === 0 && next < requests.length && time < requests[next].request) {
            time = requests[next].request;
        }

        while (next < requests.length && requests[next].request <= time) {
            waiting.push(requests[next++]);
        }

        const job = waiting.pop();
        time += job.duration;
        totalTurnaround += time - job.request;
        completed += 1;
    }

    return Math.floor(totalTurnaround / jobs.length);
}
