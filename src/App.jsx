
import { useState } from 'react'
import './App.css'

function App() {

	const [todos, setTodos] = useState([])
	const [input, setInput] = useState("")
	const [isEditing, setIsEditing] = useState(null)

	const handleTodo = () => {
		console.log({ input });
		if (!input) return;

		if (isEditing) {
			setTodos(todos.map((todo) => todo.id === isEditing ? { ...todo, title: input } : todo))
			setIsEditing(null)
		} else {
			setTodos([...todos, { id: todos.length + 1, title: input, completed: false }])
		}

		setInput("")
	}

	const handleToggleTodo = (id) => {
		setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
	}

	const handleEditTodo = (todo) => {
		setIsEditing(todo.id)
		setInput(todo.title)
		handleTodo()
	}
	const handleDeleteTodo = (id) => {
		if (confirm("delete ? ")) {
			setTodos(todos.filter((todo) => todo.id !== id))
		}
	}

	return (
		<>
			<h1>Todo App</h1>
			<div className="todo-container">
				<input className='input' type="text" placeholder="Add a todo" value={input} onChange={(e) => setInput(e.target.value)} />
				<button className='addBtn' onClick={handleTodo}> {isEditing ? "Update" : "Add"}</button>
			</div>
			<ul>
				{todos.length === 0 && <p>No todos found</p>}
				{todos.map((todo) => (
					<li key={todo.id} className='listItem'>
						<span className={todo.completed ? "completed" : ""} onClick={() => handleToggleTodo(todo.id)}>{todo.title}</span>
						<button className='editBtn' onClick={() => handleEditTodo(todo)}>Edit</button>
						<button className='deleteBtn' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
					</li>
				))}
			</ul>
		</>
	)
}

export default App
