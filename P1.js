// UBC CPSC 314 (2015W2) -- P1
// HAVE FUN!!! :)

// ASSIGNMENT-SPECIFIC API EXTENSION
THREE.Object3D.prototype.setMatrix = function(a) {
  this.matrix=a;
  this.matrix.decompose(this.position,this.quaternion,this.scale);
}

// SETUP RENDERER & SCENE
var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xFFFFFF); // white background colour
canvas.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30,1,0.1,1000); // view angle, aspect ratio, near, far
camera.position.set(45,20,40);
camera.lookAt(scene.position);
scene.add(camera);

// SETUP ORBIT CONTROLS OF THE CAMERA
var controls = new THREE.OrbitControls(camera);

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

// EVENT LISTENER RESIZE
window.addEventListener('resize',resize);
resize();

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
   }

// SETUP HELPER GRID
// Note: Press Z to show/hide
var gridGeometry = new THREE.Geometry();
var i;
for(i=-50;i<51;i+=2) {
    gridGeometry.vertices.push( new THREE.Vector3(i,0,-50));
    gridGeometry.vertices.push( new THREE.Vector3(i,0,50));
    gridGeometry.vertices.push( new THREE.Vector3(-50,0,i));
    gridGeometry.vertices.push( new THREE.Vector3(50,0,i));
}

var gridMaterial = new THREE.LineBasicMaterial({color:0xBBBBBB});
var grid = new THREE.Line(gridGeometry,gridMaterial,THREE.LinePieces);

/////////////////////////////////
//   YOUR WORK STARTS BELOW    //
/////////////////////////////////

// MATERIALS
// Note: Feel free to be creative with this! 
var normalMaterial = new THREE.MeshNormalMaterial();

// function drawCube()
// Draws a unit cube centered about the origin.
// Note: You will be using this for all of your geometry
function makeCube() {
  var unitCube = new THREE.BoxGeometry(1,1,1);
  return unitCube;
}

// GEOMETRY: Specifies the size
var torsoGeometry = makeCube();
var torsoScale = new THREE.Matrix4().set(5,0,0,0, 0,5,0,0, 0,0,8,0, 0,0,0,1);
torsoGeometry.applyMatrix(torsoScale);

var headGeometry = makeCube();
var headScale = new THREE.Matrix4().set(3,0,0,0, 0,3,0,0, 0,0,2,0, 0,0,0,1);
headGeometry.applyMatrix(headScale);

var noseGeometry = makeCube();
var noseScale = new THREE.Matrix4().set(1.5,0,0,0, 0,1.5,0,0, 0,0,1,0, 0,0,0,1);
noseGeometry.applyMatrix(noseScale);

var tailGeometry = makeCube();
var tailScale = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,5,0, 0,0,0,1);
tailGeometry.applyMatrix(tailScale);

var PawGeometry = makeCube();
var PawScale = new THREE.Matrix4().set(3,0,0,0, 0,1,0,0, 0,0,5,0, 0,0,0,1);
PawGeometry.applyMatrix(PawScale);

var clawGeometry = makeCube();
var clawScale = new THREE.Matrix4().set(0.4,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
clawGeometry.applyMatrix(clawScale);

var largeTenticleGeometry = makeCube();
var largeTenticleScale = new THREE.Matrix4().set(0.4,0,0,0, 0,0.4,0,0, 0,0,1,0, 0,0,0,1);
largeTenticleGeometry.applyMatrix(largeTenticleScale);

// TO-DO: SPECIFY THE REST OF YOUR STAR-NOSE MOLE'S GEOMETRY. 
// Note: You will be using transformation matrices to set the shape. 
// Note: You are not allowed to use the tools Three.js provides for 
//       rotation, translation and scaling.
// Note: The torso has been done for you (but feel free to modify it!)  
// Hint: Explicity declare new matrices using Matrix4().set     



// MATRICES: Specifies the location

//Relative to torso
var torsoMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,10, 0,0,1,0, 0,0,0,1);
var headMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,5, 0,0,0,1);
var noseMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,6.5, 0,0,0,1);
var tailMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,-6, 0,0,0,1);

