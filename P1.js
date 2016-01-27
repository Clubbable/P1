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
var noseScale = new THREE.Matrix4().set(2.3,0,0,0, 0,2.3,0,0, 0,0,1,0, 0,0,0,1);
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

var smallTenticleGeometry = makeCube();
var smallTenticleScale = new THREE.Matrix4().set(0.2,0,0,0, 0,0.2,0,0, 0,0,1.5,0, 0,0,0,1);
smallTenticleGeometry.applyMatrix(smallTenticleScale);

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
var lowLeftLargeTentacleMatrix = new THREE.Matrix4().set(1,0,0,0.5, 0,1,0,-0.5, 0,0,1,1, 0,0,0,1);
var upRightLargeTentacleMatrix = new THREE.Matrix4().set(1,0,0,-0.5, 0,1,0,0.5, 0,0,1,1, 0,0,0,1);
var lowRightLargeTentacleMatrix = new THREE.Matrix4().set(1,0,0,-0.5, 0,1,0,-0.5, 0,0,1,1, 0,0,0,1);

var LeftSmallTentacle1Matrix =  new THREE.Matrix4().set(1,0,0,1.0, 0,1,0,1.0, 0,0,1,1.2, 0,0,0,1);
var LeftSmallTentacle2Matrix =  new THREE.Matrix4().set(1,0,0,1.0, 0,1,0,1.0 - 2.0/8, 0,0,1,1.2, 0,0,0,1);
var LeftSmallTentacle3Matrix =  new THREE.Matrix4().set(1,0,0,1.0, 0,1,0,1.0 - 4.0/8, 0,0,1,1.2, 0,0,0,1);
var LeftSmallTentacle4Matrix =  new THREE.Matrix4().set(1,0,0,1.0, 0,1,0,1.0 - 6.0/8, 0,0,1,1.2, 0,0,0,1);
var LeftSmallTentacle5Matrix =  new THREE.Matrix4().set(1,0,0,1.0, 0,1,0,1.0 - 8.0/8, 0,0,1,1.2, 0,0,0,1);
var LeftSmallTentacle6Matrix =  new THREE.Matrix4().set(1,0,0,1.0, 0,1,0,1.0 - 10.0/8, 0,0,1,1.2, 0,0,0,1);
var LeftSmallTentacle7Matrix =  new THREE.Matrix4().set(1,0,0,1.0, 0,1,0,1.0 - 12.0/8, 0,0,1,1.2, 0,0,0,1);
var LeftSmallTentacle8Matrix =  new THREE.Matrix4().set(1,0,0,1.0, 0,1,0,1.0 - 14.0/8, 0,0,1,1.2, 0,0,0,1);
var LeftSmallTentacle9Matrix =  new THREE.Matrix4().set(1,0,0,1.0, 0,1,0,1.0 - 16.0/8, 0,0,1,1.2, 0,0,0,1);

var RightSmallTentacle1Matrix =  new THREE.Matrix4().set(1,0,0,-1.0, 0,1,0,1.0, 0,0,1,1.2, 0,0,0,1);
var RightSmallTentacle2Matrix =  new THREE.Matrix4().set(1,0,0,-1.0, 0,1,0,1.0 - 2.0/8, 0,0,1,1.2, 0,0,0,1);
var RightSmallTentacle3Matrix =  new THREE.Matrix4().set(1,0,0,-1.0, 0,1,0,1.0 - 4.0/8, 0,0,1,1.2, 0,0,0,1);
var RightSmallTentacle4Matrix =  new THREE.Matrix4().set(1,0,0,-1.0, 0,1,0,1.0 - 6.0/8, 0,0,1,1.2, 0,0,0,1);
var RightSmallTentacle5Matrix =  new THREE.Matrix4().set(1,0,0,-1.0, 0,1,0,1.0 - 8.0/8, 0,0,1,1.2, 0,0,0,1);
var RightSmallTentacle6Matrix =  new THREE.Matrix4().set(1,0,0,-1.0, 0,1,0,1.0 - 10.0/8, 0,0,1,1.2, 0,0,0,1);
var RightSmallTentacle7Matrix =  new THREE.Matrix4().set(1,0,0,-1.0, 0,1,0,1.0 - 12.0/8, 0,0,1,1.2, 0,0,0,1);
var RightSmallTentacle8Matrix =  new THREE.Matrix4().set(1,0,0,-1.0, 0,1,0,1.0 - 14.0/8, 0,0,1,1.2, 0,0,0,1);
var RightSmallTentacle9Matrix =  new THREE.Matrix4().set(1,0,0,-1.0, 0,1,0,1.0 - 16.0/8, 0,0,1,1.2, 0,0,0,1);


