/**
 * Created by marti on 2016-01-26.
 */
/**
 * Created by MartinLiu on 2016-01-07.
 */
function Helper()
{

}

Helper.createGeometry = function(geometryScale)
{
    var objectGeometry = makeCube();
    objectGeometry.applyMatrix(geometryScale);
    return objectGeometry;
}

Helper.createXAxisRotMatrixForDegree = function(degreeInRad)
{
    var rotate = new THREE.Matrix4().set(  1,        0,         0,        0,
                                            0, Math.cos(degreeInRad),-Math.sin(degreeInRad), 0,
                                            0, Math.sin(degreeInRad), Math.cos(degreeInRad), 0,
                                            0,        0,         0,        1);
    return rotate;
}

Helper.createYAxisRotMatrixForDegree = function(degreeInRad)
{
    var rotate = new THREE.Matrix4().set(  Math.cos(degreeInRad),       0,          Math.sin(degreeInRad),        0,
                                                        0,          1,          0,          0,
                                                        -Math.sin(degreeInRad),       0,          Math.cos(degreeInRad),        0,
                                                        0,          0,          0,          1);
    return rotate;
}