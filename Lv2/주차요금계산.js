function solution(fees, records) {
    const [baseTime, baseFee, unitTime, unitFee] = fees;
    const inMap = new Map();
    const totalMap = new Map();

    function toMin(time) {
        const [h, m] = time.split(':').map(Number);
        return h * 60 + m;
    }

    for (const record of records) {
        const [time, car, type] = record.split(' ');
        const min = toMin(time);

        if (type === 'IN') {
            inMap.set(car, min);
        } else {
            const inTime = inMap.get(car);
            inMap.delete(car);
            totalMap.set(car, (totalMap.get(car) || 0) + (min - inTime));
        }
    }

    const endTime = toMin('23:59');

    for (const [car, inTime] of inMap) {
        totalMap.set(car, (totalMap.get(car) || 0) + (endTime - inTime));
    }

    return [...totalMap.keys()]
        .sort()
        .map(car => {
            const time = totalMap.get(car);
            if (time <= baseTime) return baseFee;
            return baseFee + Math.ceil((time - baseTime) / unitTime) * unitFee;
        });
}