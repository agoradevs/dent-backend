const {Schema, model} = require('mongoose');

const PermissionsSchema = new Schema({
    name :{
        type : String,
        required : [true, 'El permiso es obligatorio'],
        unique: true
    },
    state : {
        type : Boolean,
        default : true
    }
},
{timestamps: true});

PermissionsSchema.pre('findOneAndDelete', async function (next){
    
    const { RolesSchema } = require('..');
    const permission = this.getFilter();
    const permissionId = permission._id;

    
    try{

        const permissionsRol = await RolesSchema.find({permissions : permissionId})
            .select('permissions')
        ;
        
        await Promise.all(
            permissionsRol.map(async (permission_rol) => {


                const permissionsUpdate = permission_rol.permissions.filter(
                    id_permiso => id_permiso != permissionId
                );
                
                await RolesSchema.findByIdAndUpdate(
                    permission_rol.id,
                    {permissions : permissionsUpdate},
                    { new : true}
                );
            })
        );

        next();
    }catch(error){
        next(error);
    }
})

PermissionsSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
    
module.exports = model('Permissions', PermissionsSchema);