import { useState } from 'react'
import { Link } from 'react-router-dom'
import useSignup from '../hooks/useSignup'

function Signup() {
  const [input, setInput] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  })

  const { loading, signup } = useSignup()

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCheckbox = (gender) => {
    setInput((prev) => ({ ...prev, gender }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(input)
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up <span className='text-blue-500'>ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              type='text'
              placeholder='John Doe'
              name='fullName'
              className='w-full input input-bordered h-10'
              value={input.fullName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type='text'
              placeholder='Enter Username'
              name='username'
              className='w-full input input-bordered h-10'
              value={input.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
              name='password'
              value={input.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Confirm Password'
              name='confirmPassword'
              className='w-full input input-bordered h-10'
              value={input.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <GenderCheckBox
            onCheckBoxChange={handleCheckbox}
            selectedGender={input.gender}
          />
          <Link
            to='/login'
            className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
          >
            Already have an account?
          </Link>

          <div>
            <button disabled={loading} className='btn btn-block btn-sm mt-2'>
              {loading ? (
                <span className='loading loading-spinner'></span>
              ) : (
                'Signup'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup

const GenderCheckBox = ({ onCheckBoxChange, selectedGender }) => {
  return (
    <div className='flex'>
      <div className='form-control'>
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === 'male' ? 'selected' : ''
          }`}
        >
          <span className='label-text'>Male</span>
          <input
            type='checkbox'
            className='checkbox border-slate-900'
            checked={selectedGender === 'male'}
            onChange={() => onCheckBoxChange('male')}
          />
        </label>
      </div>
      <div className='form-control'>
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === 'female' ? 'selected' : ''
          }`}
        >
          <span className='label-text'>Female</span>
          <input
            type='checkbox'
            className='checkbox border-slate-900'
            checked={selectedGender === 'female'}
            onChange={() => onCheckBoxChange('female')}
          />
        </label>
      </div>
    </div>
  )
}