var frontRightPawMatrix = new THREE.Matrix4().set(1,0,0,-2.5, 0,1,0,-2.5, 0,0,1,4, 0,0,0,1);
var frontLeftPawMatrix = new THREE.Matrix4().set(1,0,0,2.5, 0,1,0,-2.5, 0,0,1,4, 0,0,0,1);
var backRightPawMatrix = new THREE.Matrix4().set(1,0,0,-2.5, 0,1,0,-3.5, 0,0,1,-2, 0,0,0,1);
var backLeftPawMatrix = new THREE.Matrix4().set(1,0,0,2.5, 0,1,0,-3.5, 0,0,1,-2, 0,0,0,1);

//Relative to respective paws
var Claw1Matrix = new THREE.Matrix4().set(1,0,0,1.4, 0,1,0,0, 0,0,1,3, 0,0,0,1);
var Claw2Matrix = new THREE.Matrix4().set(1,0,0,0.7, 0,1,0,0, 0,0,1,3, 0,0,0,1);
var Claw3Matrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,3, 0,0,0,1);
var Claw4Matrix = new THREE.Matrix4().set(1,0,0,-0.7, 0,1,0,0, 0,0,1,3, 0,0,0,1);
var Claw5Matrix = new THREE.Matrix4().set(1,0,0,-1.4, 0,1,0,0, 0,0,1,3, 0,0,0,1);

//Relative to nose
var upLeftLargeTentacleMatrix = new THREE.Matrix4().set(1,0,0,0.5, 0,1,0,0.5, 0,0,1,1, 0,0,0,1);





var headMatrixRelativeToTorso =  new THREE.Matrix4().multiplyMatrices(torsoMatrix, headMatrix);
var noseMatrixRelativeToTorso =  new THREE.Matrix4().multiplyMatrices(torsoMatrix, noseMatrix);
var tailMatrixRelativeToTorso =  new THREE.Matrix4().multiplyMatrices(torsoMatrix, tailMatrix);

//Around x axis
var rotate20Degrees = new THREE.Matrix4().set(  1,        0,         0,        0,
                                        0, Math.cos(Math.PI/9),-Math.sin(Math.PI/9), 0,
                                        0, Math.sin(Math.PI/9), Math.cos(Math.PI/9), 0,
                                        0,        0,         0,        1);

var frontRightPawMatrixRelativeToTorso = new THREE.Matrix4().multiplyMatrices(torsoMatrix, frontRightPawMatrix);
frontRightPawMatrixRelativeToTorso.multiplyMatrices(frontRightPawMatrixRelativeToTorso, rotate20Degrees);
var frontLeftPawMatrixRelativeToTorso = new THREE.Matrix4().multiplyMatrices(torsoMatrix, frontLeftPawMatrix);
frontLeftPawMatrixRelativeToTorso.multiplyMatrices(frontLeftPawMatrixRelativeToTorso, rotate20Degrees);
var backRightPawMatrixRelativeToTorso = new THREE.Matrix4().multiplyMatrices(torsoMatrix, backRightPawMatrix);
backRightPawMatrixRelativeToTorso.multiplyMatrices(backRightPawMatrixRelativeToTorso, rotate20Degrees);
var backLeftPawMatrixRelativeToTorso = new THREE.Matrix4().multiplyMatrices(torsoMatrix, backLeftPawMatrix);
backLeftPawMatrixRelativeToTorso.multiplyMatrices(backLeftPawMatrixRelativeToTorso, rotate20Degrees);

//Around y axis
var rotate20Degrees2 = new THREE.Matrix4().set(  Math.cos(Math.PI/9),       0,          Math.sin(Math.PI/9),        0,
                                                    0,          1,          0,          0,
                                                -Math.sin(Math.PI/9),       0,          Math.cos(Math.PI/9),        0,
                                                    0,          0,          0,          1);

var upLeftLargeTentacleRelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, upLeftLargeTentacleMatrix);
upLeftLargeTentacleRelativeToNose.multiplyMatrices(upLeftLargeTentacleRelativeToNose, rotate20Degrees2);

var frontRightClaw1RelativeToPaw = new THREE.Matrix4().multiplyMatrices(frontRightPawMatrixRelativeToTorso, Claw1Matrix);
var frontRightClaw2RelativeToPaw = new THREE.Matrix4().multiplyMatrices(frontRightPawMatrixRelativeToTorso, Claw2Matrix);
var frontRightClaw3RelativeToPaw = new THREE.Matrix4().multiplyMatrices(frontRightPawMatrixRelativeToTorso, Claw3Matrix);
var frontRightClaw4RelativeToPaw = new THREE.Matrix4().multiplyMatrices(frontRightPawMatrixRelativeToTorso, Claw4Matrix);
var frontRightClaw5RelativeToPaw = new THREE.Matrix4().multiplyMatrices(frontRightPawMatrixRelativeToTorso, Claw5Matrix);

var frontLeftClaw1RelativeToPaw = new THREE.Matrix4().multiplyMatrices(frontLeftPawMatrixRelativeToTorso, Claw1Matrix);
var frontLeftClaw2RelativeToPaw = new THREE.Matrix4().multiplyMatrices(frontLeftPawMatrixRelativeToTorso, Claw2Matrix);
var frontLeftClaw3RelativeToPaw = new THREE.Matrix4().multiplyMatrices(frontLeftPawMatrixRelativeToTorso, Claw3Matrix);
var frontLeftClaw4RelativeToPaw = new THREE.Matrix4().multiplyMatrices(frontLeftPawMatrixRelativeToTorso, Claw4Matrix);
var frontLeftClaw5RelativeToPaw = new THREE.Matrix4().multiplyMatrices(frontLeftPawMatrixRelativeToTorso, Claw5Matrix);

var backLeftClaw1RelativeToPaw = new THREE.Matrix4().multiplyMatrices(backLeftPawMatrixRelativeToTorso, Claw1Matrix);
var backLeftClaw2RelativeToPaw = new THREE.Matrix4().multiplyMatrices(backLeftPawMatrixRelativeToTorso, Claw2Matrix);
var backLeftClaw3RelativeToPaw = new THREE.Matrix4().multiplyMatrices(backLeftPawMatrixRelativeToTorso, Claw3Matrix);
var backLeftClaw4RelativeToPaw = new THREE.Matrix4().multiplyMatrices(backLeftPawMatrixRelativeToTorso, Claw4Matrix);
var backLeftClaw5RelativeToPaw = new THREE.Matrix4().multiplyMatrices(backLeftPawMatrixRelativeToTorso, Claw5Matrix);

var backRightClaw1RelativeToPaw = new THREE.Matrix4().multiplyMatrices(backRightPawMatrixRelativeToTorso, Claw1Matrix);
var backRightClaw2RelativeToPaw = new THREE.Matrix4().multiplyMatrices(backRightPawMatrixRelativeToTorso, Claw2Matrix);
var backRightClaw3RelativeToPaw = new THREE.Matrix4().multiplyMatrices(backRightPawMatrixRelativeToTorso, Claw3Matrix);
var backRightClaw4RelativeToPaw = new THREE.Matrix4().multiplyMatrices(backRightPawMatrixRelativeToTorso, Claw4Matrix);
var backRightClaw5RelativeToPaw = new THREE.Matrix4().multiplyMatrices(backRightPawMatrixRelativeToTorso, Claw5Matrix);

// TO-DO: INITIALIZE THE REST OF YOUR MATRICES 
// Note: Use of parent attribute is not allowed.
// Hint: Keep hierarchies in mind!   
// Hint: Play around with the headTorsoMatrix values, what changes in the render? Why?         



// CREATE BODY
var torso = new THREE.Mesh(torsoGeometry,normalMaterial);
torso.setMatrix(torsoMatrix)
scene.add(torso);

