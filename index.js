const express = require('express')
const app = express()
const port = process.env.PORT || 9000
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')
const transactionRouter = require('./routes/transaction')

app.use(express.json())

app.use('/users', userRouter)
app.use('/categories', categoryRouter)
app.use('/products', productRouter)
app.use('/transactions', transactionRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

module.exports = app