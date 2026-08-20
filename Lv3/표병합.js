function solution(commands) {
    const cellCount = 50 * 50;
    const parent = Int32Array.from({ length: cellCount }, (_, index) => index);
    const values = Array(cellCount).fill(null);
    const answer = [];

    function find(cell) {
        let root = cell;
        while (parent[root] !== root) root = parent[root];

        while (parent[cell] !== cell) {
            const next = parent[cell];
            parent[cell] = root;
            cell = next;
        }

        return root;
    }

    function cellId(row, column) {
        return (Number(row) - 1) * 50 + Number(column) - 1;
    }

    for (const command of commands) {
        const parts = command.split(" ");
        const operation = parts[0];

        if (operation === "UPDATE" && parts.length === 4) {
            values[find(cellId(parts[1], parts[2]))] = parts[3];
            continue;
        }

        if (operation === "UPDATE") {
            const [, from, to] = parts;
            for (let cell = 0; cell < cellCount; cell++) {
                if (parent[cell] === cell && values[cell] === from) values[cell] = to;
            }
            continue;
        }

        if (operation === "MERGE") {
            const firstRoot = find(cellId(parts[1], parts[2]));
            const secondRoot = find(cellId(parts[3], parts[4]));
            if (firstRoot === secondRoot) continue;

            const mergedValue = values[firstRoot] ?? values[secondRoot];
            parent[secondRoot] = firstRoot;
            values[firstRoot] = mergedValue;
            values[secondRoot] = null;
            continue;
        }

        if (operation === "UNMERGE") {
            const selected = cellId(parts[1], parts[2]);
            const root = find(selected);
            const savedValue = values[root];
            const members = [];

            for (let cell = 0; cell < cellCount; cell++) {
                if (find(cell) === root) members.push(cell);
            }

            for (const cell of members) {
                parent[cell] = cell;
                values[cell] = null;
            }
            values[selected] = savedValue;
            continue;
        }

        const value = values[find(cellId(parts[1], parts[2]))];
        answer.push(value ?? "EMPTY");
    }

    return answer;
}
