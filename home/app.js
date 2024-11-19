var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

var numberOfBolts = 5; // change this to the desired number of bolts
var LightingPoints = [];
var LightningSections = [
  (screenWidth/5)*getRandomDecimal(4.6, 4.8, 2), //4.8
  (screenWidth/5)*getRandomDecimal(3.5, 3.7, 2), //3.6
  (screenWidth/5)*getRandomDecimal(2.5, 2.7, 2), //2.6
  (screenWidth/5)*getRandomDecimal(1.3, 1.5, 2), //1.4
  (screenWidth/5)*getRandomDecimal(0.2, 0.4, 2), //0.2
]

// DEVELOPER ONLY
setTimeout(function() {
  InteractScrollAnim();
}, 0)

let boltCount = 0;

// Pause when website entered
var KRRImg = document.getElementById("KRRImg");
var CETxtRight = document.getElementById("CETxtRight");
var CETxtLeft = document.getElementById("CETxtLeft");
var RoboticsGraphicsHolder = document.getElementById("RoboticsGraphicsHolder");
//Add Event Listeners
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
  const items = document.querySelectorAll('.td-leave-enter-animation');
  items.forEach(item => {
      const elementSitePos = item.getBoundingClientRect();
      if(elementSitePos.bottom > 0 && elementSitePos.bottom < screenHeight) {
          item.classList.remove('hidden'); // Make it visible again
      } else { 
        item.classList.add('hidden'); // Make it disappear
      }
  });
});

