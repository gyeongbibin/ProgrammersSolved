function solution(playTime, advTime, logs) {
    function toSeconds(time) {
        const [hour, minute, second] = time.split(":").map(Number);
        return hour * 3600 + minute * 60 + second;
    }

    function toTime(seconds) {
        const hour = Math.floor(seconds / 3600);
        const minute = Math.floor((seconds % 3600) / 60);
        const second = seconds % 60;
        return [hour, minute, second]
            .map((value) => String(value).padStart(2, "0"))
            .join(":");
    }

    const playSeconds = toSeconds(playTime);
    const advSeconds = toSeconds(advTime);
    const viewers = new Float64Array(playSeconds + 1);

    for (const log of logs) {
        const [start, end] = log.split("-").map(toSeconds);
        viewers[start]++;
        viewers[end]--;
    }

    for (let second = 1; second < playSeconds; second++) {
        viewers[second] += viewers[second - 1];
    }

    const accumulated = new Float64Array(playSeconds + 1);
    for (let second = 0; second < playSeconds; second++) {
        accumulated[second + 1] = accumulated[second] + viewers[second];
    }

    let bestStart = 0;
    let bestViewTime = accumulated[advSeconds];

    for (let start = 1; start + advSeconds <= playSeconds; start++) {
        const viewTime = accumulated[start + advSeconds] - accumulated[start];
        if (viewTime > bestViewTime) {
            bestViewTime = viewTime;
            bestStart = start;
        }
    }

    return toTime(bestStart);
}
