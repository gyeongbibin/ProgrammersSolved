function solution(n, results) {
    const wins = Array.from({ length: n }, () => Array(n).fill(false));

    for (const [winner, loser] of results) {
        wins[winner - 1][loser - 1] = true;
    }

    for (let middle = 0; middle < n; middle++) {
        for (let winner = 0; winner < n; winner++) {
            if (!wins[winner][middle]) continue;

            for (let loser = 0; loser < n; loser++) {
                if (wins[middle][loser]) wins[winner][loser] = true;
            }
        }
    }

    let answer = 0;

    for (let player = 0; player < n; player++) {
        let known = true;

        for (let opponent = 0; opponent < n; opponent++) {
            if (player === opponent) continue;
            if (!wins[player][opponent] && !wins[opponent][player]) {
                known = false;
                break;
            }
        }

        if (known) answer += 1;
    }

    return answer;
}
