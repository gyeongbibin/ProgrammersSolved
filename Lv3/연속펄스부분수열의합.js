function solution(sequence) {
    let maximumEndingHere = 0;
    let minimumEndingHere = 0;
    let answer = 0;

    for (let i = 0; i < sequence.length; i++) {
        const pulsed = sequence[i] * (i % 2 === 0 ? 1 : -1);
        maximumEndingHere = Math.max(pulsed, maximumEndingHere + pulsed);
        minimumEndingHere = Math.min(pulsed, minimumEndingHere + pulsed);
        answer = Math.max(answer, maximumEndingHere, -minimumEndingHere);
    }

    return answer;
}
