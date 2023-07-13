const {Schema, model} = require('mongoose');

const SpecialitiesSchema = new Schema({
    name:{
        type : String,
        required : [true,'El nombre de la especialidad es obligatorio'],
    },

    dentists:[{
        type : Schema.Types.ObjectId,
        ref : 'Users',
        default : [],
    }],
    state:{
        type : Boolean,
        default : true
    }
},{timestamps:true});

SpecialitiesSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Specialities' , SpecialitiesSchema);