
//  Onclick add Boder to Gender 

function addBorder(element) {
      var boxes = document.getElementsByClassName("same");
      for (var i = 0; i < boxes.length; i++) {
        if (boxes[i] !== element) {
          boxes[i].classList.remove("clicked");
        }
      }
      element.classList.toggle("clicked");
    }


// Ticks slider 

var slider = document.getElementById("slider");
let ticksCount = slider.getAttribute("max") - slider.getAttribute("min");
let ticks = document.querySelector(".ticks");
let thumb = document.getElementById("thumb");
slider.style.width = ticksCount * 16 + "px";
for (var i = 0; i <= ticksCount; i++) {
    let tick = document.createElement("span");
    let tickText = document.createElement("span");
    tickText.innerHTML = i;
    tick.appendChild(tickText);
    if (i % 5 == 0) {
        tick.className = "tick big";
    } else {
        tick.className = "tick";
    }
    tick.style.left = i * 16 + "px";
    ticks.appendChild(tick);
}

var isDragging = false;

thumb.addEventListener("mousedown", startDragging);
thumb.addEventListener("touchmove", startDragging);

function startDragging(event) {
    isDragging = true;
    updateThumbPosition(event);
    event.preventDefault();
}

document.addEventListener("mousemove", updateThumbPosition);
document.addEventListener("touchmove", updateThumbPosition);

document.addEventListener("mouseup", stopDragging);
document.addEventListener("touchend", stopDragging);

function updateThumbPosition(event) {
    if (isDragging) {
        var sliderRect = slider.getBoundingClientRect();
        var thumbWidth = thumb.offsetWidth;
        var thumbHalfWidth = thumbWidth / 2;
        var positionX = event.clientX - sliderRect.left - thumbHalfWidth;
        var maxPositionX = slider.offsetWidth;
        var step = parseInt(slider.getAttribute("step")) * 16;
        positionX = Math.min(
            Math.max(Math.round(positionX / step) * step, 0),
            maxPositionX
        );
        thumb.style.transform = "translateX(" + positionX + "px)";

        var allticks = document.querySelectorAll(".tick");
        for (var i = 0; i <= ticksCount; i++) {
            allticks[i].style.background = "rgb(219, 224, 225)";
        }
        allticks[Math.round(positionX / 16)].style.background =
            "rgb(40, 40, 40)";

        document.querySelector(".display").innerHTML =
            allticks[Math.round(positionX / 16)].querySelector(
                "span"
            ).innerHTML;
    }
}

function stopDragging(event) {
    isDragging = false;
}


// Variables for BMI Calculations

var age = document.getElementById("age");
var height = document.getElementById("height");
var weight = document.getElementById("weight");
var male = document.getElementById("m");
var female = document.getElementById("f");
var form = document.getElementById("form");
var checklastvaluecm = "",
    checklastvaluewi = "",
    heightcm = "",
    weightkg = "";
var checklastvalueft = "",
    checklastvaluepo = "";
let resultArea = document.querySelector(".comment");
var bmi = "";

// Modal Content

modalContent = document.querySelector(".modal-content");
modalText = document.querySelector("#modalText");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

// Modal Function

function calculate() {

    if (age.value == '' || height.value == '' || weight.value == '') {
        modal.style.display = "block";
        modalText.innerHTML = `All fields are required!`;

    } else {
        countBmi();
    }

}

// CountBmi Function and Formula

function countBmi() {

    if (document.getElementById('stan').checked) {
        var convertH = document.getElementById("height").value;

        var heightft = convertH * 30.48;
        heightft = Math.round(heightft);

        var convertW = document.getElementById("weight").value;
        var weightpo = convertW * 0.453592;
        weightpo = Math.round(weightpo);
        bmi = Number(weightpo) / (Number(heightft) / 100 * Number(heightft) / 100);
    } else {
        var p = [age.value, height.value, weight.value];
        if (male.checked) {
            p.push("male");
        } else if (female.checked) {
            p.push("female");
        }

        bmi = Number(p[2]) / (Number(p[1]) / 100 * Number(p[1]) / 100);
    }

    var result = '';
    if (bmi < 18.5) {
        result = 'Underweight 🚶‍';
    } else if (18.5 <= bmi && bmi <= 24.9) {
        result = 'Healthy 💪';
    } else if (25 <= bmi && bmi <= 29.9) {
        result = 'Overweight 😑';
    } else if (30 <= bmi && bmi <= 34.9) {
        result = 'Obese 😥';
    } else if (35 <= bmi) {
        result = 'Extremely obese 😲';
    }


    resultArea.style.display = "block";
    document.querySelector(".comment").innerHTML = `You are <span id="comment">${result}</span>`;
    document.querySelector("#result").innerHTML = bmi.toFixed(2);

}

// When the user clicks on <span> (x), close the modal

span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Function for changing Units into cm and kg

function changeUnitm() {
    height.className = "height_class";
    weight.className = "weight_class";

    document.querySelector("#hi").innerHTML = "Height(cm)";
    document.querySelector("#wi").innerHTML = "Weight(kg)";

    if (checklastvalueft == "") {
        heightcm = document.getElementById("height").value;
        checklastvalueft = heightcm;
    }
    var heightft = checklastvalueft * 30.48;
    if (heightft != 0) {
        document.getElementById("height").value = Math.round(heightft);
    }

    if (checklastvaluepo == "") {
        weightkg = document.getElementById("weight").value;
        checklastvaluepo = weightkg;
    }
    var weightpo = checklastvaluepo * 0.453592;
    if (weightpo != 0) {
        document.getElementById("weight").value = Math.round(weightpo);
    }
}

// Function for changing Units into foot and pounds

function changeUnits() {
    height.className = "height_class";
    weight.className = "weight_class";
    document.querySelector("#hi").innerHTML = "Height(foot)";
    document.querySelector("#wi").innerHTML = "Weight(pounds)";

    if (checklastvaluecm == "") {
        heightcm = document.getElementById("height").value;
        checklastvaluecm = heightcm;
    }
    var heightft = checklastvaluecm * 0.0328084;
    if (heightft != 0) {
        document.getElementById("height").value = heightft.toFixed(2);
    }
    if (checklastvaluewi == "") {
        weightkg = document.getElementById("weight").value;
        checklastvaluewi = weightkg;
    }
    var weightpo = checklastvaluewi * 2.20462;
    if (weightpo != 0) {
        document.getElementById("weight").value = weightpo.toFixed(2);
    }
}


// On Mouse wheel slider scroll

const element = document.querySelector("#slider");

element.addEventListener('wheel', (event) => {
    event.preventDefault();

    element.scrollBy({
        left: event.deltaY < 0 ? -100 : 100,

    });
}); 

if ('this_is' == /an_example/) {
    of_beautifier();
} else {
    var a = b ? (c % d) : e[f];
}





