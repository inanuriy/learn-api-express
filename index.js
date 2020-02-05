require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
// const todos = require("./todos");

const PORT = process.env.PORT;
const app = express();

let todos = [
    {
      id: 1,
      todo: "Learn API"
    },
    {
      id: 2,
      todo: "Eat"
    }
  ];

// parser application/x-www-from-urlencoded :
app.use(bodyParser.urlencoded({ extended: true }));

// parser application/json :
app.use(bodyParser.json());

app.get("/hello", (req, res) => {
  res.send({
    message: "This is hello route"
  });
});

app.get("/hello/:id", (req, res) => {
  const { id } = req.params;

  res.send({
    message: `This is hello route with params ${id}`
  });
});

app.get("/", (req, res) => {
  res.send({ message: "Welcome to my API", data: todos });
});

app.get("/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  todos.splice(id, 1);
  res.send({ message: "Welcome to my id", data: todos });
});

app.post("/", (req, res) => {
  const { id, todo } = req.body;

  todos.push({ id: parseInt(id), todo });

  res.send({
    message: "Your todos is added",
    data: todos
  });
});

// app.put("/:id", (req,res) => {
//     const { id } = req.params;

//     todos.splice(id, 1)

//     res.send({
//         message: "Your todos is updated",
//         data: todos
//     });
// });

// app.delete("/:id"), (req,res) => {
//     const { id } = req.params;
//     console.log(id)
//     todos.splice(id, 1)
//     res.send({ message: "delete id ", data: todos });
// }

app.delete("/:id", function(req, res) {
  const { id } = req.params;

  console.log("masuk", id);

  todos.splice(id, 1);

  res.send({
    message: "todo dihapus",
    data: todos
  });
});

app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;

  todos.splice(id, 1, { id, todo });

  res.send({
    message: "Todos updated",
    data: todos
  });
});

app.listen(PORT, () => {
  console.log(`My API is listen on ${PORT}`);
});
