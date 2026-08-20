function solution(n, k) {
    const people = Array.from({ length: n }, (_, index) => index + 1);
    const factorial = Array(n + 1).fill(1n);

    for (let number = 2; number <= n; number++) {
        factorial[number] = factorial[number - 1] * BigInt(number);
    }

    let rank = BigInt(k) - 1n;
    const answer = [];

    for (let remaining = n; remaining > 0; remaining--) {
        const blockSize = factorial[remaining - 1];
        const index = Number(rank / blockSize);
        answer.push(people.splice(index, 1)[0]);
        rank %= blockSize;
    }

    return answer;
}
