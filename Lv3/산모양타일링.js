function solution(n, tops) {
    const MOD = 10007;
    let twoStepsBack = 1;
    let oneStepBack = tops[0] === 1 ? 4 : 3;

    for (let index = 1; index < n; index++) {
        const multiplier = tops[index] === 1 ? 4 : 3;
        const current = (oneStepBack * multiplier - twoStepsBack + MOD) % MOD;
        twoStepsBack = oneStepBack;
        oneStepBack = current;
    }

    return oneStepBack;
}
