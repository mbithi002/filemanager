import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'
import { Button, CustomSpinner, Input } from '../../components/components'
import { login } from '../../store/authSlice'

function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)

  const create = async (data) => {
    setError("")
    setLoading(true)
    if (data.password.length < 8) {
      setLoading(false)
      setError("Password must be atleast 8 characters!")
      return
    }
    try {
      const userData = await authService.createAccount(data.name, data.email, data.password)

      if (userData) {
        const currentUser = await authService.getCurrentUser()
        if (currentUser) dispatch(login({ userData: currentUser }))
        navigate("/")
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`mx-2 w-full max-w-lg rounded-xl p-10 border border-black/10 bg-teal-100 sm:mx-auto  sm:mt-20 mt-[6rem]`}>
        {
          loading ? (
            <div className="h-[70dvh]">
              <p className="text-center text-black">Loading</p>
              <CustomSpinner />
            </div>
          )
            :
            (
              <>
                <div className="mb-2 flex justify-center text-black text-3xl">
                  <i class="fa-solid fa-user-plus text-blue-500"></i>
                </div>
                <h2 className="text-center text-xl font-bold leading-tight text-blue-500">Sign up to create account</h2>
                <p className="mt-2 text-start text-base text-black/60">
                  Already have an account?&nbsp;
                  <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)} className="mt-8">
                  <div className="space-y-5">
                    <Input
                      {...register("name", { required: true })}
                      label="Full Name : "
                      placeholder="Full Name"
                    />
                    <Input
                      {...register("email", { required: true })}
                      label="Email : "
                      placeholder="Email Address"
                      type="email"
                    />
                    <Input
                      {...register("password", { required: true })}
                      label="Password : "
                      type="password"
                      placeholder="Password"
                    />
                    <Button type="submit" className="w-full active:bg-blue-200">
                      Sign Up
                    </Button>
                  </div>
                </form>
              </>
            )
        }
      </div>
    </div>
  )
}

export default Signup