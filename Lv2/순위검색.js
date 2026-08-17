function solution(info, query) {
    const scoresByCondition = new Map();

    for (const entry of info) {
        const values = entry.split(" ");
        const score = Number(values.pop());

        for (let mask = 0; mask < 16; mask++) {
            const condition = values
                .map((value, index) => (mask & (1 << index)) === 0 ? value : "-")
                .join(" ");
            if (!scoresByCondition.has(condition)) scoresByCondition.set(condition, []);
            scoresByCondition.get(condition).push(score);
        }
    }

    for (const scores of scoresByCondition.values()) {
        scores.sort((a, b) => a - b);
    }

    return query.map((entry) => {
        const values = entry.replace(/ and /g, " ").split(" ");
        const minimumScore = Number(values.pop());
        const scores = scoresByCondition.get(values.join(" ")) ?? [];

        let left = 0;
        let right = scores.length;
        while (left < right) {
            const middle = Math.floor((left + right) / 2);
            if (scores[middle] >= minimumScore) right = middle;
            else left = middle + 1;
        }
        return scores.length - left;
    });
}
