function solution(numbers, target) {
    function countWays(index, sum) {
        if (index === numbers.length) return sum === target ? 1 : 0;

        return (
            countWays(index + 1, sum + numbers[index]) +
            countWays(index + 1, sum - numbers[index])
        );
    }

    return countWays(0, 0);
}
