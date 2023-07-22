

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






// skill - list transform functions 

document.addEventListener('DOMContentLoaded', function () {
  var skillList = document.getElementById('skill-list');
  var skillListVisible = localStorage.getItem('skillListVisible');

  if (skillListVisible === 'true') {
    skillList.style.display = 'block';
    document.getElementById('checkbox').checked = true;
  } else {
    skillList.style.display = 'none';
    document.getElementById('checkbox').checked = false;
  }
});

document.getElementById('checkbox').onclick = function () {
  toggleSkillList();
};

function toggleSkillList() {
  var checkbox = document.getElementById('checkbox');
  var skillList = document.getElementById('skill-list');

  if (checkbox.checked) {
    skillList.style.display = 'block';
    localStorage.setItem('skillListVisible', 'true');
  } else {
    skillList.style.display = 'none';
    localStorage.setItem('skillListVisible', 'false');
  }
}



// project slider 

const dots = document.querySelectorAll(".dot");
const slidesContainer = document.querySelector(".slides");

let slideIndex = 0;

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    slideIndex = parseInt(dot.getAttribute("data-slide"));
    updateSlidePosition();
    updateActiveDot();
  });
});

function updateSlidePosition() {
  const slideWidth = slidesContainer.clientWidth / 4;
  slidesContainer.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
}

function updateActiveDot() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active-dot", index === slideIndex);
  });
}
