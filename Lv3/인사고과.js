function solution(scores) {
    const [targetFirst, targetSecond] = scores[0];
    const targetSum = targetFirst + targetSecond;

    for (let i = 1; i < scores.length; i++) {
        if (scores[i][0] > targetFirst && scores[i][1] > targetSecond) return -1;
    }

    const sorted = scores.slice().sort((a, b) =>
        b[0] - a[0] || a[1] - b[1]
    );
    let maximumSecond = -1;
    let rank = 1;

    for (const [first, second] of sorted) {
        if (second < maximumSecond) continue;
        if (first + second > targetSum) rank++;
        maximumSecond = Math.max(maximumSecond, second);
    }

    return rank;
}
