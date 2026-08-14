function solution(orders, course) {
    const answer = [];

    for (const size of course) {
        const counts = new Map();

        for (const order of orders) {
            const menus = [...order].sort();
            if (menus.length < size) continue;

            function combine(start, selected) {
                if (selected.length === size) {
                    const menu = selected.join("");
                    counts.set(menu, (counts.get(menu) || 0) + 1);
                    return;
                }

                for (let i = start; i <= menus.length - (size - selected.length); i++) {
                    selected.push(menus[i]);
                    combine(i + 1, selected);
                    selected.pop();
                }
            }

            combine(0, []);
        }

        let maximum = 0;
        for (const count of counts.values()) {
            if (count >= 2) maximum = Math.max(maximum, count);
        }

        if (maximum < 2) continue;
        for (const [menu, count] of counts) {
            if (count === maximum) answer.push(menu);
        }
    }

    return answer.sort();
}
