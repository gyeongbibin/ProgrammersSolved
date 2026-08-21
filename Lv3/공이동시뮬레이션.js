function solution(n, m, x, y, queries) {
    let minimumRow = x;
    let maximumRow = x;
    let minimumColumn = y;
    let maximumColumn = y;

    for (let index = queries.length - 1; index >= 0; index--) {
        const [command, distance] = queries[index];

        if (command === 0) {
            if (minimumColumn !== 0) minimumColumn += distance;
            maximumColumn = Math.min(m - 1, maximumColumn + distance);
        } else if (command === 1) {
            minimumColumn = Math.max(0, minimumColumn - distance);
            if (maximumColumn !== m - 1) maximumColumn -= distance;
        } else if (command === 2) {
            if (minimumRow !== 0) minimumRow += distance;
            maximumRow = Math.min(n - 1, maximumRow + distance);
        } else {
            minimumRow = Math.max(0, minimumRow - distance);
            if (maximumRow !== n - 1) maximumRow -= distance;
        }

        if (minimumRow > maximumRow || minimumColumn > maximumColumn) return 0;
        if (minimumRow >= n || maximumRow < 0 || minimumColumn >= m || maximumColumn < 0) return 0;
    }

    return (maximumRow - minimumRow + 1) * (maximumColumn - minimumColumn + 1);
}
