/*
1. Write a function that logs the current file path and directory. (0.5 Grade)
• Output Example:{File:“/home/user/project/index.js”, Dir:“/home/user/project”}

Solution: 

function getInfo(){
    console.log(__dirname);
    console.log(__filename);
}
getInfo();


2. Write a function that takes a file path and returns its file name. (0.5 Grade)
• Input Example: /user/files/report.pdf
• Output Example:"report.pdf"

solution:
let pathName = "/user/files/report.pdf";

const path = require("node:path");

console.log(path.basename(pathName));

3. Write a function that builds a path from an object (0.5 Grade)
• Input Example: { dir: "/folder", name: "app", ext: ".js"}
• Output Example: “/folder/app.js”

solution:
const path = require("node:path");

let obj = { dir: "/folder", name: "app",ext: ".js"};

console.log(path.join(obj.dir,obj.name+obj.ext));


4. Write a function that returns the file extension from a given file path. (0.5 Grade)
• Input Example: /docs/readme.md"
• Output Example: “.md”

solution:
const path = require("node:path");

let pathName = "/docs/readme.md";

console.log(path.extname(pathName));


5. Write a function that parses a given path and returns its name and ext. (0.5 Grade)
• Input Example: /home/app/main.js
• Output Example: { Name: “main”, Ext: “.js” }

solution:
const path = require("node:path");

let pathName = "/home/app/main.js"

const parsedData = path.parse(pathName);

const myObj = {
    Name: parsedData.name,
    Ext: parsedData.ext
};

console.log(myObj);


6. Write a function that checks whether a given path is absolute. (0.5 Grade)
• Input Example: /home/user/file.txt
• Output Example: true

solution:
const path = require("node:path");

let pathName = "/home/user/file.txt"

console.log(path.isAbsolute(pathName));


7. Write a function that joins multiple segments (0.5 Grade)
• Input:"src","components", "App.js"
• Output Example: src/components/App.js

solution:


const path = require("node:path");

const pathOne = "src"
const pathTwo = "components"
const pathThree = "App.js"

console.log(path.join(pathOne,pathTwo,pathThree));


8. Write a function that resolves a relative path to an absolute one. (0.5 Grade)
• Input Example: ./index.js
• Output Example: /home/user/project/src/index.js

solution:
const path = require("node:path");
const pathName = "./index.js"
console.log(path.resolve(pathName));

9. Write a function that joins two paths. (0.5 Grade)
• Input Example: /folder1, folder2/file.txt
• Output Example: /folder1/folder2/file.txt

solution:

const path = require("node:path");
const pathName1 = "/folder1"
const pathName2 = "folder2/file.txt"
console.log(path.join(pathName1,pathName2));

10. Write a function that deletes a file asynchronously. (0.5 Grade)
• Input Example: /path/to/file.txt
• Output Example: The file.txt is deleted.

solution:

const fs = require("node:fs");

fs.unlink("./path/to/file.txt", (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("The file.txt is deleted.");
});



11. Write a function that creates a folder synchronously. (1 Grade)
• Output Example: “Success”

const fs = require("node:fs");

fs.mkdir("example", (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Success");
});



12. Create an event emitter that listens for a "start" event and logs a welcome message. (0.5 Grade)
• Output Example: Welcome event triggered!

solution: 
const {EventEmitter} = require("node:events");
const eventEmitter = new EventEmitter();


eventEmitter.on("start", () => {
    console.log("Welcome event triggered!");
});

eventEmitter.emit("start");


13. Emit a custom "login" event with a username parameter. (0.5 Grade)
• Input Example:"Ahmed"
• Output Example: “User logged in: Ahmed”

solution: 
const {EventEmitter} = require("node:events");
const eventEmitter = new EventEmitter();


eventEmitter.on("login", (username)=> {
    console.log(`User logged in: ${username}`);
})

eventEmitter.emit("login","Ahmed");


14. Read a file synchronously and log its contents. (1 Grade)
• Input Example:"./notes.txt"
• Output Example: the file content => “This is a note.”

solution:

const fs = require("fs");

const filePath = "./notes.txt";

console.log(fs.readFileSync(filePath,"utf-8"));


15. Write asynchronously to a file. (1 Grade)
• Input: path:"./async.txt", content:"Async save"

solution:

const fs = require("fs");

fs.writeFile("./async.txt","Async save", (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Async Save");
});



16. Check if a directory exists. (0.5 Grade)
• Input Example: "./notes.txt"
• Output Example: true

solution:

const fs = require("fs");

console.log(fs.existsSync("./async.txt"));



17. Write a function that returns the OS platform and CPU architecture. (0.5 Grade)
• Output Example: {Platform: “win32”, Arch: “x64”}

const os = require("os");

function getSystemInfo() {
  return {
    Platform: os.platform(),
    Arch: os.arch(),
  };
}

console.log(getSystemInfo());


*/

