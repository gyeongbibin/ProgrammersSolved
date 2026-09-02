function solution(land) {
    let previous = [...land[0]];

    for (let row = 1; row < land.length; row++) {
        const current = Array(4).fill(0);

        for (let column = 0; column < 4; column++) {
            let bestPrevious = 0;
            for (let previousColumn = 0; previousColumn < 4; previousColumn++) {
                if (previousColumn !== column) {
                    bestPrevious = Math.max(bestPrevious, previous[previousColumn]);
                }
            }
            current[column] = land[row][column] + bestPrevious;
        }

        previous = current;
    }

    return Math.max(...previous);
}
