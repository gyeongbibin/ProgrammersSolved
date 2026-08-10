function solution(citations) {
    citations.sort((a, b) => b - a);

    let answer = 0;

    for (let index = 0; index < citations.length; index++) {
        const paperCount = index + 1;
        if (citations[index] < paperCount) break;
        answer = paperCount;
    }

    return answer;
}
