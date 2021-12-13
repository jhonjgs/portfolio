const 
    express = require("express"),
    app = express(),
    PORT = process.env.port || 3000

app.set("view engine", "pug") 
app.use(express.static(`${__dirname}/Public`))

app.get("/", (req, res)=> res.render("index"))

app.listen(PORT, ()=>console.log(`App listen in the port ${PORT}`))