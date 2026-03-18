function solution(n, k) {
    const parts = n.toString(k).split('0').filter(v => v !== '');

    function isPrime(num) {
        if (num < 2) return false;
        if (num === 2) return true;
        if (num % 2 === 0) return false;

        for (let i = 3; i * i <= num; i += 2) {
            if (num % i === 0) return false;
        }
        return true;
    }

    let answer = 0;

    for (const part of parts) {
        if (isPrime(Number(part))) answer++;
    }

    return answer;
}