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
var torsoGeometry = Helper.createGeometry(new THREE.Matrix4().set(5,0,0,0, 0,5,0,0, 0,0,8,0, 0,0,0,1));
var headGeometry = Helper.createGeometry(new THREE.Matrix4().set(3.5,0,0,0, 0,3.5,0,0, 0,0,2,0, 0,0,0,1));
var noseGeometry = Helper.createGeometry(new THREE.Matrix4().set(2.3,0,0,0, 0,2.3,0,0, 0,0,1,0, 0,0,0,1));
var tailGeometry = Helper.createGeometry(new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,7,0, 0,0,0,1));
var PawGeometry = Helper.createGeometry(new THREE.Matrix4().set(3,0,0,0, 0,1,0,0, 0,0,5,0, 0,0,0,1));
var clawGeometry = Helper.createGeometry(new THREE.Matrix4().set(0.4,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1));
var largeTenticleGeometry = Helper.createGeometry(new THREE.Matrix4().set(0.4,0,0,0, 0,0.4,0,0, 0,0,1,0, 0,0,0,1));
var smallTenticleGeometry = Helper.createGeometry(new THREE.Matrix4().set(0.2,0,0,0, 0,0.2,0,0, 0,0,1.5,0, 0,0,0,1));

// MATRICES: Specifies the location

var torsoMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,10, 0,0,1,0, 0,0,0,1);
var headMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,4.25, 0,0,0,1);
var noseMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,1.5, 0,0,0,1);
var tailMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,-3.5, 0,0,0,1);

var frontRightPawMatrix = new THREE.Matrix4().set(1,0,0,-2.5, 0,1,0,-2.5, 0,0,1,4, 0,0,0,1);
var frontLeftPawMatrix = new THREE.Matrix4().set(1,0,0,2.5, 0,1,0,-2.5, 0,0,1,4, 0,0,0,1);
var backRightPawMatrix = new THREE.Matrix4().set(1,0,0,-2.5, 0,1,0,-3.5, 0,0,1,-2, 0,0,0,1);
var backLeftPawMatrix = new THREE.Matrix4().set(1,0,0,2.5, 0,1,0,-3.5, 0,0,1,-2, 0,0,0,1);

var ClawMatrices = [];
for(var index = 1; index < 6; index++)
{
    ClawMatrices[index] = new THREE.Matrix4().set(1,0,0,1.4-[index-1]*0.7, 0,1,0,0, 0,0,1,3, 0,0,0,1);
}

var upLeftLargeTentacleMatrix = new THREE.Matrix4().set(1,0,0,0.5, 0,1,0,0.5, 0,0,1,1, 0,0,0,1);
var lowLeftLargeTentacleMatrix = new THREE.Matrix4().set(1,0,0,0.5, 0,1,0,-0.5, 0,0,1,1, 0,0,0,1);
var upRightLargeTentacleMatrix = new THREE.Matrix4().set(1,0,0,-0.5, 0,1,0,0.5, 0,0,1,1, 0,0,0,1);
var lowRightLargeTentacleMatrix = new THREE.Matrix4().set(1,0,0,-0.5, 0,1,0,-0.5, 0,0,1,1, 0,0,0,1);

var LeftSmallTentacleMatrices = [];
for(var index = 1; index < 10; index++)
{
    LeftSmallTentacleMatrices[index] = new THREE.Matrix4().set(1,0,0,1.0, 0,1,0,1.0 - (index-1)/4, 0,0,1,1.2, 0,0,0,1);
}

var RightSmallTentacleMatrices = [];
for(var index = 1; index < 10; index++)
{
    RightSmallTentacleMatrices[index] = new THREE.Matrix4().set(1,0,0,-1.0, 0,1,0,1.0 - (index-1)/4, 0,0,1,1.2, 0,0,0,1);
}


var headMatrixRelativeToTorso =  Helper.createObjectMatrixRelativeTo(torsoMatrix, headMatrix, 0,0,0);
var noseMatrixRelativeToHead =  Helper.createObjectMatrixRelativeTo(headMatrixRelativeToTorso, noseMatrix, 0,0,0);
var tailMatrixRelativeToTorso =  Helper.createObjectMatrixRelativeTo(torsoMatrix, tailMatrix, 0,0,0);

