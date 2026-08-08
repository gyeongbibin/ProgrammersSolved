function solution(triangle) {
    const dp = [...triangle[triangle.length - 1]];

    for (let row = triangle.length - 2; row >= 0; row--) {
        for (let col = 0; col < triangle[row].length; col++) {
            dp[col] = triangle[row][col] + Math.max(dp[col], dp[col + 1]);
        }
    }

    return dp[0];
}
