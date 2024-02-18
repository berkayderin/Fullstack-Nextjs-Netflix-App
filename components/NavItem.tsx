import React from 'react'
import { act } from 'react-dom/test-utils'

interface NavItemProps {
	name: string
	active?: boolean
}

const NavItem: React.FC<NavItemProps> = ({ name, active }) => {
	return (
		<div className={active ? 'text-white' : 'text-gray-400'}>
			<span className="hover:text-white cursor-pointer transition-all duration-300">{name}</span>
		</div>
	)
}

export default NavItem