var frontRightPawMatrixRelativeToTorso = Helper.createObjectMatrixRelativeTo(torsoMatrix, frontRightPawMatrix, Math.PI/9,0,0);
var frontLeftPawMatrixRelativeToTorso = Helper.createObjectMatrixRelativeTo(torsoMatrix, frontLeftPawMatrix, Math.PI/9,0,0);
var backRightPawMatrixRelativeToTorso = Helper.createObjectMatrixRelativeTo(torsoMatrix, backRightPawMatrix, Math.PI/9,0,0);
var backLeftPawMatrixRelativeToTorso = Helper.createObjectMatrixRelativeTo(torsoMatrix, backLeftPawMatrix, Math.PI/9,0,0);

var upLeftLargeTentacleRelativeToNose = Helper.createObjectMatrixRelativeTo(noseMatrixRelativeToHead, upLeftLargeTentacleMatrix, 0,Math.PI/9,0);
var lowLeftLargeTentacleRelativeToNose = Helper.createObjectMatrixRelativeTo(noseMatrixRelativeToHead, lowLeftLargeTentacleMatrix, 0,Math.PI/9,0);
var upRightLargeTentacleRelativeToNose = Helper.createObjectMatrixRelativeTo(noseMatrixRelativeToHead, upRightLargeTentacleMatrix, 0,-Math.PI/9,0);
var lowRightLargeTentacleRelativeToNose = Helper.createObjectMatrixRelativeTo(noseMatrixRelativeToHead, lowRightLargeTentacleMatrix, 0,-Math.PI/9,0);

var leftSmallTenacleMatricesRelativeToNose = [];
for(var index = 1; index < 10; index++)
{
    leftSmallTenacleMatricesRelativeToNose[index] = Helper.createObjectMatrixRelativeTo(noseMatrixRelativeToHead, LeftSmallTentacleMatrices[index], -Math.PI/9 + (index - 1)*2*(Math.PI/9)/8 ,Math.PI/9,0);
}

var RightSmallTenacleMatricesRelativeToNose = [];
for(var index = 1; index < 10; index++)
{
    RightSmallTenacleMatricesRelativeToNose[index] = Helper.createObjectMatrixRelativeTo(noseMatrixRelativeToHead, RightSmallTentacleMatrices[index], -Math.PI/9 + (index - 1)*2*(Math.PI/9)/8 ,-Math.PI/9,0);
}

var frontRightClawRelativeToPaw = [];
var frontLeftClawRelativeToPaw = [];
var backLeftClawRelativeToPaw = [];
var backRightClawRelativeToPaw = [];

for(var index = 1; index < 6; index++)
{
    frontRightClawRelativeToPaw[index] =  new THREE.Matrix4().multiplyMatrices(frontRightPawMatrixRelativeToTorso, ClawMatrices[index]);
    frontLeftClawRelativeToPaw[index] = new THREE.Matrix4().multiplyMatrices(frontLeftPawMatrixRelativeToTorso, ClawMatrices[index]);
    backLeftClawRelativeToPaw[index] = new THREE.Matrix4().multiplyMatrices(backLeftPawMatrixRelativeToTorso, ClawMatrices[index]);
    backRightClawRelativeToPaw[index] = new THREE.Matrix4().multiplyMatrices(backRightPawMatrixRelativeToTorso, ClawMatrices[index]);
}

// CREATE BODY
var torso = Helper.addObjectToScene(torsoGeometry, torsoMatrix, normalMaterial, scene);
var head = Helper.addObjectToScene(headGeometry, headMatrixRelativeToTorso, normalMaterial, scene);
var nose = Helper.addObjectToScene(noseGeometry, noseMatrixRelativeToHead, normalMaterial, scene);
var tail = Helper.addObjectToScene(tailGeometry, tailMatrixRelativeToTorso, normalMaterial, scene);
var frontRightPaw = Helper.addObjectToScene(PawGeometry, frontRightPawMatrixRelativeToTorso, normalMaterial, scene);
var frontLeftPaw = Helper.addObjectToScene(PawGeometry, frontLeftPawMatrixRelativeToTorso, normalMaterial, scene);
var backRightPaw = Helper.addObjectToScene(PawGeometry, backRightPawMatrixRelativeToTorso, normalMaterial, scene);
var backLeftPaw = Helper.addObjectToScene(PawGeometry, backLeftPawMatrixRelativeToTorso, normalMaterial, scene);

