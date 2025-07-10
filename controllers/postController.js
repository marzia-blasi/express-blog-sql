//importiamo posts da data

const posts = require("../data/posts.js");

// Index + bonus
const index = (req, res) => {
  // res.json(posts);
  let filterposts = posts;

  if (req.query.tags) {
    filterposts = posts.filter((post) => post.tags.includes(req.query.tags));
  }

  res.json(filterposts);
};

// Show + Bonus
const show = (req, res) => {
  console.log(req.params);
  //conversione id in numero
  const id = parseInt(req.params.id);

  //ricerca dell'id (cicla dentro posts per restituirci il singolo elemento post)
  const post = posts.find((posts) => posts.id === id);

  if (!post) {
    return res.json({
      error: "Not Found",
      message: "Post non trovato",
    });
  }

  res.json(post);
};

//Store
const store = (req, res) => {
  console.log(req.body);

  //nuovo id che s'incrementa dopo quello già esistente
  const newId = posts[posts.length - 1].id + 1;
  //oggetto post
  const newPost = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags,
  };

  //aggiunta a posts
  posts.push(newPost);

  console.log(posts);

  // status + json
  res.status(201);
  res.json(newPost);
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

//Destroy + Bonus
const destroy = (req, res) => {
  //conversione id in numero
  const id = parseInt(req.params.id);

  //ricerca dell'id
  const post = posts.find((posts) => posts.id === id);

  if (!post) {
    res.status(404);

    return res.json({
      status: 404,
      error: "Not Found",
      message: "Post non trovato",
    });
  }
  // troviamo il post e lo rimuoviamo
  posts.splice(posts.indexOf(post), 1);
  console.log(posts);

  //status
  res.sendStatus(204);
};

module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy,
};