var head = new THREE.Mesh(headGeometry,normalMaterial);
head.setMatrix(headMatrixRelativeToTorso)
scene.add(head);

var nose = new THREE.Mesh(noseGeometry,normalMaterial);
nose.setMatrix(noseMatrixRelativeToTorso)
scene.add(nose);

var tail = new THREE.Mesh(tailGeometry,normalMaterial);
tail.setMatrix(tailMatrixRelativeToTorso)
scene.add(tail);

var frontRightPaw = new THREE.Mesh(PawGeometry,normalMaterial);
frontRightPaw.setMatrix(frontRightPawMatrixRelativeToTorso)
scene.add(frontRightPaw);

var frontLeftPaw = new THREE.Mesh(PawGeometry,normalMaterial);
frontLeftPaw.setMatrix(frontLeftPawMatrixRelativeToTorso)
scene.add(frontLeftPaw);

var backRightPaw = new THREE.Mesh(PawGeometry,normalMaterial);
backRightPaw.setMatrix(backRightPawMatrixRelativeToTorso)
scene.add(backRightPaw);

var backLeftPaw = new THREE.Mesh(PawGeometry,normalMaterial);
backLeftPaw.setMatrix(backLeftPawMatrixRelativeToTorso)
scene.add(backLeftPaw);

var frontRightClaw1 = new THREE.Mesh(clawGeometry,normalMaterial);
frontRightClaw1.setMatrix(frontRightClaw1RelativeToPaw)
scene.add(frontRightClaw1);

var frontRightClaw2 = new THREE.Mesh(clawGeometry,normalMaterial);
frontRightClaw2.setMatrix(frontRightClaw2RelativeToPaw)
scene.add(frontRightClaw2);

var frontRightClaw3 = new THREE.Mesh(clawGeometry,normalMaterial);
frontRightClaw3.setMatrix(frontRightClaw3RelativeToPaw)
scene.add(frontRightClaw3);

var frontRightClaw4 = new THREE.Mesh(clawGeometry,normalMaterial);
frontRightClaw4.setMatrix(frontRightClaw4RelativeToPaw)
scene.add(frontRightClaw4);

var frontRightClaw5 = new THREE.Mesh(clawGeometry,normalMaterial);
frontRightClaw5.setMatrix(frontRightClaw5RelativeToPaw)
scene.add(frontRightClaw5);

var frontLeftClaw1 = new THREE.Mesh(clawGeometry,normalMaterial);
frontLeftClaw1.setMatrix(frontLeftClaw1RelativeToPaw)
scene.add(frontLeftClaw1);

var frontLeftClaw2 = new THREE.Mesh(clawGeometry,normalMaterial);
frontLeftClaw2.setMatrix(frontLeftClaw2RelativeToPaw)
scene.add(frontLeftClaw2);

var frontLeftClaw3 = new THREE.Mesh(clawGeometry,normalMaterial);
frontLeftClaw3.setMatrix(frontLeftClaw3RelativeToPaw)
scene.add(frontLeftClaw3);

var frontLeftClaw4 = new THREE.Mesh(clawGeometry,normalMaterial);
frontLeftClaw4.setMatrix(frontLeftClaw4RelativeToPaw)
scene.add(frontLeftClaw4);

var frontLeftClaw5 = new THREE.Mesh(clawGeometry,normalMaterial);
frontLeftClaw5.setMatrix(frontLeftClaw5RelativeToPaw)
scene.add(frontLeftClaw5);

var backRightClaw1 = new THREE.Mesh(clawGeometry,normalMaterial);
backRightClaw1.setMatrix(backRightClaw1RelativeToPaw)
scene.add(backRightClaw1);

var backRightClaw2 = new THREE.Mesh(clawGeometry,normalMaterial);
backRightClaw2.setMatrix(backRightClaw2RelativeToPaw)
scene.add(backRightClaw2);

var backRightClaw3 = new THREE.Mesh(clawGeometry,normalMaterial);
backRightClaw3.setMatrix(backRightClaw3RelativeToPaw)
scene.add(backRightClaw3);

