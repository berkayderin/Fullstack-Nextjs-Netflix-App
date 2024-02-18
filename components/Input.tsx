import React from 'react'

interface InputProps {
	id: string
	onChange: any
	value: string
	label: string
	type?: string
	placeholder?: string
}

const Input: React.FC<InputProps> = ({ id, onChange, value, label, type, placeholder }) => {
	return (
		<div>
			<label htmlFor={id} className="text-sm font-semibold">
				{label}
			</label>
			<input
				id={id}
				onChange={onChange}
				value={value}
				type={type}
				placeholder={placeholder}
				className="border-2 border-black rounded-lg p-2 w-full focus:outline-none"
			/>
		</div>
	)
}

export default Input
