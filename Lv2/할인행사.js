function solution(want, number, discount) {
    const required = new Map(want.map((product, index) => [product, number[index]]));
    const counts = new Map();
    let answer = 0;

    for (let day = 0; day < discount.length; day++) {
        const product = discount[day];
        counts.set(product, (counts.get(product) ?? 0) + 1);

        if (day >= 10) {
            const expired = discount[day - 10];
            counts.set(expired, counts.get(expired) - 1);
        }

        if (day >= 9) {
            const matches = [...required].every(([wanted, quantity]) => counts.get(wanted) === quantity);
            if (matches) answer++;
        }
    }

    return answer;
}
