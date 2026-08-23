function solution(n) {
    let battery = 0;

    while (n > 0) {
        battery += n % 2;
        n = Math.floor(n / 2);
    }

    return battery;
}
