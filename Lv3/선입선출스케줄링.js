function solution(n, cores) {
    if (n <= cores.length) return n;

    function completedJobs(time) {
        let completed = cores.length;
        for (const core of cores) {
            completed += Math.floor(time / core);
        }
        return completed;
    }

    let low = 1;
    let high = Math.max(...cores) * n;

    while (low < high) {
        const middle = Math.floor((low + high) / 2);
        if (completedJobs(middle) >= n) high = middle;
        else low = middle + 1;
    }

    const finishingTime = low;
    let assigned = completedJobs(finishingTime - 1);

    for (let index = 0; index < cores.length; index++) {
        if (finishingTime % cores[index] !== 0) continue;
        assigned += 1;
        if (assigned === n) return index + 1;
    }
}
