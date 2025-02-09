let one = document.querySelector(".one");
let two = document.querySelector(".two");
let three = document.querySelector(".three");
function addAnimationEndListener(element) {
    // Add an event listener for the 'animationend' event
    const animationEndHandler = () => {
        // Set display to 'none' after the fade-out animation completes
        element.style.display = "none";
        // Remove the event listener to avoid multiple bindings
        element.removeEventListener('animationend', animationEndHandler);
    };

    element.addEventListener('animationend', animationEndHandler, { once: true });
}


document.querySelector(".Bubble-Sort").addEventListener('mouseover', () => {
    document.querySelector(".bubble").style.display = "block";
    document.querySelector(".bubble").style.animation = "fade-in 500ms forwards";
})

document.querySelector(".Bubble-Sort").addEventListener('mouseout', () => {
    document.querySelector(".bubble").style.animation = "fade-out 500ms ease-in-out";
    addAnimationEndListener(document.querySelector(".bubble"));
});

document.querySelector(".Selection-Sort").addEventListener('mouseover', () => {
    document.querySelector(".selection").style.display = "block";
    document.querySelector(".selection").style.animation = "fade-in 500ms forwards";
})

document.querySelector(".Selection-Sort").addEventListener('mouseout', () => {
    document.querySelector(".selection").style.animation = "fade-out 500ms ease-in-out";
    addAnimationEndListener(document.querySelector(".selection"));
});


document.querySelector(".Insertion-Sort").addEventListener('mouseover', () => {
    document.querySelector(".insertion").style.display = "block";
    document.querySelector(".insertion").style.animation = "fade-in 500ms forwards";
})

document.querySelector(".Insertion-Sort").addEventListener('mouseout', () => {
    document.querySelector(".insertion").style.animation = "fade-out 500ms ease-in-out";
    addAnimationEndListener(document.querySelector(".insertion"));
});

document.querySelector(".Quick-Sort").addEventListener('mouseover', () => {
    document.querySelector(".quick").style.display = "block";
    document.querySelector(".quick").style.animation = "fade-in 500ms forwards";
})

document.querySelector(".Quick-Sort").addEventListener('mouseout', () => {
    document.querySelector(".quick").style.animation = "fade-out 500ms ease-in-out";
    addAnimationEndListener(document.querySelector(".quick"));
});
