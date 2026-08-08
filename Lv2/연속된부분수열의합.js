function solution(sequence, k) {
    let left = 0;
    let sum = 0;
    let bestStart = 0;
    let bestEnd = sequence.length - 1;
    let bestLength = Infinity;

    for (let right = 0; right < sequence.length; right++) {
        sum += sequence[right];

        while (sum > k && left <= right) {
            sum -= sequence[left++];
        }

        if (sum === k) {
            const length = right - left + 1;

            if (length < bestLength || (length === bestLength && left < bestStart)) {
                bestStart = left;
                bestEnd = right;
                bestLength = length;
            }
        }
    }

    return [bestStart, bestEnd];
}
