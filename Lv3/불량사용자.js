function solution(user_id, banned_id) {
    const used = Array(user_id.length).fill(false);
    const sanctionedSets = new Set();

    function matches(user, pattern) {
        if (user.length !== pattern.length) return false;

        for (let i = 0; i < user.length; i++) {
            if (pattern[i] !== "*" && pattern[i] !== user[i]) return false;
        }
        return true;
    }

    function search(bannedIndex) {
        if (bannedIndex === banned_id.length) {
            const selected = [];
            for (let i = 0; i < used.length; i++) {
                if (used[i]) selected.push(i);
            }
            sanctionedSets.add(selected.join(","));
            return;
        }

        for (let userIndex = 0; userIndex < user_id.length; userIndex++) {
            if (used[userIndex] || !matches(user_id[userIndex], banned_id[bannedIndex])) continue;

            used[userIndex] = true;
            search(bannedIndex + 1);
            used[userIndex] = false;
        }
    }

    search(0);
    return sanctionedSets.size;
}
