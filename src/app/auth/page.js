'use client';
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { AppContext } from "../../context/appContext";
import { useForm } from "react-hook-form"
import Link from "next/link";

export default function Login() {

  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({
    mode: 'onChange'
  })


  const { login } = useContext(AppContext)

  const router = useRouter();
  const [email, setEmail] = useState(null)
  const [password, setPass] = useState()
  const [err, setErr] = useState()
  const [show, setShow] = useState(false)


  const sd = async () => {
    const response = await login(email, password)
    
    if (response.ok) {
      return router.push("/dashboard/proyectos")
    } else {
      setErr("No se encontró una cuenta activa con las credenciales dadas")
    }
  }
  const eyePassword = (show) => {
    const openEye = <svg className="h-6 text-neutral-300" onClick={() => setShow(!show)} fill="none" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 576 512">
                      <path fill="currentColor"
                        d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z">
                      </path>
                    </svg>

    const closedEye = <svg className="h-6 text-neutral-300" onClick={() => setShow(!show)} fill="none" xmlns="http://www.w3.org/2000/svg"
                        viewbox="0 0 640 512">
                        <path fill="currentColor"
                          d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z">
                        </path>
                      </svg>
    return show ? closedEye : openEye
  }
  return (
        <section className="flex flex-col h-screen bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-100 to-teal-100 pt-20 px-4">

          <form onSubmit={handleSubmit(sd)} action="#" method="POST" className="flex flex-col self-center sm:w-2/4 bg-white p-16 rounded-[2rem] sm:my-20 sm:mx-10 space-y-4 border border-neutral-200">
              <div className="space-y-2">
                  <h1 className="text-3xl font-extrabold text-neutral-900">Ingresar</h1>
                  <p className="text-xl text-neutral-600 py-4">Accede a tu cuenta suministrando la siguiente información.</p>
              </div>
              <div className="py-4 justify-end">
                  <div className="py-2">
                      <input {...register("username", { required: true })} onInput={(e) => setEmail(e.target.value)} id="username" name="username" type="text" className="px-4 py-4 w-full border border-neutral-200 rounded-md hover:bg-neutral-100" placeholder="Correo"/>
                      { errors.username && <p className="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> }
                  </div>
                  <div className="py-2">
                    <div className="relative">
                      <input type={ (show == true) ? 'text' : 'password'} {...register("password", { required: true })} onInput={(e) => setPass(e.target.value)} id="password" name="password" className="px-4 py-4 w-full border border-neutral-200 rounded-md hover:bg-neutral-100" placeholder="Contraseña"/>

                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                        { eyePassword(show) }
                      </div>
                    </div>
                  </div>
              </div>
              <div className="flex flex-col">
                  <button type="submit" className="bg-neutral-900 text-neutral-50 px-4 py-2 rounded-md font-semibold">
                      Ingresar
                  </button>
                  <div className="self-center mt-8">
                    <div className="self-center">
                        <p className="text-neutral-600 text-md">No estás registrado? <Link href="/auth/create-account" className="mx-6 font-bold text-neutral-900">Crear cuenta</Link> </p>
                    </div>
                  </div>
              </div>
          </form>
        </section> 
    // <div className="flex bg-neutral-900 min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    //   <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    //     <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"></img>
    //     <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Iniciar sesión</h2>
    //   </div>
    //   <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    //     <form onSubmit={handleSubmit(sd)} className="space-y-6" action="#" method="POST">
    //       <div>
    //         <label htmlFor="username" className="text-neutral-400 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
    //         <div className="mt-2">
    //           <input {...register("username", { required: true })} onInput={(e) => setEmail(e.target.value)} id="username" name="username" type="text" autoComplete="username" className={errors.username ? "bg-red-50 bg-neutral-900 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400": "bg-neutral-900 border border-gray-600 text-neutral-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} ></input>           
    //           { errors.username && <p className="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> }

    //         </div>
    //       </div>
    //       <div>
    //         <div className="flex items-center justify-between">
    //           <label htmlFor="password" className="block text-sm font-medium leading-6 text-neutral-400">Contraseña</label>
    //           <div className="text-sm">
    //             <a href="#" className="font-semibold text-neutral-400 hover:text-indigo-500">Olvidó contraseña?</a>
    //           </div>
    //         </div>
    //         <div class="py-2">
    //             <div className="relative">
    //               <input type={ (show == true) ? 'text' : 'password'} {...register("password", { required: true })} onInput={(e) => setPass(e.target.value)} id="password" name="password" autoComplete="password" className={errors.password ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400": "bg-neutral-900 border border-gray-600 text-neutral-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}/>
    //               <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">

    //                 { eyePassword(show) }

    //               </div>
    //             </div>
    //             { errors.password && <p class="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> }
    //           </div>
    //       </div>
    //       <div>
    //         <h1 className="text-red-600">{err}</h1>
    //       </div>
    //       <div>
    //         <button type="submit" className="flex w-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-400 justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Ingresar</button>
    //       </div>
    //     </form>

    //   </div>
    // </div>
  )
}
