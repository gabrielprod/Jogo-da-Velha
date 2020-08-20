const express = require('express')
const app = express()

app.use(express.static('.'))

app.listen(8080, () => {
    console.log('Servidor aberto em http://localhost:8080/')
    console.log('Pressione as teclas CTRL + C')
})