function drawAllLightningBolts(amount) {
    if (boltCount >= numberOfBolts) return; // Stop after drawing 5 bolts
    window.LightingPoints.push(Array());
    var MaxFloor = screenHeight;
    var LastPoint;
    console.log(LightingPoints);
    var oldNewX = 0;
    for (var i = 0; i < 5; i++) {
        // Control the lengths between bolt redirections  // var NewY = getRndInteger(MaxFloor / 5, screenHeight / 5);
        var NewY = getRndInteger(200, screenHeight / 5);
        // Control "Craziness" of lightning bolt  // old code: var NewX = getRndInteger(-190 + oldNewX, 190 - oldNewX);
        var NewX = (oldNewX > 0) ? getRndInteger(-90, 0) : getRndInteger(0, 90);
        //var NewX = (oldNewX > 0) ? -90 : 90;

        oldNewX = NewX;
        MaxFloor -= NewY;
      
        var Points = {
            // Start
            startX: (LastPoint === undefined) ? viewport_convert(0, 46.5) : LastPoint.endX,
            startY: (LastPoint === undefined) ? 0 : LastPoint.endY,
            // End //endX: (LastPoint === undefined) ? screenWidth/1.9 : (LastPoint.endX + NewX),
            endX: (LastPoint === undefined) ? LightningSections[boltCount] : (LastPoint.endX + NewX),
            endY: (LastPoint === undefined) ? NewY : LastPoint.endY + NewY
        };
        
        if (isMobileDevice()) { // due to vw/vh not working on mobile, these must be 2 diff values for the called svgline function
          addSvgLine("KearnsRoboticsResources", Points.startX, Points.startY, Points.endX, Points.endY)
        } else {
          //addSvgLine("KearnsRoboticsResources", viewport_convert(Points.startX, true) + "vw", viewport_convert(Points.startY, false, true) + "vh", viewport_convert(Points.endX, true) + "vw", viewport_convert(Points.endY, false, true) + "vh")
          addSvgLine("KearnsRoboticsResources", viewport_convert(Points.startX, true, false, "vw"), viewport_convert(Points.startY, false, true, "vh"), viewport_convert(Points.endX, true, false, "vw"), viewport_convert(Points.endY, false, true, "vh"))
        }

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
  line.classList.add("td-leave-enter-animation")
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


setTimeout(function() {
  var lNum = 3;
  var lPoint = 0; 
  addMember("Xander", {
    vw: (viewport_convert(LightingPoints[lNum][lPoint].startX, true, false, "vw").toString()),
    vh: (viewport_convert(LightingPoints[lNum][lPoint].startY, false, true, "vh").toString()),

    x1: LightingPoints[lNum][lPoint].startX,
    y1: LightingPoints[lNum][lPoint].startY,
    x2: LightingPoints[lNum][lPoint].endX,
    y2: LightingPoints[lNum][lPoint].endY
  });
  
  var lNum = 3;
  var lPoint = 1; 
  addMember("Xander", {
    vw: (viewport_convert(LightingPoints[lNum][lPoint].startX, true, false, "vw").toString()),
    vh: (viewport_convert(LightingPoints[lNum][lPoint].startY, false, true, "vh").toString()),

    x1: LightingPoints[lNum][lPoint].startX,
    y1: LightingPoints[lNum][lPoint].startY,
    x2: LightingPoints[lNum][lPoint].endX,
    y2: LightingPoints[lNum][lPoint].endY
  });

  var lNum = 3;
  var lPoint = 2; 
  addMember("Xander", {
    vw: (viewport_convert(LightingPoints[lNum][lPoint].startX, true, false, "vw").toString()),
    vh: (viewport_convert(LightingPoints[lNum][lPoint].startY, false, true, "vh").toString()),

    x1: LightingPoints[lNum][lPoint].startX,
    y1: LightingPoints[lNum][lPoint].startY,
    x2: LightingPoints[lNum][lPoint].endX,
    y2: LightingPoints[lNum][lPoint].endY
  });

  var lNum = 3;
  var lPoint = 3; 
  addMember("Xander2", {
    vw: (viewport_convert(LightingPoints[lNum][lPoint].startX, true, false, "vw").toString()),
    vh: (viewport_convert(LightingPoints[lNum][lPoint].startY, false, true, "vh").toString()),

    x1: LightingPoints[lNum][lPoint].startX,
    y1: LightingPoints[lNum][lPoint].startY,
    x2: LightingPoints[lNum][lPoint].endX,
    y2: LightingPoints[lNum][lPoint].endY
  });

  var lNum = 3;
  var lPoint = 4; 
  addMember("Xander3", {
    vw: (viewport_convert(LightingPoints[lNum][lPoint].startX, true, false, "vw").toString()),
    vh: (viewport_convert(LightingPoints[lNum][lPoint].startY, false, true, "vh").toString()),

    x1: LightingPoints[lNum][lPoint].startX,
    y1: LightingPoints[lNum][lPoint].startY,
    x2: LightingPoints[lNum][lPoint].endX,
    y2: LightingPoints[lNum][lPoint].endY
  });


  // end 
  var lNum = 3;
  var lPoint = 4; 
  addMember("Xander4", {
    vw: (viewport_convert(LightingPoints[lNum][lPoint].endX, true, false, "vw").toString()),
    vh: (viewport_convert(LightingPoints[lNum][lPoint].endY, false, true, "vh").toString()),

    x1: LightingPoints[lNum][lPoint].startX,
    y1: LightingPoints[lNum][lPoint].startY,
    x2: LightingPoints[lNum][lPoint].endX,
    y2: LightingPoints[lNum][lPoint].endY,
  });
}, 800);

// BOLTS SPACER
LightningSections = getEquallySpacedBolts(screenWidth, numberOfBolts);

/*
if (lightningStrike.CenterTop || lightningStrike.CenterAll) {
  topEq = `calc(${lightningStrike.vh} + ${memberBackHeight/2}vh + ${(lightningStrike.y2 - lightningStrike.y1)/2}px);` 
}
if (lightningStrike.CenterLeft || lightningStrike.CenterAll) {
  leftEq = `calc(${lightningStrike.vw} - ${memberBackWidth/2}px + ${(lightningStrike.x2 - lightningStrike.x1)/2}px)` 
}
*/
// left: calc(${lightningStrike.vw} - ${memberBackWidth/2}px); 
// top: calc(${lightningStrike.vh});

// Sections
function addMember(name, lightningStrike, ExtraCSS) {
  var memberBackHeight = '5';
  var memberBackWidth = '10';

  // 1st: Centered, 2nd: Not Centered
  var leftEq = (lightningStrike.CenterLeft|| lightningStrike.CenterAll) ? `calc(${lightningStrike.vw} - ${memberBackWidth/2}rem + ${(lightningStrike.x2 - lightningStrike.x1)/2}px);` : `calc(${lightningStrike.vw} - ${memberBackWidth/2}rem)`;
  var topEq  = (lightningStrike.CenterTop || lightningStrike.CenterAll) ? `calc(${lightningStrike.vh} + ${memberBackHeight/2}vh + ${(lightningStrike.y2 - lightningStrike.y1)/2}px);` : `calc(${lightningStrike.vh} + ${memberBackHeight/2}vh)`;


   CreateHTMLElement(
    "Members", // 
    // HTML
    `<div id="member" class="td-leave-enter-animation" name="${name}" style="
      left: ${leftEq}; 
      top: ${topEq};
      margin-top: -${memberBackHeight}vh;
      height: ${memberBackHeight}vh;
      width: ${memberBackWidth}rem;
      ${ExtraCSS}
    "></div>`
    );
}


// Adding html
function CreateHTMLElement(inside, HTML) {
  var temp = document.getElementById(inside);

  // Adds html to the element
  temp.innerHTML += HTML
}

// Make sure bolts are in place
function getEquallySpacedBolts(screenWidth, numberOfBolts) {
  const bolts = [];
  const spacing = screenWidth / (numberOfBolts + 0); // Add 1 so that the bolts don't touch the edges

  // used to be let i = 1;
  for (let i = 0.5; i <= numberOfBolts; i++) {
    bolts.push(i * spacing);
  }

  return bolts;
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
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* 
viewport_convert(200, true, false) == PX to vw
viewport_convert(200, false, true) == PX to VH
viewport_convert(false, 200, 0) == VW to PX
viewport_convert(false, 0, 200) == VH to PX
*/
function viewport_convert(px = 0, vw = 0, vh = 0, TypeAtEnd = ""){
  //if (!isMobileDevice()) {
    if (px == 0 && ((vw.toString() > 0) == false) && ((vh.toString() > 0) == false)) {
      return 0 + TypeAtEnd;
    }
    if(px != 0){
      if(vw){
          return (100 * px / window.innerWidth) + TypeAtEnd;
      } else if(vh) {
          return (100 * px / window.innerHeight) + TypeAtEnd;
      }
    } else if(vw != 0 && vh != 0){
      // cannot use type at end
        var w_h_arr = [];
        w_h_arr["width"] = Math.ceil((window.innerWidth * vw / 100));
        w_h_arr["height"] = Math.ceil((window.innerHeight * vh / 100));
        return w_h_arr;
    } else if(vw != 0){
        return Math.ceil((window.innerWidth * vw / 100)) + TypeAtEnd;
    } else if(vh != 0){
        return Math.ceil((window.innerHeight * vh / 100)) + TypeAtEnd;
    } 
  //} else {
  //  return viewport_revert_mobile(px, vw, vh, TypeAtEnd);
  //}
}

// Reverts all items back to PX only (Due to weird IOS issues)
function viewport_revert_mobile(px = 0, vw = 0, vh = 0, TypeAtEnd = null) {
  if (isMobileDevice()) {
    if (px == 0 && vw == 0 && vh == 0) {
      return 0;
    }
    if (px != 0) {
      return px + ((TypeAtEnd != null) ? "px" : "");
    }
    if (vw != 0) {
      return Math.ceil((window.innerWidth * vw / 100)) + ((TypeAtEnd != null) ? "px" : "");
    }
    if (vh != 0) {
      return Math.ceil((window.innerHeight * vh / 100) + ((TypeAtEnd != null) ? "px" : ""));
    }
  } else {
    if (px) {
      return px + TypeAtEnd; 
    } else if (vw) {
      return vw + TypeAtEnd;
    } else {
      return vh + TypeAtEnd;
    }
  }
}