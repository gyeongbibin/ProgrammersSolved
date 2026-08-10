function solution(progresses, speeds) {
    const days = progresses.map((progress, index) => (
        Math.ceil((100 - progress) / speeds[index])
    ));
    const answer = [];
    let releaseDay = days[0];
    let count = 1;

    for (let index = 1; index < days.length; index++) {
        if (days[index] <= releaseDay) {
            count += 1;
            continue;
        }

        answer.push(count);
        releaseDay = days[index];
        count = 1;
    }

    answer.push(count);
    return answer;
}
