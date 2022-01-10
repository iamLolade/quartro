const express = require("express");
const blogControllers = require("../contollers/blogControllers")


const router = express.Router();

//GET Requests
router.get("/", blogControllers.blog_index)

router.get("/create", blogControllers.blog_create_get)

router.get("/:id", blogControllers.blog_details)

//POST Requests
router.post("/", blogControllers.blog_create_post)

//DELETE Requests
router.delete("/:id", blogControllers.blog_delete)


module.exports = router;