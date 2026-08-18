function solution(n, left, right) {
    const answer = [];

    for (let index = left; index <= right; index++) {
        const row = Math.floor(index / n);
        const column = index % n;
        answer.push(Math.max(row, column) + 1);
    }

    return answer;
}
