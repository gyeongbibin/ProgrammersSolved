function solution(numbers) {
    const answer = numbers
        .map(String)
        .sort((a, b) => {
            const first = a + b;
            const second = b + a;
            if (first > second) return -1;
            if (first < second) return 1;
            return 0;
        })
        .join('');

    return answer[0] === '0' ? '0' : answer;
}
