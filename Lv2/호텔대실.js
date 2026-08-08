function solution(bookTime) {
    const timeline = Array(24 * 60 + 11).fill(0);

    function toMinutes(time) {
        const [hour, minute] = time.split(':').map(Number);
        return hour * 60 + minute;
    }

    for (const [start, end] of bookTime) {
        timeline[toMinutes(start)] += 1;
        timeline[toMinutes(end) + 10] -= 1;
    }

    let rooms = 0;
    let answer = 0;

    for (const change of timeline) {
        rooms += change;
        answer = Math.max(answer, rooms);
    }

    return answer;
}
