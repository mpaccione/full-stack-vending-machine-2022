const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('./routes')

const app = express()
const BASE_PATH = '/api/v1'
const PORT = process.env.SERVER_PORT || 5000

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use((req, res, next) => {
    // dev testing
    if (req.path = '/ping') {
        return next()
    }

    // query string methods
    if (req.method === 'GET') {
        if (!req.query || !req.query.id) {
            return res.status(400).json({ message: 'Missing ID' })
        }
    }

    // body methods
    if (req.method === 'DELETE' || req.method === 'POST' || req.method === 'PUT') {
        if (!req.headers['x-access-token']) {
            return res.status(401).json({ message: 'Missing Credentials' })
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

// server
app.listen(PORT, () => console.log(`Server Listening at http://localhost:${PORT}`))

exports.app = { app, BASE_PATH }