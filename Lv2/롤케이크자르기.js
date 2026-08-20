function solution(topping) {
    const rightCounts = new Map();
    for (const type of topping) {
        rightCounts.set(type, (rightCounts.get(type) ?? 0) + 1);
    }

    const leftTypes = new Set();
    let rightTypeCount = rightCounts.size;
    let answer = 0;

    for (let cut = 0; cut < topping.length - 1; cut++) {
        const type = topping[cut];
        leftTypes.add(type);

        const remaining = rightCounts.get(type) - 1;
        rightCounts.set(type, remaining);
        if (remaining === 0) rightTypeCount -= 1;

        if (leftTypes.size === rightTypeCount) answer += 1;
    }

    return answer;
}
