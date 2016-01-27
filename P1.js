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
var headGeometry = Helper.createGeometry(new THREE.Matrix4().set(3,0,0,0, 0,3,0,0, 0,0,2,0, 0,0,0,1));
var noseGeometry = Helper.createGeometry(new THREE.Matrix4().set(2.3,0,0,0, 0,2.3,0,0, 0,0,1,0, 0,0,0,1));
var tailGeometry = Helper.createGeometry(new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,5,0, 0,0,0,1));
var PawGeometry = Helper.createGeometry(new THREE.Matrix4().set(3,0,0,0, 0,1,0,0, 0,0,5,0, 0,0,0,1));
var clawGeometry = Helper.createGeometry(new THREE.Matrix4().set(0.4,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1));
var largeTenticleGeometry = Helper.createGeometry(new THREE.Matrix4().set(0.4,0,0,0, 0,0.4,0,0, 0,0,1,0, 0,0,0,1));
var smallTenticleGeometry = Helper.createGeometry(new THREE.Matrix4().set(0.2,0,0,0, 0,0.2,0,0, 0,0,1.5,0, 0,0,0,1));

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
var ClawMatrices = [];
for(var index = 1; index < 6; index++)
{
    ClawMatrices[index] = new THREE.Matrix4().set(1,0,0,1.4-[index-1]*0.7, 0,1,0,0, 0,0,1,3, 0,0,0,1);
}

//Relative to nose
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
var noseMatrixRelativeToTorso =  Helper.createObjectMatrixRelativeTo(torsoMatrix, noseMatrix, 0,0,0);
var tailMatrixRelativeToTorso =  Helper.createObjectMatrixRelativeTo(torsoMatrix, tailMatrix, 0,0,0);

var frontRightPawMatrixRelativeToTorso = Helper.createObjectMatrixRelativeTo(torsoMatrix, frontRightPawMatrix, Math.PI/9,0,0);
var frontLeftPawMatrixRelativeToTorso = Helper.createObjectMatrixRelativeTo(torsoMatrix, frontLeftPawMatrix, Math.PI/9,0,0);
var backRightPawMatrixRelativeToTorso = Helper.createObjectMatrixRelativeTo(torsoMatrix, backRightPawMatrix, Math.PI/9,0,0);
var backLeftPawMatrixRelativeToTorso = Helper.createObjectMatrixRelativeTo(torsoMatrix, backLeftPawMatrix, Math.PI/9,0,0);

var upLeftLargeTentacleRelativeToNose = Helper.createObjectMatrixRelativeTo(noseMatrixRelativeToTorso, upLeftLargeTentacleMatrix, 0,Math.PI/9,0);
var lowLeftLargeTentacleRelativeToNose = Helper.createObjectMatrixRelativeTo(noseMatrixRelativeToTorso, lowLeftLargeTentacleMatrix, 0,Math.PI/9,0);
var upRightLargeTentacleRelativeToNose = Helper.createObjectMatrixRelativeTo(noseMatrixRelativeToTorso, upRightLargeTentacleMatrix, 0,-Math.PI/9,0);
var lowRightLargeTentacleRelativeToNose = Helper.createObjectMatrixRelativeTo(noseMatrixRelativeToTorso, lowRightLargeTentacleMatrix, 0,-Math.PI/9,0);

var leftSmallTenacleMatricesRelativeToNose = [];
for(var index = 1; index < 10; index++)
{
    leftSmallTenacleMatricesRelativeToNose[index] = Helper.createObjectMatrixRelativeTo(noseMatrixRelativeToTorso, LeftSmallTentacleMatrices[index], -Math.PI/9 + (index - 1)*2*(Math.PI/9)/8 ,Math.PI/9,0);
}

