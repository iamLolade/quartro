const { urlencoded } = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./model/blog")

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
app.use(urlencoded({extended: true}));

//route

//GET Requests
app.get("/", (req, res) => {
    res.redirect("/blogs")
})

app.get("/blogs", async (req, res) => {
    const result = await Blog.find().sort({ createdAt: -1 })
    try {
        res.render("index", { title: "All blogs", blogs: result })
    } catch (error) {
        console.log(error)
    }
})

app.get("/blogs/:id", async (req, res) => {
    const id = req.params.id
    const result = await Blog.findById(id);
    
})

app.get("/about", (req, res) => {
    res.render("about", { title: "About" })
})

app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "New Blog" })
})

//POST Requests
app.post("/blogs", async (req, res) => {
    const blog = new Blog(req.body);

    const result = await blog.save();
    try {
        res.redirect("/blogs") 
    } catch (error) {
        console.log(error)
    }
})

app.use((req, res) => {
    res.status(404).render("404", { title: "404" })
})

//listen to request
const port = process.env.PORT || 3500
