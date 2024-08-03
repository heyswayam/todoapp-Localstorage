import React, { useState } from "react";
import useTodo from "../context/todoContext";

function TodoItem({ obj }) {
	const [msg, setMsg] = useState(obj.todoMsg || "");
	const [isTodoEditable, setIsTodoEditable] = useState(false);
	const [isComplete, setIsComplete] = useState(obj.completed || false);
	const { editTodo, deleteTodo, toggleCompleted } = useTodo();
	// console.log("objitem completed: " + obj.completed);
	return (
		<div className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${isComplete ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}>
			<input
				type='checkbox'
				className='cursor-pointer'
				checked={isComplete}
				onChange={() => {
					if (isComplete) toggleCompleted(obj.id);
					return setIsComplete((prev) => !prev);
				}}
			/>
			<input type='text' className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"} ${isComplete ? "line-through" : ""}`} value={msg} onChange={(e) => setMsg(e.target.value || "")} readOnly={!isTodoEditable} />
			{/* Edit, Save Button */}
			<button
				className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50'
				onClick={() => {
					if (isComplete) return;

					if (isTodoEditable) {
						editTodo(obj.id, msg);
						setIsTodoEditable((prev) => !prev);
					} else {
						setIsTodoEditable((prev) => !prev);
					}
				}}
				disabled={isComplete}
			>
				{isTodoEditable ? "📁" : "✏️"}
			</button>
			{/* Delete Todo Button */}
			<button className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0' onClick={() => deleteTodo(obj.id)}>
				❌
			</button>
		</div>
	);
}

export default TodoItem;
