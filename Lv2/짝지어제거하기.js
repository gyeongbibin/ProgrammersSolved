function solution(s) {
    const stack = [];

    for (const character of s) {
        if (stack[stack.length - 1] === character) stack.pop();
        else stack.push(character);
    }

    return stack.length === 0 ? 1 : 0;
}
