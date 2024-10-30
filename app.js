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

let boltCount = 0;

// Pause when website entered
var KRRImg = document.getElementById("KRRImg");
var CETxtRight = document.getElementById("CETxtRight");
var CETxtLeft = document.getElementById("CETxtLeft");
var RoboticsGraphicsHolder = document.getElementById("RoboticsGraphicsHolder");
window.addEventListener('wheel', (event) => {InteractScrollAnim()}, { once: true });
window.addEventListener('touchmove',  (event) => {InteractScrollAnim()}, { once: true });

// 1st scroll animation
function InteractScrollAnim() {
  // Add classes for animations
  KRRImg.classList.add("KRRImgAnim");
  CETxtRight.classList.add("CETxtRightAnim");
  CETxtLeft.classList.add("CETxtLeftAnim");
  const svg = document.createElementNS(svgNamespace, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  // Delay for lightning strike creations
  setTimeout(function() {
    drawAllLightningBolts(); 
    RoboticsGraphicsHolder.classList.add("RGHolderAnim")
    document.querySelector('main').style.overflowY = "scroll";
  }, 65);
}


// Lightning scroll effects
document.querySelector("main").addEventListener('scroll', function() {
  const lines = document.querySelectorAll('line');
  lines.forEach(line => {
      const elementSitePos = line.getBoundingClientRect();
      if(elementSitePos.bottom > 0 && elementSitePos.bottom < screenHeight) {
          line.classList.remove('hidden'); // Make it visible again
      } else { 
        line.classList.add('hidden'); // Make it disappear
      }
  });
});


function drawAllLightningBolts(Amount) {
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
        // old code: var NewX = getRndInteger(-190 + oldNewX, 190 - oldNewX);
        var NewX = (oldNewX > 0) ? getRndInteger(-190, 0) : getRndInteger(0, 190);

        oldNewX = NewX;
        MaxFloor -= NewY;
      
        var Points = {
            // Start
            startX: (LastPoint === undefined) ? viewport_convert(0, 46.5) : LastPoint.endX,
            startY: (LastPoint === undefined) ? 0 : LastPoint.endY,
            // End
            endX: (LastPoint === undefined) ? LightningSections[boltCount] : LastPoint.endX + NewX,
            endY: (LastPoint === undefined) ? NewY : LastPoint.endY + NewY
        };
        console.log("start y: ", viewport_convert(Points.startY, false, true));
        addSvgLine("KearnsRoboticsResources", viewport_convert(Points.startX, true) + "vw", viewport_convert(Points.startY, false, true) + "vh", viewport_convert(Points.endX, true) + "vw", viewport_convert(Points.endY, false, true) + "vh")

        // Save for future references
        LastPoint = Points;
        LightingPoints[boltCount].push(Points);
    }
    console.log(LightingPoints);
    // Prepare to draw the next bolt
    boltCount++;
    requestAnimationFrame(drawAllLightningBolts);
}


const svgNamespace = "http://www.w3.org/2000/svg";
function addSvgLine(containerId, x1, y1, x2, y2) {
  const svg = document.getElementById("RoboticsGraphicsHolder");
  // Create the line element
  const line = document.createElementNS(svgNamespace, "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "white");
  line.setAttribute("stroke-width", "2");
  // Append the line to the SVG
  svg.appendChild(line);

  // Append the SVG to the specified container
  const container = document.getElementById(containerId);
  container.appendChild(svg);
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

/* 
viewport_convert(200, true, false) == PX to vw
viewport_convert(200, false, true) == PX to VH
viewport_convert(false, 200, 0) == VW to PX
viewport_convert(false, 0, 200) == VH to PX
*/
function viewport_convert(px = 0, vw = 0, vh = 0){
  if (px == 0 && ((vw.toString() > 0) == false) && ((vh.toString() > 0) == false)) {
    return 0;
  }
  if(px != 0){
     if(vw){
        return (100 * px / window.innerWidth);
     } else if(vh) {
        return (100 * px / window.innerHeight);
     }
  } else if(vw != 0 && vh != 0){
      var w_h_arr = [];
      w_h_arr["width"] = Math.ceil((window.innerWidth * vw / 100));
      w_h_arr["height"] = Math.ceil((window.innerHeight * vh / 100));
      return w_h_arr;
  } else if(vw != 0){
      return Math.ceil((window.innerWidth * vw / 100));
  } else if(vh != 0){
      return Math.ceil((window.innerHeight * vh / 100));
  } 
}