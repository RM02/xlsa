import { AppContext } from "@/context/appContext";
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form";

const API = process.env.API_v1_URL;
const common_class = "block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
const error_class = "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"


export default function UserForm ({ cancel, save, user }) {

    const { token } = useContext(AppContext);

    const [model, setModel] = useState();

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({ mode: 'onChange' })

    const [formData, setFormData] = useState({
        dni: user?.dni || "",
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        address: user?.address || "",
        email: user?.email || "",
        username: user?.username || "",
        position: user?.position || "",

        document_type: user?.document_type || "",
        primary_phone_number: user?.primary_phone_number || "",
        secondary_phone_number: user?.secondary_phone_number || ""
    })

    const handleInput = async (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;

        setFormData({
          ...formData,
          [fieldName]: value,
        });
    };

    const getUser = async (query) => {
        
        let url = new URL(`${API}/users/`)
        url.searchParams.append("search", query)
    
        let response = await fetch(url, { method: 'GET', headers: { "Authorization": `Bearer ${token}` } })
        
        const data = await response.json();

        return data
  
    }
    const validate = async (v) => {
        
        const data = await getUser(v)

        if (data.count > 0) {
            return "Número de identidad registrado!"
        }
        return true
    }
    const load_data = async (data) => {
        
        let form = new FormData()
        
        form.append("dni", data.dni)
        form.append("first_name", data.first_name)
        form.append("last_name", data.last_name)
        form.append("address", data.address)
        form.append("email", data.email)
        form.append("username", data.username)
        form.append("position", data.position)

        form.append("document_type", data.document_type)

        form.append("primary_phone_number", data.primary_phone_number)
        form.append("secondary_phone_number", data.secondary_phone_number)

        
        user ? form.append("is_staff", user?.is_staff) : form.append("is_staff", false)

        setModel(form)
    }
    const sd = () => save(model)

    useEffect(()=> {
        load_data(formData)
    },[formData, errors])

    return (
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="space-y-12">
                <form onSubmit={handleSubmit(sd)}>
                    <div>
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Perfil</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Parte de la información registrada será mostrada publicamente</p>
                    
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                    <svg className="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                    </svg>
                                    <button type="button" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button>
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Usuario</label>
                                    <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input {...register("username", { required: true })} value={formData.username} onChange={handleInput} type="text" name="username" id="username" autoComplete="username" className={errors?.username?.message ? error_class : common_class} placeholder="janesmith"></input>
                                    </div>
                                    { errors?.username?.message && <p class="mt-2 text-sm text-red-600 dark:text-red-500">{errors?.username?.message}</p> }
                                    
                                    </div>
                                </div>
                        
                                <div className="col-span-full">
                                    <div className="sm:col-span-4">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Correo electrónico</label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input {...register("email", { required: "Este campo es requerido!", validate: { matchPattern: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "El correo electrónico debe ser una dirección valida!" } })} value={formData.email} onChange={handleInput} type="text" name="email" id="email" autoComplete="email" className={ errors.email ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : common_class } placeholder="example@company.com"></input>
                                            </div>
                                            { errors?.email?.message && <p class="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email?.message}</p> }
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="border-b border-gray-900/10 pb-12 mt-4">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Información Personal</h2>
                            {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
                    
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                                <div className="mt-2">
                                <input {...register("first_name", { required: true })} value={formData.first_name} onChange={handleInput} type="text" name="first_name" id="first-name" autoComplete="given-name" className={ errors.first_name ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}></input>
                                { errors?.first_name && <p class="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> }

                                </div>
                            </div>
                    
                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Apellido</label>
                                <div className="mt-2">
                                    <input {...register("last_name", { required: true })} value={formData.last_name} onChange={handleInput} type="text" name="last_name" id="last-name" autoComplete="family-name" className={ errors.last_name ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}></input>
                                </div>
                                { errors?.last_name && <p class="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> }
                            </div>
                    
                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Número de identificación</label>
                                <div className="mt-2">
                                    <input {...register("dni", { required: true, validate: async (v) => validate(v) } )} value={formData.dni} onChange={handleInput} type="text" name="dni" id="dni" autoComplete="family-name" className={(errors?.dni) ? error_class : common_class}></input>
                                </div>
                                { errors?.dni && <p class="mt-2 text-sm text-red-600 dark:text-red-500">{ errors?.dni?.message || "Este campo es requerido!" }</p> }

                        
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
                                { errors.document_type && <p class="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> }

                            </div>
                    

                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Número telefonico primario</label>
                                <div className="mt-2">
                                <input {...register("primary_phone_number", { required: true })} value={formData.primary_phone_number} onChange={handleInput} type="text" name="primary_phone_number" id="primary_phone_number" autoComplete="given-name" className={ errors?.primary_phone_number ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}></input>
                                { errors.primary_phone_number && <p class="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> }

                                </div>
                            </div>
                    
                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Número telefonico secundario (opcional)</label>
                                <div className="mt-2">
                                    <input {...register("secondary_phone_number", { required: false })} value={formData.secondary_phone_number} onChange={handleInput} type="text" name="secondary_phone_number" id="secondary_phone_number" autoComplete="family-name" className={ errors?.secondary_phone_number ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}></input>
                                </div>
                                { errors?.secondary_phone_number && <p class="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> }
                            </div>
                    
                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">Dirección</label>
                                <div className="mt-2">
                                <textarea {...register("address", { required: true })} value={formData.address} onChange={handleInput} type="text" name="address" id="address" autoComplete="street-address" className={ errors.address ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}></textarea>
                                </div>
                                { errors.address && <p class="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> }

                            </div>
                            </div>
                        </div>
                        
                        <div className="border-b border-gray-900/10 pb-12 mt-4">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Información Laboral</h2>
                            {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
                    
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Rol</label>
                                    <div className="mt-2">
                                    <input {...register("position", { required: true })} value={formData.position} onChange={handleInput} type="text" name="position" id="position" autoComplete="position" className={ errors.position ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}></input>
                                    { errors.position && <p class="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> }

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-b border-gray-900/10 pb-12 mt-4">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Notificaciones</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Siempre te informaremos sobre cambios importantes, pero tú eliges qué más quieres saber.</p>
                    
                            <div className="mt-10 space-y-10">
                            <fieldset>
                                {/* <legend className="text-sm font-semibold leading-6 text-gray-900">Por Email</legend> */}
                                <div className="mt-6 space-y-6">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                    <input id="offers" name="offers" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"></input>
                                    </div>
                                    <div className="text-sm leading-6">
                                    <label htmlFor="offers" className="font-medium text-gray-900">Ofertas</label>
                                    <p className="text-gray-500">Reciba una notificación cuando se publique una oferta.</p>
                                    </div>
                                </div>
                                </div>
                            </fieldset>
                            </div>
                        </div>                    
                    </div>
            
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button onClick={() => cancel()} type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Guardar</button>
                    </div>
                </form>
            </div>
        </div>  
    )
}