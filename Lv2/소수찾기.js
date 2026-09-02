function solution(numbers) {
    const digits = numbers.split('');
    const used = Array(digits.length).fill(false);
    const candidates = new Set();

    function permute(current) {
        if (current.length > 0) candidates.add(Number(current));

        for (let index = 0; index < digits.length; index++) {
            if (used[index]) continue;
            used[index] = true;
            permute(current + digits[index]);
            used[index] = false;
        }
    }

    function isPrime(number) {
        if (number < 2) return false;
        if (number === 2) return true;
        if (number % 2 === 0) return false;

        for (let divisor = 3; divisor * divisor <= number; divisor += 2) {
            if (number % divisor === 0) return false;
        }
        return true;
    }

    permute('');

    let primeCount = 0;
    for (const candidate of candidates) {
        if (isPrime(candidate)) primeCount++;
    }

    return primeCount;
}
