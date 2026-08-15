function solution(n, k, cmd) {
    const previous = new Int32Array(n);
    const next = new Int32Array(n);
    for (let row = 0; row < n; row++) {
        previous[row] = row - 1;
        next[row] = row + 1;
    }

    const deleted = [];
    let current = k;

    for (const command of cmd) {
        const type = command[0];

        if (type === "U" || type === "D") {
            let distance = Number(command.slice(2));
            while (distance-- > 0) {
                current = type === "U" ? previous[current] : next[current];
            }
        } else if (type === "C") {
            const prevRow = previous[current];
            const nextRow = next[current];
            deleted.push([current, prevRow, nextRow]);

            if (prevRow !== -1) next[prevRow] = nextRow;
            if (nextRow !== n) previous[nextRow] = prevRow;
            current = nextRow !== n ? nextRow : prevRow;
        } else {
            const [row, prevRow, nextRow] = deleted.pop();
            previous[row] = prevRow;
            next[row] = nextRow;
            if (prevRow !== -1) next[prevRow] = row;
            if (nextRow !== n) previous[nextRow] = row;
        }
    }

    const state = Array(n).fill("O");
    for (const [row] of deleted) state[row] = "X";
    return state.join("");
}
