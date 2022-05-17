const express = require('express')
const app = express()
const port = process.env.PORT || 9000
const userRouter = require('./routes/user')

app.use(express.json())

app.use('/users', userRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

module.exports = app