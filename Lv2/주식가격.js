function solution(prices) {
    const durations = prices.map((_, index) => prices.length - index - 1);
    const stack = [];

    for (let current = 0; current < prices.length; current++) {
        while (
            stack.length > 0
            && prices[stack[stack.length - 1]] > prices[current]
        ) {
            const fallen = stack.pop();
            durations[fallen] = current - fallen;
        }
        stack.push(current);
    }

    return durations;
}
