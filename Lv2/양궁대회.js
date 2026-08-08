function solution(n, info) {
    let bestDiff = -1;
    let best = [-1];

    function isBetter(a, b) {
        for (let i = 10; i >= 0; i--) {
            if (a[i] !== b[i]) return a[i] > b[i];
        }
        return false;
    }

    function dfs(idx, arrows, lion) {
        if (idx === 11 || arrows === 0) {
            const result = [...lion];
            if (idx === 11 && arrows > 0) result[10] += arrows;

            let lionScore = 0;
            let apeachScore = 0;

            for (let i = 0; i < 11; i++) {
                if (result[i] === 0 && info[i] === 0) continue;
                if (result[i] > info[i]) lionScore += 10 - i;
                else apeachScore += 10 - i;
            }

            const diff = lionScore - apeachScore;
            if (diff <= 0) return;

            if (diff > bestDiff || (diff === bestDiff && isBetter(result, best))) {
                bestDiff = diff;
                best = result;
            }
            return;
        }

        const need = info[idx] + 1;

        if (arrows >= need) {
            lion[idx] = need;
            dfs(idx + 1, arrows - need, lion);
            lion[idx] = 0;
        }

        dfs(idx + 1, arrows, lion);
    }

    dfs(0, n, Array(11).fill(0));
    return best;
}