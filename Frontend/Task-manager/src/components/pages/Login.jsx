import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleinput = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "email":
                setEmail(value)
                break

            case "password":
                setPass(value)
                break
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("")
        const formData = {
            email,
            password
        }
        try {
            const res = await fetch(`http://localhost:5001/api/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()

            if (!res.ok) {
                setError("You are not registered user, please register first")
                return
            }
            localStorage.setItem("userId", data.user.id);
            localStorage.setItem("token", data.accessToken)
            localStorage.setItem("role", data.user.role);
            navigate("/home")


        } catch (error) {
            setError("Server error, please try again")
        }
    }

    return (
        <>

            <div className="min-h-screen flex items-center justify-center bg-gray-200">
                <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

                    <h2 className="text-2xl font-bold text-center mb-6">
                        Login
                    </h2>
                    {error && (
                        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm mb-4">
                            {error}
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>


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
                                name='password'
                                placeholder="Enter password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={password}
                                onChange={handleinput}
                            />
                        </div>



                        <button
                            type="submit"
                            className="w-full bg-teal-950 text-white py-2 rounded-lg hover:bg-teal-900 transition"
                        >
                            Login
                        </button>
                        <p className="text-center text-sm mt-4">
                            Not registered yet?{" "}
                            <span
                                onClick={() => navigate("/")}
                                className=" text-teal-950  cursor-pointer hover:underline font-medium"
                            >
                                Register
                            </span>
                        </p>


                    </form>

                </div>
            </div>
        </>
    )
}

export default Login