var RightSmallTenacleMatricesRelativeToNose = [];
for(var index = 1; index < 10; index++)
{
    RightSmallTenacleMatricesRelativeToNose[index] = Helper.createObjectMatrixRelativeTo(noseMatrixRelativeToTorso, RightSmallTentacleMatrices[index], -Math.PI/9 + (index - 1)*2*(Math.PI/9)/8 ,-Math.PI/9,0);
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

// TO-DO: INITIALIZE THE REST OF YOUR MATRICES 
// Note: Use of parent attribute is not allowed.
// Hint: Keep hierarchies in mind!   
// Hint: Play around with the headTorsoMatrix values, what changes in the render? Why?         



// CREATE BODY
var torso = Helper.addObjectToScene(torsoGeometry, torsoMatrix, normalMaterial, scene);
var head = Helper.addObjectToScene(headGeometry, headMatrixRelativeToTorso, normalMaterial, scene);
var nose = Helper.addObjectToScene(noseGeometry, noseMatrixRelativeToTorso, normalMaterial, scene);
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

var upLeftLargeTentacle = new THREE.Mesh(largeTenticleGeometry,normalMaterial);
upLeftLargeTentacle.setMatrix(upLeftLargeTentacleRelativeToNose)
scene.add(upLeftLargeTentacle);

var lowLeftLargeTentacle = new THREE.Mesh(largeTenticleGeometry,normalMaterial);
lowLeftLargeTentacle.setMatrix(lowLeftLargeTentacleRelativeToNose)
scene.add(lowLeftLargeTentacle);

var upRightLargeTentacle = new THREE.Mesh(largeTenticleGeometry,normalMaterial);
upRightLargeTentacle.setMatrix(upRightLargeTentacleRelativeToNose)
scene.add(upRightLargeTentacle);

var lowRightLargeTentacle = new THREE.Mesh(largeTenticleGeometry,normalMaterial);
lowRightLargeTentacle.setMatrix(lowRightLargeTentacleRelativeToNose)
scene.add(lowRightLargeTentacle);

var leftSmallTentacle1 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
leftSmallTentacle1.setMatrix(leftSmallTenacleMatricesRelativeToNose[1])
scene.add(leftSmallTentacle1);

var leftSmallTentacle2 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
leftSmallTentacle2.setMatrix(leftSmallTenacleMatricesRelativeToNose[2])
scene.add(leftSmallTentacle2);

var leftSmallTentacle3 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
leftSmallTentacle3.setMatrix(leftSmallTenacleMatricesRelativeToNose[3])
scene.add(leftSmallTentacle3);

var leftSmallTentacle4 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
leftSmallTentacle4.setMatrix(leftSmallTenacleMatricesRelativeToNose[4])
scene.add(leftSmallTentacle4);

var leftSmallTentacle5 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
leftSmallTentacle5.setMatrix(leftSmallTenacleMatricesRelativeToNose[5])
scene.add(leftSmallTentacle5);

var leftSmallTentacle6 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
leftSmallTentacle6.setMatrix(leftSmallTenacleMatricesRelativeToNose[6])
scene.add(leftSmallTentacle6);

var leftSmallTentacle7 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
leftSmallTentacle7.setMatrix(leftSmallTenacleMatricesRelativeToNose[7])
scene.add(leftSmallTentacle7);

var leftSmallTentacle8 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
leftSmallTentacle8.setMatrix(leftSmallTenacleMatricesRelativeToNose[8])
scene.add(leftSmallTentacle8);

var leftSmallTentacle9 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
leftSmallTentacle9.setMatrix(leftSmallTenacleMatricesRelativeToNose[9])
scene.add(leftSmallTentacle9);

var rightSmallTentacle1 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
rightSmallTentacle1.setMatrix(RightSmallTenacleMatricesRelativeToNose[1])
scene.add(rightSmallTentacle1);

var rightSmallTentacle2 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
rightSmallTentacle2.setMatrix(RightSmallTenacleMatricesRelativeToNose[2])
scene.add(rightSmallTentacle2);

var rightSmallTentacle3 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
rightSmallTentacle3.setMatrix(RightSmallTenacleMatricesRelativeToNose[3])
scene.add(rightSmallTentacle3);

var rightSmallTentacle4 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
rightSmallTentacle4.setMatrix(RightSmallTenacleMatricesRelativeToNose[4])
scene.add(rightSmallTentacle4);

var rightSmallTentacle5 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
rightSmallTentacle5.setMatrix(RightSmallTenacleMatricesRelativeToNose[5])
scene.add(rightSmallTentacle5);

var rightSmallTentacle6 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
rightSmallTentacle6.setMatrix(RightSmallTenacleMatricesRelativeToNose[6])
scene.add(rightSmallTentacle6);

var rightSmallTentacle7 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
rightSmallTentacle7.setMatrix(RightSmallTenacleMatricesRelativeToNose[7])
scene.add(rightSmallTentacle7);

var rightSmallTentacle8 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
rightSmallTentacle8.setMatrix(RightSmallTenacleMatricesRelativeToNose[8])
scene.add(rightSmallTentacle8);

var rightSmallTentacle9 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
rightSmallTentacle9.setMatrix(RightSmallTenacleMatricesRelativeToNose[9])
scene.add(rightSmallTentacle9);

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
          frontRightPawRotMatrix.multiplyMatrices(frontRightPawRotMatrix, Helper.createXAxisRotMatrixForDegree(Math.PI/9));
          frontRightPaw.setMatrix(frontRightPawRotMatrix);

          var frontLeftPawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, frontLeftPawMatrix);
          frontLeftPawRotMatrix.multiplyMatrices(frontLeftPawRotMatrix, Helper.createXAxisRotMatrixForDegree(Math.PI/9));
          frontLeftPaw.setMatrix(frontLeftPawRotMatrix);

          var backRightPawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, backRightPawMatrix);
          backRightPawRotMatrix.multiplyMatrices(backRightPawRotMatrix, Helper.createXAxisRotMatrixForDegree(Math.PI/9));
          backRightPaw.setMatrix(backRightPawRotMatrix);

          var backLeftPawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, backLeftPawMatrix);
          backLeftPawRotMatrix.multiplyMatrices(backLeftPawRotMatrix, Helper.createXAxisRotMatrixForDegree(Math.PI/9));
          backLeftPaw.setMatrix(backLeftPawRotMatrix);

          var upLeftLargeTenticleRotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, upLeftLargeTentacleMatrix);
          upLeftLargeTenticleRotMatrix.multiplyMatrices(upLeftLargeTenticleRotMatrix, Helper.createYAxisRotMatrixForDegree(Math.PI/9));
          upLeftLargeTentacle.setMatrix(upLeftLargeTenticleRotMatrix);

          var lowLeftLargeTenticleRotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, lowLeftLargeTentacleMatrix);
          lowLeftLargeTenticleRotMatrix.multiplyMatrices(lowLeftLargeTenticleRotMatrix, Helper.createYAxisRotMatrixForDegree(Math.PI/9));
          lowLeftLargeTentacle.setMatrix(lowLeftLargeTenticleRotMatrix);

          var upRightLargeTenticleRotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, upRightLargeTentacleMatrix);
          upRightLargeTenticleRotMatrix.multiplyMatrices(upRightLargeTenticleRotMatrix, Helper.createYAxisRotMatrixForDegree(-Math.PI/9));
          upRightLargeTentacle.setMatrix(upRightLargeTenticleRotMatrix);

          var lowRightLargeTenticleRotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, lowRightLargeTentacleMatrix);
          lowRightLargeTenticleRotMatrix.multiplyMatrices(lowRightLargeTenticleRotMatrix, Helper.createYAxisRotMatrixForDegree(-Math.PI/9));
          lowRightLargeTentacle.setMatrix(lowRightLargeTenticleRotMatrix);

          var leftSmallTenticle1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacleMatrices[1]);
          leftSmallTenticle1RotMatrix.multiplyMatrices(leftSmallTenticle1RotMatrix, Helper.createYAxisRotMatrixForDegree(Math.PI/9));
          leftSmallTenticle1RotMatrix.multiplyMatrices(leftSmallTenticle1RotMatrix, Helper.createXAxisRotMatrixForDegree(-Math.PI/9));
          leftSmallTentacle1.setMatrix(leftSmallTenticle1RotMatrix);

          var leftSmallTenticle2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacleMatrices[2]);
          leftSmallTenticle2RotMatrix.multiplyMatrices(leftSmallTenticle2RotMatrix, Helper.createYAxisRotMatrixForDegree(Math.PI/9));
          leftSmallTenticle2RotMatrix.multiplyMatrices(leftSmallTenticle2RotMatrix, Helper.createXAxisRotMatrixForDegree(-Math.PI/9 + 2*(Math.PI/9)/8));
          leftSmallTentacle2.setMatrix(leftSmallTenticle2RotMatrix);

          var leftSmallTenticle3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacleMatrices[3]);
          leftSmallTenticle3RotMatrix.multiplyMatrices(leftSmallTenticle3RotMatrix, Helper.createYAxisRotMatrixForDegree(Math.PI/9));
          leftSmallTenticle3RotMatrix.multiplyMatrices(leftSmallTenticle3RotMatrix, Helper.createXAxisRotMatrixForDegree(-Math.PI/9 + 4*(Math.PI/9)/8));
          leftSmallTentacle3.setMatrix(leftSmallTenticle3RotMatrix);

          var leftSmallTenticle4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacleMatrices[4]);
          leftSmallTenticle4RotMatrix.multiplyMatrices(leftSmallTenticle4RotMatrix, Helper.createYAxisRotMatrixForDegree(Math.PI/9));
          leftSmallTenticle4RotMatrix.multiplyMatrices(leftSmallTenticle4RotMatrix, Helper.createXAxisRotMatrixForDegree(-Math.PI/9 + 6*(Math.PI/9)/8));
          leftSmallTentacle4.setMatrix(leftSmallTenticle4RotMatrix);

          var leftSmallTenticle5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacleMatrices[5]);
          leftSmallTenticle5RotMatrix.multiplyMatrices(leftSmallTenticle5RotMatrix, Helper.createYAxisRotMatrixForDegree(Math.PI/9));
          leftSmallTenticle5RotMatrix.multiplyMatrices(leftSmallTenticle5RotMatrix, Helper.createXAxisRotMatrixForDegree(-Math.PI/9 + 8*(Math.PI/9)/8));
          leftSmallTentacle5.setMatrix(leftSmallTenticle5RotMatrix);

          var leftSmallTenticle6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacleMatrices[6]);
          leftSmallTenticle6RotMatrix.multiplyMatrices(leftSmallTenticle6RotMatrix, Helper.createYAxisRotMatrixForDegree(Math.PI/9));
          leftSmallTenticle6RotMatrix.multiplyMatrices(leftSmallTenticle6RotMatrix, Helper.createXAxisRotMatrixForDegree(-Math.PI/9 + 10*(Math.PI/9)/8));
          leftSmallTentacle6.setMatrix(leftSmallTenticle6RotMatrix);

          var leftSmallTenticle7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacleMatrices[7]);
          leftSmallTenticle7RotMatrix.multiplyMatrices(leftSmallTenticle7RotMatrix, Helper.createYAxisRotMatrixForDegree(Math.PI/9));
          leftSmallTenticle7RotMatrix.multiplyMatrices(leftSmallTenticle7RotMatrix, Helper.createXAxisRotMatrixForDegree(-Math.PI/9 + 12*(Math.PI/9)/8));
          leftSmallTentacle7.setMatrix(leftSmallTenticle7RotMatrix);

          var leftSmallTenticle8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacleMatrices[8]);
          leftSmallTenticle8RotMatrix.multiplyMatrices(leftSmallTenticle8RotMatrix, Helper.createYAxisRotMatrixForDegree(Math.PI/9));
          leftSmallTenticle8RotMatrix.multiplyMatrices(leftSmallTenticle8RotMatrix, Helper.createXAxisRotMatrixForDegree(-Math.PI/9 + 14*(Math.PI/9)/8));
          leftSmallTentacle8.setMatrix(leftSmallTenticle8RotMatrix);

          var leftSmallTenticle9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacleMatrices[9]);
          leftSmallTenticle9RotMatrix.multiplyMatrices(leftSmallTenticle9RotMatrix, Helper.createYAxisRotMatrixForDegree(Math.PI/9));
          leftSmallTenticle9RotMatrix.multiplyMatrices(leftSmallTenticle9RotMatrix, Helper.createXAxisRotMatrixForDegree(Math.PI/9));
          leftSmallTentacle9.setMatrix(leftSmallTenticle9RotMatrix);

          var rightSmallTenticle1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacleMatrices[1]);
          rightSmallTenticle1RotMatrix.multiplyMatrices(rightSmallTenticle1RotMatrix, Helper.createYAxisRotMatrixForDegree(-Math.PI/9));
          rightSmallTenticle1RotMatrix.multiplyMatrices(rightSmallTenticle1RotMatrix, Helper.createXAxisRotMatrixForDegree(-Math.PI/9));
          rightSmallTentacle1.setMatrix(rightSmallTenticle1RotMatrix);

          var rightSmallTenticle2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacleMatrices[2]);
          rightSmallTenticle2RotMatrix.multiplyMatrices(rightSmallTenticle2RotMatrix, Helper.createYAxisRotMatrixForDegree(-Math.PI/9));
          rightSmallTenticle2RotMatrix.multiplyMatrices(rightSmallTenticle2RotMatrix, Helper.createXAxisRotMatrixForDegree(-Math.PI/9 + 2*(Math.PI/9)/8));
          rightSmallTentacle2.setMatrix(rightSmallTenticle2RotMatrix);

          var rightSmallTenticle3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacleMatrices[3]);
          rightSmallTenticle3RotMatrix.multiplyMatrices(rightSmallTenticle3RotMatrix, Helper.createYAxisRotMatrixForDegree(-Math.PI/9));
          rightSmallTenticle3RotMatrix.multiplyMatrices(rightSmallTenticle3RotMatrix, Helper.createXAxisRotMatrixForDegree(-Math.PI/9 + 4*(Math.PI/9)/8));
          rightSmallTentacle3.setMatrix(rightSmallTenticle3RotMatrix);

          var rightSmallTenticle4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacleMatrices[4]);
          rightSmallTenticle4RotMatrix.multiplyMatrices(rightSmallTenticle4RotMatrix, Helper.createYAxisRotMatrixForDegree(-Math.PI/9));
          rightSmallTenticle4RotMatrix.multiplyMatrices(rightSmallTenticle4RotMatrix, Helper.createXAxisRotMatrixForDegree(-Math.PI/9 + 6*(Math.PI/9)/8));
          rightSmallTentacle4.setMatrix(rightSmallTenticle4RotMatrix);

          var rightSmallTenticle5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacleMatrices[5]);
          rightSmallTenticle5RotMatrix.multiplyMatrices(rightSmallTenticle5RotMatrix, Helper.createYAxisRotMatrixForDegree(-Math.PI/9));
          rightSmallTenticle5RotMatrix.multiplyMatrices(rightSmallTenticle5RotMatrix, Helper.createXAxisRotMatrixForDegree(-Math.PI/9 + 8*(Math.PI/9)/8));
          rightSmallTentacle5.setMatrix(rightSmallTenticle5RotMatrix);

          var rightSmallTenticle6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacleMatrices[6]);
          rightSmallTenticle6RotMatrix.multiplyMatrices(rightSmallTenticle6RotMatrix, Helper.createYAxisRotMatrixForDegree(-Math.PI/9));
          rightSmallTenticle6RotMatrix.multiplyMatrices(rightSmallTenticle6RotMatrix, Helper.createXAxisRotMatrixForDegree(-Math.PI/9 + 10*(Math.PI/9)/8));
          rightSmallTentacle6.setMatrix(rightSmallTenticle6RotMatrix);

          var rightSmallTenticle7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacleMatrices[7]);
          rightSmallTenticle7RotMatrix.multiplyMatrices(rightSmallTenticle7RotMatrix, Helper.createYAxisRotMatrixForDegree(-Math.PI/9));
          rightSmallTenticle7RotMatrix.multiplyMatrices(rightSmallTenticle7RotMatrix, Helper.createXAxisRotMatrixForDegree(-Math.PI/9 + 12*(Math.PI/9)/8));
          rightSmallTentacle7.setMatrix(rightSmallTenticle7RotMatrix);

          var rightSmallTenticle8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacleMatrices[8]);
          rightSmallTenticle8RotMatrix.multiplyMatrices(rightSmallTenticle8RotMatrix, Helper.createYAxisRotMatrixForDegree(-Math.PI/9));
          rightSmallTenticle8RotMatrix.multiplyMatrices(rightSmallTenticle8RotMatrix, Helper.createXAxisRotMatrixForDegree(-Math.PI/9 + 14*(Math.PI/9)/8));
          rightSmallTentacle8.setMatrix(rightSmallTenticle8RotMatrix);

          var rightSmallTenticle9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacleMatrices[9]);
          rightSmallTenticle9RotMatrix.multiplyMatrices(rightSmallTenticle9RotMatrix, Helper.createYAxisRotMatrixForDegree(-Math.PI/9));
          rightSmallTenticle9RotMatrix.multiplyMatrices(rightSmallTenticle9RotMatrix, Helper.createXAxisRotMatrixForDegree(Math.PI/9));
          rightSmallTentacle9.setMatrix(rightSmallTenticle9RotMatrix);

          var frontRightPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(frontRightPawRotMatrix, ClawMatrices[1]);
          frontRightClaw[1].setMatrix(frontRightPawClaw1RotMatrix);

          var frontRightPawClaw2RotMatrix = new THREE.Matrix4().multiplyMatrices(frontRightPawRotMatrix, ClawMatrices[2]);
          frontRightClaw[2].setMatrix(frontRightPawClaw2RotMatrix);

          var frontRightPawClaw3RotMatrix = new THREE.Matrix4().multiplyMatrices(frontRightPawRotMatrix, ClawMatrices[3]);
          frontRightClaw[3].setMatrix(frontRightPawClaw3RotMatrix);

          var frontRightPawClaw4RotMatrix = new THREE.Matrix4().multiplyMatrices(frontRightPawRotMatrix, ClawMatrices[4]);
          frontRightClaw[4].setMatrix(frontRightPawClaw4RotMatrix);

          var frontRightPawClaw5RotMatrix = new THREE.Matrix4().multiplyMatrices(frontRightPawRotMatrix, ClawMatrices[5]);
          frontRightClaw[5].setMatrix(frontRightPawClaw5RotMatrix);

          var frontLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(frontLeftPawRotMatrix, ClawMatrices[1]);
          frontLeftClaw[1].setMatrix(frontLeftPawClaw1RotMatrix);

          var frontLeftPawClaw2RotMatrix = new THREE.Matrix4().multiplyMatrices(frontLeftPawRotMatrix, ClawMatrices[2]);
          frontLeftClaw[2].setMatrix(frontLeftPawClaw2RotMatrix);

          var frontLeftPawClaw3RotMatrix = new THREE.Matrix4().multiplyMatrices(frontLeftPawRotMatrix, ClawMatrices[3]);
          frontLeftClaw[3].setMatrix(frontLeftPawClaw3RotMatrix);

          var frontLeftPawClaw4RotMatrix = new THREE.Matrix4().multiplyMatrices(frontLeftPawRotMatrix, ClawMatrices[4]);
          frontLeftClaw[4].setMatrix(frontLeftPawClaw4RotMatrix);

          var frontLeftPawClaw5RotMatrix = new THREE.Matrix4().multiplyMatrices(frontLeftPawRotMatrix, ClawMatrices[5]);
          frontLeftClaw[5].setMatrix(frontLeftPawClaw5RotMatrix);

          var backRightPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(backRightPawRotMatrix, ClawMatrices[1]);
          backRightClaw[1].setMatrix(backRightPawClaw1RotMatrix);

          var backRightPawClaw2RotMatrix = new THREE.Matrix4().multiplyMatrices(backRightPawRotMatrix, ClawMatrices[2]);
          backRightClaw[2].setMatrix(backRightPawClaw2RotMatrix);

          var backRightPawClaw3RotMatrix = new THREE.Matrix4().multiplyMatrices(backRightPawRotMatrix, ClawMatrices[3]);
          backRightClaw[3].setMatrix(backRightPawClaw3RotMatrix);

          var backRightPawClaw4RotMatrix = new THREE.Matrix4().multiplyMatrices(backRightPawRotMatrix, ClawMatrices[4]);
          backRightClaw[4].setMatrix(backRightPawClaw4RotMatrix);

          var backRightPawClaw5RotMatrix = new THREE.Matrix4().multiplyMatrices(backRightPawRotMatrix, ClawMatrices[5]);
          backRightClaw[5].setMatrix(backRightPawClaw5RotMatrix);

          var backLeftPawClaw1RotMatrix = new THREE.Matrix4().multiplyMatrices(backLeftPawRotMatrix, ClawMatrices[1]);
          backLeftClaw[1].setMatrix(backLeftPawClaw1RotMatrix);

          var backLeftPawClaw2RotMatrix = new THREE.Matrix4().multiplyMatrices(backLeftPawRotMatrix, ClawMatrices[2]);
          backLeftClaw[2].setMatrix(backLeftPawClaw2RotMatrix);

          var backLeftPawClaw3RotMatrix = new THREE.Matrix4().multiplyMatrices(backLeftPawRotMatrix, ClawMatrices[3]);
          backLeftClaw[3].setMatrix(backLeftPawClaw3RotMatrix);

          var backLeftPawClaw4RotMatrix = new THREE.Matrix4().multiplyMatrices(backLeftPawRotMatrix, ClawMatrices[4]);
          backLeftClaw[4].setMatrix(backLeftPawClaw4RotMatrix);

          var backLeftPawClaw5RotMatrix = new THREE.Matrix4().multiplyMatrices(backLeftPawRotMatrix, ClawMatrices[5]);
          backLeftClaw[5].setMatrix(backLeftPawClaw5RotMatrix);

          break;

      //Body tilt down
      case(key == "D" && animate):


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