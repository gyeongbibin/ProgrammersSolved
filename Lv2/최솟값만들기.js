function solution(A, B) {
    const ascending = [...A].sort((a, b) => a - b);
    const descending = [...B].sort((a, b) => b - a);

    return ascending.reduce(
        (sum, number, index) => sum + number * descending[index],
        0,
    );
}
