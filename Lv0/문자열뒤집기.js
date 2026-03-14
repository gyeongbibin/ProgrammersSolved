function solution(my_string) {
    let answer = '';
    const arr = my_string.split("");
    const arrReverse = arr.reverse();
    answer = arrReverse.join("");
    return answer;
}