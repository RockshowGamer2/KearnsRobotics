var screenWidth = window.outerWidth;
var screenHeight = window.outerHeight;

var LightingPoints = [];
var LightningSections = [
  (screenWidth/5)*getRandomDecimal(4.6, 4.8, 2), //4.8
  (screenWidth/5)*getRandomDecimal(3.5, 3.7, 2), //3.6
  (screenWidth/5)*getRandomDecimal(2.5, 2.7, 2), //2.6
  (screenWidth/5)*getRandomDecimal(1.3, 1.5, 2), //1.4
  (screenWidth/5)*getRandomDecimal(0.2, 0.4, 2), //0.2
]

var c = document.getElementById("LightningCanvas");
var ctx = c.getContext("2d");
c.height = screenHeight;
c.width = screenWidth;

ctx.shadowColor = "lightblue";
ctx.shadowBlur = 2;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;


let boltCount = 0;

// Pause when website entered
var KRRImg = document.getElementById("KRRImg");
var CETxtRight = document.getElementById("CETxtRight");
var CETxtLeft = document.getElementById("CETxtLeft");
var LightningCanvas = document.getElementById("LightningCanvas");
window.addEventListener('wheel', (event) => {InteractScrollAnim()}, { once: true });
window.addEventListener('touchmove',  (event) => {InteractScrollAnim()}, { once: true });
// Or if on mobile, continue

function InteractScrollAnim() {
  // Add classes for animations
  KRRImg.classList.add("KRRImgAnim");
  CETxtRight.classList.add("CETxtRightAnim");
  CETxtLeft.classList.add("CETxtLeftAnim");
    
  // Delay for lightning strike creations
  setTimeout(function() {
    drawAllLightningBolts(); 
    document.querySelector('main').style.overflowY = "scroll";
  }, 65);
}

function drawAllLightningBolts() {
    if (boltCount >= 5) return; // Stop after drawing 5 bolts

    LightingPoints.push(Array());
    var MaxFloor = screenHeight;
    var LastPoint;
    console.log(LightingPoints);
    var oldNewX = 0;
    for (var i = 0; i < 5; i++) {
        // Control the lengths between bolt redirections
        var NewY = getRndInteger(MaxFloor / 5, screenHeight / 5);
        // Control "Craziness" of lightning bolt
        var NewX = getRndInteger(-190 + oldNewX, 190 - oldNewX);
        oldNewX = NewX;
        MaxFloor -= NewY;

        var Points = {
            // Start
            startX: (LastPoint === undefined) ? screenWidth / 2.15 : LastPoint.endX,
            startY: (LastPoint === undefined) ? 0 : LastPoint.endY,
            // End
            endX: (LastPoint === undefined) ? LightningSections[boltCount] : LastPoint.endX + NewX,
            endY: (LastPoint === undefined) ? NewY : LastPoint.endY + NewY
        };

        // Start of line Point (X, Y)
        ctx.moveTo(Points.startX, Points.startY);
        // End of line Point (X, Y)
        ctx.lineTo(Points.endX, Points.endY);
        ctx.strokeStyle = "white";
        ctx.stroke();

        // Save for future references
        LastPoint = Points;
        LightingPoints[boltCount].push(Points);
    }
    console.log(LightingPoints);
    // Prepare to draw the next bolt
    boltCount++;
    requestAnimationFrame(drawAllLightningBolts);
}

function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

function getRandomDecimal(min, max, decimalPlaces) {
  // Generates a random decimal number between min and max
  let randomNum = Math.random() * (max - min) + min;
  // Rounds the number to the specified decimal places
  return parseFloat(randomNum.toFixed(decimalPlaces));
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}