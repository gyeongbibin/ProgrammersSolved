function solution(queue1, queue2) {
    const arr = [...queue1, ...queue2];
    const total = arr.reduce((a, b) => a + b, 0);
    if (total % 2 !== 0) return -1;

    const target = total / 2;
    let sum1 = queue1.reduce((a, b) => a + b, 0);
    let i = 0;
    let j = queue1.length;
    let count = 0;
    const limit = arr.length * 3;

    while (count <= limit) {
        if (sum1 === target) return count;
        if (sum1 < target) {
            if (j >= arr.length) return -1;
            sum1 += arr[j++];
        } else {
            if (i >= arr.length) return -1;
            sum1 -= arr[i++];
        }
        count++;
    }

    return -1;
}