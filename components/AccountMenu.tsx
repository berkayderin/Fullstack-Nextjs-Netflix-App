import Image from 'next/image'
import React from 'react'
import { signOut } from 'next-auth/react'
import useCurrentUser from '@/hooks/useCurrentUser'

interface MobileMenuProps {
	visible?: boolean
}

const AccountMenu: React.FC<MobileMenuProps> = ({ visible }) => {
	const { data, error, isLoading, mutate } = useCurrentUser()

	if (!visible) return null

	console.log(' account menu data:', data)

	return (
		<div className="bg-black w-48 absolute top-14 right-0 rounded-md border-t-2 border-red-500">
			<div className="flex flex-col justify-center items-center p-4">
				<div className="group flex flex-row items-center gap-3 w-full">
					<Image src="/images/default-red.png" alt="Avatar" width={40} height={40} className="rounded-xl" />
					<p className="text-white font-semibold text-sm hover:underline cursor-pointer">{data?.name}</p>
				</div>
				<hr className="w-full border-t-2 border-gray-700 my-3" />
				<button
					onClick={() => {
						signOut()
					}}
					className="text-white font-semibold text-sm hover:underline cursor-pointer"
				>
					Netflix oturumunu kapat
				</button>
			</div>
		</div>
	)
}

export default AccountMenu