var headMatrixRelativeToTorso =  new THREE.Matrix4().multiplyMatrices(torsoMatrix, headMatrix);
var noseMatrixRelativeToTorso =  new THREE.Matrix4().multiplyMatrices(torsoMatrix, noseMatrix);
var tailMatrixRelativeToTorso =  new THREE.Matrix4().multiplyMatrices(torsoMatrix, tailMatrix);

//Around x axis
var rotate20Degrees = new THREE.Matrix4().set(  1,        0,         0,        0,
                                        0, Math.cos(Math.PI/9),-Math.sin(Math.PI/9), 0,
                                        0, Math.sin(Math.PI/9), Math.cos(Math.PI/9), 0,
                                        0,        0,         0,        1);

var rotate20Degrees4 = new THREE.Matrix4().set(  1,        0,         0,        0,
                                                0, Math.cos(-Math.PI/9),-Math.sin(-Math.PI/9), 0,
                                                0, Math.sin(-Math.PI/9), Math.cos(-Math.PI/9), 0,
                                                0,        0,         0,        1);

var rotate20Degrees5 = new THREE.Matrix4().set(  1,        0,         0,        0,
    0, Math.cos(-Math.PI/9 + 2*(Math.PI/9)/8),-Math.sin(-Math.PI/9 + 2*(Math.PI/9)/8), 0,
    0, Math.sin(-Math.PI/9 + 2*(Math.PI/9)/8), Math.cos(-Math.PI/9 + 2*(Math.PI/9)/8), 0,
    0,        0,         0,        1);

var rotate20Degrees6 = new THREE.Matrix4().set(  1,        0,         0,        0,
    0, Math.cos(-Math.PI/9 + 4*(Math.PI/9)/8),-Math.sin(-Math.PI/9 + 4*(Math.PI/9)/8), 0,
    0, Math.sin(-Math.PI/9 + 4*(Math.PI/9)/8), Math.cos(-Math.PI/9 + 4*(Math.PI/9)/8), 0,
    0,        0,         0,        1);

var rotate20Degrees7 = new THREE.Matrix4().set(  1,        0,         0,        0,
    0, Math.cos(-Math.PI/9 + 6*(Math.PI/9)/8),-Math.sin(-Math.PI/9 + 6*(Math.PI/9)/8), 0,
    0, Math.sin(-Math.PI/9 + 6*(Math.PI/9)/8), Math.cos(-Math.PI/9 + 6*(Math.PI/9)/8), 0,
    0,        0,         0,        1);

var rotate20Degrees8 = new THREE.Matrix4().set(  1,        0,         0,        0,
    0, Math.cos(-Math.PI/9 + 8*(Math.PI/9)/8),-Math.sin(-Math.PI/9 + 8*(Math.PI/9)/8), 0,
    0, Math.sin(-Math.PI/9 + 8*(Math.PI/9)/8), Math.cos(-Math.PI/9 + 8*(Math.PI/9)/8), 0,
    0,        0,         0,        1);

var rotate20Degrees9 = new THREE.Matrix4().set(  1,        0,         0,        0,
    0, Math.cos(-Math.PI/9 + 10*(Math.PI/9)/8),-Math.sin(-Math.PI/9 + 10*(Math.PI/9)/8), 0,
    0, Math.sin(-Math.PI/9 + 10*(Math.PI/9)/8), Math.cos(-Math.PI/9 + 10*(Math.PI/9)/8), 0,
    0,        0,         0,        1);

var rotate20Degrees10 = new THREE.Matrix4().set(  1,        0,         0,        0,
    0, Math.cos(-Math.PI/9 + 12*(Math.PI/9)/8),-Math.sin(-Math.PI/9 + 12*(Math.PI/9)/8), 0,
    0, Math.sin(-Math.PI/9 + 12*(Math.PI/9)/8), Math.cos(-Math.PI/9 + 12*(Math.PI/9)/8), 0,
    0,        0,         0,        1);

var rotate20Degrees11 = new THREE.Matrix4().set(  1,        0,         0,        0,
    0, Math.cos(-Math.PI/9 + 14*(Math.PI/9)/8),-Math.sin(-Math.PI/9 + 14*(Math.PI/9)/8), 0,
    0, Math.sin(-Math.PI/9 + 14*(Math.PI/9)/8), Math.cos(-Math.PI/9 + 14*(Math.PI/9)/8), 0,
    0,        0,         0,        1);

var rotate20Degrees12 = new THREE.Matrix4().set(  1,        0,         0,        0,
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

var rotate20Degrees3 = new THREE.Matrix4().set(  Math.cos(-Math.PI/9),       0,          Math.sin(-Math.PI/9),        0,
                                                    0,          1,          0,          0,
                                                    -Math.sin(-Math.PI/9),       0,          Math.cos(-Math.PI/9),        0,
                                                    0,          0,          0,          1);

var upLeftLargeTentacleRelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, upLeftLargeTentacleMatrix);
upLeftLargeTentacleRelativeToNose.multiplyMatrices(upLeftLargeTentacleRelativeToNose, rotate20Degrees2);

var lowLeftLargeTentacleRelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, lowLeftLargeTentacleMatrix);
lowLeftLargeTentacleRelativeToNose.multiplyMatrices(lowLeftLargeTentacleRelativeToNose, rotate20Degrees2);

var upRightLargeTentacleRelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, upRightLargeTentacleMatrix);
upRightLargeTentacleRelativeToNose.multiplyMatrices(upRightLargeTentacleRelativeToNose, rotate20Degrees3);

var lowRightLargeTentacleRelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, lowRightLargeTentacleMatrix);
lowRightLargeTentacleRelativeToNose.multiplyMatrices(lowRightLargeTentacleRelativeToNose, rotate20Degrees3);

var leftSmallTentacle1RelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, LeftSmallTentacle1Matrix);
leftSmallTentacle1RelativeToNose.multiplyMatrices(leftSmallTentacle1RelativeToNose, rotate20Degrees2);
leftSmallTentacle1RelativeToNose.multiplyMatrices(leftSmallTentacle1RelativeToNose, rotate20Degrees4);

var leftSmallTentacle2RelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, LeftSmallTentacle2Matrix);
leftSmallTentacle2RelativeToNose.multiplyMatrices(leftSmallTentacle2RelativeToNose, rotate20Degrees2);
leftSmallTentacle2RelativeToNose.multiplyMatrices(leftSmallTentacle2RelativeToNose, rotate20Degrees5);

var leftSmallTentacle3RelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, LeftSmallTentacle3Matrix);
leftSmallTentacle3RelativeToNose.multiplyMatrices(leftSmallTentacle3RelativeToNose, rotate20Degrees2);
leftSmallTentacle3RelativeToNose.multiplyMatrices(leftSmallTentacle3RelativeToNose, rotate20Degrees6);

var leftSmallTentacle4RelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, LeftSmallTentacle4Matrix);
leftSmallTentacle4RelativeToNose.multiplyMatrices(leftSmallTentacle4RelativeToNose, rotate20Degrees2);
leftSmallTentacle4RelativeToNose.multiplyMatrices(leftSmallTentacle4RelativeToNose, rotate20Degrees7);

var leftSmallTentacle5RelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, LeftSmallTentacle5Matrix);
leftSmallTentacle5RelativeToNose.multiplyMatrices(leftSmallTentacle5RelativeToNose, rotate20Degrees2);
leftSmallTentacle5RelativeToNose.multiplyMatrices(leftSmallTentacle5RelativeToNose, rotate20Degrees8);

var leftSmallTentacle6RelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, LeftSmallTentacle6Matrix);
leftSmallTentacle6RelativeToNose.multiplyMatrices(leftSmallTentacle6RelativeToNose, rotate20Degrees2);
leftSmallTentacle6RelativeToNose.multiplyMatrices(leftSmallTentacle6RelativeToNose, rotate20Degrees9);

var leftSmallTentacle7RelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, LeftSmallTentacle7Matrix);
leftSmallTentacle7RelativeToNose.multiplyMatrices(leftSmallTentacle7RelativeToNose, rotate20Degrees2);
leftSmallTentacle7RelativeToNose.multiplyMatrices(leftSmallTentacle7RelativeToNose, rotate20Degrees10);

var leftSmallTentacle8RelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, LeftSmallTentacle8Matrix);
leftSmallTentacle8RelativeToNose.multiplyMatrices(leftSmallTentacle8RelativeToNose, rotate20Degrees2);
leftSmallTentacle8RelativeToNose.multiplyMatrices(leftSmallTentacle8RelativeToNose, rotate20Degrees11);

var leftSmallTentacle9RelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, LeftSmallTentacle9Matrix);
leftSmallTentacle9RelativeToNose.multiplyMatrices(leftSmallTentacle9RelativeToNose, rotate20Degrees2);
leftSmallTentacle9RelativeToNose.multiplyMatrices(leftSmallTentacle9RelativeToNose, rotate20Degrees12);

var RightSmallTentacle1RelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, RightSmallTentacle1Matrix);
RightSmallTentacle1RelativeToNose.multiplyMatrices(RightSmallTentacle1RelativeToNose, rotate20Degrees3);
RightSmallTentacle1RelativeToNose.multiplyMatrices(RightSmallTentacle1RelativeToNose, rotate20Degrees4);

