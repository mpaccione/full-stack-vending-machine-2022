const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('./routes')
const { sequelize } = require('./models')

const app = express()
const BASE_PATH = '/api/v1'
const ENV = process.env.environment || 'development'
const PORT = process.env.SERVER_PORT || 5000

// middleware
app.use(bodyParser.json({ limit: "15mb" }))
app.use(bodyParser.urlencoded({ extended: true, limit: "15mb" }));
app.use(cors())
app.use((req, res, next) => {
    // dev testing
    if (req.path = '/ping') {
        return next()
    }

    if (ENV === 'development' && !req.hostname.includes('localhost') || ENV === 'production' && !req.hostname.includes('production.com')) {
        return res.status(401).send()
    }

    // body methods
    if (req.method === 'DELETE' || req.method === 'POST' || req.method === 'PUT' && req.path.includes('update')) {
        if (!req.headers['x-access-token']) {
            return res.status(401).json({ message: 'Missing Admin Credentials' })
        }
    }

    next()
})

// routes
app.use(`${BASE_PATH}/products`, routes.productRouter)
app.use(`${BASE_PATH}/promotions`, routes.promotionRouter)

// testing
app.get('/ping', (req, res) => {
    res.send('pong!');
});

// db
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync()
    .then(() => {
        const mockSodas = require('./mock')
        // seed blob images
        mockSodas.forEach(({ id, img, name }) => {
            sequelize.models.Products.update(
                { image: img },
                { where: { productId: id } },
            ).then(image => {
                try {
                    console.log(`Base64 ${id}:${name.toUpperCase()} Data Seeded`)
                } catch (e) {
                    console.log(e);
                }
            })
        })

        // server
        app.listen(PORT, () => console.log(`Server Listening at http://localhost:${PORT}`))
    })

exports.app = { app, BASE_PATH }