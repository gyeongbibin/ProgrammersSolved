function solution(routes) {
    routes.sort((a, b) => a[1] - b[1]);

    let camera = -Infinity;
    let answer = 0;

    for (const [start, end] of routes) {
        if (start <= camera) continue;

        camera = end;
        answer += 1;
    }

    return answer;
}
