function solution(m, n, puddles) {
    const MOD = 1_000_000_007;
    const blocked = Array.from({ length: n }, () => Array(m).fill(false));

    for (const [x, y] of puddles) {
        blocked[y - 1][x - 1] = true;
    }

    const dp = Array.from({ length: n }, () => Array(m).fill(0));
    dp[0][0] = 1;

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < m; col++) {
            if (blocked[row][col]) {
                dp[row][col] = 0;
                continue;
            }
            if (row === 0 && col === 0) continue;

            const fromTop = row > 0 ? dp[row - 1][col] : 0;
            const fromLeft = col > 0 ? dp[row][col - 1] : 0;
            dp[row][col] = (fromTop + fromLeft) % MOD;
        }
    }

    return dp[n - 1][m - 1];
}
