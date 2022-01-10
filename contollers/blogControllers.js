const express = require("express");
const Blog = require("../model/blog");

const blog_index = async (req, res) => {
    const result = await Blog.find().sort({ createdAt: -1 })
    try {
        res.render("index", { title: "All blogs", blogs: result })
    } catch (error) {
        console.log(error)
    }
}

const blog_details = async (req, res) => {
    const id = req.params.id
    const result = await Blog.findById(id);

    try {
       res.render("details", { blog: result, title: "Blog Details"}) 
    } catch (error) {
       res.status(404).render("404", { title: "404" })
    }
}

const blog_create_get = (req, res) => {
    res.render("create", { title: "New Blog" })
}

const blog_create_post = async (req, res) => {
    const blog = new Blog(req.body);

    const result = await blog.save();
    try {
        res.redirect("/blogs") 
    } catch (error) {
        console.log(error)
    }
}

const blog_delete = async (req, res) => {
    const id = req.params.id;
    const result = await Blog.findByIdAndDelete(id)

    try {
        res.json({ redirect: "/blogs" })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}