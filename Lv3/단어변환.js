function solution(begin, target, words) {
    if (!words.includes(target)) return 0;

    function differsByOne(first, second) {
        let difference = 0;

        for (let index = 0; index < first.length; index++) {
            if (first[index] !== second[index]) difference += 1;
            if (difference > 1) return false;
        }

        return difference === 1;
    }

    const visited = Array(words.length).fill(false);
    const queue = [[begin, 0]];

    for (let head = 0; head < queue.length; head++) {
        const [current, steps] = queue[head];

        for (let index = 0; index < words.length; index++) {
            if (visited[index] || !differsByOne(current, words[index])) continue;
            if (words[index] === target) return steps + 1;

            visited[index] = true;
            queue.push([words[index], steps + 1]);
        }
    }

    return 0;
}
