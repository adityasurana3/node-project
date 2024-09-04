const express = require("express")
const mainRouter = require("./routes/index")
const cors = require('cors')
var bodyParser = require('body-parser')


const app = express()

app.use(cors())
app.use(bodyParser.json())
// app.use(express.json())
app.use('/api/v1', mainRouter)


app.listen(3001)