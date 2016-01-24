/**
 * Created by Martin on 2016-01-22.
 */

function MathHelper()
{

}

//returns the result of scaling matrixToScale by scaleX in X, scaleY in Y, scaleZ in Z
MathHelper.scaleMatrix = function(scaleX, scaleY, scaleZ, matrixToScale)
{
    var multiply = new THREE.Matrix4().set(scaleX,0,0,0, 0,scaleY,0,0, 0,0,scaleZ,1, 0,0,0,1);
    return new THREE.Matrix4().multiplyMatrices(matrixToScale,multiply)
}

//returns the result of translating matrixToScale by translateX in X, translateY in Y, translateZ in Z
MathHelper.translateMatrix = function(translateX, translateY, translateZ, matrixToTranslate)
{
    var multiply = new THREE.Matrix4().set(1,0,0,translateX, 0,1,0,translateY, 0,0,1,translateZ, 0,0,0,1);
    return new THREE.Matrix4().multiplyMatrices(matrixToTranslate,multiply)
}

//returns the result of rotating matrixToRotate by rotationAngle around x-axis
MathHelper.rotateMatrixAroundX = function(rotationAngleInRad, matrixToRotate)
{
    var multiply = new THREE.Matrix4().set(1,0,0,0, 0,Math.cos(rotationAngleInRad),-Math.sin(rotationAngleInRad),0,
                                            0,Math.sin(rotationAngleInRad),Math.cos(rotationAngleInRad),0, 0,0,0,1);
    return new THREE.Matrix4().multiplyMatrices(matrixToRotate,multiply)
}

//returns the result of rotating matrixToRotate by rotationAngle around y-axis
MathHelper.rotateMatrixAroundY = function(rotationAngleInRad, matrixToRotate)
{
    var multiply = new THREE.Matrix4().set(Math.cos(rotationAngleInRad),0,Math.sin(rotationAngleInRad),0, 0,1,0,0,
        -Math.sin(rotationAngleInRad),0,Math.cos(rotationAngleInRad),0, 0,0,0,1);
    return new THREE.Matrix4().multiplyMatrices(matrixToRotate,multiply)
}

//returns the result of rotating matrixToRotate by rotationAngle around z-axis
MathHelper.rotateMatrixAroundZ = function(rotationAngleInRad, matrixToRotate)
{
    var multiply = new THREE.Matrix4().set(Math.cos(rotationAngleInRad),-Math.sin(rotationAngleInRad),0,0,Math.sin(rotationAngleInRad),Math.cos(rotationAngleInRad),0,0,
        0,0,1,0, 0,0,0,1);
    return new THREE.Matrix4().multiplyMatrices(matrixToRotate,multiply)
}