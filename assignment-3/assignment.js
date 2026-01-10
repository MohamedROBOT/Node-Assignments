/*
Part1: Core Modules ( 1.5 Grades)
1. Use a readable stream to read a file in chunks and log each chunk. (0.5 Grade)
• Input Example: "./big.txt"
• Output Example: log each chunk

sol:

const fs = require("node:fs");
const readStream = fs.createReadStream("./assignment-3/big.txt");
readStream.on("data", (chunk) => {
    console.log(chunk);
});


2. Use readable and writable streams to copy content from one file to another. (0.5 Grade)
• Input Example: "./source.txt", "./dest.txt"
• Output Example: File copied using streams

sol:

const fs= require("node:fs");
const readStream = fs.createReadStream("./assignment-3/big.txt");
const writeStream = fs.createWriteStream("./assignment-3/big2.txt");
readStream.pipe(writeStream);    //using pipe here for back pressure problem


3. Create a pipeline that reads a file, compresses it, and writes it to another file. (0.5 Grade)
• Input Example: "./data.txt", "./data.txt.gz"

sol:

const fs = require("node:fs");
const {  pipeline } = require("node:stream");
const zlib = require("node:zlib");

pipeline(
    fs.createReadStream("./assignment-3/big.txt"),
    zlib.createGzip(),
    fs.createWriteStream("./assignment-3/big1.txt"),
    err => {
        if(err) {
            console.log(err.message);
        } else {
            console.log("pipeline is succeeded")
        }
    }
);


Part2: Simple CRUD Operations Using HTTP ( 5.5 Grades):
For allthe following APIs, you must use the fs module to read and write data from a JSON file (e.g., users.json).
Do not store or manage data using arrays (0.5 Grades).



*/

const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  const { url, method } = req;
  let filePath = "./assignment-3/users.json";

  if (url == "/user" && method == "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", (error) => {
      if (error) {
        console.log(error.message);
      }
      let newUser = JSON.parse(body);

      let users = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
      if (!Array.isArray(users)) users = [];
      const existedEmail = users.some((user) => user.email === newUser.email);

      if (existedEmail) {
        res.writeHead(409, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Email already exits" }));
      }

      users.push(newUser);

      fs.writeFileSync(filePath, JSON.stringify(users));
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User added successfully" }));
    });
  }

  if (method === "PATCH" && url.startsWith("/user/")) {
    const id = parseInt(url.split("/")[2]);
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const newData = JSON.parse(body);

      let users = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));

      const userIndex = users.findIndex((user) => user.id === id);

      if (userIndex === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "User ID not found." }));
      }

      users[userIndex] = {
        ...users[userIndex],
        ...newData,
      };

      fs.writeFileSync(filePath, JSON.stringify(users));

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "User updated successfully",
          user: users[userIndex],
        })
      );
    });
  }

  if (method === "DELETE" && url.startsWith("/user/")) {
    const id = parseInt(url.split("/")[2]);

    let users = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "User ID not found" }));
    }

    users.splice(userIndex, 1); //fast delete by index here

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User deleted successfully" }));
  }

  if (url === "/users" && method === "GET") {
    const users = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
    if (users.length === 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "No users found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(users));
    res.end();
  }

  if (method === "GET" && url.startsWith("/users/")) {
    const id = parseInt(url.split("/")[2]);
    const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const selectedUser = users.find((user) => user.id === id);

    if (!selectedUser) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "user not found" }));
    }

    res.writeHead(201, { "Content-Type": "application/json" });
    res.write(JSON.stringify(selectedUser));
    res.end();
  }
});

const port = 3000;

server.listen(port, () => {
  console.log(`port is running on port ${port}`);
});

server.on("error", (error) => {
  console.log(error.message);
});
