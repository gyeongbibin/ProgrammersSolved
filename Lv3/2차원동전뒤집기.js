function solution(beginning, target) {
    const rows = beginning.length;
    const columns = beginning[0].length;
    const rowFlips = new Uint8Array(rows);
    const columnFlips = new Uint8Array(columns);

    for (let column = 0; column < columns; column++) {
        columnFlips[column] = beginning[0][column] ^ target[0][column];
    }

    for (let row = 0; row < rows; row++) {
        const difference = beginning[row][0] ^ target[row][0];
        rowFlips[row] = difference ^ columnFlips[0];
    }

    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            const difference = beginning[row][column] ^ target[row][column];
            if ((rowFlips[row] ^ columnFlips[column]) !== difference) return -1;
        }
    }

    const flips = rowFlips.reduce((sum, value) => sum + value, 0)
        + columnFlips.reduce((sum, value) => sum + value, 0);

    return Math.min(flips, rows + columns - flips);
}
