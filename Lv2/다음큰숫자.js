function solution(n) {
    const oneCount = n.toString(2).replaceAll("0", "").length;
    let candidate = n + 1;

    while (candidate.toString(2).replaceAll("0", "").length !== oneCount) {
        candidate += 1;
    }

    return candidate;
}
