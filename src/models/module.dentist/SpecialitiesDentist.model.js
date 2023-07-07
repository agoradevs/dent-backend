const {Schema, model} = require('mongoose');

const SpecialitiesDentistSchema = new Schema({
    dentist:{
        type : Schema.Types.ObjectId,
        ref : 'Users',
        required : [true,'El nombre del dentista es obligatorio']
    },
    specialities:{
        type : Schema.Types.ObjectId,
        ref : 'Specialities',
        required : [true,'El nombre de la especialidad es obligatorio']
    }
},{timestamps:true});

SpecialitiesDentistSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('SpecialitiesDentist', SpecialitiesDentistSchema);
