const {response} = require('express');
const {SpecialitiesSchema} = require('./../../models');

const getSpecialities = async (req, res = response) => {

    try {
        const specialities = await SpecialitiesSchema.find({state : true})
        .select('name state')
        .populate('dentists','name lastName email state')
        res.json({
            ok: true,
            specialities
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const createSpeciality = async (req, res = response) => {
    
        const speciality = new SpecialitiesSchema(req.body);
    
        try {
            const specialitySave = await speciality.save();
    
            res.json({
                ok: true,
                speciality: specialitySave
            })
    
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        }
    }

const updateSpeciality = async (req, res = response) => {

    const specialityId = req.query.id;

    try {

        const newSpeciality = {
            ...req.body
        }

        const specialityUpdate = await SpecialitiesSchema.findByIdAndUpdate(
            specialityId, 
            newSpeciality, 
            { new: true }
        );
        
        res.json({
            ok: true,
            speciality: specialityUpdate
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const deleteSpeciality = async (req, res = response) => {

    const specialityId = req.query.id;
    try{
        const speciality = await SpecialitiesSchema.findById(specialityId);


        let newSpeciality = {
            ...speciality}
        newSpeciality._doc.state = false;

        const specialityDelete = await SpecialitiesSchema.findByIdAndUpdate(
            specialityId, 
            newSpeciality, 
            { new: true }
        );

        res.json({
            ok: true,
            speciality: specialityDelete
        });

    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    getSpecialities,
    createSpeciality,
    updateSpeciality,
    deleteSpeciality
}