var backRightClaw4 = new THREE.Mesh(clawGeometry,normalMaterial);
backRightClaw4.setMatrix(backRightClaw4RelativeToPaw)
scene.add(backRightClaw4);

var backRightClaw5 = new THREE.Mesh(clawGeometry,normalMaterial);
backRightClaw5.setMatrix(backRightClaw5RelativeToPaw)
scene.add(backRightClaw5);

var backLeftClaw1 = new THREE.Mesh(clawGeometry,normalMaterial);
backLeftClaw1.setMatrix(backLeftClaw1RelativeToPaw)
scene.add(backLeftClaw1);

var backLeftClaw2 = new THREE.Mesh(clawGeometry,normalMaterial);
backLeftClaw2.setMatrix(backLeftClaw2RelativeToPaw)
scene.add(backLeftClaw2);

var backLeftClaw3 = new THREE.Mesh(clawGeometry,normalMaterial);
backLeftClaw3.setMatrix(backLeftClaw3RelativeToPaw)
scene.add(backLeftClaw3);

var backLeftClaw4 = new THREE.Mesh(clawGeometry,normalMaterial);
backLeftClaw4.setMatrix(backLeftClaw4RelativeToPaw)
scene.add(backLeftClaw4);

var backLeftClaw5 = new THREE.Mesh(clawGeometry,normalMaterial);
backLeftClaw5.setMatrix(backLeftClaw5RelativeToPaw)
scene.add(backLeftClaw5);

var upLeftLargeTentacle = new THREE.Mesh(largeTenticleGeometry,normalMaterial);
upLeftLargeTentacle.setMatrix(upLeftLargeTentacleRelativeToNose)
scene.add(upLeftLargeTentacle);

// TO-DO: PUT TOGETHER THE REST OF YOUR STAR-NOSED MOLE AND ADD TO THE SCENE!
// Hint: Hint: Add one piece of geometry at a time, then implement the motion for that part. 
//             Then you can make sure your hierarchy still works properly after each step.



// APPLY DIFFERENT JUMP CUTS/ANIMATIONS TO DIFFERNET KEYS
// Note: The start of "U" animation has been done for you, you must implement the hiearchy and jumpcut.
// Hint: There are other ways to manipulate and grab clock values!!
// Hint: Check THREE.js clock documenation for ideas.
// Hint: It may help to start with a jumpcut and implement the animation after.
// Hint: Where is updateBody() called?
var clock = new THREE.Clock(true);

var p0; // start position or angle
var p1; // end position or angle
var time_length; // total time of animation
var time_start; // start time of animation
var time_end; // end time of animation
var p; // current frame
var animate = false; // animate?

// function init_animation()
// Initializes parameters and sets animate flag to true.
// Input: start position or angle, end position or angle, and total time of animation.
function init_animation(p_start,p_end,t_length){
  p0 = p_start;
  p1 = p_end;
  time_length = t_length;
  time_start = clock.getElapsedTime();
  time_end = time_start + time_length;
  animate = true; // flag for animation
  return;
}

