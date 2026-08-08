function solution(n, computers) {
    const visited = Array(n).fill(false);
    let answer = 0;

    for (let start = 0; start < n; start++) {
        if (visited[start]) continue;

        answer += 1;
        visited[start] = true;
        const stack = [start];

        while (stack.length > 0) {
            const current = stack.pop();

            for (let next = 0; next < n; next++) {
                if (computers[current][next] === 1 && !visited[next]) {
                    visited[next] = true;
                    stack.push(next);
                }
            }
        }
    }

    return answer;
}
