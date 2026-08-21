function solution(s) {
    const numbers = s.split(" ").map(Number);
    let minimum = numbers[0];
    let maximum = numbers[0];

    for (const number of numbers) {
        minimum = Math.min(minimum, number);
        maximum = Math.max(maximum, number);
    }

    return `${minimum} ${maximum}`;
}
