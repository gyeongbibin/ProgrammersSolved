function solution(n) {
    const MOD = 1234567;
    let previous = 0;
    let current = 1;

    for (let index = 2; index <= n; index++) {
        const next = (previous + current) % MOD;
        previous = current;
        current = next;
    }

    return current;
}
