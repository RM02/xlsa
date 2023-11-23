"use client"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function ({ children }) {
    
    const [data, setData] = useState()
    const pathname = usePathname();
    const [selectedItem, setSelectedItem] = useState();
    
    const getReport = async () => {
        const response = await fetch(`${process.env.API_v3_URL}/reportapi/`, {
            method: "GET"
        })
        const data = await response.json()
        setData(data)
    }
    const activeClass = (href) => {
        return (href === pathname) ? "w-full flex space-x-2 py-2 px-2 rounded bg-neutral-50 text-neutral-600" : "flex space-x-2 p-1 text-neutral-400"
    }
    const renderContent = (data) => {

        let ListComponent =  data?.results.map((item, index) => {

            return (
                <div className="flex flex-cols w-full">
                    <div className={activeClass(`/dashboard/proyectos/xlsa/reporte/${item?.id}`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-6 text-neutral-400 ml-2 self-center">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <div className="flex justify-between w-full">
                            <a href={`/dashboard/proyectos/xlsa/reporte/${item?.id}`} onMouseOut={() => setSelectedItem(null)} className="text-xs text-neutral-500 font-medium"> { item?.id } </a>
                            {
                                ( pathname == `/dashboard/proyectos/xlsa/reporte/${item?.id}`) && <button onClick={() => setSelectedItem(index) }><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-neutral-600 ml-2 self-center">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg></button>
                                            
                            }
                             
                            { (selectedItem == index) && <Dropdown visible={true}></Dropdown>}
                            
                        </div>
                    </div>
                
                </div>
            )
        })
        return (ListComponent)
    }
    const Dropdown = ({ visible }) => {

        return (
            <>
             {
                visible && <div id="dropdownNavbar" class="bg-neutral-200 absolute z-20 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                    <li>
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Editar</a>
                                    </li>
                                    <li>
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Exportar</a>
                                    </li>
                                </ul>
{/*                                 <div class="py-1">
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Sign out</a>
                                </div> */}
                            </div> 
             }
            </>
        )       
    }
    useEffect(() => {
        getReport()
    },[])
    return (
        <div className="flex flex-rows bg-neutral-50">
            <div className="bg-white fixed pt-6 px-4 flex-col flex-grow space-y-6 min-h-full w-64 border-r border-neutral-200">
                <div>
                    <form className="">   
                        <label htmlFor="simple-search" className="sr-only text-xs">Search</label>
                        <div className="relative w-full bg-green">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-4 h-4 text-neutral-400 dark:text-neutral-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            <input type="text" id="simple-search" className="border border-neutral-200 text-neutral-400 text-sm rounded-lg focus:ring-nuetral-400 focus:border-neutral-400 block w-full pl-10 p-1 dark:bg-neutral-700 dark:border-gray-600" placeholder="Search"></input>
                        </div>
                    </form>
                </div>
                <div className="relative">
                    <button className="flex border dark:border-0 border-neutral-200 focus:border-0 focus:outline-none focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-neutral-200 text-neutral-400 text-sm rounded-lg focus:ring-neutral-600 focus:border-neutral-600 block w-full pl-10 p-1 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-neutral-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                        <p>Nuevo reporte</p>
                    </button>
                </div>
                <div className="flex flex-cols justify-between">
                    <p className="text-sm font-semibold text-neutral-600">Reportes ({ data?.count })</p>
                    <button className="self-center" onClick={() => getReport()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-neutral-600">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </button>
                </div>
                <div className="space-y-3 dark:border-neutral-600 h-96 overflow-scroll overflow-x-hidden">
                    { renderContent(data) }
                </div>
            </div>
            <div className="w-full p-6 ml-40 bg-neutral-50">
                { children }
            </div>
        </div>
    )
} 