function solution(s) {
    const sets = s
        .slice(2, -2)
        .split("},{")
        .map((set) => set.split(",").map(Number))
        .sort((a, b) => a.length - b.length);
    const included = new Set();
    const answer = [];

    for (const set of sets) {
        for (const value of set) {
            if (included.has(value)) continue;
            included.add(value);
            answer.push(value);
        }
    }

    return answer;
}
