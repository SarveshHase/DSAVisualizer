let callCount = 0;
let treeData = null;

function loadSampleFunction() {
    const sampleFunctions = {
        fibonacci: "function f(n) { if (n <= 1) return 1; return f(n-1) + f(n-2); }",
        factorial: "function f(n) { if (n <= 1) return 1; return n * f(n-1); }"
    };
    const selectedSample = document.getElementById("sampleFunctions").value;
    const functionInput = document.getElementById('functionInput');
    
    if (sampleFunctions[selectedSample]) {
        functionInput.value = sampleFunctions[selectedSample];
    } else {
        functionInput.value = ''; // Clear for custom input
    }
}

async function startVisualization() {
    const functionInput = document.getElementById('functionInput').value;
    const inputValue = parseInt(document.getElementById('inputValue').value, 10);
    
    if (!functionInput || isNaN(inputValue)) {
        alert('Please enter both a valid function and input value.');
        return;
    }

    callCount = 0;
    treeData = { value: inputValue, children: [] };
    document.getElementById('treeContainer').innerHTML = '';
    document.getElementById('callCount').textContent = '';
    document.getElementById('finalResult').textContent = '';

    try {
        const recursiveFunc = new Function('return ' + functionInput)();
        const wrappedFunc = wrapFunction(recursiveFunc, functionInput);  // Pass the function string for detection
        const result = await wrappedFunc(inputValue, treeData);
        
        renderTree(treeData);
        document.getElementById('finalResult').textContent = `Final Result: ${result}`;
    } catch (error) {
        console.error('Error in visualization:', error);
        alert('An error occurred during visualization. Please check your function.');
    }
}

function wrapFunction(func, funcString) {
    // Determine if it's a single- or double-recursive function
    const isDoubleRecursion = funcString.includes('f(n-2)');

    return async function wrapped(n, node) {
        callCount++;
        updateCallCount();

        // Highlight current node
        highlightNode(node);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const result = await func(n);

        if (n > 1) {
            if (isDoubleRecursion) {
                // Double recursive call (like Fibonacci)
                const leftChild = { value: n - 1, children: [] };
                const rightChild = { value: n - 2, children: [] };
                node.children.push(leftChild, rightChild);

                // Recursive calls for both left and right branches
                await wrapped(n - 1, leftChild);
                await wrapped(n - 2, rightChild);
            } else {
                // Single recursive call (like Factorial)
                const childNode = { value: n - 1, children: [] };
                node.children.push(childNode);

                // Recursive call for the next step
                await wrapped(n - 1, childNode);
            }
        }

        updateNodeContent(node, result); // Update the node with the result
        return result;
    };
}

function renderTree(node) {
    const treeContainer = document.getElementById('treeContainer');
    treeContainer.innerHTML = '';
    treeContainer.appendChild(createNodeElement(node));
}

function createNodeElement(node) {
    const nodeElement = document.createElement('div');
    nodeElement.className = 'tree-node';
    // Display the value being passed to the function, and if available, display the result
    nodeElement.innerHTML = `
        <div class="node-content">f(${node.value})${node.result !== undefined ? ` = ${node.result}` : ''}</div>
        <div class="node-children"></div>
    `;

    const childrenContainer = nodeElement.querySelector('.node-children');
    for (const child of node.children) {
        childrenContainer.appendChild(createNodeElement(child));
    }

    return nodeElement;
}

function updateNodeContent(node, result) {
    node.result = result; // Store the returned value in the node
    renderTree(treeData); // Re-render the tree with updated node content
}

function highlightNode(node) {
    renderTree(treeData);
    const nodeElements = document.querySelectorAll('.node-content');
    for (const element of nodeElements) {
        if (element.textContent.startsWith(`f(${node.value})`)) {
            element.style.backgroundColor = '#00dfc4';
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.backgroundColor = '';
                element.style.transform = '';
            }, 1000);
            break;
        }
    }
}

function updateCallCount() {
    document.getElementById('callCount').textContent = `Function Calls: ${callCount}`;
}
