function solution(cacheSize, cities) {
    if (cacheSize === 0) return cities.length * 5;

    const cache = new Map();
    let executionTime = 0;

    for (const city of cities) {
        const key = city.toLowerCase();

        if (cache.has(key)) {
            executionTime += 1;
            cache.delete(key);
        } else {
            executionTime += 5;
            if (cache.size === cacheSize) {
                const leastRecentlyUsed = cache.keys().next().value;
                cache.delete(leastRecentlyUsed);
            }
        }

        cache.set(key, true);
    }

    return executionTime;
}
