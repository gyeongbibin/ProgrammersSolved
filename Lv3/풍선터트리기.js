function solution(a) {
    const rightMinimum = Array(a.length).fill(Infinity);
    let minimum = Infinity;

    for (let i = a.length - 1; i >= 0; i--) {
        rightMinimum[i] = minimum;
        minimum = Math.min(minimum, a[i]);
    }

    let leftMinimum = Infinity;
    let answer = 0;

    for (let i = 0; i < a.length; i++) {
        if (a[i] < leftMinimum || a[i] < rightMinimum[i]) answer++;
        leftMinimum = Math.min(leftMinimum, a[i]);
    }

    return answer;
}
