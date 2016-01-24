/**
 * Created by marti on 2016-01-23.
 */

//Class represents one part of the body (head, shoulder, finger...)
function BodyPart(scene)
{
    this.scene = scene;
    this.normalMatrial = new THREE.MeshNormalMaterial();
    this.bodyPart = null;
    this.bodyPartGeometryMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,2.5, 0,0,1,0, 0,0,0,1);

    //Creates the body part and draws it with size objectSizeMatrix, at locationX, locationY, locationZ with rotationX, rotationY, rotationZ
    this.createBodyPart = function(objectSizeMatrix, locationX, locationY, locationZ, rotationX, rotationY, rotationZ)
    {
        var objectGeometry = makeCube();
        objectGeometry.applyMatrix(objectSizeMatrix);

        this.locationX = locationX;
        this.locationY = locationY;
        this.locationZ = locationZ;

        this.bodyPart = new THREE.Mesh(objectGeometry, this.normalMatrial);

        this.bodyPartGeometryMatrix = MathHelper.translateMatrix(locationX, locationY, locationZ, this.bodyPartGeometryMatrix);
        this.bodyPartGeometryMatrix = MathHelper.rotateMatrixAroundX(rotationX, this.bodyPartGeometryMatrix);
        this.bodyPartGeometryMatrix = MathHelper.rotateMatrixAroundY(rotationY, this.bodyPartGeometryMatrix);
        this.bodyPartGeometryMatrix = MathHelper.rotateMatrixAroundZ(rotationZ, this.bodyPartGeometryMatrix);

        this.bodyPart.setMatrix(this.bodyPartGeometryMatrix);
        this.scene.add(this.bodyPart);
    };

    //Rotate the body part AROUND AXIS CENTERED AT ORIGIN (0,0,0)
    //Details: Moves the body part from where it's placed back to origin, then rotates it at origin, then move it back
    this.rotateBodyPartRelativeToOrigin = function(rotationAngleInRad, xAxis, yAxis, zAxis)
    {
        this.moveBodyPart(-this.locationX, -this.locationY, -this.locationZ);

        if(xAxis)
        {
            this.bodyPartGeometryMatrix = MathHelper.rotateMatrixAroundX(rotationAngleInRad, this.bodyPartGeometryMatrix);
        }
        else if(yAxis)
        {
            this.bodyPartGeometryMatrix = MathHelper.rotateMatrixAroundY(rotationAngleInRad, this.bodyPartGeometryMatrix);
        }
        else if(zAxis)
        {
            this.bodyPartGeometryMatrix = MathHelper.rotateMatrixAroundZ(rotationAngleInRad, this.bodyPartGeometryMatrix);
        }

        this.bodyPart.setMatrix(this.bodyPartGeometryMatrix);

        this.moveBodyPart(this.locationX, this.locationY, this.locationZ);
    }

    //Rotate the body part AROUND AXIS CENTERED AT locationX, locationY, locationZ
    //Details: Moves the body part from where it's placed to point, then rotates it at point, then move it back
    this.rotateBodyPartRelativeToPoint = function(rotationAngleInRad, xAxis, yAxis, zAxis, locationX, locationY, locationZ)
    {
        this.moveBodyPart(locationX-this.locationX, locationY-this.locationY, locationZ-this.locationZ);

        if(xAxis)
        {
            this.bodyPartGeometryMatrix = MathHelper.rotateMatrixAroundX(rotationAngleInRad, this.bodyPartGeometryMatrix);
        }
        else if(yAxis)
        {
            this.bodyPartGeometryMatrix = MathHelper.rotateMatrixAroundY(rotationAngleInRad, this.bodyPartGeometryMatrix);
        }
        else if(zAxis)
        {
            this.bodyPartGeometryMatrix = MathHelper.rotateMatrixAroundZ(rotationAngleInRad, this.bodyPartGeometryMatrix);
        }

        this.bodyPart.setMatrix(this.bodyPartGeometryMatrix);

        this.moveBodyPart(this.locationX-locationX, this.locationY-locationY, this.locationZ-locationZ);
    }

    //Move the body part by x,y,z
    this.moveBodyPart = function(x, y, z)
    {
        this.bodyPartGeometryMatrix = MathHelper.translateMatrix(x, y, z, this.bodyPartGeometryMatrix);
        this.bodyPart.setMatrix(this.bodyPartGeometryMatrix);
    }
};