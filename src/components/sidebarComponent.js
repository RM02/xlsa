import { AppContext } from "@/context/appContext"
import { useRouter } from "next/navigation";
import { useContext, useState } from "react"
import ActiveLink from "./activeLink";

export const SidebarComponent = ({ children, bodyConfig, bottomConfig }) => {
    const { logout } = useContext(AppContext);
    const [collapse, setCollapse] = useState(true)
    const router = useRouter();
    
    const BodyElement = ({ config, isOpen }) => {

        return (
                isOpen && config?.map((item) => {
                    return (

                        <div class="py-4 px-6 border-b border-neutral-200">
                            { 
                                item?.label && <div class=" flex space-x-3 mb-2 font-normal  ">
                                    <span class="text-sm w-full font-semibold text-neutral-600">{item?.label}</span>
                                </div>
                            }
                            <ul class="flex flex-row">
                                
                                    <ActiveLink href={item?.path} onclick={() => router.push(item?.path)}>
                                        { item?.icon }
                                    </ActiveLink>
                                

                                {
                                    item?.children?.map((child) => {
                                        return (
                                            <a class="block" target="_self" href={child?.path}>
                                                <span class="group flex max-w-full cursor-pointer items-center space-x-2 border-scale-500 py-1 font-normal outline-none ring-scale-1200 focus-visible:z-10 focus-visible:ring-1 group-hover:border-scale-900">
                                                    <span title="All projects" class="w-full truncate text-sm text-neutral-600 transition group-hover:text-scale-1200">{child?.label}</span>
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

        return (<div class="py-5 px-6 border-b border-neutral-200">
                    <div>
                        <a class="block" target="_self" onClick={() => logout()}>
                            <span class="group flex max-w-full cursor-pointer items-center space-x-2 border-neutral-800 py-1 font-normal outline-none ring-scale-1200 focus-visible:z-10 focus-visible:ring-1 group-hover:border-neutral-800">
                                { config?.visibleIcon && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-neutral-400">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                                </svg>
                                }
                                { config?.visibleLabel && <span title="All projects" class="w-full truncate text-sm transition group-hover:text-scale-1200">Salir</span>}
                            </span>
                        </a>
                    </div>
                </div>)    
    }
    return (
        <nav className="w-full" role="menu" aria-label="Sidebar" aria-orientation="horizontal" aria-labelledby="options-menu">
            <ul>
                <BodyElement config={bodyConfig} isOpen={collapse}></BodyElement>
                <BottomElement config={bottomConfig} isShown={collapse}></BottomElement>
            </ul>
        </nav>
    )
}