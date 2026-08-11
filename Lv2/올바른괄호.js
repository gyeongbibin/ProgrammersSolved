function solution(s) {
    let balance = 0;

    for (const parenthesis of s) {
        balance += parenthesis === '(' ? 1 : -1;
        if (balance < 0) return false;
    }

    return balance === 0;
}
