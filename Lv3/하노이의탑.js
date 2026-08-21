function solution(n) {
    const moves = [];

    function move(disks, from, via, to) {
        if (disks === 0) return;

        move(disks - 1, from, to, via);
        moves.push([from, to]);
        move(disks - 1, via, from, to);
    }

    move(n, 1, 2, 3);
    return moves;
}
