function solution(storey) {
    let stones = 0;

    while (storey > 0) {
        const digit = storey % 10;
        const nextDigit = Math.floor(storey / 10) % 10;

        if (digit > 5 || (digit === 5 && nextDigit >= 5)) {
            stones += 10 - digit;
            storey = Math.floor(storey / 10) + 1;
        } else {
            stones += digit;
            storey = Math.floor(storey / 10);
        }
    }

    return stones;
}
