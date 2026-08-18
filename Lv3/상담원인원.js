function solution(k, n, reqs) {
    const requestsByType = Array.from({ length: k }, () => []);
    for (const [start, duration, type] of reqs) {
        requestsByType[type - 1].push([start, duration]);
    }

    const maximumForOneType = n - k + 1;
    const waiting = Array.from(
        { length: k },
        () => Array(maximumForOneType + 1).fill(0),
    );

    for (let type = 0; type < k; type++) {
        for (let mentorCount = 1; mentorCount <= maximumForOneType; mentorCount++) {
            const finishes = Array(mentorCount).fill(0);

            for (const [start, duration] of requestsByType[type]) {
                let earliest = 0;
                for (let mentor = 1; mentor < mentorCount; mentor++) {
                    if (finishes[mentor] < finishes[earliest]) earliest = mentor;
                }

                const consultationStart = Math.max(start, finishes[earliest]);
                waiting[type][mentorCount] += consultationStart - start;
                finishes[earliest] = consultationStart + duration;
            }
        }
    }

    let allocation = Array(n + 1).fill(Infinity);
    allocation[0] = 0;

    for (let type = 0; type < k; type++) {
        const next = Array(n + 1).fill(Infinity);
        for (let used = 0; used <= n; used++) {
            if (allocation[used] === Infinity) continue;
            for (let mentorCount = 1; mentorCount <= maximumForOneType && used + mentorCount <= n; mentorCount++) {
                next[used + mentorCount] = Math.min(
                    next[used + mentorCount],
                    allocation[used] + waiting[type][mentorCount],
                );
            }
        }
        allocation = next;
    }

    return allocation[n];
}
