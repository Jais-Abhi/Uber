import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { serverUrl } from '../../main'
import { setCaptainData } from '../../Redux/captainSlice'
import { useDispatch } from 'react-redux'

const CaptainRegister = () => {
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false)
    const [vehiclePlate, setVehiclePlate] = React.useState('')
    const [vehicleColor, setVehicleColor] = React.useState('')
    const [vehicleType, setVehicleType] = React.useState('car')
    const [capacity, setCapacity] = React.useState(4)
    const [error, setError] = React.useState('')



    const dispatch = useDispatch()
    // Get capacity range based on vehicle type
    const getCapacityRange = (type) => {
        switch(type) {
            case 'bike': return [1];
            case 'auto': return [3, 4];
            case 'car': return [4, 5, 6];
            default: return [1, 2, 3, 4, 5, 6];
        }
    }

    // Update capacity when vehicle type changes
    React.useEffect(() => {
        const range = getCapacityRange(vehicleType);
        // If current capacity is not in valid range for new vehicle type
        if (!range.includes(Number(capacity))) {
            setCapacity(range[0]); // Set to minimum valid capacity
        }
    }, [vehicleType])

    const validate = () => {
        if (!firstName) return 'First name is required'
        if (firstName.length < 3) return 'First name must be at least 3 characters'
        if (!email) return 'Email is required'
        if (!/^\S+@\S+\.\S+$/.test(email)) return 'Enter a valid email'
        if (!password) return 'Password is required'
        if (password.length < 6) return 'Password must be at least 6 characters'
        if (password !== confirmPassword) return 'Passwords do not match'
        if (!vehiclePlate) return 'Vehicle plate number is required'
        if (!vehicleColor) return 'Vehicle color is required'
        if (vehicleColor.length < 3) return 'Vehicle color must be at least 3 characters'
        
        // Vehicle type-specific capacity validation
        const validCapacities = getCapacityRange(vehicleType)
        if (!validCapacities.includes(Number(capacity))) {
            return `Invalid capacity for ${vehicleType}. Must be ${validCapacities.join(' or ')} passenger${validCapacities.length > 1 ? 's' : ''}`
        }
        return ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const err = validate()
        setError(err)
        if (err) return

        const captainData = {
            fullName: { firstName, lastName },
            email,
            password,
            vehicle: {
                plate: vehiclePlate,
                color: vehicleColor,
                type: vehicleType,
                capacity: parseInt(capacity)
            }
        }

        try {
          const response = await axios.post(`${serverUrl}/api/auth/captain/register`,captainData,
            {withCredentials:true}
          )
          console.log(response)
          if(response.status===201){
            localStorage.setItem("token",response.data.token)
            dispatch(setCaptainData(response.data.captainObj))
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setVehiclePlate('')
            setVehicleColor('')
            setVehicleType('car')
            setCapacity(4)
          }
        } catch (error) {
          console.log(error)
          setError(error?.response?.data?.message)
        }

        console.log('Registering captain', captainData)
    }

    return (
      <div className="w-full p-6 min-h-screen bg-white shadow-sm font-sans">
        <h2 className="text-3xl font-semibold pb-2">Uber</h2>
        <form onSubmit={handleSubmit} className="space-y-4 pt-8">
          {/* First name */}
          <div className='flex gap-3'>
                    <div className='pb-3 w-1/2'>
                        <label className="block text-xl font-medium text-gray-700 mb-3">First name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="First name"
                            required
                        />
                    </div>

                    <div className='pb-3 w-1/2'>
                        <label className="block text-xl font-medium text-gray-700 mb-3">Last name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Last name"
                        />
                    </div>
                </div>

          {/* Email */}
          <div className='pb-3'>
            <label className="block text-xl font-medium text-gray-700 mb-3">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div className='pb-3'>
            <label className="block text-xl font-medium text-gray-700 mb-3">Password</label>
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

          {/* Confirm Password */}
          <div className='pb-3'>
            <label className="block text-xl font-medium text-gray-700 mb-3">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Confirm your password"
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

          {/* Vehicle Plate */}
          <div className='pb-3'>
            <label className="block text-xl font-medium text-gray-700 mb-3">Vehicle Plate No.</label>
            <input
              type="text"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., ABC-1234"
              required
            />
          </div>

          {/* Vehicle Color */}
          <div className='pb-3'>
            <label className="block text-xl font-medium text-gray-700 mb-3">Vehicle Color</label>
            <input
              type="text"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Black"
              required
            />
          </div>

          {/* Vehicle Type */}
          <div className='pb-3'>
            <label className="block text-xl font-medium text-gray-700 mb-3">Vehicle Type</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
              <option value="car">Car</option>
            </select>
          </div>

          {/* Vehicle Capacity */}
          <div className='pb-3'>
            <label className="block text-xl font-medium text-gray-700 mb-3">Vehicle Capacity</label>
            <select
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              {getCapacityRange(vehicleType).map(num => (
                <option key={num} value={num}>{num} passenger{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button type="submit" className="w-full px-4 py-2 bg-black text-white rounded-md font-semibold hover:opacity-90">
            Register as Captain
          </button>
        </form>

        <Link 
          className="mt-4 block text-center text-md"
          to="/captain/login"
        >
          Already registered?{' '}
          <button
            type="button"
            className="text-indigo-600 hover:underline bg-transparent border-0 p-0"
          >
            Login
          </button>
        </Link>

        {/* <div 
        className="w-full text-md font-bold text-gray-800 bg-orange-400 mt-16 p-2 rounded-md">
          <Link
            to="/user/register"
            className="w-full flex justify-center items-center"
          >
            Register as User
          </Link>
        </div> */}
      </div>
    )
}

export default CaptainRegister