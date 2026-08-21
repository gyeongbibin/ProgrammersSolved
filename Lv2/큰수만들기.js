function solution(number, k) {
    const digits = [];
    let remaining = k;

    for (const digit of number) {
        while (
            remaining > 0
            && digits.length > 0
            && digits[digits.length - 1] < digit
        ) {
            digits.pop();
            remaining -= 1;
        }
        digits.push(digit);
    }

    return digits.slice(0, digits.length - remaining).join("");
}
