import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const [role, setRole] = useState("user");
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showPasswordHint, setShowPasswordHint] = useState(false)


  const navigate = useNavigate()

  const handleinput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break

      case "email":
        setEmail(value)
        break

      case "password":
        setPass(value)
        break

      case "role":
        setRole(value)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("")
    setSuccess("")

    const formData = {
      name,
      email,
      password,
      role
    }

    try {

      const response = await fetch(`http://localhost:5001/api/auth/register`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(formData)
      })

    

      const data = await response.json()

      if (!response.ok) {
        setError(data.message)
        return
      }
      alert("Registration successful!")
      navigate("/home")

    } catch (error) {
      res.status(400).json({
        message: error.message
      })
    }
  }
  const handleClick = () => {
    navigate("/login")
  }
  return (
    <>

      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

          <h2 className="text-2xl font-bold text-center mb-6">
            Register form
          </h2>
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm mb-4">
              {success}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name='name'
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={name}
                onChange={handleinput}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name='email'
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={email}
                onChange={handleinput}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={password}
                onChange={handleinput}
                onFocus={() => setShowPasswordHint(true)}
                onBlur={() => setShowPasswordHint(false)}
              />
              {showPasswordHint && (
                <p className="text-xs text-gray-500 mt-1">
                  Password should be at least <span className="font-medium">6 characters</span>,
                  include <span className="font-medium">uppercase, lowercase, number</span>.
                </p>
              )}

            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Role
              </label>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === "user"}
                    onChange={(e) => setRole(e.target.value)}
                    className="accent-teal-800"
                  />
                  User
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === "admin"}
                    onChange={(e) => setRole(e.target.value)}
                    className="accent-teal-800"
                  />
                  Admin
                </label>
              </div>
            </div>


            <button
              type="submit"
              className="w-full bg-teal-700 text-white py-2 rounded-lg hover:bg-teal-900 transition"

            >
              Register
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?
            <span className="text-teal-600 cursor-pointer hover:underline ml-1" onClick={handleClick}>
              Login
            </span>
          </p>

        </div>
      </div>
    </>
  )
}

export default Register
