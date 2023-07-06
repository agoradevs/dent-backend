const {Schema, model} = require('mongoose');

const TypeTreatmentSchema = Schema({
    name:{
        type:String,
        required:[true,'El nombre del tipo de tratamiento es obligatorio'],
    },
    cost:{
        type:Number,
        required:[true,'El costo del tratamiento es obligatorio'],
    }
},{timestamps:true});

TypeTreatmentSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('TypeTreatments',TypeTreatmentSchema);
