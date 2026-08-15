function solution(board) {
    const size = board.length;
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const costs = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => Array(4).fill(Infinity))
    );
    const heap = [[0, 0, 0, -1]];

    function push(item) {
        heap.push(item);
        let index = heap.length - 1;

        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (heap[parent][0] <= heap[index][0]) break;
            [heap[parent], heap[index]] = [heap[index], heap[parent]];
            index = parent;
        }
    }

    function pop() {
        const minimum = heap[0];
        const last = heap.pop();
        if (heap.length === 0) return minimum;

        heap[0] = last;
        let index = 0;
        while (true) {
            let smallest = index;
            const left = index * 2 + 1;
            const right = left + 1;
            if (left < heap.length && heap[left][0] < heap[smallest][0]) smallest = left;
            if (right < heap.length && heap[right][0] < heap[smallest][0]) smallest = right;
            if (smallest === index) break;
            [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
            index = smallest;
        }
        return minimum;
    }

    while (heap.length > 0) {
        const [cost, row, col, previousDirection] = pop();
        if (previousDirection !== -1 && cost !== costs[row][col][previousDirection]) continue;

        for (let direction = 0; direction < 4; direction++) {
            const nextRow = row + directions[direction][0];
            const nextCol = col + directions[direction][1];
            if (nextRow < 0 || nextRow >= size || nextCol < 0 || nextCol >= size) continue;
            if (board[nextRow][nextCol] === 1) continue;

            const cornerCost = previousDirection === -1 || previousDirection === direction ? 0 : 500;
            const nextCost = cost + 100 + cornerCost;
            if (nextCost >= costs[nextRow][nextCol][direction]) continue;

            costs[nextRow][nextCol][direction] = nextCost;
            push([nextCost, nextRow, nextCol, direction]);
        }
    }

    return Math.min(...costs[size - 1][size - 1]);
}
