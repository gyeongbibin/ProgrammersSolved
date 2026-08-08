class MaxHeap {
    constructor() {
        this.values = [];
    }

    push(value) {
        this.values.push(value);
        let index = this.values.length - 1;

        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.values[parent] >= this.values[index]) break;

            [this.values[parent], this.values[index]] = [this.values[index], this.values[parent]];
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
                let largest = index;

                if (left < this.values.length && this.values[left] > this.values[largest]) {
                    largest = left;
                }
                if (right < this.values.length && this.values[right] > this.values[largest]) {
                    largest = right;
                }
                if (largest === index) break;

                [this.values[index], this.values[largest]] = [this.values[largest], this.values[index]];
                index = largest;
            }
        }

        return top;
    }
}

function solution(n, works) {
    const total = works.reduce((sum, work) => sum + work, 0);
    if (total <= n) return 0;

    const heap = new MaxHeap();
    for (const work of works) heap.push(work);

    for (let hour = 0; hour < n; hour++) {
        heap.push(heap.pop() - 1);
    }

    return heap.values.reduce((sum, work) => sum + work * work, 0);
}
