function solution(clothes) {
    const counts = new Map();

    for (const [, category] of clothes) {
        counts.set(category, (counts.get(category) ?? 0) + 1);
    }

    let combinations = 1;
    for (const count of counts.values()) combinations *= count + 1;

    return combinations - 1;
}