var RightSmallTentacle2RelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, RightSmallTentacle2Matrix);
RightSmallTentacle2RelativeToNose.multiplyMatrices(RightSmallTentacle2RelativeToNose, rotate20Degrees3);
RightSmallTentacle2RelativeToNose.multiplyMatrices(RightSmallTentacle2RelativeToNose, rotate20Degrees5);

var RightSmallTentacle3RelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, RightSmallTentacle3Matrix);
RightSmallTentacle3RelativeToNose.multiplyMatrices(RightSmallTentacle3RelativeToNose, rotate20Degrees3);
RightSmallTentacle3RelativeToNose.multiplyMatrices(RightSmallTentacle3RelativeToNose, rotate20Degrees6);

var RightSmallTentacle4RelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, RightSmallTentacle4Matrix);
RightSmallTentacle4RelativeToNose.multiplyMatrices(RightSmallTentacle4RelativeToNose, rotate20Degrees3);
RightSmallTentacle4RelativeToNose.multiplyMatrices(RightSmallTentacle4RelativeToNose, rotate20Degrees7);

var RightSmallTentacle5RelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, RightSmallTentacle5Matrix);
RightSmallTentacle5RelativeToNose.multiplyMatrices(RightSmallTentacle5RelativeToNose, rotate20Degrees3);
RightSmallTentacle5RelativeToNose.multiplyMatrices(RightSmallTentacle5RelativeToNose, rotate20Degrees8);

var RightSmallTentacle6RelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, RightSmallTentacle6Matrix);
RightSmallTentacle6RelativeToNose.multiplyMatrices(RightSmallTentacle6RelativeToNose, rotate20Degrees3);
RightSmallTentacle6RelativeToNose.multiplyMatrices(RightSmallTentacle6RelativeToNose, rotate20Degrees9);

var RightSmallTentacle7RelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, RightSmallTentacle7Matrix);
RightSmallTentacle7RelativeToNose.multiplyMatrices(RightSmallTentacle7RelativeToNose, rotate20Degrees3);
RightSmallTentacle7RelativeToNose.multiplyMatrices(RightSmallTentacle7RelativeToNose, rotate20Degrees10);

var RightSmallTentacle8RelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, RightSmallTentacle8Matrix);
RightSmallTentacle8RelativeToNose.multiplyMatrices(RightSmallTentacle8RelativeToNose, rotate20Degrees3);
RightSmallTentacle8RelativeToNose.multiplyMatrices(RightSmallTentacle8RelativeToNose, rotate20Degrees11);

var RightSmallTentacle9RelativeToNose = new THREE.Matrix4().multiplyMatrices(noseMatrixRelativeToTorso, RightSmallTentacle9Matrix);
RightSmallTentacle9RelativeToNose.multiplyMatrices(RightSmallTentacle9RelativeToNose, rotate20Degrees3);
RightSmallTentacle9RelativeToNose.multiplyMatrices(RightSmallTentacle9RelativeToNose, rotate20Degrees12);

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
leftSmallTentacle1.setMatrix(leftSmallTentacle1RelativeToNose)
scene.add(leftSmallTentacle1);

var leftSmallTentacle2 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
leftSmallTentacle2.setMatrix(leftSmallTentacle2RelativeToNose)
scene.add(leftSmallTentacle2);

var leftSmallTentacle3 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
leftSmallTentacle3.setMatrix(leftSmallTentacle3RelativeToNose)
scene.add(leftSmallTentacle3);

var leftSmallTentacle4 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
leftSmallTentacle4.setMatrix(leftSmallTentacle4RelativeToNose)
scene.add(leftSmallTentacle4);

var leftSmallTentacle5 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
leftSmallTentacle5.setMatrix(leftSmallTentacle5RelativeToNose)
scene.add(leftSmallTentacle5);

var leftSmallTentacle6 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
leftSmallTentacle6.setMatrix(leftSmallTentacle6RelativeToNose)
scene.add(leftSmallTentacle6);

var leftSmallTentacle7 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
leftSmallTentacle7.setMatrix(leftSmallTentacle7RelativeToNose)
scene.add(leftSmallTentacle7);

var leftSmallTentacle8 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
leftSmallTentacle8.setMatrix(leftSmallTentacle8RelativeToNose)
scene.add(leftSmallTentacle8);

var leftSmallTentacle9 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
leftSmallTentacle9.setMatrix(leftSmallTentacle9RelativeToNose)
scene.add(leftSmallTentacle9);

var rightSmallTentacle1 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
rightSmallTentacle1.setMatrix(RightSmallTentacle1RelativeToNose)
scene.add(rightSmallTentacle1);

var rightSmallTentacle2 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
rightSmallTentacle2.setMatrix(RightSmallTentacle2RelativeToNose)
scene.add(rightSmallTentacle2);

