import { AppContext } from "/src/context/appContext"
import { useRouter } from "next/navigation";
import { useContext, useState } from "react"
import ActiveLink from "./activeLink";

export const SidebarComponent = ({ children, bodyConfig, bottomConfig, visibleLabel }) => {
    const { logout } = useContext(AppContext);
    const [collapse, setCollapse] = useState(true)
    const router = useRouter();
    
    const BodyElement = ({ config, visibleLabel }) => {

        return (
                config?.map((item, i) => {
                    return (

                        <div key={i} className="py-4 px-6 border-b border-neutral-200">
                            { 
                                item?.label && <div className=" flex space-x-3 mb-2 font-normal  ">
                                    <span className="text-sm w-full font-semibold text-neutral-600">{item?.label}</span>
                                </div>
                            }
                            <ul className="flex flex-row">

                                    <div className="flex flex-cols self-center group space-x-4">
                                        <ActiveLink data-tooltip-target="tooltip-default" href={item?.path} onclick={() => router.push(item?.path)}>
                                            { item?.icon } { visibleLabel && item?.name }
                                        </ActiveLink>
                                        
                                        { !item?.label && <span className="hidden sm:flex left-10 absolute scale-0 rounded bg-neutral-200 p-2 text-xs text-neutral-900 font-medium group-hover:scale-100">{ item?.name }</span> }
                                    </div>

                                {
                                    item?.children?.map((child, i) => {
                                        return (
                                            <a key={i} className="block" target="_self" href={child?.path}>
                                                <span className="group flex max-w-full cursor-pointer items-center space-x-2 border-scale-500 py-1 font-normal outline-none ring-scale-1200 focus-visible:z-10 focus-visible:ring-1 group-hover:border-scale-900">
                                                    <span title="All projects" className="w-full truncate text-sm text-neutral-600 transition group-hover:text-scale-1200">{child?.label}</span>
                                                </span>
                                            </a>
                                        )
                                    })
                                }
                            </ul>

                        </div>
                        
                    )
                })
            
        )
    }
    const BottomElement = ({ config }) => {

        return (<div className="py-5 px-6 border-b border-neutral-200">
                    <div>
                        <a className="block" target="_self" onClick={() => logout()}>
                            <span className="group flex max-w-full cursor-pointer items-center space-x-2 border-neutral-800 py-1 font-normal outline-none ring-scale-1200 focus-visible:z-10 focus-visible:ring-1 group-hover:border-neutral-800">
                                { config?.visibleIcon && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-neutral-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                                </svg>
                                }
                                { config?.visibleLabel && <span title="All projects" className="w-full truncate text-sm transition group-hover:text-scale-1200">Salir</span>}
                            </span>
                        </a>
                    </div>
                </div>)    
    }
    return (
        <nav className="w-full" role="menu" aria-label="Sidebar" aria-orientation="horizontal" aria-labelledby="options-menu">
            <ul>
                <BodyElement config={bodyConfig} visibleLabel={visibleLabel}></BodyElement>
                <BottomElement config={bottomConfig} isShown={visibleLabel}></BottomElement>
            </ul>
        </nav>
    )
}