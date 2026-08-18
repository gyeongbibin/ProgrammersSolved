function solution(n) {
    const digits = ["1", "2", "4"];
    let answer = "";

    while (n > 0) {
        n--;
        answer = digits[n % 3] + answer;
        n = Math.floor(n / 3);
    }

    return answer;
}
