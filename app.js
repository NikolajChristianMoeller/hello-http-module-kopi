import express from "express";
import fs from "fs/promises";

const app = express();
const port = 3000;

app.use(express.json()); // JSON middleware

app.get("/", (req, res) => {
  res.status(200).send("Working with Express and routing");
});

app.get("/users", async (req, res) => {
  try {
    const json = await fs.readFile("data/users.json");
    res.status(200).json(JSON.parse(json));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/posts", async (req, res) => {
  try {
    const json = await fs.readFile("data/posts.json");
    res.status(200).json(JSON.parse(json));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = {
      id: new Date().getTime(),
      image: "url",
      mail: "tester@kea.dk",
      name: "Tester User",
      title: "Senior Tester",
    };

    const json = await fs.readFile("data/users.json");
    const users = JSON.parse(json);
    users.push(user);

    const usersJSON = JSON.stringify(users);
    await fs.writeFile("data/users.json", usersJSON);

    res.status(200).json(usersJSON);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/posts", async (req, res) => {
  try {
    const post = {
      caption: "Big ass mountains",
      createdAt: "123456789",
      image: "Billede",
      uid: "32"
    };

    const json = await fs.readFile("data/posts.json");
    const posts = JSON.parse(json);
    posts.push(post);

    const postsJSON = JSON.stringify(posts);
    await fs.writeFile("data/posts.json", postsJSON);

    res.status(200).json(postsJSON);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  const user = users.find(t => t.id === id);
  res.json(user);
});

app.get("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  const post = posts.find(t => t.id === id);
  res.json(post);
});

app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(t => t.id === id);
  console.log(id);
  console.log(req.body);
  users.splice(users.indexOf(user), 1);
  users.push(req.body);
  res.json(users);
});

app.put("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find(t => t.id === id);
  console.log(id);
  console.log(req.body);
  posts.splice(posts.indexOf(post), 1);
  posts.push(req.body);
  res.json(posts);
});

app.delete("/users/:id", (req, res) => {
  res.send("Got a DELETE request at /users");
});

app.delete("/posts/:id", (req, res) => {
  res.send("Got a DELETE request at /posts");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});