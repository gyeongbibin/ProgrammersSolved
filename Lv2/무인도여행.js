function solution(maps) {
    const n = maps.length;
    const m = maps[0].length;
    const visited = Array.from({ length: n }, () => Array(m).fill(false));
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];
    const answer = [];

    function dfs(x, y) {
        visited[x][y] = true;
        let sum = Number(maps[x][y]);

        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
            if (visited[nx][ny]) continue;
            if (maps[nx][ny] === 'X') continue;

            sum += dfs(nx, ny);
        }

        return sum;
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (!visited[i][j] && maps[i][j] !== 'X') {
                answer.push(dfs(i, j));
            }
        }
    }

    if (answer.length === 0) return [-1];

    return answer.sort((a, b) => a - b);
}