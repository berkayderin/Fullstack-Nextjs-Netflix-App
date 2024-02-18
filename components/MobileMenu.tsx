import React from 'react'

interface MobileMenuProps {
	visible?: boolean
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
	if (!visible) return null

	return (
		<div className="bg-black w-48 absolute top-10 left-0 p-3 rounded-md border-t-2 border-red-500">
			<div className="flex flex-col gap-4">
				<p className="text-white text-center hover:text-red-500 cursor-pointer transition-all duration-300">Anasayfa</p>
				<p className="text-white text-center hover:text-red-500 cursor-pointer transition-all duration-300">Diziler</p>
				<p className="text-white text-center hover:text-red-500 cursor-pointer transition-all duration-300">Filmler</p>
				<p className="text-white text-center hover:text-red-500 cursor-pointer transition-all duration-300">
					Yeni ve Popüler
				</p>
				<p className="text-white text-center hover:text-red-500 cursor-pointer transition-all duration-300">Listem</p>
				<p className="text-white text-center hover:text-red-500 cursor-pointer transition-all duration-300">
					Dillere Göre Göz At
				</p>
			</div>
		</div>
	)
}

export default MobileMenu
