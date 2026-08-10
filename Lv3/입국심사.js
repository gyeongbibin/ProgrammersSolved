function solution(n, times) {
    const people = BigInt(n);
    const inspectionTimes = times.map(BigInt);
    let left = 1n;
    let right = BigInt(Math.min(...times)) * people;

    while (left < right) {
        const mid = (left + right) / 2n;
        let processed = 0n;

        for (const time of inspectionTimes) {
            processed += mid / time;
            if (processed >= people) break;
        }

        if (processed >= people) {
            right = mid;
        } else {
            left = mid + 1n;
        }
    }

    return Number(left);
}
