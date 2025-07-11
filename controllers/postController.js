//importiamo i post dal connection con il db

const connection = require("../db/connection.js");

// Index
const index = (req, res) => {
  const sql = "SELECT * FROM posts";

  connection.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    console.log(results);
    res.json(results);
  });
};

// Show
const show = (req, res) => {
  //conversione id in numero
  const id = parseInt(req.params.id);
  const sql = "SELECT * FROM posts WHERE id = ? ";
  // console.log(sql);

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    }

    if (!results.length > 0) {
      return res.status(404).json({
        error: "true",
        message: "Post non trovato",
      });
    }

    res.json(results[0]);
  });
};

//Store (bonus) reinserito post 2 con nuovo ID 6
const store = (req, res) => {
  // INSERT INTO posts (title, content, image) VALUES (?,?,?)

  console.log(req.body, "eccolo il req.body");
  const { title, content, image } = req.body;

  const sql = "INSERT INTO posts (title, content, image) VALUES (?,?,?)";
  //if scritto senza {}
  connection.query(sql, [title, content, image], (err, results) => {
    if (err)
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    console.log(results);
    res.status(201).json({ id: results.insertId });
  });
};

//Update
const update = (req, res) => {
  //conversione id in numero
  const id = parseInt(req.params.id);

  //ricerca dell'id
  const post = posts.find((posts) => posts.id === id);

  if (!post) {
    return res.json({
      error: "Not Found",
      message: "Post non trovato",
    });
  }

  // parametro da aggiornare
  (post.title = req.body.title),
    (post.content = req.body.content),
    (post.image = req.body.image),
    (post.tags = req.body.tags),
    console.log(posts);

  res.json(post);
};

//Modify
const modify = (req, res) => {
  const id = req.params.id;

  // controllo middleware "errorsHandler"

  piangere();

  res.send(`mododifica parzialmente il post n ${id}`);
};

//Destroy
const destroy = (req, res) => {
  const id = parseInt(req.params.id);

  const sql = "DELETE FROM posts WHERE id = ?";
  console.log(id);

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    }
    console.log(results);

    if (results.affectedRows === 0) {
      return res.status(404).json({
        error: "true",
        message: "Post non trovato",
      });
    }

    //status
    res.sendStatus(204);
  });
};

module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy,
};