var frontRightClaw = [];
var frontLeftClaw = [];
var backRightClaw = [];
var backLeftClaw = [];

for(var index = 1; index < 6; index++)
{
    frontRightClaw[index] = Helper.addObjectToScene(clawGeometry, frontRightClawRelativeToPaw[index], normalMaterial, scene);
    frontLeftClaw[index] = Helper.addObjectToScene(clawGeometry, frontLeftClawRelativeToPaw[index], normalMaterial, scene);
    backRightClaw[index] = Helper.addObjectToScene(clawGeometry, backRightClawRelativeToPaw[index], normalMaterial, scene);
    backLeftClaw[index] = Helper.addObjectToScene(clawGeometry, backLeftClawRelativeToPaw[index], normalMaterial, scene);
}

var upLeftLargeTentacle = Helper.addObjectToScene(largeTenticleGeometry, upLeftLargeTentacleRelativeToNose, normalMaterial, scene);
var lowLeftLargeTentacle = Helper.addObjectToScene(largeTenticleGeometry, lowLeftLargeTentacleRelativeToNose, normalMaterial, scene);
var upRightLargeTentacle = Helper.addObjectToScene(largeTenticleGeometry, upRightLargeTentacleRelativeToNose, normalMaterial, scene);
var lowRightLargeTentacle = Helper.addObjectToScene(largeTenticleGeometry, lowRightLargeTentacleRelativeToNose, normalMaterial, scene);

var leftSmallTentacles = [];
var rightSmallTentacles = [];

for(var index = 1; index < 10; index++)
{
    leftSmallTentacles[index] = Helper.addObjectToScene(smallTenticleGeometry, leftSmallTenacleMatricesRelativeToNose[index], normalMaterial, scene);
    rightSmallTentacles[index] = Helper.addObjectToScene(smallTenticleGeometry, RightSmallTenacleMatricesRelativeToNose[index], normalMaterial, scene);
}


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

