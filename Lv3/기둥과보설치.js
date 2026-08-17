function solution(n, buildFrame) {
    const structures = new Set();

    function key(x, y, type) {
        return `${x},${y},${type}`;
    }

    function has(x, y, type) {
        return structures.has(key(x, y, type));
    }

    function isValid(x, y, type) {
        if (type === 0) {
            return y === 0
                || has(x, y - 1, 0)
                || has(x - 1, y, 1)
                || has(x, y, 1);
        }
        return has(x, y - 1, 0)
            || has(x + 1, y - 1, 0)
            || (has(x - 1, y, 1) && has(x + 1, y, 1));
    }

    function allValid() {
        for (const structure of structures) {
            const [x, y, type] = structure.split(",").map(Number);
            if (!isValid(x, y, type)) return false;
        }
        return true;
    }

    for (const [x, y, type, operation] of buildFrame) {
        const structure = key(x, y, type);

        if (operation === 1) {
            structures.add(structure);
            if (!isValid(x, y, type)) structures.delete(structure);
        } else {
            structures.delete(structure);
            if (!allValid()) structures.add(structure);
        }
    }

    return [...structures]
        .map((structure) => structure.split(",").map(Number))
        .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
}
