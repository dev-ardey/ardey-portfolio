

// hide and unhide projects 
// observer
// function that runs every time te visibility of observed elements changes
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            // changes class to show
            entry.target.classList.add('show');
        }
        // do it more than once 
        else {
            entry.target.classList.remove('show');
        }
    });
});

// grab all hidden elements
const hiddenElements = document.querySelectorAll('.hidden');

// tell the observer what to observe, loop over each elements and observe all hidden elements
hiddenElements.forEach((el) => observer.observe(el));