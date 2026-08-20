function solution(order) {
    const auxiliaryBelt = [];
    let nextBox = 1;
    let loaded = 0;

    for (const requestedBox of order) {
        while (nextBox <= order.length && nextBox <= requestedBox) {
            auxiliaryBelt.push(nextBox++);
        }

        if (auxiliaryBelt[auxiliaryBelt.length - 1] !== requestedBox) break;

        auxiliaryBelt.pop();
        loaded += 1;
    }

    return loaded;
}
