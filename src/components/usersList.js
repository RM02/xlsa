"use client"
import { useEffect, useState } from "react"

export default function ListComponent ({ data, remove, edit, show, onButtonClick, onsearch, config }) {

    const [showTable, setShowtable] = useState(false)

    const totalItems = data?.count;
    const nextPage = data?.next ? data?.next : 0;
    const previous = data?.previous ? data?.previous : 0;
    const ListComponent = data?.results;
    const tableConfig = config?.table;
    const toolbarConfig = config?.toolbar;

    const badgeComponent = (key, value) => {
        switch (key) {
            case 'status':
                let activeClassStatus = (value == 'En proceso') ? badgeClass('isRed') : badgeClass('isGreen')
                return <span className={activeClassStatus}>{value}</span>
            case 'is_staff':
                let activeClassStaff = value ? badgeClass('isGreen') : badgeClass('isRed')
                return <span className={activeClassStaff}>{value ? "Admin" : "Usuario"}</span>
            default:
                break
        }
    }

    const badgeClass = (classname) => {
        return (classname == 'isRed') ? "bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300" : "bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
    }

    const dateFormatter = (date) => {
        let newdate = new Date(date)
        return newdate.toLocaleDateString() 
    }

    const handleRow = (key, value) => {
        switch(key) {
            case 'status':
            case 'is_staff':
                return badgeComponent(key, value)
            case 'created_date':
                return dateFormatter(value)
            case 'email':
                return hideConfidentialData(value)
            case 'created_by':
                return hideConfidentialData(value)
            default:
                return value
        }
    }

    const columnsComponent = (config) => {
        const columnsName = config.map((config, index) => (
            <th scope="col" className="px-6 py-3" tabIndex={index} key={index}>
                { config.label }
            </th>
        ))
        return (columnsName)
    }

    const hideConfidentialData = (value) => {
        return value.replace(/(.{2})(.*)(?=@)/,
        function(gp1, gp2, gp3) { 
          for(let i = 0; i < gp3.length; i++) { 
            gp2+= "*"; 
          } return gp2; 
        });
    }

    const renderMenu = (item) => {
        return (
            <div className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="p-2" role="none">
                    <button onClick={() => edit(item)} className="text-neutral-700 block px-4 py-2 text-sm hover:bg-gray-100 rounded-md" role="menuitem" tabindex="-1" id="menu-item-0">Editar</button>
                    <button onClick={() => remove(item)} className="text-neutral-700 block px-4 py-2 text-sm hover:bg-gray-100 rounded-md" role="menuitem" tabindex="-1" id="menu-item-1">Eliminar</button>
                    <button onClick={() => show(item)} className="text-neutral-700 block px-4 py-2 text-sm hover:bg-gray-100 rounded-md" role="menuitem" tabindex="-1" id="menu-item-2">Ver</button>
                </div>
            </div>
        )
    }

    const CardComponent = ({ data }) => {
        
        const [visible, setVisible] = useState(false)
        
        return    (
            <div className="relative col-span-full sm:col-span-3 mb-4">

                <div onMouseLeave={() => setVisible(false)} class="rounded overflow-hidden shadow-lg bg-white">                                                    
                    <div class="flex flex-col px-6 py-2">
                        <div className="flex flex-row justify-between border-b border-gray-100 py-2">
                            <div>
                                <p className="text-base font-semibold text-sm">{data[tableConfig[1].key]}</p>
                            </div>
                            <div>
                                <button>
                                    <svg onClick={() => setVisible(!visible)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                    </svg>
                                </button>
                                { visible && renderMenu(data) }   
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col font-bold text-xl mb-2">
                                    <div class="mt-2">
                                        <p className="text-base font-normal text-sm">{data[tableConfig[0].key]}</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-medium text-sm">{data[tableConfig[2].key]}</p>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${900}px)`);
    
      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        // setShowtable(!showTable)
      }
    },[showTable])
    return (
        <div className="relative justify-center items-center">
            <div class="flex flex-col sm:grid-cols-6 sm:grid gap-4">
                <div className="sm:col-span-1"></div>
                <div className="sm:col-span-3 sm:self-center">
                    <form>   
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-neutral-500 dark:text-neutral-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            <input onInput={(e) => onsearch(e.target.value)} type="text" id="simple-search" className="bg-white border dark:border-0 border-gray-300 text-neutral-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required></input>
                        </div>
                    </form>
                </div>
                <div className="sm:col-span-2">
                    <div className="flex lg:space-x-2 sm:my-4">
                        <div className="hidden flex-row bg-white sm:space-x-2 sm:p-2 rounded-md dark:bg-neutral-800 dark:text-neutral-400 dark:border-gray-600 dark:border-0 border">
                                <svg onClick={() => setShowtable(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={showTable ? "w-6 h-5 bg-gray-100 dark:bg-neutral-900" : "w-6 h-5"}>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <svg onClick={() => setShowtable(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={!showTable ? "w-6 h-5 bg-gray-100 dark:bg-neutral-900" : "w-6 h-5"}>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
                                </svg>
                        </div>
                        {
                            toolbarConfig.map((item, index) => (

                                <div key={index} className="mr-4 sm:mr-2">
                                    <button onClick={() => onButtonClick(item.key) } className="flex items-center justify-center px-3 py-2 text-sm font-medium text-neutral-900 bg-white border dark:border-0 border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-neutral-800 dark:text-neutral-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                        <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                        </svg>
                                        <span>{item.label}</span>
                                    </button>
                                </div>
                            ))
                        }
                        <div className="">
                            <button onClick={() => onButtonClick('export')} type="button" className="flex items-center justify-center px-3 py-2 text-sm font-medium text-neutral-900 bg-white border dark:border-0 border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-neutral-800 dark:text-neutral-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                                Exportar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="hidden lg:flex relative sm:rounded-lg mt-6">
                <table className="w-full text-sm text-left text-neutral-500 dark:text-neutral-400 border">
                        <thead className="text-xs text-neutral-600 uppercase bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-400">
                            <tr>
                                { columnsComponent(tableConfig) }

                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ListComponent?.map((row, index) => (
                                    <tr tabIndex={index} key={index} className="bg-white border-b dark:bg-neutral-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        {
                                            tableConfig.map((item, index) => (
                                                <th tabIndex={index} index={index} key={index} scope="row" className="px-6 py-4 font-medium text-neutral-900 whitespace-nowrap dark:text-white">
                                                    { handleRow(item.key, row[item.key]) }
                                                </th>
                                            ))
                                        }
                                
                                        <th className="flex flex-row py-4">
                                            <div>
                                                <button onClick={() => edit(row)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>

                                                </button>
                                    
                                            </div>
                                            <div>
                                                <button onClick={() => remove(row)} className="font-medium text-red-600 dark:text-blue-500 hover:underline">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>                                       
                                            </div>
                                            <div>
                                                <button onClick={() => show(row)} className="font-medium text-neutral-600 dark:text-neutral-500 hover:underline">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </button> 
                                            </div>
                                        </th>
                                    </tr>
                                ))
                            }
                        </tbody>
                </table>
            </div> */}
            <div className="grid grid-cols-6 gap-4 mt-6">

                { ListComponent?.map((item, index) => <CardComponent data={item}></CardComponent>) }

            </div>
            
            <nav className="flex items-center justify-between pt-4 mx-2" aria-label="Table navigation">
                    <span className="text-sm font-normal text-neutral-500 dark:text-neutral-400">Mostrando <span className="font-semibold text-neutral-900 dark:text-white">{totalItems}</span> de <span className="font-semibold text-neutral-900 dark:text-white">{totalItems}</span></span>
                    <ul className="inline-flex items-center space-x-px">
                        <li key={0}>
                            <a href="#" className="block px-3 py-2 ml-0 leading-tight text-neutral-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-gray-700 dark:text-neutral-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Previous</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            </a>
                        </li>
                        <li key={1}>
                            <a href="#" className="px-3 py-2 leading-tight text-neutral-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-gray-700 dark:text-neutral-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li key={2}>
                            <a href="#" className="px-3 py-2 leading-tight text-neutral-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-gray-700 dark:text-neutral-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li key={3}>
                            <a href="#" aria-current="page" className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-neutral-700 dark:text-white">3</a>
                        </li>
                        <li key={4}>
                            <a href="#" className="px-3 py-2 leading-tight text-neutral-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-gray-700 dark:text-neutral-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                        </li>
                        <li key={5}>
                            <a href="#" className="px-3 py-2 leading-tight text-neutral-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-gray-700 dark:text-neutral-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                        </li>
                        <li key={6}>
                            <a href="#" className="block px-3 py-2 leading-tight text-neutral-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-gray-700 dark:text-neutral-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Next</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                            </a>
                        </li>
                    </ul>
            </nav>
        </div>
    )
}