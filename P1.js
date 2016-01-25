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

// TO-DO: SPECIFY THE REST OF YOUR STAR-NOSE MOLE'S GEOMETRY. 
// Note: You will be using transformation matrices to set the shape. 
// Note: You are not allowed to use the tools Three.js provides for 
//       rotation, translation and scaling.
// Note: The torso has been done for you (but feel free to modify it!)  
// Hint: Explicity declare new matrices using Matrix4().set     



// MATRICES: Specifies the location
var torsoMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,10, 0,0,1,0, 0,0,0,1);
var headMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,5, 0,0,0,1);
var noseMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,6, 0,0,0,1);
var tailMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,-4, 0,0,0,1);

var frontRightPawMatrix = new THREE.Matrix4().set(1,0,0,-2.5, 0,1,0,-2.5, 0,0,1,4, 0,0,0,1);
var frontLeftPawMatrix = new THREE.Matrix4().set(1,0,0,2.5, 0,1,0,-2.5, 0,0,1,4, 0,0,0,1);
var backRightPawMatrix = new THREE.Matrix4().set(1,0,0,-2.5, 0,1,0,-3.5, 0,0,1,-2, 0,0,0,1);
var backLeftPawMatrix = new THREE.Matrix4().set(1,0,0,2.5, 0,1,0,-3.5, 0,0,1,-2, 0,0,0,1);

var headMatrixRelativeToTorso =  new THREE.Matrix4().multiplyMatrices(torsoMatrix, headMatrix);
var noseMatrixRelativeToTorso =  new THREE.Matrix4().multiplyMatrices(torsoMatrix, noseMatrix);
var tailMatrixRelativeToTorso =  new THREE.Matrix4().multiplyMatrices(torsoMatrix, tailMatrix);

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

          //Follows the rotation of torso. The head doesn't really rotate, it just keeps the constant distance from torso
          var headRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, headMatrix);

          //In addition to following the distance from the torso, the head also rotates around itself
          //var headRotMatrix = new THREE.Matrix4().multiplyMatrices(headMatrix,rotateZ);
          head.setMatrix(headRotMatrix);

          break

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