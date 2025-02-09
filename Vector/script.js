class Vector {
    constructor() {
        this.elements = [];
        this.container = document.getElementById('vectorContainer');
        this.sizeDisplay = document.getElementById('currentSize');
    }

    generateRandom(size) {
        this.elements = Array.from(
            { length: size }, 
            () => Math.floor(Math.random() * 100)
        );
        this.updateDisplay();
    }

    insert(index, value) {
        if (index >= 0 && index <= this.elements.length) {
            this.elements.splice(index, 0, value);
            this.updateDisplay();
            this.highlightElement(index);
            return true;
        }
        return false;
    }

    delete(index) {
        if (index >= 0 && index < this.elements.length) {
            this.elements.splice(index, 1);
            this.updateDisplay();
            return true;
        }
        return false;
    }

    replace(index, value) {
        if (index >= 0 && index < this.elements.length) {
            this.elements[index] = value;
            this.updateDisplay();
            this.highlightElement(index);
            return true;
        }
        return false;
    }

    reverse() {
        this.elements.reverse();
        this.updateDisplay();
    }

    updateDisplay() {
        this.container.innerHTML = '';
        this.elements.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'vector-element fade-in';
            element.innerHTML = `
                <div class="vector-element-index">${index}</div>
                ${value}
            `;
            this.container.appendChild(element);
        });
        this.sizeDisplay.textContent = this.elements.length;
    }

    highlightElement(index) {
        const elements = this.container.getElementsByClassName('vector-element');
        if (elements[index]) {
            elements[index].classList.add('highlight');
            setTimeout(() => {
                elements[index].classList.remove('highlight');
            }, 1500);
        }
    }
}

// Initialize vector
const vector = new Vector();

// UI Functions
function generateVector() {
    const size = parseInt(document.getElementById('vectorSize').value);
    if (size > 0) {
        vector.generateRandom(size);
    } else {
        alert('Please enter a valid size (greater than 0)');
    }
}

function insertElement() {
    const index = parseInt(document.getElementById('insertIndex').value);
    const value = parseInt(document.getElementById('insertValue').value);
    if (!isNaN(index) && !isNaN(value)) {
        if (!vector.insert(index, value)) {
            alert('Invalid index for insertion');
        }
    } else {
        alert('Please enter valid index and value');
    }
}

function deleteElement() {
    const index = parseInt(document.getElementById('deleteIndex').value);
    if (!isNaN(index)) {
        if (!vector.delete(index)) {
            alert('Invalid index for deletion');
        }
    } else {
        alert('Please enter a valid index');
    }
}

function replaceElement() {
    const index = parseInt(document.getElementById('replaceIndex').value);
    const value = parseInt(document.getElementById('replaceValue').value);
    if (!isNaN(index) && !isNaN(value)) {
        if (!vector.replace(index, value)) {
            alert('Invalid index for replacement');
        }
    } else {
        alert('Please enter valid index and value');
    }
}

function reverseVector() {
    vector.reverse();
}

// Add error handling for all inputs
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        }
    });
});