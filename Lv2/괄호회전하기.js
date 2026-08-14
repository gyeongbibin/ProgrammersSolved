function solution(s) {
    if (s.length % 2 === 1) return 0;

    const pairs = {
        ")": "(",
        "]": "[",
        "}": "{",
    };
    let answer = 0;

    for (let offset = 0; offset < s.length; offset++) {
        const stack = [];
        let valid = true;

        for (let i = 0; i < s.length; i++) {
            const bracket = s[(offset + i) % s.length];

            if (bracket === "(" || bracket === "[" || bracket === "{") {
                stack.push(bracket);
            } else if (stack.pop() !== pairs[bracket]) {
                valid = false;
                break;
            }
        }

        if (valid && stack.length === 0) answer++;
    }

    return answer;
}
