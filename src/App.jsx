import { useState,useEffect } from "react";
import { TodoProvider } from "./context/todoContext";
import TodoForm from "./components/ToolForm";
import TodoItem from "./components/ToolItem";
function App() {
	const [todos, setTodos] = useState([]);
	// const [msg, setMsg] = useState("");

	const addTodo = (msg) => setTodos((prev) => [{ id: Date.now(), completed: false, todoMsg: msg }, ...prev]);

	const editTodo = (id, msg) => setTodos((prevTodo) => prevTodo.map((obj) => (obj.id === id ? {...obj, todoMsg: msg } : obj)));

	const deleteTodo = (id) => setTodos((prevTodo) => prevTodo.filter((obj) => obj.id !== id));

	const toggleCompleted = (id) => {
		setTodos((prevTodos) => prevTodos.map((obj) => (obj.id === id ? { ...obj, completed: !obj.completed } : obj)));
	};

	useEffect(() => {
		const todos = JSON.parse(localStorage.getItem("todos"))
	
		if (todos && todos.length > 0) {
		  setTodos(todos)
		}
	  }, [])
	
	  useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos))
	  }, [todos])
	return (
		<TodoProvider value={{ todos, addTodo, editTodo, deleteTodo, toggleCompleted }}>
			<div className='bg-[#172842] min-h-screen py-8'>
				<div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white'>
					<h1 className='text-2xl font-bold text-center mb-8 mt-2'>Manage Your Todos</h1>
					<div className='mb-4'>
						<TodoForm />
					</div>
					{/* <div className='flex flex-wrap gap-y-3'> */}
						{todos.map((obj) => (
							<div className='w-full' key={obj.id}>
								<TodoItem obj={obj} />
							</div>
						))}
					{/* </div> */}
				</div>
			</div>
		</TodoProvider>
	);
}

export default App;
