class Heap {
    constructor(compare) {
        this.values = [];
        this.compare = compare;
    }

    get size() {
        return this.values.length;
    }

    peek() {
        return this.values[0];
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
                let best = index;

                if (left < this.values.length && this.compare(this.values[left], this.values[best])) {
                    best = left;
                }
                if (right < this.values.length && this.compare(this.values[right], this.values[best])) {
                    best = right;
                }
                if (best === index) break;

                [this.values[index], this.values[best]] = [this.values[best], this.values[index]];
                index = best;
            }
        }

        return top;
    }
}

function solution(operations) {
    const base = operations.length + 1;
    const offset = 2 ** 31;
    const active = new Uint8Array(operations.length);
    const minHeap = new Heap((a, b) => a < b);
    const maxHeap = new Heap((a, b) => a > b);
    let nextId = 0;
    let activeCount = 0;

    function encode(value, id) {
        return (value + offset) * base + id;
    }

    function getId(encoded) {
        return encoded % base;
    }

    function getValue(encoded) {
        return Math.floor(encoded / base) - offset;
    }

    function removeInactive(heap) {
        while (heap.size > 0 && active[getId(heap.peek())] === 0) {
            heap.pop();
        }
    }

    for (const operation of operations) {
        const [command, valueText] = operation.split(' ');
        const value = Number(valueText);

        if (command === 'I') {
            const encoded = encode(value, nextId);
            active[nextId] = 1;
            nextId += 1;
            activeCount += 1;
            minHeap.push(encoded);
            maxHeap.push(encoded);
            continue;
        }

        if (activeCount === 0) continue;

        const heap = value === 1 ? maxHeap : minHeap;
        removeInactive(heap);
        active[getId(heap.pop())] = 0;
        activeCount -= 1;
    }

    if (activeCount === 0) return [0, 0];

    removeInactive(minHeap);
    removeInactive(maxHeap);
    return [getValue(maxHeap.peek()), getValue(minHeap.peek())];
}
