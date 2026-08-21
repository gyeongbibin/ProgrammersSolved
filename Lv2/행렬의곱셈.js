function solution(arr1, arr2) {
    const rows = arr1.length;
    const columns = arr2[0].length;
    const commonLength = arr2.length;
    const result = Array.from({ length: rows }, () => Array(columns).fill(0));

    for (let row = 0; row < rows; row++) {
        for (let common = 0; common < commonLength; common++) {
            for (let column = 0; column < columns; column++) {
                result[row][column] += arr1[row][common] * arr2[common][column];
            }
        }
    }

    return result;
}
