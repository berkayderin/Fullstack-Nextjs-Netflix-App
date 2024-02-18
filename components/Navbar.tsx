import { BellIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'

import AccountMenu from './AccountMenu'
import Image from 'next/image'
import MobileMenu from './MobileMenu'
import NavItem from './NavItem'

const Navbar = () => {
	const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
	const [accountMenuVisible, setAccountMenuVisible] = useState(false)

	const handleMobileMenu = () => {
		setMobileMenuVisible(!mobileMenuVisible)
	}

	const handleAccountMenu = () => {
		setAccountMenuVisible(!accountMenuVisible)
	}

	return (
		<nav className="w-full fixed z-20">
			<div className="px-4 py-6 flex flex-row items-center transition-all duration-300">
				<Image src="/images/logo.png" alt="Logo" width={100} height={100} className="h-6 lg:h-8" />

				<div className="flex-row hidden lg:flex space-x-4 ml-12">
					<NavItem name="Anasayfa" active />
					<NavItem name="Diziler" />
					<NavItem name="Filmler" />
					<NavItem name="Yeni ve Popüler" />
					<NavItem name="Listem" />
					<NavItem name="Dillere Göre Göz At" />
				</div>

				<div onClick={handleMobileMenu} className="relative lg:hidden flex flex-row items-center gap-2 ml-6">
					<p className="text-white">Göz At</p>
					<ChevronDownIcon className="text-white w-5 cursor-pointer" />
					<MobileMenu visible={mobileMenuVisible} />
				</div>

				<div className="flex flex-row ml-auto gap-6 items-center">
					<div className="flex flex-row gap-4">
						<MagnifyingGlassIcon className="text-white w-6 cursor-pointer" />
						<BellIcon className="text-white w-6 cursor-pointer" />
						<div className="flex flex-row items-center gap-2 relative" onClick={handleAccountMenu}>
							<Image src="/images/default-red.png" alt="Avatar" width={40} height={40} className="rounded-xl" />
							<ChevronDownIcon className="text-white w-5 cursor-pointer" />
							<AccountMenu visible={accountMenuVisible} />
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
