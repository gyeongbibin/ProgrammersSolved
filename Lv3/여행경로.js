function solution(tickets) {
    const routes = new Map();

    for (const [from, to] of tickets) {
        if (!routes.has(from)) routes.set(from, []);
        routes.get(from).push(to);
    }

    for (const destinations of routes.values()) {
        destinations.sort((a, b) => b.localeCompare(a));
    }

    const stack = ['ICN'];
    const path = [];

    while (stack.length > 0) {
        const airport = stack[stack.length - 1];
        const destinations = routes.get(airport);

        if (destinations && destinations.length > 0) {
            stack.push(destinations.pop());
        } else {
            path.push(stack.pop());
        }
    }

    return path.reverse();
}
