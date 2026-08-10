function solution(bridgeLength, weight, truckWeights) {
    const bridge = [];
    let bridgeHead = 0;
    let bridgeWeight = 0;
    let truckIndex = 0;
    let time = 1;

    while (truckIndex < truckWeights.length) {
        while (bridgeHead < bridge.length && bridge[bridgeHead].exitTime <= time) {
            bridgeWeight -= bridge[bridgeHead].weight;
            bridgeHead += 1;
        }

        const truckWeight = truckWeights[truckIndex];

        if (bridgeWeight + truckWeight <= weight) {
            bridge.push({ weight: truckWeight, exitTime: time + bridgeLength });
            bridgeWeight += truckWeight;
            truckIndex += 1;
            time += 1;
        } else {
            time = bridge[bridgeHead].exitTime;
        }
    }

    return bridge[bridge.length - 1].exitTime;
}
