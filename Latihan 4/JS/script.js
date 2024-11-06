let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task =>
        filter === "all" ? true : filter === "active" ? !task.completed : task.completed
    );

    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.className = `task-item ${task.completed ? "completed" : ""}`;

        const taskDetails = document.createElement("div");
        taskDetails.className = "task-details";

        const taskTitle = document.createElement("span");
        taskTitle.textContent = task.title;
        taskDetails.appendChild(taskTitle);

        if (task.dueDate) {
            const taskDueDate = document.createElement("small");
            taskDueDate.textContent = `Jatuh Tempo: ${task.dueDate}`;
            taskDetails.appendChild(taskDueDate);
        }

        const taskPriority = document.createElement("span");
        taskPriority.className = `task-priority ${task.priority}`;
        taskPriority.textContent = `Prioritas: ${task.priority}`;
        taskDetails.appendChild(taskPriority);

        const taskActions = document.createElement("div");
        taskActions.className = "task-actions";

        const toggleButton = document.createElement("button");
        toggleButton.textContent = task.completed ? "Belum Selesai" : "Selesai";
        toggleButton.addEventListener("click", () => toggleTask(index));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Hapus";
        deleteButton.addEventListener("click", () => deleteTask(index));

        taskActions.appendChild(toggleButton);
        taskActions.appendChild(deleteButton);

        taskItem.appendChild(taskDetails);
        taskItem.appendChild(taskActions);
        taskList.appendChild(taskItem);
    });

    updateStats();
}

function addTask(event) {
    event.preventDefault();
    const title = document.getElementById("taskTitle").value;
    const dueDate = document.getElementById("taskDueDate").value;
    const priority = document.getElementById("taskPriority").value;

    if (title.trim()) {
        tasks.push({ title, dueDate, priority, completed: false });
        saveTasks();
        renderTasks();
        document.getElementById("taskForm").reset();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function updateStats() {
    document.getElementById("totalTasks").textContent = tasks.length;
    document.getElementById("completedTasks").textContent = tasks.filter(task => task.completed).length;
}

document.getElementById("taskForm").addEventListener("submit", addTask);

document.querySelectorAll(".filters button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        renderTasks(button.getAttribute("data-filter"));
    });
});

document.getElementById("sortByDueDate").addEventListener("click", () => {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    saveTasks();
    renderTasks();
});

renderTasks();
