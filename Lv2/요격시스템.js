function solution(targets) {
    targets.sort((a, b) => a[1] - b[1]);

    let answer = 0;
    let intercept = -Infinity;

    for (const [start, end] of targets) {
        if (start >= intercept) {
            answer += 1;
            intercept = end;
        }
    }

    return answer;
}
