function solution(board, r, c) {
    const positions = new Map();
    let initialCards = 0;

    for (let row = 0; row < 4; row++) {
        for (let column = 0; column < 4; column++) {
            const card = board[row][column];
            if (card === 0) continue;

            const position = row * 4 + column;
            initialCards |= 1 << position;
            if (!positions.has(card)) positions.set(card, []);
            positions.get(card).push(position);
        }
    }

    const pairs = [...positions.values()];
    const distanceMemo = new Map();
    const searchMemo = new Map();
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    function distance(cards, start, target) {
        if (start === target) return 0;
        const memoKey = `${cards},${start},${target}`;
        if (distanceMemo.has(memoKey)) return distanceMemo.get(memoKey);

        const queue = [start];
        const steps = new Int8Array(16);
        steps.fill(-1);
        steps[start] = 0;
        let head = 0;

        while (head < queue.length) {
            const current = queue[head++];
            const row = Math.floor(current / 4);
            const column = current % 4;

            for (let direction = 0; direction < 4; direction++) {
                const nextRow = row + dr[direction];
                const nextColumn = column + dc[direction];

                if (nextRow >= 0 && nextRow < 4 && nextColumn >= 0 && nextColumn < 4) {
                    const next = nextRow * 4 + nextColumn;
                    if (steps[next] === -1) {
                        steps[next] = steps[current] + 1;
                        if (next === target) {
                            distanceMemo.set(memoKey, steps[next]);
                            return steps[next];
                        }
                        queue.push(next);
                    }
                }

                let controlRow = row;
                let controlColumn = column;
                while (true) {
                    const movedRow = controlRow + dr[direction];
                    const movedColumn = controlColumn + dc[direction];
                    if (movedRow < 0 || movedRow >= 4 || movedColumn < 0 || movedColumn >= 4) break;
                    controlRow = movedRow;
                    controlColumn = movedColumn;
                    const moved = controlRow * 4 + controlColumn;
                    if (cards & (1 << moved)) break;
                }

                const control = controlRow * 4 + controlColumn;
                if (steps[control] !== -1) continue;
                steps[control] = steps[current] + 1;
                if (control === target) {
                    distanceMemo.set(memoKey, steps[control]);
                    return steps[control];
                }
                queue.push(control);
            }
        }
    }

    function removeAll(cards, cursor) {
        if (cards === 0) return 0;
        const memoKey = `${cards},${cursor}`;
        if (searchMemo.has(memoKey)) return searchMemo.get(memoKey);

        let minimum = Infinity;

        for (const [first, second] of pairs) {
            const pairMask = (1 << first) | (1 << second);
            if ((cards & pairMask) === 0) continue;

            const remaining = cards & ~pairMask;
            const firstOrder = distance(cards, cursor, first)
                + distance(cards, first, second)
                + 2
                + removeAll(remaining, second);
            const secondOrder = distance(cards, cursor, second)
                + distance(cards, second, first)
                + 2
                + removeAll(remaining, first);

            minimum = Math.min(minimum, firstOrder, secondOrder);
        }

        searchMemo.set(memoKey, minimum);
        return minimum;
    }

    return removeAll(initialCards, r * 4 + c);
}
