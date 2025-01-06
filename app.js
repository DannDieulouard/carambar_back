const express = require('express')
const app = express()
const port = process.env.PORT || 5000
require("./db/sequelizeSetup")

app
    .use(express.json())

const jokeRouter = require('./routes/jokeRoutes')

app.get('/', (req, res) => {
    res.json({ message: 'Homepage' })
})

app.use('/api/blagues/', jokeRouter)

app.get('*', (req, res) => {
    res.status(404).json({ message: "Page not found" })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})