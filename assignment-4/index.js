//assignment 3 Node Internals
/*
Part3: Node Internals (3 Grades):
1. What is the Node.js Event Loop? (0.5 Grade)
The event loop in Node.js is a mechanism that allows asynchronous tasks to be handled efficiently without blocking the execution of other operations.

2. What is Libuv and What Role Does It Play in Node.js? (0.5 Grade)
Definition: libuv is a C library originally written for Node.js to abstract non-blocking I/O
Role: 
* Event-driven asynchronous I/O model is integrated.
* It allows the CPU and other resources to be used simultaneously while still performing I/O operations, thereby resulting in efficient use of resources and network.
* It facilitates an event-driven approach wherein I/O and other activities are performed using callback-based notifications.

3. How Does Node.js Handle Asynchronous Operations Under the Hood? (0.5 Grade)
* Node.js handles asynchronous operations through libuv, which offloads tasks to the OS or a worker thread pool, 
* while the main JavaScript thread uses the event loop to handle callbacks.

4. What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js? (0.5 Grade)
- Call Stack
* Where JavaScript executes code synchronously
* Functions are pushed when called and popped when finished
- Event Queue (Callback Queue)
* Holds callbacks from async operations (like setTimeout, I/O)
* Waits until the call stack is empty
- Event Loop
* Continuously checks if the call stack is empty
* Moves callbacks from the event queue to the call stack to be executed

5. What is the Node.js Thread Pool and How to Set the Thread Pool Size? (0.5 Grade)
A set of worker threads (from libuv) used to handle blocking / heavy tasks so they don’t block the main event loop.
how to set: UV_THREADPOOL_SIZE=8 node app.js

6. How Does Node.js Handle Blocking and Non-Blocking Code Execution? (0.5 Grade)
- Non-blocking code
* Runs asynchronously
* Offloaded to libuv / OS / thread pool
* Uses callbacks, promises, async/await
* Does not block the event loop

-Blocking code
* Runs synchronously on the main thread
* Blocks the event loop
* Delays all other requests
*/

//assignment 4 express
const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
const filePath = "./users.json";
const getAllUsers = () => {
  let users = fs.readFileSync(filePath, "utf-8");
  users = JSON.parse(users);
  return users;
};

const writeAllUsers = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users));
};

app
  .route("/user")
  .post(express.json(), (req, res) => {
    const newUser = req.body;
    const users = getAllUsers();
    const existedUser = users.find((user) => user.email === newUser.email);
    if (existedUser) return res.send({ message: "Email Already Exists" });
    users.push(newUser);
    writeAllUsers(users);
    res.send({ message: "User Added Successfully" });
  })
  .get((req, res) => {
    const users = getAllUsers();
    if (users.length === 0) res.status(404).send({ message: "no users found" });

    res.send(users);
  });

app
  .route("/user{/:id}")
  .get((req, res) => {
    const userId = +req.params.id;
    const users = getAllUsers();
    const foundedUser = users.find((user) => user.id === userId);
    if (!foundedUser)
      return res.status(404).send({ message: "User Not Found" });
    res.send(foundedUser);
  })
  .patch(express.json(), (req, res) => {
    const body = req.body;
    const userId = +req.params.id;
    let users = getAllUsers();
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1)
      return res.status(404).send({ message: "User Not Found" });
    const foundedUser = users[userIndex];
    const updatedUser = {
      ...foundedUser,
      ...body,
    };
    users[userIndex] = updatedUser;
    writeAllUsers(users);
    const changedKeys = Object.keys(body).filter(
      (key) => body[key] !== foundedUser[key]
    );
    if (changedKeys.length === 0)
      return res.send({ message: "No changes detected" });

    res.send({ message: `user ${changedKeys} updated successfully` });
  })
  .delete(express.json(), (req, res) => {
    const userId = +req.params.id || +req.body.id;
    let users = getAllUsers();
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1)
      return res.status(404).send({ message: "User Not Found" });

    users.splice(userIndex, 1);
    res.send({ message: "User deleted successfully" });
    writeAllUsers(users);
  });

app.get("/user/getByName", express.json(), (req, res) => {
  const queryName = req.query.name;
  console.log(queryName);
  const users = getAllUsers();
  const findUser = users.find(
    (user) => user.name.toLowerCase() === queryName.toLowerCase()
  );
  if (!findUser)
    return res.status(404).send({ message: "User name not found" });

  res.send(findUser);
});

app.get("/user/filter", (req, res) => {
  const minAge = +req.query.age;
  const users = getAllUsers();
  const filteredUsers = users.filter((user) => user.age <= minAge);
  if (filteredUsers.length === 0)
    return res
      .status(404)
      .send({ message: "No users found with the required age" });
  res.send(filteredUsers);
});

app.listen(port);
