function solution(A, B) {
    const firstTeam = A.slice().sort((a, b) => a - b);
    const secondTeam = B.slice().sort((a, b) => a - b);
    let firstIndex = 0;
    let score = 0;

    for (const number of secondTeam) {
        if (number > firstTeam[firstIndex]) {
            firstIndex++;
            score++;
        }
    }

    return score;
}