function updateBody() {
  switch(true)
  {
      //Body tilt up
      case(key == "U" && animate):
          var time = clock.getElapsedTime(); // t seconds passed since the clock started.

          if (time > time_end){
            p = p1;
            animate = false;
            break;
          }

          p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame

          var rotateZ = new THREE.Matrix4().set(1,        0,         0,        0,
                                                0, Math.cos(-p),-Math.sin(-p), 0,
                                                0, Math.sin(-p), Math.cos(-p), 0,
                                                0,        0,         0,        1);

          var torsoRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,rotateZ);
          torso.setMatrix(torsoRotMatrix);

          var headRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, headMatrix);
          head.setMatrix(headRotMatrix);

          var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, tailMatrix);
          tail.setMatrix(tailRotMatrix);

          var noseRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, noseMatrix);
          nose.setMatrix(noseRotMatrix);

          var frontRightPawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, frontRightPawMatrix);
          frontRightPawRotMatrix.multiplyMatrices(frontRightPawRotMatrix, rotate20Degrees);
          frontRightPaw.setMatrix(frontRightPawRotMatrix);

          var frontLeftPawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, frontLeftPawMatrix);
          frontLeftPawRotMatrix.multiplyMatrices(frontLeftPawRotMatrix, rotate20Degrees);
          frontLeftPaw.setMatrix(frontLeftPawRotMatrix);

          var backRightPawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, backRightPawMatrix);
          backRightPawRotMatrix.multiplyMatrices(backRightPawRotMatrix, rotate20Degrees);
          backRightPaw.setMatrix(backRightPawRotMatrix);

          var backLeftPawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, backLeftPawMatrix);
          backLeftPawRotMatrix.multiplyMatrices(backLeftPawRotMatrix, rotate20Degrees);
          backLeftPaw.setMatrix(backLeftPawRotMatrix);

          var frontRightPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(frontRightPawRotMatrix, Claw1Matrix);
          frontRightClaw1.setMatrix(frontRightPawClaw1RotMatrix);

          var frontRightPawClaw2RotMatrix = new THREE.Matrix4().multiplyMatrices(frontRightPawRotMatrix, Claw2Matrix);
          frontRightClaw2.setMatrix(frontRightPawClaw2RotMatrix);

          var frontRightPawClaw3RotMatrix = new THREE.Matrix4().multiplyMatrices(frontRightPawRotMatrix, Claw3Matrix);
          frontRightClaw3.setMatrix(frontRightPawClaw3RotMatrix);

          var frontRightPawClaw4RotMatrix = new THREE.Matrix4().multiplyMatrices(frontRightPawRotMatrix, Claw4Matrix);
          frontRightClaw4.setMatrix(frontRightPawClaw4RotMatrix);

          var frontRightPawClaw5RotMatrix = new THREE.Matrix4().multiplyMatrices(frontRightPawRotMatrix, Claw5Matrix);
          frontRightClaw5.setMatrix(frontRightPawClaw5RotMatrix);

          var frontLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(frontLeftPawRotMatrix, Claw1Matrix);
          frontLeftClaw1.setMatrix(frontLeftPawClaw1RotMatrix);

          var frontLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(frontLeftPawRotMatrix, Claw2Matrix);
          frontLeftClaw2.setMatrix(frontLeftPawClaw1RotMatrix);

          var frontLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(frontLeftPawRotMatrix, Claw3Matrix);
          frontLeftClaw3.setMatrix(frontLeftPawClaw1RotMatrix);

          var frontLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(frontLeftPawRotMatrix, Claw4Matrix);
          frontLeftClaw4.setMatrix(frontLeftPawClaw1RotMatrix);

          var frontLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(frontLeftPawRotMatrix, Claw5Matrix);
          frontLeftClaw5.setMatrix(frontLeftPawClaw1RotMatrix);

          var backRightPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(backRightPawRotMatrix, Claw1Matrix);
          backRightClaw1.setMatrix(backRightPawClaw1RotMatrix);

          var backRightPawClaw2RotMatrix = new THREE.Matrix4().multiplyMatrices(backRightPawRotMatrix, Claw2Matrix);
          backRightClaw2.setMatrix(backRightPawClaw2RotMatrix);

          var backRightPawClaw3RotMatrix = new THREE.Matrix4().multiplyMatrices(backRightPawRotMatrix, Claw3Matrix);
          backRightClaw3.setMatrix(backRightPawClaw3RotMatrix);

          var backRightPawClaw4RotMatrix = new THREE.Matrix4().multiplyMatrices(backRightPawRotMatrix, Claw4Matrix);
          backRightClaw4.setMatrix(backRightPawClaw4RotMatrix);

          var backRightPawClaw5RotMatrix = new THREE.Matrix4().multiplyMatrices(backRightPawRotMatrix, Claw5Matrix);
          backRightClaw5.setMatrix(backRightPawClaw5RotMatrix);

          var backLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(backLeftPawRotMatrix, Claw1Matrix);
          backLeftClaw1.setMatrix(backLeftPawClaw1RotMatrix);

          var backLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(backLeftPawRotMatrix, Claw2Matrix);
          backLeftClaw2.setMatrix(backLeftPawClaw1RotMatrix);

          var backLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(backLeftPawRotMatrix, Claw3Matrix);
          backLeftClaw3.setMatrix(backLeftPawClaw1RotMatrix);

          var backLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(backLeftPawRotMatrix, Claw4Matrix);
          backLeftClaw4.setMatrix(backLeftPawClaw1RotMatrix);

          var backLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(backLeftPawRotMatrix, Claw5Matrix);
          backLeftClaw5.setMatrix(backLeftPawClaw1RotMatrix);

          break;

      //Body tilt down
      case(key == "D" && animate):
          var time = clock.getElapsedTime(); // t seconds passed since the clock started.

          if (time > time_end){
              p = p1;
              animate = false;
              break;
          }

          p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame

          var rotateZ = new THREE.Matrix4().set(1,        0,         0,        0,
              0, Math.cos(-p),-Math.sin(-p), 0,
              0, Math.sin(-p), Math.cos(-p), 0,
              0,        0,         0,        1);

          var torsoRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,rotateZ);
          torso.setMatrix(torsoRotMatrix);

          var headRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, headMatrix);
          head.setMatrix(headRotMatrix);

          var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, tailMatrix);
          tail.setMatrix(tailRotMatrix);

          var noseRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, noseMatrix);
          nose.setMatrix(noseRotMatrix);

          var frontRightPawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, frontRightPawMatrix);
          frontRightPawRotMatrix.multiplyMatrices(frontRightPawRotMatrix, rotate20Degrees);
          frontRightPaw.setMatrix(frontRightPawRotMatrix);

          var frontLeftPawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, frontLeftPawMatrix);
          frontLeftPawRotMatrix.multiplyMatrices(frontLeftPawRotMatrix, rotate20Degrees);
          frontLeftPaw.setMatrix(frontLeftPawRotMatrix);

          var backRightPawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, backRightPawMatrix);
          backRightPawRotMatrix.multiplyMatrices(backRightPawRotMatrix, rotate20Degrees);
          backRightPaw.setMatrix(backRightPawRotMatrix);

          var backLeftPawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, backLeftPawMatrix);
          backLeftPawRotMatrix.multiplyMatrices(backLeftPawRotMatrix, rotate20Degrees);
          backLeftPaw.setMatrix(backLeftPawRotMatrix);

          var frontPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(frontRightPawRotMatrix, Claw1Matrix);
          frontRightClaw1.setMatrix(frontPawClaw1RotMatrix);

          var frontPawClaw2RotMatrix = new THREE.Matrix4().multiplyMatrices(frontRightPawRotMatrix, Claw2Matrix);
          frontRightClaw2.setMatrix(frontPawClaw2RotMatrix);

          var frontPawClaw3RotMatrix = new THREE.Matrix4().multiplyMatrices(frontRightPawRotMatrix, Claw3Matrix);
          frontRightClaw3.setMatrix(frontPawClaw3RotMatrix);

          var frontPawClaw4RotMatrix = new THREE.Matrix4().multiplyMatrices(frontRightPawRotMatrix, Claw4Matrix);
          frontRightClaw4.setMatrix(frontPawClaw4RotMatrix);

          var frontPawClaw5RotMatrix = new THREE.Matrix4().multiplyMatrices(frontRightPawRotMatrix, Claw5Matrix);
          frontRightClaw5.setMatrix(frontPawClaw5RotMatrix);

          var frontLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(frontLeftPawRotMatrix, Claw1Matrix);
          frontLeftClaw1.setMatrix(frontLeftPawClaw1RotMatrix);

          var frontLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(frontLeftPawRotMatrix, Claw2Matrix);
          frontLeftClaw2.setMatrix(frontLeftPawClaw1RotMatrix);

          var frontLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(frontLeftPawRotMatrix, Claw3Matrix);
          frontLeftClaw3.setMatrix(frontLeftPawClaw1RotMatrix);

          var frontLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(frontLeftPawRotMatrix, Claw4Matrix);
          frontLeftClaw4.setMatrix(frontLeftPawClaw1RotMatrix);

          var frontLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(frontLeftPawRotMatrix, Claw5Matrix);
          frontLeftClaw5.setMatrix(frontLeftPawClaw1RotMatrix);

          var backRightPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(backRightPawRotMatrix, Claw1Matrix);
          backRightClaw1.setMatrix(backRightPawClaw1RotMatrix);

          var backRightPawClaw2RotMatrix = new THREE.Matrix4().multiplyMatrices(backRightPawRotMatrix, Claw2Matrix);
          backRightClaw2.setMatrix(backRightPawClaw2RotMatrix);

          var backRightPawClaw3RotMatrix = new THREE.Matrix4().multiplyMatrices(backRightPawRotMatrix, Claw3Matrix);
          backRightClaw3.setMatrix(backRightPawClaw3RotMatrix);

          var backRightPawClaw4RotMatrix = new THREE.Matrix4().multiplyMatrices(backRightPawRotMatrix, Claw4Matrix);
          backRightClaw4.setMatrix(backRightPawClaw4RotMatrix);

          var backRightPawClaw5RotMatrix = new THREE.Matrix4().multiplyMatrices(backRightPawRotMatrix, Claw5Matrix);
          backRightClaw5.setMatrix(backRightPawClaw5RotMatrix);

          var backLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(backLeftPawRotMatrix, Claw1Matrix);
          backLeftClaw1.setMatrix(backLeftPawClaw1RotMatrix);

          var backLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(backLeftPawRotMatrix, Claw2Matrix);
          backLeftClaw2.setMatrix(backLeftPawClaw1RotMatrix);

          var backLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(backLeftPawRotMatrix, Claw3Matrix);
          backLeftClaw3.setMatrix(backLeftPawClaw1RotMatrix);

          var backLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(backLeftPawRotMatrix, Claw4Matrix);
          backLeftClaw4.setMatrix(backLeftPawClaw1RotMatrix);

          var backLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(backLeftPawRotMatrix, Claw5Matrix);
          backLeftClaw5.setMatrix(backLeftPawClaw1RotMatrix);

          break;

      // TO-DO: IMPLEMENT JUMPCUT/ANIMATION FOR EACH KEY!
      // Note: Remember spacebar sets jumpcut/animate!
      


    default:
      break;
  }
}

