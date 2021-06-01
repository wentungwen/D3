import User, { printName as printUserName, printAge } from "./user.js";

const user = new User("Bob", 12);
console.log(user);

printUserName(user);
