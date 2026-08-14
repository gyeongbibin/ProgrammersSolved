function solution(gems) {
    const kindCount = new Set(gems).size;
    const counts = new Map();
    let left = 0;
    let bestLeft = 0;
    let bestRight = gems.length - 1;

    for (let right = 0; right < gems.length; right++) {
        counts.set(gems[right], (counts.get(gems[right]) || 0) + 1);

        while (counts.size === kindCount) {
            if (right - left < bestRight - bestLeft) {
                bestLeft = left;
                bestRight = right;
            }

            const leftGem = gems[left++];
            const nextCount = counts.get(leftGem) - 1;
            if (nextCount === 0) {
                counts.delete(leftGem);
            } else {
                counts.set(leftGem, nextCount);
            }
        }
    }

    return [bestLeft + 1, bestRight + 1];
}
