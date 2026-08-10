function solution(priorities, location) {
    const executionOrder = [...priorities].sort((a, b) => b - a);
    const queue = priorities.map((priority, index) => ({ priority, index }));
    let executed = 0;

    for (let head = 0; head < queue.length; head++) {
        const process = queue[head];

        if (process.priority !== executionOrder[executed]) {
            queue.push(process);
            continue;
        }

        executed += 1;
        if (process.index === location) return executed;
    }
}
