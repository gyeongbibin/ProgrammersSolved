function solution(n, weak, dist) {
    const permutations = [];
    const used = new Uint8Array(dist.length);

    function generate(order) {
        if (order.length === dist.length) {
            permutations.push([...order]);
            return;
        }

        for (let index = 0; index < dist.length; index++) {
            if (used[index]) continue;
            used[index] = 1;
            order.push(dist[index]);
            generate(order);
            order.pop();
            used[index] = 0;
        }
    }

    generate([]);

    const weakCount = weak.length;
    const extended = [...weak, ...weak.map((point) => point + n)];
    let minimumFriends = dist.length + 1;

    for (let start = 0; start < weakCount; start++) {
        for (const order of permutations) {
            let friends = 1;
            let coverage = extended[start] + order[0];

            for (let index = start; index < start + weakCount; index++) {
                if (extended[index] <= coverage) continue;

                friends += 1;
                if (friends > dist.length) break;
                coverage = extended[index] + order[friends - 1];
            }

            minimumFriends = Math.min(minimumFriends, friends);
        }
    }

    return minimumFriends > dist.length ? -1 : minimumFriends;
}
