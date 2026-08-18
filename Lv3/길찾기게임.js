function solution(nodeinfo) {
    const nodes = nodeinfo
        .map(([x, y], index) => ({ x, y, id: index + 1, left: null, right: null }))
        .sort((a, b) => b.y - a.y || a.x - b.x);
    const root = nodes[0];

    for (let index = 1; index < nodes.length; index++) {
        const node = nodes[index];
        let current = root;

        while (true) {
            if (node.x < current.x) {
                if (current.left === null) {
                    current.left = node;
                    break;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = node;
                    break;
                }
                current = current.right;
            }
        }
    }

    const preorder = [];
    const preorderStack = [root];
    while (preorderStack.length > 0) {
        const node = preorderStack.pop();
        preorder.push(node.id);
        if (node.right !== null) preorderStack.push(node.right);
        if (node.left !== null) preorderStack.push(node.left);
    }

    const postorder = [];
    const postorderStack = [[root, false]];
    while (postorderStack.length > 0) {
        const [node, visited] = postorderStack.pop();
        if (visited) {
            postorder.push(node.id);
            continue;
        }
        postorderStack.push([node, true]);
        if (node.right !== null) postorderStack.push([node.right, false]);
        if (node.left !== null) postorderStack.push([node.left, false]);
    }

    return [preorder, postorder];
}
