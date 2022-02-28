var circles = [];

const PACE = 10;
const MAX_LEFT = 1345;  //window.innerWidth;
const MAX_TOP = 675;    //window.innerHeight;

const NUMBER_OF_CIRCLES = prompt("How many circles would like to see?");

loadCircles();

var intervalId = window.setInterval(function () {
  circles.forEach(c => moveCircle(c))
}, 25);

function moveCircle(circleObj) {

  let top = parseInt(circleObj.circle.style.top);
  let left = parseInt(circleObj.circle.style.left);

  switch (circleObj.direction) {
    case "top-right":
      if(top > 0 && left < MAX_LEFT) {
        circleObj.circle.style.top = top - PACE + 'px';
        circleObj.circle.style.left = left + PACE + 'px';
      } else {
        circleObj.direction = changeDirection(circleObj);
      }
      break;

    case "bottom-right":
      if(top < MAX_TOP && left < MAX_LEFT) {
        circleObj.circle.style.top = top + PACE + 'px';
        circleObj.circle.style.left = left + PACE + 'px';
      } else {
        circleObj.direction = changeDirection(circleObj);
      }
      break;

    case "bottom-left":
      if(top < MAX_TOP && left > 0) {
        circleObj.circle.style.top = top + PACE + 'px';
        circleObj.circle.style.left = left - PACE + 'px';
      } else {
        circleObj.direction = changeDirection(circleObj);
      }
      break;

    case "top-left":
      if(top > 0 && left > 0) {
        circleObj.circle.style.top = top - PACE + 'px';
        circleObj.circle.style.left = left - PACE + 'px';
      } else {
        circleObj.direction = changeDirection(circleObj);
      }
      break;
  }
}

function loadCircles() {

  for(let i = 0; i < NUMBER_OF_CIRCLES; i++) {
    let newCircle = {
      circle: createNewCircle(),
      direction: getRandomDirection(),
    }

    circles.push(newCircle);
  }
}

function createNewCircle() {

  let circle = document.createElement("div");
  circle.className = "circle";
  circle.style.backgroundColor = getRandomColor();
  circle.style.top = getRandomY() + "px";
  circle.style.left = getRandomX() + "px";

  document.body.appendChild(circle)

  return circle;
}

function changeDirection(circle) {

  let top = parseInt(circle.circle.style.top);

  if(circle.direction === "top-right") {
    if(top <= 0)
      return "bottom-right";
    else return "top-left";
  } else if(circle.direction === "top-left") {
    if(top <= 0)
      return "bottom-left";
    else return "top-right";
  } else if(circle.direction === "bottom-right") {
    if(top >= 670)
      return "top-right";
    else return "bottom-left";
  } else if(circle.direction === "bottom-left") {
    if(top >= 670)
      return "top-left";
  else return "bottom-right";
  }
}

function getRandomX() {
  return Math.floor(Math.random() * 1361); // 0 to 1360
}

function getRandomY() {
  return Math.floor(Math.random() * 681); // 0 to 680
}

function getRandomDirection() {
  
  let directions = ["top-right", "bottom-right", "bottom-left", "top-left"];

  return directions[Math.floor(Math.random() * 4)]
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}