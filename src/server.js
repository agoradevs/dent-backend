const express = require('express');
const cors = require('cors');
const path = require('path');
const { createServer } = require('http');
const { dbConnection } = require('./database');
require('dotenv').config();

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer(this.app);

        this.paths = {
            // user
            auth: '/api/auth',

            // module users 
            user: '/api/user',
            roles: '/api/roles',
            permissions: '/api/permissions',
            account: '/api/account',
            typeAccount: '/api/typeAccount',

            // module inventary
            productExpense: '/api/productExpense',
            typeProduct: '/api/typeProduct',
            cleanInventary: '/api/cleanInventary',
            dentInventary: '/api/dentInventary',

            // module history
            appoinment: '/api/appoitment',
            treatment: '/api/treatment',
            typeTreatment: '/api/typeTreatment',

            // module dentists
            speciality: '/api/speciality',

            // module billing
            bill: '/api/bill',
            discount: '/api/discount',
            typeDiscount: '/api/typeDiscount'
        };



        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();


    }
    

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.json({ limit: '50mb' }));
        // CORS: Permitir solicitudes desde cualquier origen durante el desarrollo.
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        const publicPath = path.resolve(__dirname, './../public');
        this.app.use(express.static(publicPath));
    }

    routes() {
        
      
        this.app.use(this.paths.auth, require('./routes/auth.route'));

        // Module users routes
        this.app.use(this.paths.user, require('./routes/module.users/user.route'));
        this.app.use(this.paths.roles, require('./routes/module.users/roles.route'));
        this.app.use(this.paths.permissions, require('./routes/module.users/permission.route'));
        this.app.use(this.paths.account, require('./routes/module.users/account.route'));
        this.app.use(this.paths.typeAccount, require('./routes/module.users/typeAccount.route'));

        // Module inventary routes
        this.app.use(this.paths.productExpense, require('./routes/module.inventary/productExpense.route'));
        this.app.use(this.paths.typeProduct, require('./routes/module.inventary/typeProduct.route'));
        this.app.use(this.paths.cleanInventary, require('./routes/module.inventary/cleaningInventory.route'));
        this.app.use(this.paths.dentInventary, require('./routes/module.inventary/inventoryDentist.route'));

        // Module history routes
        this.app.use(this.paths.appoinment, require('./routes/module.history/appoinment.route'));
        this.app.use(this.paths.treatment, require('./routes/module.history/treatment.route'));
        this.app.use(this.paths.typeTreatment, require('./routes/module.history/typeTreatment.route'));

        // Module dentists routes
        this.app.use(this.paths.speciality, require('./routes/module.dentists/speciality.route'));

        // Module billing routes
        this.app.use(this.paths.bill, require('./routes/module.billing/bill.route'));
        this.app.use(this.paths.discount, require('./routes/module.billing/discount.route'));
        this.app.use(this.paths.typeDiscount, require('./routes/module.billing/typeDiscount.route'));

        // Configurar la carpeta de archivos estáticos

        // Ruta para manejar todas las solicitudes y enviar el archivo index.html
        this.app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './../public', 'index.html'));
        });
        // Auth route
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;
