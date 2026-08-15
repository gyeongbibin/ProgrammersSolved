function solution(msg) {
    const dictionary = new Map();
    for (let i = 0; i < 26; i++) {
        dictionary.set(String.fromCharCode(65 + i), i + 1);
    }

    const answer = [];
    let nextIndex = 27;
    let position = 0;

    while (position < msg.length) {
        let end = position + 1;
        while (end <= msg.length && dictionary.has(msg.slice(position, end))) end++;

        const word = msg.slice(position, end - 1);
        answer.push(dictionary.get(word));

        if (end <= msg.length) {
            dictionary.set(msg.slice(position, end), nextIndex++);
        }
        position = end - 1;
    }

    return answer;
}
