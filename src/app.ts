import TinyDB from "./temp";

const db = new TinyDB("database.json"); // Persistence Enabled

// const user1 = db.insert("users", { name: "user1", age: 21 });
// const user2 = db.insert("users", { name: "user2", age: 22 });
// console.log("inserted", user1, user2);

// Retrieve all Collections

// const collections = db.getCollections();
// console.log('all-collections', collections)

// Find user By Query

// const filteredUser = db.find("users", { id: "c73f32ba-a730-48a8-8e91-08d4a2d12145" });
// console.log("found", filteredUser);