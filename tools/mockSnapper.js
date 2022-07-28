/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const mock = require("./mockData");

const data = JSON.stringify({ tasks: mock.tasks, taskGroups: mock.taskGroups, user: mock.user });
const filepath = path.join(__dirname, "mockSnapshot.json");

fs.writeFile(filepath, data, function(err) {
  err ? console.log(err) : console.log("Database snapshot created.");
});
