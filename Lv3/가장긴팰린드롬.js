function solution(s) {
    let longest = 1;

    function expand(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            longest = Math.max(longest, right - left + 1);
            left -= 1;
            right += 1;
        }
    }

    for (let center = 0; center < s.length; center++) {
        expand(center, center);
        expand(center, center + 1);
    }

    return longest;
}
