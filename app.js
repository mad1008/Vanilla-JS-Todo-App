// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click',filterList);

// functions
function createTodo(val){
				// create todo div
			const todoDiv = document.createElement('div');
			todoDiv.classList.add('todo');
			// Create li 
			const newTodo = document.createElement('li');
			newTodo.innerText = val;
			todoDiv.classList.add('todo-item');
			todoDiv.appendChild(newTodo);
			// check button
			const completedButton = document.createElement("button");
			completedButton.innerHTML = '<i class = "fas fa-check"></i>';
			completedButton.classList.add("complete-button");
			todoDiv.appendChild(completedButton);

			// trash button
			const trashButton = document.createElement("button");
			trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
			trashButton.classList.add("trash-button");
			todoDiv.appendChild(trashButton);

			// Append to list
			todoList.appendChild(todoDiv);
			return todoList
}
function addTodo(event){
		// Prevent form from submiting
		event.preventDefault();
		if(todoInput.value != ""){
			createTodo(todoInput.value);
			// Add to local storage
			saveLocalTodos(todoInput.value);

			// clear input after adding item
			todoInput.value="";
	}
}
function filterList(e){
	todos = todoList.childNodes;
	todos.forEach(function(todo){
		switch(e.target.value){
			case "all":
				todo.style.display="flex";
				break;
			case "completed":
				if(todo.classList.contains("completed")){
					todo.style.display = "flex";
				}else{
					todo.style.display = "none";
				}break;
			case "uncomplited":
				if(!todo.classList.contains("completed")){
					todo.style.display = "flex";
				}else{
					todo.style.display = "none";
				}break;

		}
	});
}
function deleteCheck(event){
	const item = event.target;
	//Delete Todo
	if(item.classList[0] === 'trash-button'){
		const todo = item.parentElement;
		todo.classList.add("fall");
		todo.addEventListener('transitionend', function(){
			todo.remove();
		});
		removeTodos(todo);
	}

	//Check mark
	if(item.classList[0] === 'complete-button'){
		const todo = item.parentElement;
		todo.classList.toggle("completed");

	}
}

function saveLocalTodos(todo){
	// Read local storage if exist
	let todos;
	if(localStorage.getItem('todos')===null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(todo);
	localStorage.setItem('todos',JSON.stringify(todos));
}


function getTodos(){
	// Read local storage if exist
	let todos;
	if(localStorage.getItem('todos')===null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem('todos'));
		todos.forEach(function(todo){
			createTodo(todo);
		});
	}
}

function removeTodos(todo){
	let todos;
	if(localStorage.getItem('todos')===null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	const todoIndex = todo.children[0].innerHTML;
	todos.splice(todos.indexOf(todoIndex),1);
	localStorage.setItem("todos", JSON.stringify(todos));
}