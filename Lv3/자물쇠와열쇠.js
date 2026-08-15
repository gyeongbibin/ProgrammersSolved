function solution(key, lock) {
    const keySize = key.length;
    const lockSize = lock.length;

    function rotate(matrix) {
        return matrix.map((_, row) =>
            matrix.map((_, col) => matrix[keySize - 1 - col][row])
        );
    }

    function canOpen(rotatedKey, rowOffset, colOffset) {
        for (let row = 0; row < lockSize; row++) {
            for (let col = 0; col < lockSize; col++) {
                const keyRow = row - rowOffset;
                const keyCol = col - colOffset;
                const keyValue = keyRow >= 0 && keyRow < keySize && keyCol >= 0 && keyCol < keySize
                    ? rotatedKey[keyRow][keyCol]
                    : 0;

                if (lock[row][col] + keyValue !== 1) return false;
            }
        }
        return true;
    }

    let rotatedKey = key;
    for (let rotation = 0; rotation < 4; rotation++) {
        for (let rowOffset = -keySize + 1; rowOffset < lockSize; rowOffset++) {
            for (let colOffset = -keySize + 1; colOffset < lockSize; colOffset++) {
                if (canOpen(rotatedKey, rowOffset, colOffset)) return true;
            }
        }
        rotatedKey = rotate(rotatedKey);
    }

    return false;
}
