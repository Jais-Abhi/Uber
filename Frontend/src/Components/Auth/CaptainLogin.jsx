import React from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')

    const validate = () => {
        if (!email) return 'Email is required'
        if (!/^\S+@\S+\.\S+$/.test(email)) return 'Enter a valid email'
        if (!password) return 'Password is required'
        if (password.length < 6) return 'Password must be at least 6 characters'
        return ''
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const err = validate()
        setError(err)
        if (err) return


        console.log('Logging in user', { email, password })
    }

    return (
        <div className="w-full p-6 h-screen bg-white shadow-sm font-sans">
            <h2 className=" text-3xl font-semibold pb-2">Uber</h2>

            <form onSubmit={handleSubmit} className="space-y-4 pt-8">
                <div className='pb-3'>
                    <label className="block text-xl font-medium text-gray-700 mb-3">What's your email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="you@example.com"
                        required
                    />
                </div>

                <div className='pb-3'>
                    <label className="block text-xl font-medium text-gray-700 mb-3">Enter your password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                {error ? <div className="text-red-600 text-sm">{error}</div> : null}

                <button type="submit" className="w-full px-4 py-2 bg-black text-white rounded-md font-semibold hover:opacity-90">
                    Login
                </button>
            </form>

            <Link className="mt-4 block text-center text-md"
                to="/captain/register"
                >
                
                New here ?{' '}
                <button
                    type="button"
                    className="text-indigo-600 hover:underline bg-transparent border-0 p-0"
                >
                    Register as a captain
                </button>
            </Link>

            <div className=" w-[88%] absolute bottom-8 text-md font-bold text-gray-800 bg-orange-400 mt-6 p-2 rounded-md">
                <Link
                    to="/user/login"
                    type="button"
                    className="w-full flex justify-center items-center  "
                >
                    Sign in as user
                </Link>
            </div>
        </div>
    )
}

export default CaptainLogin
