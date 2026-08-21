function solution(m, n, cityMap) {
    const MOD = 20170805;
    const fromUp = Array.from({ length: m }, () => new Int32Array(n));
    const fromLeft = Array.from({ length: m }, () => new Int32Array(n));
    fromUp[0][0] = 1;

    for (let row = 0; row < m; row++) {
        for (let column = 0; column < n; column++) {
            if (cityMap[row][column] === 1) continue;

            const total = (fromUp[row][column] + fromLeft[row][column]) % MOD;

            if (column + 1 < n) {
                fromLeft[row][column + 1] = cityMap[row][column] === 2
                    ? fromLeft[row][column]
                    : total;
            }

            if (row + 1 < m) {
                fromUp[row + 1][column] = cityMap[row][column] === 2
                    ? fromUp[row][column]
                    : total;
            }
        }
    }

    return (fromUp[m - 1][n - 1] + fromLeft[m - 1][n - 1]) % MOD;
}
