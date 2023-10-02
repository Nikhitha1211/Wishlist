let todoInput = document.querySelector(".input")
let todoAdd = document.querySelector(".button.btn-primary.cursor")
let showTodos = document.querySelector(".todos-container")

let localData = JSON.parse(localStorage.getItem("todo"));
let todoList = localData || [];
console.log(todoInput)
console.log(todoAdd)
console.log(showTodos)

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}

todoAdd.addEventListener("click", (e) => {
    e.preventDefault();
    if (!(todoInput.value === "")) {
        console.log("Inside")
        let id = uuid();
        let todo = todoInput.value;
        todoList.push({ id: id, todo: todo, isCompleted: false });
        todoInput.value = "";
        console.log(todoList)
    }
    localStorage.setItem("todo", JSON.stringify(todoList))
    renderTodoList(todoList)
})

showTodos.addEventListener("click", (e) => {
    let key = e.target.dataset.key;
    let todokey = e.target.dataset.todokey;
    console.log(key)
    console.log(todokey)
    todoList.map(todo => todo.id === key ? (todo.isCompleted = !todo.isCompleted) : todo)
    todoList = todoList.filter(todo => todo.id!==todokey)
    console.log(todoList)
    localStorage.setItem("todo", JSON.stringify(todoList))
    renderTodoList(todoList)
})

function renderTodoList(todoList) {
    console.log(todoList)
    showTodos.innerHTML = todoList.map(todo => `<div class = "todo relative"><input type="checkbox" id="item-${todo.id}" data-key=${todo.id} ${todo.isCompleted ? "checked" : " "} class="t-checkbox t-pointer"><label for="item-${todo.id}" data-key=${todo.id} class = "todo todo-text t-pointer ${todo.isCompleted ? "checked-todo" : " "}" >${todo.todo}</label>
    <button class="absolute right-0 button cursor"><span data-todokey=${todo.id}  class="del-btn material-icons-outlined">delete</span></button></div>`)
}

renderTodoList(todoList);