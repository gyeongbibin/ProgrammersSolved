function solution(n) {
    let left = 1;
    let right = 1;
    let sum = 1;
    let answer = 0;

    while (left <= n) {
        if (sum < n) {
            right += 1;
            sum += right;
            continue;
        }

        if (sum === n) answer += 1;
        sum -= left;
        left += 1;
    }

    return answer;
}
