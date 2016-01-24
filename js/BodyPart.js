/**
 * Created by marti on 2016-01-23.
 */
function BodyPart(scene)
{
    this.scene = scene;
    this.normalMatrial = new THREE.MeshNormalMaterial();
    this.bodyPart = null;

    this.createBodyPart = function(objectSizeMatrix, objectLocationMatrix)
    {
        var objectGeometry = makeCube();
        objectGeometry.applyMatrix(objectSizeMatrix);

        this.bodyPart = new THREE.Mesh(objectGeometry, this.normalMatrial);
        this.bodyPart.setMatrix(objectLocationMatrix);
        this.scene.add(this.bodyPart);
    };

    this.getBodyPart = function()
    {
        return this.bodyPart;
    };
};