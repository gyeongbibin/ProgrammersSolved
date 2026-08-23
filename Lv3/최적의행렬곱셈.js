function solution(matrixSizes) {
    const count = matrixSizes.length;
    const minimum = Array.from({ length: count }, () => Array(count).fill(0));

    for (let length = 2; length <= count; length++) {
        for (let start = 0; start + length <= count; start++) {
            const end = start + length - 1;
            minimum[start][end] = Infinity;

            for (let split = start; split < end; split++) {
                const multiplications = matrixSizes[start][0]
                    * matrixSizes[split][1]
                    * matrixSizes[end][1];
                minimum[start][end] = Math.min(
                    minimum[start][end],
                    minimum[start][split] + minimum[split + 1][end] + multiplications,
                );
            }
        }
    }

    return minimum[0][count - 1];
}
