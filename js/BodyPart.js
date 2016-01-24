/**
 * Created by marti on 2016-01-23.
 */
function BodyPart(scene)
{
    this.scene = scene;
    this.normalMatrial = new THREE.MeshNormalMaterial();
    this.bodyPart = null;
    this.bodyPartGeometryMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,2.5, 0,0,1,0, 0,0,0,1);

    this.createBodyPart = function(objectSizeMatrix, locationX, locationY, locationZ)
    {
        var objectGeometry = makeCube();
        objectGeometry.applyMatrix(objectSizeMatrix);

        this.bodyPart = new THREE.Mesh(objectGeometry, this.normalMatrial);

        this.bodyPartGeometryMatrix = MathHelper.translateMatrix(locationX, locationY, locationZ, this.bodyPartGeometryMatrix);

        this.bodyPart.setMatrix(this.bodyPartGeometryMatrix);
        this.scene.add(this.bodyPart);
    };

    this.getBodyPart = function()
    {
        return this.bodyPart;
    };

    this.getBodyPartGeometry = function()
    {
        return this.bodyPartGeometryMatrix;
    }

    this.rotateBodyPart = function(rotationAngle, xAxis, yAxis, zAxis)
    {
        if(xAxis)
        {
            this.bodyPartGeometryMatrix = MathHelper.rotateMatrixAroundX(rotationAngle, this.bodyPartGeometryMatrix);
        }
        else if(yAxis)
        {
            this.bodyPartGeometryMatrix = MathHelper.rotateMatrixAroundY(rotationAngle, this.bodyPartGeometryMatrix);
        }
        else if(zAxis)
        {
            this.bodyPartGeometryMatrix = MathHelper.rotateMatrixAroundZ(rotationAngle, this.bodyPartGeometryMatrix);
        }

        this.bodyPart.setMatrix(this.bodyPartGeometryMatrix);
    }
};