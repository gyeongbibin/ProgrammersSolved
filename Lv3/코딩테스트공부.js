function solution(alp, cop, problems) {
    const targetAlp = Math.max(...problems.map((problem) => problem[0]));
    const targetCop = Math.max(...problems.map((problem) => problem[1]));
    const startAlp = Math.min(alp, targetAlp);
    const startCop = Math.min(cop, targetCop);
    const time = Array.from({ length: targetAlp + 1 }, () => Array(targetCop + 1).fill(Infinity));
    time[startAlp][startCop] = 0;

    for (let currentAlp = startAlp; currentAlp <= targetAlp; currentAlp++) {
        for (let currentCop = startCop; currentCop <= targetCop; currentCop++) {
            const currentTime = time[currentAlp][currentCop];

            if (currentAlp < targetAlp) {
                time[currentAlp + 1][currentCop] = Math.min(time[currentAlp + 1][currentCop], currentTime + 1);
            }
            if (currentCop < targetCop) {
                time[currentAlp][currentCop + 1] = Math.min(time[currentAlp][currentCop + 1], currentTime + 1);
            }

            for (const [requiredAlp, requiredCop, rewardAlp, rewardCop, cost] of problems) {
                if (currentAlp < requiredAlp || currentCop < requiredCop) continue;

                const nextAlp = Math.min(targetAlp, currentAlp + rewardAlp);
                const nextCop = Math.min(targetCop, currentCop + rewardCop);
                time[nextAlp][nextCop] = Math.min(time[nextAlp][nextCop], currentTime + cost);
            }
        }
    }

    return time[targetAlp][targetCop];
}