// LISTEN TO KEYBOARD
// Hint: Pay careful attention to how the keys already specified work!
var keyboard = new THREEx.KeyboardState();
var grid_state = false;
var key;
keyboard.domElement.addEventListener('keydown',function(event){
  if (event.repeat)
    return;
  if(keyboard.eventMatches(event,"Z")){  // Z: Reveal/Hide helper grid
    grid_state = !grid_state;
    grid_state? scene.add(grid) : scene.remove(grid);}   
  else if(keyboard.eventMatches(event,"0")){    // 0: Set camera to neutral position, view reset
    camera.position.set(45,0,0);
    camera.lookAt(scene.position);}
  else if(keyboard.eventMatches(event,"U")){ 
    (key == "U")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "U")}
  else if(keyboard.eventMatches(event,"D")){
      (key == "D")? init_animation(p1,p0,time_length) : (init_animation(0,-Math.PI/4,1), key = "D")}


  // TO-DO: BIND KEYS TO YOUR JUMP CUTS AND ANIMATIONS
  // Note: Remember spacebar sets jumpcut/animate! 
  // Hint: Look up "threex.keyboardstate by Jerome Tienne" for more info.



    });

// SETUP UPDATE CALL-BACK
// Hint: It is useful to understand what is being updated here, the effect, and why.
function update() {
  updateBody();

  requestAnimationFrame(update);
  renderer.render(scene,camera);
}

update();