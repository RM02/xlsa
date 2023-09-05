"use client"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";

export default function ({ params }) {
    
    const common_class = "block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    const error_class = "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"

    const [report, setReport] = useState();

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({ mode: 'onChange' })
    
    const [formData, setFormData] = useState({
        id: report?.id || "",
        first_name: report?.first_name || "",
        last_name: report?.last_name || "",
        address: report?.address || "",
        email: report?.email || "",
        username: report?.username || "",
        position: report?.position || "",

        document_type: report?.document_type || "",
        primary_phone_number: report?.primary_phone_number || "",
        secondary_phone_number: report?.secondary_phone_number || ""
    })

    const handleInput = async (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;

        setFormData({
          ...formData,
          [fieldName]: value,
        });
    };
    const getOne = async () => {
        const response = await fetch(`http://localhost:8002/reportapi/${params?.id}`)
        const data = await response.json();
        setFormData(data)
    }
    useEffect(() => {
        getOne()
    }, [])
    return (
        <div className="ml-20 max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="space-y-12">
                <form>
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold leading-7 text-neutral-800">Reporte</h2>
                            <p className="text-md leading-6 text-neutral-600 mt-4">Parte de la información registrada será mostrada publicamente.</p>
                    
                            <div className="bg-white border border-neutral-200 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 p-6">
                                <div className="col-span-full border-b border-neutral-200 pb-4">
                                    <p className="text-xl text-neutral-400 font-medium">Información General</p>
                                </div>
                                <div className="sm:col-span-4">
                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Código</label>
                                    <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input disabled={true} value={formData?.id} type="text" name="id" id="id" autoComplete="username" className={errors?.username?.message ? error_class : common_class}></input>
                                    </div>
                                    {/* { errors?.username?.message && <p class="mt-2 text-sm text-red-600 dark:text-red-500">{errors?.username?.message}</p> } */}
                                    
                                    </div>
                                </div>
                        
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Fecha</label>
                                    <div className="mt-2">
                                        <input {...register("first_name", { required: true })} value={formData.first_name} onChange={handleInput} type="text" name="first_name" id="first-name" autoComplete="given-name" className={ errors.first_name ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}></input>
                                        {/* { errors?.first_name && <p class="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> } */}

                                        </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                                    <div className="mt-2">
                                        <input {...register("first_name", { required: true })} value={formData.first_name} onChange={handleInput} type="text" name="first_name" id="first-name" autoComplete="given-name" className={ errors.first_name ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}></input>
                                        {/* { errors?.first_name && <p class="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> } */}

                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white border border-neutral-200">

                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 p-6">
                                <div className="col-span-full border-b border-neutral-200 pb-4">
                                    <p className="text-xl text-neutral-400 font-medium">Causas</p>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                                    <div className="mt-2">
                                    <input {...register("first_name", { required: true })} value={formData.first_name} onChange={handleInput} type="text" name="first_name" id="first-name" autoComplete="given-name" className={ errors.first_name ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}></input>
                                    {/* { errors?.first_name && <p class="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> } */}

                                </div>
                            </div>
                    
                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Apellido</label>
                                <div className="mt-2">
                                    <input {...register("last_name", { required: true })} value={formData.last_name} onChange={handleInput} type="text" name="last_name" id="last-name" autoComplete="family-name" className={ errors.last_name ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}></input>
                                </div>
                                {/* { errors?.last_name && <p class="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> } */}
                            </div>
                    
                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Número de identificación</label>
                                <div className="mt-2">
                                    <input {...register("dni", { required: true, validate: async (v) => validate(v) } )} value={formData.dni} onChange={handleInput} type="text" name="dni" id="dni" autoComplete="family-name" className={(errors?.dni) ? error_class : common_class}></input>
                                </div>
                                {/* { errors?.dni && <p class="mt-2 text-sm text-red-600 dark:text-red-500">{ errors?.dni?.message || "Este campo es requerido!" }</p> } */}

                        
                            </div>
                    
                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Tipo de documento</label>
                                <div className="mt-2">
                                <select {...register("document_type", { required: true })} onChange={handleInput} id="document_type" name="document_type" autoComplete="document_type" className={errors.document_type ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"}>
                                    <option></option>
                                    <option value={'Cedula'}>Cédula</option>
                                    <option value={'Pasaporte'}>Pasaporte</option>
                                    <option value={'RIF'}>RIF</option>
                                </select>
                                </div>
                                {/* { errors.document_type && <p class="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> } */}

                            </div>
                    

                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Número telefonico primario</label>
                                <div className="mt-2">
                                <input {...register("primary_phone_number", { required: true })} value={formData.primary_phone_number} onChange={handleInput} type="text" name="primary_phone_number" id="primary_phone_number" autoComplete="given-name" className={ errors?.primary_phone_number ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}></input>
                                {/* { errors.primary_phone_number && <p class="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> } */}

                                </div>
                            </div>
                    
                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Número telefonico secundario (opcional)</label>
                                <div className="mt-2">
                                    <input {...register("secondary_phone_number", { required: false })} value={formData.secondary_phone_number} onChange={handleInput} type="text" name="secondary_phone_number" id="secondary_phone_number" autoComplete="family-name" className={ errors?.secondary_phone_number ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}></input>
                                </div>
                                {/* { errors?.secondary_phone_number && <p class="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> } */}
                            </div>
                    
                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">Dirección</label>
                                <div className="mt-2">
                                <textarea {...register("address", { required: true })} value={formData.address} onChange={handleInput} type="text" name="address" id="address" autoComplete="street-address" className={ errors.address ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}></textarea>
                                </div>
                                {/* { errors.address && <p class="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> } */}

                            </div>
                            </div>
                        </div>
                        
                        <div className="bg-white border border-neutral-200 p-6">
                                <div className="col-span-full border-b border-neutral-200 pb-4">
                                    <p className="text-xl text-neutral-400 font-medium">Protocolo</p>
                                </div>

                            <div className="p-6">

                                <ol class="relative border-l border-gray-200">                  
                                    <li class="mb-10 ml-8 p-4">            
                                        <span class="absolute flex items-center justify-center w-6 h-6 bg-green-300 rounded-lg -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>

                                        </span>
                                        <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Uso obligatorio de mascarillas</h3>
                                        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on January 13th, 2022</time>
                                        <p class="text-base font-normal text-neutral-400">Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.</p>
                                    </li>
                                    <li class="mb-10 ml-8 p-4">
                                        <span class="absolute flex items-center justify-center w-6 h-6 bg-green-300 rounded-lg -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </span>
                                        <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Distancia minima de 1,5 metros</h3>
                                        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 7th, 2021</time>
                                        <p class="text-base font-normal text-neutral-400">All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</p>
                                    </li>
                                    <li class="ml-8 p-4">
                                        <span class="absolute flex items-center justify-center w-6 h-6 bg-green-300 rounded-lg -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </span>
                                            <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Desinfección periodicas de instalaciones</h3>
                                            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 2nd, 2021</time>
                                            <p class="text-base font-normal text-neutral-400">Get started with dozens of web components and interactive elements built on top of Tailwind CSS.</p>
                                    </li>
                                </ol>

                            </div>
                        </div>
                        <div className="bg-white border border-neutral-200 p-6">
                                <div className="col-span-full border-b border-neutral-200 pb-4">
                                    <p className="text-xl text-neutral-400 font-medium">Anexo</p>
                                </div>
                            {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
                    
                            <div className="mt-10 flex flex-rows w-full justify-around">
                                
                                <img src={"https://www.elheraldo.co/sites/default/files/articulo/2020/02/18/1b-_tapabocas-_cesar_bolivar_3.jpg"} className="h-[250px] w-[250px]"></img> 
                                <img src={"https://cdn.forbes.com.mx/2020/07/General-Motors-Cubrebocas-01-640x360.jpg"} className="h-[250px] w-[250px]"></img> 
                                
                                        {/* <div className="bg-white flex w-full h-64 self-center justify-center focus:z-10 focus:ring-4 focus:ring-gray-200 bg-neutral-100 border-dashed border-2 border-neutral-200 rounded">

                                            <div class="max-w-lg self-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                </svg>
                                            </div>

                                        </div> */}
                                
                            </div>
                        </div>                  
                    </div>
            
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Guardar</button>
                    </div>
                </form>
            </div>
        </div>  
    )
}