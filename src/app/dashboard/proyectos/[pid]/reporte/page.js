"use client"
import { AppContext } from "/src/context/appContext"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

export default function Report () {
    
    const [isDropdown, setDropdown] = useState(false)
    const [incidents, setIncidents] = useState();
    const router = useRouter();

    const { token } = useContext(AppContext);

    const onsearch = (e) => {

    }
    const getIncident = async () => {
        const response = await fetch(`${process.env.API_v2_URL}/incidentapi`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        const data = await response.json();
        setIncidents(data)
    }
    const lastSeen = (publishDate) => {
        let s = new Date()

        console.log(s.getDate(), new Date(publishDate).getDate())
        s.setDate(s.getDate() - new Date(publishDate).getDate())
        return s.getDate()
    }
    useEffect(() => {
        if(token) {
            getIncident()
        }
    },[token])  
    return (

        <div className="h-full mt-8">
            <div className="flex self-center justify-center w-full">
                <div className="bg-white w-2/3 space-y-4 border border-neutral-200 rounded p-8 dark:bg-neutral-800">
                    <div className="space-y-2">
                        <p className="text-2xl font-semibold text-neutral-800">Importar Incidente</p>
                        <p className="text-lg text-neutral-400 font-medium dark:text-neutral-200">Para crear un nuevo reporte, importe la incidencia existente</p>

                    </div>
                    <div className="space-y-4">
                        <form>   
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-neutral-500 dark:text-neutral-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                </div>
                                <input onInput={(e) => onsearch(e.target.value)} type="text" id="simple-search" className="bg-white border dark:border-0 border-gray-300 text-neutral-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar"></input>
                            </div>
                        </form>
                    </div>
                    <div className="overflow-scroll h-80 px-4 overflow-x-hidden">
                        <ul role="list" class="divide-y divide-gray-100">
                            {
                                incidents?.results?.map((i) => {
                                    return (
                                        <li class="flex justify-between gap-x-6 py-5">
                                            <div class="flex min-w-0 gap-x-4">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-neutral-400">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                                    </svg>
                                                </div>
                                            {/* <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/> */}
                                                <div class="min-w-0 flex-auto">
                                                    <p class="text-sm font-semibold leading-6 text-neutral-900">{ i?.id }</p>
                                                    <p class="mt-1 truncate text-xs leading-5 text-neutral-500">{ i?.description }</p>
                                                </div>
                                            </div>
                                            <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                <p class="text-xs leading-5 text-neutral-500">{ i?.created_by }</p>
                                                <p class="mt-1 text-xs leading-5 text-neutral-500">Hace <time datetime="2023-01-23T13:23Z">{ lastSeen(i?.created_date) }</time> días</p>
                                            </div>
                                            <div>
                                                <button onClick={() => router.push(`/dashboard/proyectos/xlsa/reporte/incidente/${i?.id}`) } className="flex items-center justify-center px-3 py-2 text-sm font-medium text-neutral-900 bg-white border dark:border-0 border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-neutral-800 dark:text-neutral-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                                    {/* <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                                    </svg> */}
                                                    <span>Importar</span>
                                                </button>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}