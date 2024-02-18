import React, { useEffect, useState } from 'react'
import { getSession, signIn } from 'next-auth/react'

import { FcGoogle } from 'react-icons/fc'
import { GrGithub } from 'react-icons/gr'
import Image from 'next/image'
import Input from '../components/Input'
import { NextPageContext } from 'next'
import axios from 'axios'
import { useRouter } from 'next/router'

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context)

	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	return {
		props: {}
	}
}

const Auth = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [variant, setVariant] = useState('login')

	const router = useRouter()

	const toggleVariant = () => {
		setVariant(variant === 'login' ? 'register' : 'login')
	}

	const handleLogin = async () => {
		try {
			await signIn('credentials', {
				email,
				password,
				redirect: false,
				callbackUrl: '/'
			})

			router.push('/profiles')
		} catch (error) {
			console.log('handle login: ', error)
		}
	}

	const handleRegister = async () => {
		try {
			await axios.post('/api/register', {
				name,
				email,
				password
			})

			handleLogin()
		} catch (error) {
			console.log('handle register: ', error)
		}
	}

	return (
		<div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-cover bg-center bg-no-repeat">
			<div className="bg-black h-full w-full bg-opacity-45">
				<nav className="px-12 py-6">
					<Image src="/images/logo.png" width={100} height={100} alt="logo" />
				</nav>

				<div className="flex justify-center items-center">
					<div className="bg-white p-20 rounded-lg">
						<h1 className="text-3xl font-bold mb-4">{variant === 'login' ? 'Login' : 'Register'}</h1>

						<div className="flex flex-col gap-4">
							{variant == 'register' && (
								<Input
									id="name"
									onChange={(e: any) => setName(e.target.value)}
									value={name}
									label="Fullname"
									type="text"
									placeholder="Enter your username"
								/>
							)}

							<Input
								id="email"
								onChange={(e: any) => setEmail(e.target.value)}
								value={email}
								label="Email"
								type="email"
								placeholder="Enter your email"
							/>
							<Input
								id="password"
								onChange={(e: any) => setPassword(e.target.value)}
								value={password}
								label="Password"
								type="password"
								placeholder="Enter your password"
							/>
						</div>

						<button
							className="bg-red-700 text-white rounded-lg p-3 w-full mt-4 font-semibold"
							onClick={variant === 'login' ? handleLogin : handleRegister}
						>
							{variant === 'login' ? 'Login' : 'Register'}
						</button>

						<div className="flex flex-row items-center justify-center gap-2 mt-2 font-semibold">
							<button
								className="bg-blue-500 text-white rounded-lg p-3 w-full flex items-center justify-center"
								onClick={() => signIn('google', { callbackUrl: '/profiles' })}
							>
								<FcGoogle size={30} className="mr-2 " />
								Google
							</button>
							<button
								className="bg-black text-white rounded-lg p-3 w-full flex items-center justify-center"
								onClick={() => signIn('github', { callbackUrl: '/profiles' })}
							>
								<GrGithub size={30} className="mr-2" />
								Github
							</button>
						</div>

						<div>
							<p className="font-semibold text-center mt-2 text-sm">
								<span className="text-gray-500 mr-2">
									{variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
								</span>
								<span onClick={toggleVariant} className="text-red-700 cursor-pointer">
									{variant === 'login' ? 'Create an account' : 'Login'}
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Auth