var torsoRotMatrix;
var headRotMatrix;
var noseRotMatrix;

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

          torsoRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,rotateZ);
          torso.setMatrix(torsoRotMatrix);

          headRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, headMatrix);
          head.setMatrix(headRotMatrix);

          var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, tailMatrix);
          tail.setMatrix(tailRotMatrix);

          noseRotMatrix = new THREE.Matrix4().multiplyMatrices(headRotMatrix, noseMatrix);
          nose.setMatrix(noseRotMatrix);

          var frontRightPawRotMatrix = Helper.createObjectMatrixRelativeTo(torsoRotMatrix, frontRightPawMatrix, Math.PI/9,0,0);
          frontRightPaw.setMatrix(frontRightPawRotMatrix);

          var frontLeftPawRotMatrix = Helper.createObjectMatrixRelativeTo(torsoRotMatrix, frontLeftPawMatrix, Math.PI/9,0,0);
          frontLeftPaw.setMatrix(frontLeftPawRotMatrix);

          var backRightPawRotMatrix = Helper.createObjectMatrixRelativeTo(torsoRotMatrix, backRightPawMatrix, Math.PI/9,0,0);
          backRightPaw.setMatrix(backRightPawRotMatrix);

          var backLeftPawRotMatrix = Helper.createObjectMatrixRelativeTo(torsoRotMatrix, backLeftPawMatrix, Math.PI/9,0,0);
          backLeftPaw.setMatrix(backLeftPawRotMatrix);

          var upLeftLargeTenticleRotMatrix = Helper.createObjectMatrixRelativeTo(noseRotMatrix, upLeftLargeTentacleMatrix, 0,Math.PI/9,0);
          upLeftLargeTentacle.setMatrix(upLeftLargeTenticleRotMatrix);

          var lowLeftLargeTenticleRotMatrix = Helper.createObjectMatrixRelativeTo(noseRotMatrix, lowLeftLargeTentacleMatrix, 0,Math.PI/9,0);
          lowLeftLargeTentacle.setMatrix(lowLeftLargeTenticleRotMatrix);

          var upRightLargeTenticleRotMatrix = Helper.createObjectMatrixRelativeTo(noseRotMatrix, upRightLargeTentacleMatrix, 0,-Math.PI/9,0);
          upRightLargeTentacle.setMatrix(upRightLargeTenticleRotMatrix);

          var lowRightLargeTenticleRotMatrix = Helper.createObjectMatrixRelativeTo(noseRotMatrix, lowRightLargeTentacleMatrix, 0,-Math.PI/9,0);
          lowRightLargeTentacle.setMatrix(lowRightLargeTenticleRotMatrix);

          for(var index = 1; index < 10; index++)
          {
              var leftSmallTenticleRotMatrix =  Helper.createObjectMatrixRelativeTo(noseRotMatrix, LeftSmallTentacleMatrices[index], -Math.PI / 9 + 2*(index - 1) * (Math.PI / 9) / 8, Math.PI/9,0);
              leftSmallTentacles[index].setMatrix(leftSmallTenticleRotMatrix);

              var rightSmallTenticleRotMatrix = Helper.createObjectMatrixRelativeTo(noseRotMatrix, RightSmallTentacleMatrices[index], -Math.PI / 9 + 2*(index - 1) * (Math.PI / 9) / 8, -Math.PI/9,0);
              rightSmallTentacles[index].setMatrix(rightSmallTenticleRotMatrix);
          }

          for(var index = 1; index < 6; index++)
          {
              frontRightClaw[index].setMatrix(new THREE.Matrix4().multiplyMatrices(frontRightPawRotMatrix, ClawMatrices[index]));
              frontLeftClaw[index].setMatrix(new THREE.Matrix4().multiplyMatrices(frontLeftPawRotMatrix, ClawMatrices[index]));
              backRightClaw[index].setMatrix(new THREE.Matrix4().multiplyMatrices(backRightPawRotMatrix, ClawMatrices[index]));
              backLeftClaw[index].setMatrix(new THREE.Matrix4().multiplyMatrices(backLeftPawRotMatrix, ClawMatrices[index]));
          }

          break;

      //Body tilt down
      case(key == "E" && animate):
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

          torsoRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,rotateZ);
          torso.setMatrix(torsoRotMatrix);

          headRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, headMatrix);
          head.setMatrix(headRotMatrix);

          var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, tailMatrix);
          tail.setMatrix(tailRotMatrix);

          noseRotMatrix = new THREE.Matrix4().multiplyMatrices(headRotMatrix, noseMatrix);
          nose.setMatrix(noseRotMatrix);

          var frontRightPawRotMatrix = Helper.createObjectMatrixRelativeTo(torsoRotMatrix, frontRightPawMatrix, Math.PI/9,0,0);
          frontRightPaw.setMatrix(frontRightPawRotMatrix);

          var frontLeftPawRotMatrix = Helper.createObjectMatrixRelativeTo(torsoRotMatrix, frontLeftPawMatrix, Math.PI/9,0,0);
          frontLeftPaw.setMatrix(frontLeftPawRotMatrix);

          var backRightPawRotMatrix = Helper.createObjectMatrixRelativeTo(torsoRotMatrix, backRightPawMatrix, Math.PI/9,0,0);
          backRightPaw.setMatrix(backRightPawRotMatrix);

          var backLeftPawRotMatrix = Helper.createObjectMatrixRelativeTo(torsoRotMatrix, backLeftPawMatrix, Math.PI/9,0,0);
          backLeftPaw.setMatrix(backLeftPawRotMatrix);

          var upLeftLargeTenticleRotMatrix = Helper.createObjectMatrixRelativeTo(noseRotMatrix, upLeftLargeTentacleMatrix, 0,Math.PI/9,0);
          upLeftLargeTentacle.setMatrix(upLeftLargeTenticleRotMatrix);

          var lowLeftLargeTenticleRotMatrix = Helper.createObjectMatrixRelativeTo(noseRotMatrix, lowLeftLargeTentacleMatrix, 0,Math.PI/9,0);
          lowLeftLargeTentacle.setMatrix(lowLeftLargeTenticleRotMatrix);

          var upRightLargeTenticleRotMatrix = Helper.createObjectMatrixRelativeTo(noseRotMatrix, upRightLargeTentacleMatrix, 0,-Math.PI/9,0);
          upRightLargeTentacle.setMatrix(upRightLargeTenticleRotMatrix);

          var lowRightLargeTenticleRotMatrix = Helper.createObjectMatrixRelativeTo(noseRotMatrix, lowRightLargeTentacleMatrix, 0,-Math.PI/9,0);
          lowRightLargeTentacle.setMatrix(lowRightLargeTenticleRotMatrix);

          for(var index = 1; index < 10; index++)
          {
              var leftSmallTenticleRotMatrix =  Helper.createObjectMatrixRelativeTo(noseRotMatrix, LeftSmallTentacleMatrices[index], -Math.PI / 9 + 2*(index - 1) * (Math.PI / 9) / 8, Math.PI/9,0);
              leftSmallTentacles[index].setMatrix(leftSmallTenticleRotMatrix);

              var rightSmallTenticleRotMatrix = Helper.createObjectMatrixRelativeTo(noseRotMatrix, RightSmallTentacleMatrices[index], -Math.PI / 9 + 2*(index - 1) * (Math.PI / 9) / 8, -Math.PI/9,0);
              rightSmallTentacles[index].setMatrix(rightSmallTenticleRotMatrix);
          }

          for(var index = 1; index < 6; index++)
          {
              frontRightClaw[index].setMatrix(new THREE.Matrix4().multiplyMatrices(frontRightPawRotMatrix, ClawMatrices[index]));
              frontLeftClaw[index].setMatrix(new THREE.Matrix4().multiplyMatrices(frontLeftPawRotMatrix, ClawMatrices[index]));
              backRightClaw[index].setMatrix(new THREE.Matrix4().multiplyMatrices(backRightPawRotMatrix, ClawMatrices[index]));
              backLeftClaw[index].setMatrix(new THREE.Matrix4().multiplyMatrices(backLeftPawRotMatrix, ClawMatrices[index]));
          }

          break;

      //Head move right
      case(key == "H" && animate):
          var time = clock.getElapsedTime(); // t seconds passed since the clock started.

          if (time > time_end){
              p = p1;
              animate = false;
              break;
          }

          p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame

          headRotMatrix = Helper.createObjectMatrixRelativeTo( null != torsoRotMatrix ? torsoRotMatrix:torsoMatrix, headMatrix, 0,p,0);
          head.setMatrix(headRotMatrix);

          noseRotMatrix = new THREE.Matrix4().multiplyMatrices(headRotMatrix, noseMatrix);
          nose.setMatrix(noseRotMatrix);

          var upLeftLargeTenticleRotMatrix = Helper.createObjectMatrixRelativeTo(noseRotMatrix, upLeftLargeTentacleMatrix, 0,Math.PI/9,0);
          upLeftLargeTentacle.setMatrix(upLeftLargeTenticleRotMatrix);

          var lowLeftLargeTenticleRotMatrix = Helper.createObjectMatrixRelativeTo(noseRotMatrix, lowLeftLargeTentacleMatrix, 0,Math.PI/9,0);
          lowLeftLargeTentacle.setMatrix(lowLeftLargeTenticleRotMatrix);

          var upRightLargeTenticleRotMatrix = Helper.createObjectMatrixRelativeTo(noseRotMatrix, upRightLargeTentacleMatrix, 0,-Math.PI/9,0);
          upRightLargeTentacle.setMatrix(upRightLargeTenticleRotMatrix);

          var lowRightLargeTenticleRotMatrix = Helper.createObjectMatrixRelativeTo(noseRotMatrix, lowRightLargeTentacleMatrix, 0,-Math.PI/9,0);
          lowRightLargeTentacle.setMatrix(lowRightLargeTenticleRotMatrix);

          for(var index = 1; index < 10; index++)
          {
              var leftSmallTenticleRotMatrix =  Helper.createObjectMatrixRelativeTo(noseRotMatrix, LeftSmallTentacleMatrices[index], -Math.PI / 9 + 2*(index - 1) * (Math.PI / 9) / 8, Math.PI/9,0);
              leftSmallTentacles[index].setMatrix(leftSmallTenticleRotMatrix);

              var rightSmallTenticleRotMatrix = Helper.createObjectMatrixRelativeTo(noseRotMatrix, RightSmallTentacleMatrices[index], -Math.PI / 9 + 2*(index - 1) * (Math.PI / 9) / 8, -Math.PI/9,0);
              rightSmallTentacles[index].setMatrix(rightSmallTenticleRotMatrix);
          }

          break;

      //Head move left
      case(key == "G" && animate):
          var time = clock.getElapsedTime(); // t seconds passed since the clock started.

          if (time > time_end){
              p = p1;
              animate = false;
              break;
          }

          p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame

          headRotMatrix = Helper.createObjectMatrixRelativeTo(null != torsoRotMatrix ? torsoRotMatrix:torsoMatrix, headMatrix, 0,p,0);
          head.setMatrix(headRotMatrix);

          noseRotMatrix = new THREE.Matrix4().multiplyMatrices(headRotMatrix, noseMatrix);
          nose.setMatrix(noseRotMatrix);

          var upLeftLargeTenticleRotMatrix = Helper.createObjectMatrixRelativeTo(noseRotMatrix, upLeftLargeTentacleMatrix, 0,Math.PI/9,0);
          upLeftLargeTentacle.setMatrix(upLeftLargeTenticleRotMatrix);

          var lowLeftLargeTenticleRotMatrix = Helper.createObjectMatrixRelativeTo(noseRotMatrix, lowLeftLargeTentacleMatrix, 0,Math.PI/9,0);
          lowLeftLargeTentacle.setMatrix(lowLeftLargeTenticleRotMatrix);

          var upRightLargeTenticleRotMatrix = Helper.createObjectMatrixRelativeTo(noseRotMatrix, upRightLargeTentacleMatrix, 0,-Math.PI/9,0);
          upRightLargeTentacle.setMatrix(upRightLargeTenticleRotMatrix);

          var lowRightLargeTenticleRotMatrix = Helper.createObjectMatrixRelativeTo(noseRotMatrix, lowRightLargeTentacleMatrix, 0,-Math.PI/9,0);
          lowRightLargeTentacle.setMatrix(lowRightLargeTenticleRotMatrix);

          for(var index = 1; index < 10; index++)
          {
              var leftSmallTenticleRotMatrix =  Helper.createObjectMatrixRelativeTo(noseRotMatrix, LeftSmallTentacleMatrices[index], -Math.PI / 9 + 2*(index - 1) * (Math.PI / 9) / 8, Math.PI/9,0);
              leftSmallTentacles[index].setMatrix(leftSmallTenticleRotMatrix);

              var rightSmallTenticleRotMatrix = Helper.createObjectMatrixRelativeTo(noseRotMatrix, RightSmallTentacleMatrices[index], -Math.PI / 9 + 2*(index - 1) * (Math.PI / 9) / 8, -Math.PI/9,0);
              rightSmallTentacles[index].setMatrix(rightSmallTenticleRotMatrix);
          }

          break;

      //Tail move right
      case(key == "T" && animate):
          var time = clock.getElapsedTime(); // t seconds passed since the clock started.

          if (time > time_end){
              p = p1;
              animate = false;
              break;
          }

          p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame

          var tailRotMatrix = Helper.createObjectMatrixRelativeTo(null != torsoRotMatrix ? torsoRotMatrix:torsoMatrix, tailMatrix, 0,p,0);
          tail.setMatrix(tailRotMatrix);

      //Tail move left
      case(key == "V" && animate):
          var time = clock.getElapsedTime(); // t seconds passed since the clock started.

          if (time > time_end){
              p = p1;
              animate = false;
              break;
          }

          p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame

          var tailRotMatrix = Helper.createObjectMatrixRelativeTo(null != torsoRotMatrix ? torsoRotMatrix:torsoMatrix, tailMatrix, 0,p,0);
          tail.setMatrix(tailRotMatrix);

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
  else if(keyboard.eventMatches(event,"E")){
      (key == "E")? init_animation(p1,p0,time_length) : (init_animation(0,-Math.PI/4,1), key = "E")}
  else if(keyboard.eventMatches(event,"H")){
      (key == "H")? init_animation(p1,p0,time_length) : (init_animation(0,-Math.PI/4,1), key = "H")}
  else if(keyboard.eventMatches(event,"G")){
      (key == "G")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "G")}
  else if(keyboard.eventMatches(event,"T")){
      (key == "T")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/6,1), key = "T")}
  else if(keyboard.eventMatches(event,"V")){
      (key == "V")? init_animation(p1,p0,time_length) : (init_animation(0,-Math.PI/6,1), key = "V")}


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