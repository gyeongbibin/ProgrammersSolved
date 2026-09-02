function solution(word, pages) {
    const target = word.toLowerCase();

    const pageInfo = pages.map((page, index) => {
        const metaTags = page.match(/<meta\b[^>]*>/gi) || [];
        let url = '';

        for (const tag of metaTags) {
            if (!/property=["']og:url["']/i.test(tag)) continue;
            const content = tag.match(/content=["']([^"']+)["']/i);
            if (content) url = content[1];
        }

        const links = [];
        const linkPattern = /<a\s+href=["'](https:\/\/[^"']+)["']>/gi;
        let linkMatch;
        while ((linkMatch = linkPattern.exec(page)) !== null) links.push(linkMatch[1]);

        const bodyMatch = page.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
        const bodyText = (bodyMatch ? bodyMatch[1] : page).replace(/<[^>]*>/g, ' ');
        const words = bodyText.toLowerCase().match(/[a-z]+/g) || [];
        const basicScore = words.filter((value) => value === target).length;

        return { index, url, links, basicScore };
    });

    const urlToIndex = new Map(pageInfo.map(({ url, index }) => [url, index]));
    const scores = pageInfo.map(({ basicScore }) => basicScore);

    for (const { links, basicScore } of pageInfo) {
        if (links.length === 0) continue;
        const distributedScore = basicScore / links.length;

        for (const link of links) {
            const linkedIndex = urlToIndex.get(link);
            if (linkedIndex !== undefined) scores[linkedIndex] += distributedScore;
        }
    }

    let bestIndex = 0;
    for (let index = 1; index < scores.length; index++) {
        if (scores[index] > scores[bestIndex]) bestIndex = index;
    }

    return bestIndex;
}