var rightSmallTentacle3 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
rightSmallTentacle3.setMatrix(RightSmallTentacle3RelativeToNose)
scene.add(rightSmallTentacle3);

var rightSmallTentacle4 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
rightSmallTentacle4.setMatrix(RightSmallTentacle4RelativeToNose)
scene.add(rightSmallTentacle4);

var rightSmallTentacle5 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
rightSmallTentacle5.setMatrix(RightSmallTentacle5RelativeToNose)
scene.add(rightSmallTentacle5);

var rightSmallTentacle6 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
rightSmallTentacle6.setMatrix(RightSmallTentacle6RelativeToNose)
scene.add(rightSmallTentacle6);

var rightSmallTentacle7 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
rightSmallTentacle7.setMatrix(RightSmallTentacle7RelativeToNose)
scene.add(rightSmallTentacle7);

var rightSmallTentacle8 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
rightSmallTentacle8.setMatrix(RightSmallTentacle8RelativeToNose)
scene.add(rightSmallTentacle8);

var rightSmallTentacle9 = new THREE.Mesh(smallTenticleGeometry,normalMaterial);
rightSmallTentacle9.setMatrix(RightSmallTentacle9RelativeToNose)
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

          var upLeftLargeTenticleRotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, upLeftLargeTentacleMatrix);
          upLeftLargeTenticleRotMatrix.multiplyMatrices(upLeftLargeTenticleRotMatrix, rotate20Degrees2);
          upLeftLargeTentacle.setMatrix(upLeftLargeTenticleRotMatrix);

          var lowLeftLargeTenticleRotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, lowLeftLargeTentacleMatrix);
          lowLeftLargeTenticleRotMatrix.multiplyMatrices(lowLeftLargeTenticleRotMatrix, rotate20Degrees2);
          lowLeftLargeTentacle.setMatrix(lowLeftLargeTenticleRotMatrix);

          var upRightLargeTenticleRotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, upRightLargeTentacleMatrix);
          upRightLargeTenticleRotMatrix.multiplyMatrices(upRightLargeTenticleRotMatrix, rotate20Degrees3);
          upRightLargeTentacle.setMatrix(upRightLargeTenticleRotMatrix);

          var lowRightLargeTenticleRotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, lowRightLargeTentacleMatrix);
          lowRightLargeTenticleRotMatrix.multiplyMatrices(lowRightLargeTenticleRotMatrix, rotate20Degrees3);
          lowRightLargeTentacle.setMatrix(lowRightLargeTenticleRotMatrix);

          var leftSmallTenticle1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacle1Matrix);
          leftSmallTenticle1RotMatrix.multiplyMatrices(leftSmallTenticle1RotMatrix, rotate20Degrees2);
          leftSmallTenticle1RotMatrix.multiplyMatrices(leftSmallTenticle1RotMatrix, rotate20Degrees4);
          leftSmallTentacle1.setMatrix(leftSmallTenticle1RotMatrix);

          var leftSmallTenticle2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacle2Matrix);
          leftSmallTenticle2RotMatrix.multiplyMatrices(leftSmallTenticle2RotMatrix, rotate20Degrees2);
          leftSmallTenticle2RotMatrix.multiplyMatrices(leftSmallTenticle2RotMatrix, rotate20Degrees5);
          leftSmallTentacle2.setMatrix(leftSmallTenticle2RotMatrix);

          var leftSmallTenticle3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacle3Matrix);
          leftSmallTenticle3RotMatrix.multiplyMatrices(leftSmallTenticle3RotMatrix, rotate20Degrees2);
          leftSmallTenticle3RotMatrix.multiplyMatrices(leftSmallTenticle3RotMatrix, rotate20Degrees6);
          leftSmallTentacle3.setMatrix(leftSmallTenticle3RotMatrix);

          var leftSmallTenticle4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacle4Matrix);
          leftSmallTenticle4RotMatrix.multiplyMatrices(leftSmallTenticle4RotMatrix, rotate20Degrees2);
          leftSmallTenticle4RotMatrix.multiplyMatrices(leftSmallTenticle4RotMatrix, rotate20Degrees7);
          leftSmallTentacle4.setMatrix(leftSmallTenticle4RotMatrix);

          var leftSmallTenticle5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacle5Matrix);
          leftSmallTenticle5RotMatrix.multiplyMatrices(leftSmallTenticle5RotMatrix, rotate20Degrees2);
          leftSmallTenticle5RotMatrix.multiplyMatrices(leftSmallTenticle5RotMatrix, rotate20Degrees8);
          leftSmallTentacle5.setMatrix(leftSmallTenticle5RotMatrix);

          var leftSmallTenticle6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacle6Matrix);
          leftSmallTenticle6RotMatrix.multiplyMatrices(leftSmallTenticle6RotMatrix, rotate20Degrees2);
          leftSmallTenticle6RotMatrix.multiplyMatrices(leftSmallTenticle6RotMatrix, rotate20Degrees9);
          leftSmallTentacle6.setMatrix(leftSmallTenticle6RotMatrix);

          var leftSmallTenticle7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacle7Matrix);
          leftSmallTenticle7RotMatrix.multiplyMatrices(leftSmallTenticle7RotMatrix, rotate20Degrees2);
          leftSmallTenticle7RotMatrix.multiplyMatrices(leftSmallTenticle7RotMatrix, rotate20Degrees10);
          leftSmallTentacle7.setMatrix(leftSmallTenticle7RotMatrix);

          var leftSmallTenticle8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacle8Matrix);
          leftSmallTenticle8RotMatrix.multiplyMatrices(leftSmallTenticle8RotMatrix, rotate20Degrees2);
          leftSmallTenticle8RotMatrix.multiplyMatrices(leftSmallTenticle8RotMatrix, rotate20Degrees11);
          leftSmallTentacle8.setMatrix(leftSmallTenticle8RotMatrix);

          var leftSmallTenticle9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacle9Matrix);
          leftSmallTenticle9RotMatrix.multiplyMatrices(leftSmallTenticle9RotMatrix, rotate20Degrees2);
          leftSmallTenticle9RotMatrix.multiplyMatrices(leftSmallTenticle9RotMatrix, rotate20Degrees12);
          leftSmallTentacle9.setMatrix(leftSmallTenticle9RotMatrix);

          var rightSmallTenticle1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacle1Matrix);
          rightSmallTenticle1RotMatrix.multiplyMatrices(rightSmallTenticle1RotMatrix, rotate20Degrees3);
          rightSmallTenticle1RotMatrix.multiplyMatrices(rightSmallTenticle1RotMatrix, rotate20Degrees4);
          rightSmallTentacle1.setMatrix(rightSmallTenticle1RotMatrix);

          var rightSmallTenticle2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacle2Matrix);
          rightSmallTenticle2RotMatrix.multiplyMatrices(rightSmallTenticle2RotMatrix, rotate20Degrees3);
          rightSmallTenticle2RotMatrix.multiplyMatrices(rightSmallTenticle2RotMatrix, rotate20Degrees5);
          rightSmallTentacle2.setMatrix(rightSmallTenticle2RotMatrix);

          var rightSmallTenticle3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacle3Matrix);
          rightSmallTenticle3RotMatrix.multiplyMatrices(rightSmallTenticle3RotMatrix, rotate20Degrees3);
          rightSmallTenticle3RotMatrix.multiplyMatrices(rightSmallTenticle3RotMatrix, rotate20Degrees6);
          rightSmallTentacle3.setMatrix(rightSmallTenticle3RotMatrix);

          var rightSmallTenticle4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacle4Matrix);
          rightSmallTenticle4RotMatrix.multiplyMatrices(rightSmallTenticle4RotMatrix, rotate20Degrees3);
          rightSmallTenticle4RotMatrix.multiplyMatrices(rightSmallTenticle4RotMatrix, rotate20Degrees7);
          rightSmallTentacle4.setMatrix(rightSmallTenticle4RotMatrix);

          var rightSmallTenticle5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacle5Matrix);
          rightSmallTenticle5RotMatrix.multiplyMatrices(rightSmallTenticle5RotMatrix, rotate20Degrees3);
          rightSmallTenticle5RotMatrix.multiplyMatrices(rightSmallTenticle5RotMatrix, rotate20Degrees8);
          rightSmallTentacle5.setMatrix(rightSmallTenticle5RotMatrix);

          var rightSmallTenticle6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacle6Matrix);
          rightSmallTenticle6RotMatrix.multiplyMatrices(rightSmallTenticle6RotMatrix, rotate20Degrees3);
          rightSmallTenticle6RotMatrix.multiplyMatrices(rightSmallTenticle6RotMatrix, rotate20Degrees9);
          rightSmallTentacle6.setMatrix(rightSmallTenticle6RotMatrix);

          var rightSmallTenticle7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacle7Matrix);
          rightSmallTenticle7RotMatrix.multiplyMatrices(rightSmallTenticle7RotMatrix, rotate20Degrees3);
          rightSmallTenticle7RotMatrix.multiplyMatrices(rightSmallTenticle7RotMatrix, rotate20Degrees10);
          rightSmallTentacle7.setMatrix(rightSmallTenticle7RotMatrix);

          var rightSmallTenticle8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacle8Matrix);
          rightSmallTenticle8RotMatrix.multiplyMatrices(rightSmallTenticle8RotMatrix, rotate20Degrees3);
          rightSmallTenticle8RotMatrix.multiplyMatrices(rightSmallTenticle8RotMatrix, rotate20Degrees11);
          rightSmallTentacle8.setMatrix(rightSmallTenticle8RotMatrix);

          var rightSmallTenticle9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacle9Matrix);
          rightSmallTenticle9RotMatrix.multiplyMatrices(rightSmallTenticle9RotMatrix, rotate20Degrees3);
          rightSmallTenticle9RotMatrix.multiplyMatrices(rightSmallTenticle9RotMatrix, rotate20Degrees12);
          rightSmallTentacle9.setMatrix(rightSmallTenticle9RotMatrix);

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

          var upLeftLargeTenticleRotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, upLeftLargeTentacleMatrix);
          upLeftLargeTenticleRotMatrix.multiplyMatrices(upLeftLargeTenticleRotMatrix, rotate20Degrees2);
          upLeftLargeTentacle.setMatrix(upLeftLargeTenticleRotMatrix);

          var lowLeftLargeTenticleRotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, lowLeftLargeTentacleMatrix);
          lowLeftLargeTenticleRotMatrix.multiplyMatrices(lowLeftLargeTenticleRotMatrix, rotate20Degrees2);
          lowLeftLargeTentacle.setMatrix(lowLeftLargeTenticleRotMatrix);

          var upRightLargeTenticleRotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, upRightLargeTentacleMatrix);
          upRightLargeTenticleRotMatrix.multiplyMatrices(upRightLargeTenticleRotMatrix, rotate20Degrees3);
          upRightLargeTentacle.setMatrix(upRightLargeTenticleRotMatrix);

          var lowRightLargeTenticleRotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, lowRightLargeTentacleMatrix);
          lowRightLargeTenticleRotMatrix.multiplyMatrices(lowRightLargeTenticleRotMatrix, rotate20Degrees3);
          lowRightLargeTentacle.setMatrix(lowRightLargeTenticleRotMatrix);

          var leftSmallTenticle1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacle1Matrix);
          leftSmallTenticle1RotMatrix.multiplyMatrices(leftSmallTenticle1RotMatrix, rotate20Degrees2);
          leftSmallTenticle1RotMatrix.multiplyMatrices(leftSmallTenticle1RotMatrix, rotate20Degrees4);
          leftSmallTentacle1.setMatrix(leftSmallTenticle1RotMatrix);

          var leftSmallTenticle2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacle2Matrix);
          leftSmallTenticle2RotMatrix.multiplyMatrices(leftSmallTenticle2RotMatrix, rotate20Degrees2);
          leftSmallTenticle2RotMatrix.multiplyMatrices(leftSmallTenticle2RotMatrix, rotate20Degrees5);
          leftSmallTentacle2.setMatrix(leftSmallTenticle2RotMatrix);

          var leftSmallTenticle3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacle3Matrix);
          leftSmallTenticle3RotMatrix.multiplyMatrices(leftSmallTenticle3RotMatrix, rotate20Degrees2);
          leftSmallTenticle3RotMatrix.multiplyMatrices(leftSmallTenticle3RotMatrix, rotate20Degrees6);
          leftSmallTentacle3.setMatrix(leftSmallTenticle3RotMatrix);

          var leftSmallTenticle4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacle4Matrix);
          leftSmallTenticle4RotMatrix.multiplyMatrices(leftSmallTenticle4RotMatrix, rotate20Degrees2);
          leftSmallTenticle4RotMatrix.multiplyMatrices(leftSmallTenticle4RotMatrix, rotate20Degrees7);
          leftSmallTentacle4.setMatrix(leftSmallTenticle4RotMatrix);

          var leftSmallTenticle5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacle5Matrix);
          leftSmallTenticle5RotMatrix.multiplyMatrices(leftSmallTenticle5RotMatrix, rotate20Degrees2);
          leftSmallTenticle5RotMatrix.multiplyMatrices(leftSmallTenticle5RotMatrix, rotate20Degrees8);
          leftSmallTentacle5.setMatrix(leftSmallTenticle5RotMatrix);

          var leftSmallTenticle6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacle6Matrix);
          leftSmallTenticle6RotMatrix.multiplyMatrices(leftSmallTenticle6RotMatrix, rotate20Degrees2);
          leftSmallTenticle6RotMatrix.multiplyMatrices(leftSmallTenticle6RotMatrix, rotate20Degrees9);
          leftSmallTentacle6.setMatrix(leftSmallTenticle6RotMatrix);

          var leftSmallTenticle7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacle7Matrix);
          leftSmallTenticle7RotMatrix.multiplyMatrices(leftSmallTenticle7RotMatrix, rotate20Degrees2);
          leftSmallTenticle7RotMatrix.multiplyMatrices(leftSmallTenticle7RotMatrix, rotate20Degrees10);
          leftSmallTentacle7.setMatrix(leftSmallTenticle7RotMatrix);

          var leftSmallTenticle8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacle8Matrix);
          leftSmallTenticle8RotMatrix.multiplyMatrices(leftSmallTenticle8RotMatrix, rotate20Degrees2);
          leftSmallTenticle8RotMatrix.multiplyMatrices(leftSmallTenticle8RotMatrix, rotate20Degrees11);
          leftSmallTentacle8.setMatrix(leftSmallTenticle8RotMatrix);

          var leftSmallTenticle9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, LeftSmallTentacle9Matrix);
          leftSmallTenticle9RotMatrix.multiplyMatrices(leftSmallTenticle9RotMatrix, rotate20Degrees2);
          leftSmallTenticle9RotMatrix.multiplyMatrices(leftSmallTenticle9RotMatrix, rotate20Degrees12);
          leftSmallTentacle9.setMatrix(leftSmallTenticle9RotMatrix);

          var rightSmallTenticle1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacle1Matrix);
          rightSmallTenticle1RotMatrix.multiplyMatrices(rightSmallTenticle1RotMatrix, rotate20Degrees3);
          rightSmallTenticle1RotMatrix.multiplyMatrices(rightSmallTenticle1RotMatrix, rotate20Degrees4);
          rightSmallTentacle1.setMatrix(rightSmallTenticle1RotMatrix);

          var rightSmallTenticle2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacle2Matrix);
          rightSmallTenticle2RotMatrix.multiplyMatrices(rightSmallTenticle2RotMatrix, rotate20Degrees3);
          rightSmallTenticle2RotMatrix.multiplyMatrices(rightSmallTenticle2RotMatrix, rotate20Degrees5);
          rightSmallTentacle2.setMatrix(rightSmallTenticle2RotMatrix);

          var rightSmallTenticle3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacle3Matrix);
          rightSmallTenticle3RotMatrix.multiplyMatrices(rightSmallTenticle3RotMatrix, rotate20Degrees3);
          rightSmallTenticle3RotMatrix.multiplyMatrices(rightSmallTenticle3RotMatrix, rotate20Degrees6);
          rightSmallTentacle3.setMatrix(rightSmallTenticle3RotMatrix);

          var rightSmallTenticle4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacle4Matrix);
          rightSmallTenticle4RotMatrix.multiplyMatrices(rightSmallTenticle4RotMatrix, rotate20Degrees3);
          rightSmallTenticle4RotMatrix.multiplyMatrices(rightSmallTenticle4RotMatrix, rotate20Degrees7);
          rightSmallTentacle4.setMatrix(rightSmallTenticle4RotMatrix);

          var rightSmallTenticle5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacle5Matrix);
          rightSmallTenticle5RotMatrix.multiplyMatrices(rightSmallTenticle5RotMatrix, rotate20Degrees3);
          rightSmallTenticle5RotMatrix.multiplyMatrices(rightSmallTenticle5RotMatrix, rotate20Degrees8);
          rightSmallTentacle5.setMatrix(rightSmallTenticle5RotMatrix);

          var rightSmallTenticle6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacle6Matrix);
          rightSmallTenticle6RotMatrix.multiplyMatrices(rightSmallTenticle6RotMatrix, rotate20Degrees3);
          rightSmallTenticle6RotMatrix.multiplyMatrices(rightSmallTenticle6RotMatrix, rotate20Degrees9);
          rightSmallTentacle6.setMatrix(rightSmallTenticle6RotMatrix);

          var rightSmallTenticle7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacle7Matrix);
          rightSmallTenticle7RotMatrix.multiplyMatrices(rightSmallTenticle7RotMatrix, rotate20Degrees3);
          rightSmallTenticle7RotMatrix.multiplyMatrices(rightSmallTenticle7RotMatrix, rotate20Degrees10);
          rightSmallTentacle7.setMatrix(rightSmallTenticle7RotMatrix);

          var rightSmallTenticle8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacle8Matrix);
          rightSmallTenticle8RotMatrix.multiplyMatrices(rightSmallTenticle8RotMatrix, rotate20Degrees3);
          rightSmallTenticle8RotMatrix.multiplyMatrices(rightSmallTenticle8RotMatrix, rotate20Degrees11);
          rightSmallTentacle8.setMatrix(rightSmallTenticle8RotMatrix);

          var rightSmallTenticle9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix, RightSmallTentacle9Matrix);
          rightSmallTenticle9RotMatrix.multiplyMatrices(rightSmallTenticle9RotMatrix, rotate20Degrees3);
          rightSmallTenticle9RotMatrix.multiplyMatrices(rightSmallTenticle9RotMatrix, rotate20Degrees12);
          rightSmallTentacle9.setMatrix(rightSmallTenticle9RotMatrix);

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