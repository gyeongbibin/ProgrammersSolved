function solution(n, t, m, p) {
    let sequence = '';
    let number = 0;

    while (sequence.length < t * m) {
        sequence += number.toString(n).toUpperCase();
        number++;
    }

    let answer = '';
    for (let turn = p - 1; answer.length < t; turn += m) {
        answer += sequence[turn];
    }

    return answer;
}
