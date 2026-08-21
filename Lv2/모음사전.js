function solution(word) {
    const vowels = "AEIOU";
    const weights = [781, 156, 31, 6, 1];
    let order = 0;

    for (let index = 0; index < word.length; index++) {
        order += vowels.indexOf(word[index]) * weights[index] + 1;
    }

    return order;
}
