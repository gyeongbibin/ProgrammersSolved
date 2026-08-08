function solution(users, emoticons) {
    const discounts = [10, 20, 30, 40];
    let bestPlus = 0;
    let bestSales = 0;

    function dfs(idx, chosen) {
        if (idx === emoticons.length) {
            let plus = 0;
            let sales = 0;

            for (const [minDiscount, limit] of users) {
                let sum = 0;

                for (let i = 0; i < emoticons.length; i++) {
                    if (chosen[i] >= minDiscount) {
                        sum += emoticons[i] * (100 - chosen[i]) / 100;
                    }
                }

                if (sum >= limit) {
                    plus++;
                } else {
                    sales += sum;
                }
            }

            if (plus > bestPlus || (plus === bestPlus && sales > bestSales)) {
                bestPlus = plus;
                bestSales = sales;
            }
            return;
        }

        for (const d of discounts) {
            chosen.push(d);
            dfs(idx + 1, chosen);
            chosen.pop();
        }
    }

    dfs(0, []);
    return [bestPlus, bestSales];
}