const express = require("express");

//express app
const app = express();

//view engine
app.set("view engine", "ejs");

//middleware
app.use(express.static("public"));

//route
app.get("/", (req, res) => {
    res.render("index", { title: "Home" })
})

app.get("/about", (req, res) => {
    res.render("about", { title: "About" })
})

app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "New Blog" })
})
app.use((req, res) => {
    res.status(404).render("404", { title: "404" })
})

//listen to request
const port = process.env.PORT || 3500
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})