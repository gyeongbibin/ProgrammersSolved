function solution(dice) {
    const diceCount = dice.length;
    const selectedCount = diceCount / 2;
    const fullMask = (1 << diceCount) - 1;
    let bestWins = -1;
    let bestMask = 0;

    function makeSums(mask) {
        let sums = [0];

        for (let index = 0; index < diceCount; index++) {
            if ((mask & (1 << index)) === 0) continue;
            const nextSums = [];

            for (const sum of sums) {
                for (const face of dice[index]) nextSums.push(sum + face);
            }
            sums = nextSums;
        }

        return sums;
    }

    function lowerBound(sortedValues, target) {
        let left = 0;
        let right = sortedValues.length;

        while (left < right) {
            const middle = Math.floor((left + right) / 2);
            if (sortedValues[middle] < target) left = middle + 1;
            else right = middle;
        }

        return left;
    }

    function countWins(leftSums, rightSums) {
        rightSums.sort((a, b) => a - b);
        let wins = 0;
        for (const sum of leftSums) wins += lowerBound(rightSums, sum);
        return wins;
    }

    for (let mask = 1; mask <= fullMask; mask++) {
        if ((mask & 1) === 0) continue;

        let bitCount = 0;
        for (let bits = mask; bits > 0; bits &= bits - 1) bitCount++;
        if (bitCount !== selectedCount) continue;

        const complement = fullMask ^ mask;
        const selectedSums = makeSums(mask);
        const complementSums = makeSums(complement);
        const selectedWins = countWins(selectedSums, [...complementSums]);
        const complementWins = countWins(complementSums, [...selectedSums]);

        if (selectedWins > bestWins) {
            bestWins = selectedWins;
            bestMask = mask;
        }
        if (complementWins > bestWins) {
            bestWins = complementWins;
            bestMask = complement;
        }
    }

    const answer = [];
    for (let index = 0; index < diceCount; index++) {
        if (bestMask & (1 << index)) answer.push(index + 1);
    }
    return answer;
}
