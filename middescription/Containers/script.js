let one = document.querySelector(".one");
let two = document.querySelector(".two");
let three = document.querySelector(".three");

// Function to add animation end listener
function addAnimationEndListener(element) {
    const animationEndHandler = () => {
        element.style.display = "none";
        element.removeEventListener('animationend', animationEndHandler);
    };

    element.addEventListener('animationend', animationEndHandler, { once: true });
}

// Event listeners for showing/hiding container details
document.querySelector(".Array").addEventListener('mouseover', () => {
    document.querySelector(".array").style.display = "block";
    document.querySelector(".array").style.animation = "fade-in 500ms forwards";
});

document.querySelector(".Array").addEventListener('mouseout', () => {
    document.querySelector(".array").style.animation = "fade-out 500ms ease-in-out";
    addAnimationEndListener(document.querySelector(".array"));
});

document.querySelector(".Vector").addEventListener('mouseover', () => {
    document.querySelector(".vector").style.display = "block";
    document.querySelector(".vector").style.animation = "fade-in 500ms forwards";
});

document.querySelector(".Vector").addEventListener('mouseout', () => {
    document.querySelector(".vector").style.animation = "fade-out 500ms ease-in-out";
    addAnimationEndListener(document.querySelector(".vector"));
});

document.querySelector(".Stack").addEventListener('mouseover', () => {
    document.querySelector(".stack").style.display = "block";
    document.querySelector(".stack").style.animation = "fade-in 500ms forwards";
});

document.querySelector(".Stack").addEventListener('mouseout', () => {
    document.querySelector(".stack").style.animation = "fade-out 500ms ease-in-out";
    addAnimationEndListener(document.querySelector(".stack"));
});
document.querySelector(".Queue").addEventListener('mouseover', () => {
    document.querySelector(".queue").style.display = "block";
    document.querySelector(".queue").style.animation = "fade-in 500ms forwards";
});

document.querySelector(".Queue").addEventListener('mouseout', () => {
    document.querySelector(".queue").style.animation = "fade-out 500ms ease-in-out";
    addAnimationEndListener(document.querySelector(".queue"));
});
// Add similar event listeners for other STL containers
