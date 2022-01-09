const express = require("express");

//express app
const app = express();

//view engine
app.set("view engine", "ejs");

//route
app.get("/", (req, res) => {
    res.render("index", { title: "Home" })
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.get("/blogs/create", (req, res) => {
    res.render("create")
})
app.use((req, res) => {
    res.status(404).render("404")
})

//listen to request
const port = process.env.PORT || 3500
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})