function solution(p) {
    function transform(value) {
        if (value === "") return "";

        let balance = 0;
        let split = 0;
        do {
            balance += value[split] === "(" ? 1 : -1;
            split++;
        } while (balance !== 0);

        const u = value.slice(0, split);
        const v = value.slice(split);
        let depth = 0;
        let correct = true;

        for (const bracket of u) {
            depth += bracket === "(" ? 1 : -1;
            if (depth < 0) {
                correct = false;
                break;
            }
        }

        if (correct) return u + transform(v);

        const reversed = [...u.slice(1, -1)]
            .map((bracket) => bracket === "(" ? ")" : "(")
            .join("");
        return `(${transform(v)})${reversed}`;
    }

    return transform(p);
}
