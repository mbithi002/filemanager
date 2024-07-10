import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'
import { login as authLogin } from '../../store/authSlice'
import { Button, CustomSpinner, Input } from '../components'


function Login() {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const login = async (data) => {
        setError('')
        setLoading(true)
        try {
            const session = await authService.login(data.email, data.password)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin({ userData }))
                navigate('/')
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center w-full h-full sm:mt-[6rem] mt-[7rem]">
            <div className={`sm:mx-auto mx-2 w-full max-w-lg rounded-xl p-10 border border-black/10 shadow-lg bg-teal-100 my-auto`}>
                {
                    loading ? (
                        <div className="h-[70dvh]">
                            <p className="text-center text-black">Loading</p>
                            <CustomSpinner />
                        </div>
                    ) : (
                        <>
                            <div className="mb-2 flex justify-center text-blue-500 text-3xl">
                                <i class="fa-solid fa-right-to-bracket"></i>
                            </div>
                            <h2 className="text-center text-xl font-bold leading-tight text-blue-500">Sign in to your account</h2>
                            <p className="mt-2 text-start text-base text-black/60">
                                Don&apos;t have any account?&nbsp;
                                <Link
                                    to="/signup"
                                    className="font-medium text-primary transition-all duration-200 hover:underline"
                                >
                                    Sign Up
                                </Link>
                            </p>
                            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                            <form onSubmit={handleSubmit(login)} className="mt-8 py-3">
                                <div className="space-y-5">
                                    <Input
                                        label="Email : "
                                        placeholder="Email Address"
                                        type="email"
                                        {...register("email", {
                                            required: true,

                                        })}
                                    />
                                    <Input
                                        label="Password : "
                                        type="password"
                                        placeholder="Password"
                                        {...register("password", { required: true })}
                                    />
                                    <Button type="submit" className="w-full my-2">
                                        Sign in{" "}
                                    </Button>
                                </div>
                            </form>
                        </>
                    )
                }
            </div >
        </div >
    )
}

export default Login