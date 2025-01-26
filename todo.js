let inputs = document.getElementById("inpu"); 
let text = document.querySelector(".text");
let addbtn = document.querySelector(".add");
let editingItem = null;


function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.forEach(task => {
      create(task)
    });
}


function saveTasks() {
    const tasks = Array.from(text.querySelectorAll("li")).map(item => item.textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function create(e) {
    let itemtask = document.createElement("ul");
    itemtask.innerHTML = `<li>${e}</li>
        <button class="edit">edit</button> 
        <button class="del"><i class="fa-solid fa-trash"></i></button>`;
    text.appendChild(itemtask);

    itemtask.querySelector(".del").addEventListener("click", () => {
        itemtask.remove();
        editingItem = "";
        inputs.value = "";
        addbtn.textContent = "add";
        saveTasks();
    });

    itemtask.querySelector(".edit").addEventListener("click", () => {
        editingItem = itemtask.querySelector("li");
        inputs.value = editingItem.textContent;
        addbtn.textContent = "Update";
    });
}

function add() {
    if (inputs.value === "") {
        alert("please enter your task");
    } else if (editingItem) {
        editingItem.textContent = inputs.value;
        addbtn.textContent = "add";
        editingItem = "";
        inputs.value = "";
        saveTasks();
    } else {
    create(inputs.value);
        inputs.value = "";
        saveTasks();
    }
}

inputs.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        add();
    }
});


window.onload = loadTasks;









