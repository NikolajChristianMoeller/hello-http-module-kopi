import http from "node:http";
import { users } from "./app2.js";
import fs from "fs/promises";

const app = http.createServer(async (request, response) => {
  if (request.url === "/" && request.method === "GET") {
    // Sæt statuskode og overskrift for responsen
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    // Send besked som response
    response.end("Working with HTTP Module and routing");
  } else if (request.url === "/users" && request.method === "GET") {
    // Sæt statuskode og overskrift for responsen
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    const json = await fs.readFile("data/users.json");
    // JSON som response
    // response.end(JSON.stringify(users));
    response.end(json);
  } else if (request.url === "/posts" && request.method === "GET") {
    // Sæt statuskode og overskrift for responsen
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    const json = await fs.readFile("data/posts.json");
    // JSON som response
    //   response.end(JSON.stringify(users));
    response.end(json);
  } else if (request.url === "/users" && request.method === "POST") {
    const user = {
      id: new Date().getTime(),
      image: "url",
      mail: "tester@kea.dk",
      name: "Tester User",
      title: "Senior Tester",
    };
    // Læs fra JSON
    const json = await fs.readFile("data/users.json");
    console.log(json);
    // Parse til JavaScript
    const users = JSON.parse(json);
    console.log(users);
    // Tilføj "user" til "users"
    users.push(user);
    // Konverter users til JSON igen
    const usersJSON = JSON.stringify(users);
    // Skriv til JSON-fil
    await fs.writeFile("data/users.json", usersJSON);
    // Sæt statuskode og header
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    // Send users
    response.end(usersJSON);
  }
});

//console.log(users);

const port = 3000;
app.listen(port, () => {
  console.log(`Serveren kører på http://localhost:${port}`);
});
