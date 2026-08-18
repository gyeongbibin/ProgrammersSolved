function solution(lines) {
    function parseTime(time) {
        const [hour, minute, secondPart] = time.split(":");
        const [second, millisecond = ""] = secondPart.split(".");
        return Number(hour) * 3600000
            + Number(minute) * 60000
            + Number(second) * 1000
            + Number(millisecond.padEnd(3, "0"));
    }

    function parseDuration(duration) {
        const [second, millisecond = ""] = duration.slice(0, -1).split(".");
        return Number(second) * 1000 + Number(millisecond.padEnd(3, "0"));
    }

    const intervals = lines.map((line) => {
        const [, endTime, duration] = line.split(" ");
        const end = parseTime(endTime);
        return [end - parseDuration(duration) + 1, end];
    });
    const candidates = intervals.flatMap(([start, end]) => [start, end]);
    let answer = 0;

    for (const windowStart of candidates) {
        const windowEnd = windowStart + 999;
        let count = 0;
        for (const [start, end] of intervals) {
            if (start <= windowEnd && end >= windowStart) count++;
        }
        answer = Math.max(answer, count);
    }

    return answer;
}
