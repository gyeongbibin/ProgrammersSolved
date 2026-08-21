function solution(a) {
    const counts = new Int32Array(a.length);
    for (const number of a) counts[number] += 1;

    let longest = 0;

    for (let common = 0; common < counts.length; common++) {
        if (counts[common] * 2 <= longest) continue;

        let pairs = 0;
        let index = 0;

        while (index < a.length - 1) {
            const includesCommon = a[index] === common || a[index + 1] === common;
            const hasDifferentValues = a[index] !== a[index + 1];

            if (includesCommon && hasDifferentValues) {
                pairs += 1;
                index += 2;
            } else {
                index += 1;
            }
        }

        longest = Math.max(longest, pairs * 2);
    }

    return longest;
}
