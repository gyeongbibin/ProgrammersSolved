function solution(k, dungeons) {
    let answer = 0;

    function explore(fatigue, visited, count) {
        answer = Math.max(answer, count);

        for (let index = 0; index < dungeons.length; index++) {
            const bit = 1 << index;
            if ((visited & bit) !== 0) continue;

            const [required, cost] = dungeons[index];
            if (fatigue < required) continue;
            explore(fatigue - cost, visited | bit, count + 1);
        }
    }

    explore(k, 0, 0);
    return answer;
}
