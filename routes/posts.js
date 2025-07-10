const express = require("express");
const router = express.Router();

//controllers
const postControllers = require("../controllers/postController.js");

//importiamo posts da data
const posts = require("../data/posts.js");

//in base alla richiesta di percorso viene chiesto al controller di eseguire...

// Index + bonus
router.get("/", postControllers.index);

// Show + Bonus
router.get("/:id", postControllers.show);

//Store
router.post("/", postControllers.store);

//Update
router.put("/:id", postControllers.update);

//Modify
router.patch("/:id", postControllers.modify);

//Destroy + Bonus
router.delete("/:id", postControllers.destroy);

module.exports = router;
