import React from 'react'
import { Link } from 'react-router-dom'
import { setCaptainData } from '../../Redux/captainSlice.js'
import axios from 'axios'
import { serverUrl } from '../../main.jsx'
import { useDispatch } from 'react-redux'

const CaptainLogin = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false)
    const [error, setError] = React.useState('')
    const dispatch = useDispatch()
    const validate = () => {
        if (!email) return 'Email is required'
        if (!/^\S+@\S+\.\S+$/.test(email)) return 'Enter a valid email'
        if (!password) return 'Password is required'
        if (password.length < 6) return 'Password must be at least 6 characters'
        return ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const err = validate()
        setError(err)
        if (err) return
        const data = {email,password}
        try {
            const response = await axios.post(`${serverUrl}/api/auth/captain/login`,data,{withCredentials:true})
            
            if(response.status===201){
                localStorage.setItem("token",response.data.token)
                dispatch(setCaptainData(response.data.captainObj))
                setEmail("")
                setPassword("")
            }
        } catch (error) {
            console.log(error)
            setError(error?.response?.data?.message)
        }
    }

    return (
        <div className="w-full p-6 h-screen bg-white shadow-sm font-sans">
            <h2 className=" text-3xl font-semibold pb-2">Uber</h2>

            <form onSubmit={handleSubmit} className="space-y-4 pt-8">
                <div className='pb-3'>
                    <label className="block text-xl font-medium text-gray-700 mb-3">
                        Captain's email</label>
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
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            )}
                        </button>
                    </div>
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

            <div 
            className=" w-[88%] absolute bottom-8 text-md font-bold text-gray-800 bg-orange-400 mt-6 p-2 rounded-md">
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
