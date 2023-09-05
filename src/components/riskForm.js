"use client"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";

export default function RiskForm ({ incident, cancel, save }) {
    

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: 'onChange'
    })

    const [formData, setFormData] = useState({
        incident: incident?.incident || "",
        incident_type: incident?.incident_type || "",
        description: incident?.description || "",
    })
    const [model, setModel] = useState();

    const load_data = async (data) => {
        
        let form = new FormData()
        
        form.append("incident", data.incident)
        form.append("description", data.description)
        form.append("incident_type", data.incident_type)
        
        setModel(form)
    }
    const handleInput = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        setFormData({
          ...formData,
          [fieldName]: value,
        });
    };

    const sd = (data) => save(model)

    useEffect(()=> {
        load_data(formData)
    },[formData, errors])
    return (
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit(sd)} className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Incidencia</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Parte de la información registrada será mostrada publicamente</p>
            
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div className="sm:col-span-3">
                                <label htmlFor="incident" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                                <div className="mt-2">
                                <input {...register("incident", { required: true })} value={formData.incident} onChange={handleInput} type="text" name="incident" id="incident" autoComplete="incident" className={ errors.incident ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}></input>
                                { errors?.incident && <p class="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> }

                                </div>
                            </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="incident_type" className="block text-sm font-medium leading-6 text-gray-900">Tipo de incidencia</label>
                            <div className="mt-2">
                            <select { ...register("incident_type", { required: true }) } onChange={handleInput} id="incident_type" name="incident_type" autoComplete="incident_type" className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option>Derrame</option>
                                <option>Incendio</option>
                                <option>Caida</option>
                            </select>
                            </div>
                            { errors.incident_type && <p class="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> }

                        </div>

                        <div className="sm:col-span-full">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Descripción</label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <textarea {...register("description", { required: true })} value={formData.description} onChange={handleInput} type="text" name="description" id="description" autoComplete="description" className={ errors?.description ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"}></textarea>
                                </div>
                            </div>
                            { errors.description && <p class="mt-2 text-sm text-red-600 dark:text-red-500">Este campo es requerido!</p> }

                            </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button onClick={() => cancel()} type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Guardar</button>
                </div>
            </form>
        </div>  
    )
}