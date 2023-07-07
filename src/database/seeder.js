require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const {
    TeacherSchema,
    SubjectSchema,
    PermisionSchema,
    ProjectSchema,
    RoleSchema,
    TypeUserSchema,
    UserSchema,
    InscriptionSchema,
    SeasonSchema,
    StageSchema,
    RequirementSchema,
} = require('./../models');


// Conecta a la base de datos
mongoose.connect(process.env.DB_CNN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false // Agrega esta opción
});

// Establece la conexión antes de borrar la base de datos y las colecciones
mongoose.connection.on('connected', () => {
    // Borra todas las colecciones
    mongoose.connection.db.dropDatabase()
        .then(async () => {
            console.log('Base de datos borrada correctamente.');

            //creando PERMISOS
            const listPermisions = await PermisionSchema.insertMany(permisions);
            const idPermisions = listPermisions.map(e => e._id);
            // creando ROL
            const rol = new RoleSchema({
                name: 'Desarrollador',
                permisionIds: idPermisions,
                user: null,
                state: true,
            });
            const rolCreated = await rol.save();
            // creando TIPO DE USUARIO
            const TypeUser = new TypeUserSchema({
                name: 'Desarrollador',
                user: null,
                state: true
            });
            const typeUserCreated = await TypeUser.save();
            // creando USUARIO
            const user = new UserSchema({
                rol: rolCreated._id,
                typeUser: typeUserCreated._id,
                name: 'Carlos',
                lastName: 'Cahuaya',
                code: 'SIS1',
                email: 'carlos@gmail.com',
                password: 'carlos123',
                valid: true,
                state: true,
                isSuperUser: true,
            });
            const userCreated = await user.save();
            // editando ROL
            const updateRolObj = { user: userCreated._id };
            await RoleSchema.findByIdAndUpdate(rolCreated._id, updateRolObj, { new: true });
            //editando TIPO DE USUARIO
            const updateTypeUserObj = { user: userCreated._id };
            await TypeUserSchema.findByIdAndUpdate(typeUserCreated._id, updateTypeUserObj, { new: true });
            //editando USUARIO
            const salt = bcrypt.genSaltSync();
            const updateUserObj = { responsible: userCreated._id, password: bcrypt.hashSync(userCreated.password, salt) };

            await UserSchema.findByIdAndUpdate(userCreated._id, updateUserObj, { new: true });

        })
        .catch(err => console.error(err))
        .finally(() => {
            // Cierra la conexión a la base de datos al finalizar
            mongoose.connection.close();
        });
});
//lista de PERMISOS
const permisions = [
    //Proyectos
    {
        name: 'Listar Proyectos',
        category: 'Proyectos',
        state: true,
    },
    {
        name: 'Crear Proyectos',
        category: 'Categorias',
        state: true,
    },
    {
        name: 'Editar Proyectos',
        category: 'Proyectos',
        state: true,
    },
    {
        name: 'Eliminar Proyectos',
        category: 'Proyectos',
        state: true,
    },
    //USUARIOS
    {
        name: 'Listar usuarios',
        category: 'Eventos',
        state: true,
    },
    {
        name: 'Crear usuarios',
        category: 'Eventos',
        state: true,
    },
    {
        name: 'Editar usuarios',
        category: 'Eventos',
        state: true,
    },
    {
        name: 'Eliminar usuarios',
        category: 'Eventos',
        state: true,
    },
];