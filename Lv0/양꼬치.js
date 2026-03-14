function solution(n, k) {
    var answer = 0;
    const free = 2000*Math.floor(n/10);
    const sum = n*12000 + k*2000-free;
    answer = sum;
    return answer;
}