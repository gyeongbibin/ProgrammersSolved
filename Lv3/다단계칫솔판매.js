function solution(enroll, referral, seller, amount) {
    const indexByName = new Map(enroll.map((name, index) => [name, index]));
    const parent = referral.map((name) => name === "-" ? -1 : indexByName.get(name));
    const profit = Array(enroll.length).fill(0);

    for (let saleIndex = 0; saleIndex < seller.length; saleIndex++) {
        let member = indexByName.get(seller[saleIndex]);
        let income = amount[saleIndex] * 100;

        while (member !== -1 && income > 0) {
            const commission = Math.floor(income / 10);
            profit[member] += income - commission;
            member = parent[member];
            income = commission;
        }
    }

    return profit;
}
