const express = require('express')
const app = express()

app.listen(3000, console.log("Server on"))
app.get("/home", (req, res) => {
    res.send("hola mundo")
})