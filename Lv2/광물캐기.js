function solution(picks, minerals) {
    const mineralIndex = { diamond: 0, iron: 1, stone: 2 };
    const fatigue = [
        [1, 1, 1],
        [5, 1, 1],
        [25, 5, 1],
    ];
    const available = Math.min(
        minerals.length,
        picks.reduce((sum, count) => sum + count, 0) * 5,
    );
    const groups = [];

    for (let start = 0; start < available; start += 5) {
        const counts = [0, 0, 0];

        for (let index = start; index < Math.min(start + 5, available); index++) {
            counts[mineralIndex[minerals[index]]] += 1;
        }

        groups.push(counts);
    }

    groups.sort((a, b) => {
        const aCost = a[0] * 25 + a[1] * 5 + a[2];
        const bCost = b[0] * 25 + b[1] * 5 + b[2];
        return bCost - aCost;
    });

    let answer = 0;
    let groupIndex = 0;

    for (let pick = 0; pick < picks.length; pick++) {
        for (let count = 0; count < picks[pick] && groupIndex < groups.length; count++) {
            const group = groups[groupIndex++];

            for (let mineral = 0; mineral < group.length; mineral++) {
                answer += group[mineral] * fatigue[pick][mineral];
            }
        }
    }

    return answer;
}
