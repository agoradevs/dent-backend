const {Schema,model}=require('mongoose');

const TypeUserSchema=Schema({
    name:{
        type: String,
        required: [true, 'El tipo de usuario es obligatorio'],
        unique: true,
    },
  
},
    {timestamps: true});

TypeUserSchema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


module.exports=model('TypeUsers', TypeUserSchema);