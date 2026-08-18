function solution(a, b, g, s, w, t) {
    function canDeliver(time) {
        let gold = 0;
        let silver = 0;
        let total = 0;

        for (let city = 0; city < g.length; city++) {
            const roundTrip = t[city] * 2;
            let trips = Math.floor(time / roundTrip);
            if (time % roundTrip >= t[city]) trips++;

            const capacity = Math.min(g[city] + s[city], trips * w[city]);
            gold += Math.min(g[city], capacity);
            silver += Math.min(s[city], capacity);
            total += capacity;
        }

        return gold >= a && silver >= b && total >= a + b;
    }

    let left = 0;
    let right = 400000000000000;

    while (left < right) {
        const middle = Math.floor((left + right) / 2);
        if (canDeliver(middle)) right = middle;
        else left = middle + 1;
    }

    return left;
}
