const list = document.querySelector("#list");
const button = document.querySelector("#btn");
const input = document.querySelector("#input")

// console.log(input);

let tasks = [];

button.addEventListener("click", function () {
    const taskText = input.value;
    tasks.push(taskText);
    console.log(tasks);
    input.value = "";
    list.innerHTML = "";
    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.textContent = task;
        list.appendChild(li);
    })
})
