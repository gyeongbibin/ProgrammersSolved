function solution(n, t, m, timetable) {
    function toMinutes(time) {
        const [hour, minute] = time.split(":").map(Number);
        return hour * 60 + minute;
    }

    function toTime(minutes) {
        const hour = Math.floor(minutes / 60);
        const minute = minutes % 60;
        return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    }

    const arrivals = timetable.map(toMinutes).sort((a, b) => a - b);
    let crewIndex = 0;
    let answer = 0;

    for (let bus = 0; bus < n; bus++) {
        const departure = 9 * 60 + bus * t;
        let boarded = 0;

        while (crewIndex < arrivals.length && arrivals[crewIndex] <= departure && boarded < m) {
            crewIndex++;
            boarded++;
        }

        if (bus === n - 1) {
            answer = boarded < m ? departure : arrivals[crewIndex - 1] - 1;
        }
    }

    return toTime(answer);
}
