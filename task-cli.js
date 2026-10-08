const fs = require("fs");
const args = process.argv[2];
if (!fs.existsSync("./tasks.json")) {
  fs.writeFileSync("./tasks.json", "[]");
}
if (args === "add") addTask(process.argv[3]);
if (args === "update") updateTask(process.argv[3], process.argv[4]);
if (args === "delete") deleteTask(process.argv[3]);
if (args === "list") {
  let status = process.argv[3];
  if (status) listTaskByStatus(status);
  else listTaskByStatus();
}
let regex = /^mark/;
if (regex.test(args)) markProgress(process.argv[3], args);
function writeFileFs(data) {
  fs.writeFile("./tasks.json", JSON.stringify(data), (err) => {
    if (err) console.log("Error adding task", err);
    else console.log("Executed successfully");
  });
}

function readTask(id = null, updatedData = null, status = null, flag = null) {
  let data = fs.readFileSync("./tasks.json", { encoding: "utf8" });
  if (id && updatedData) {
    let parsedData = JSON.parse(data);
    for (let items of parsedData) {
      if (items.id === Number(id)) {
        items.updatedAt = new Date().toISOString();
        items.description = updatedData;
      }
    }
    return parsedData;
  }
  if (id && !updatedData && !status) // delete {

  {
    let parsedData = JSON.parse(data);
    let updatedData = [];

    for (let item of parsedData) {
      if (item.id === Number(id)) continue;
      updatedData.push(item);
    }
    return updatedData;
  }
  if (!id && status) {
    let parsedData = JSON.parse(data);
    let listDataByStatus = [];
    for (let items of parsedData) {
      if (items.status === status) listDataByStatus.push(items);
    }
    return listDataByStatus;
  }
  if (status && flag === "mark") {
    let parsedData = JSON.parse(data);
    for (let item of parsedData) {
      if (item.id === Number(id)) {
        item.status = status;
        item.updatedAt = new Date().toISOString();
      }
    }
    return parsedData;
  }
  return data;
} //to check before adding or updating

function addTask(task) {
  if (!task || !task.trim()) console.log("Missing task description");
  else {
    let data = readTask();
    const parsedData = JSON.parse(data);
    const now = new Date().toISOString();
    const id = parsedData.length
      ? Math.max(...parsedData.map((item) => item.id)) + 1
      : 1;
    let obj = {
      id: id,
      description: task,
      status: "todo", //bydefault todo
      createdAt: now,
      updatedAt: now,
    };
    if (!data) {
      writeFileFs([obj]);
    } else {
      parsedData.push(obj);
      writeFileFs(parsedData);
    }
  }
} //to add task

function updateTask(id, data) {
  //if id didnt match ??
  if (!id || !data || !data.trim()) console.log("no data or id ");
  else {
    let res = readTask(id, data);
    writeFileFs(res);
  }
} //to update task

function deleteTask(id) {
  console.log("id", id);
  if (!id) console.log("no id");
  else {
    let res = readTask(id);
    console.log("res", res);
    writeFileFs(res);
  }
} //to delete task or just say isactive=false and will read all task with isactive true

function markProgress(id, status) {
  let stat = status.substring(5);
  const allowedStatuses = ["todo", "in-progress", "done"];
  if (!allowedStatuses.includes(stat))
    console.log("provide valid status : todo,inprogress,done");
  else if (!id) console.log("no id");
  else {
    let res = readTask(id, null, stat, "mark");
    writeFileFs(res);
  }
} //status to change like ->in progress or done

function listTaskByStatus(status = null) {
  if (!status) console.log(readTask());
  else {
    let res = readTask(null, null, status);
    console.log(res);
  }
}
