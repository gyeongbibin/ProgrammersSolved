function solution(m, musicinfos) {
    function normalize(melody) {
        return melody.replace(/[A-G]#/g, (note) => note[0].toLowerCase());
    }

    function toMinutes(time) {
        const [hour, minute] = time.split(":").map(Number);
        return hour * 60 + minute;
    }

    const remembered = normalize(m);
    let answer = "(None)";
    let longestDuration = -1;

    for (const musicInfo of musicinfos) {
        const [start, end, title, rawScore] = musicInfo.split(",");
        const duration = toMinutes(end) - toMinutes(start);
        const score = normalize(rawScore);
        const played = score.repeat(Math.ceil(duration / score.length)).slice(0, duration);

        if (played.includes(remembered) && duration > longestDuration) {
            answer = title;
            longestDuration = duration;
        }
    }

    return answer;
}
