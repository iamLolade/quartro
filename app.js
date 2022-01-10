const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes")


//express app
const app = express();

//connect to database
const dbURI = "mongodb+srv://caveman:blogdatabase@cluster0.ha1py.mongodb.net/blog_db?retryWrites=true&w=majority";

mongoose.connect(dbURI)
    .then(() => app.listen(port, () => console.log(`Listening on port: ${port}`)))
    .catch(err => console.log(err))

//view engine
app.set("view engine", "ejs");

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

//route
app.use("/blogs", blogRoutes);

//GET Requests
app.get("/", (req, res) => {
    res.redirect("/blogs")
})

app.get("/about", (req, res) => {
    res.render("about", { title: "About" })
})

app.use((req, res) => {
    res.status(404).render("404", { title: "404" })
})

//listen to request
const port = process.env.PORT || 3500
