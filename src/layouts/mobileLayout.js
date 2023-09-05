import ActiveLink from "@/components/activeLink";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MobileLayout ({ children, config }) {
    
    const router = useRouter();    
    const currentPath = usePathname();
    const [currentMenu, setCurrentMenu] = useState('primary');

    const ReactiveHeader = ({ routing }) => {
        return (
            <div className="flex self-center h-12 bg-white dark:border-b dark:border-gray-600 dark:bg-neutral-800 dark:text-gray-400">
                <div className="flex w-1/6 self-center justify-center border-r dark:border-gray-600">
                        <div onClick={() => router.push("/dashboard/proyectos")} className="flex-shrink-0">
                            <img className="h-5 w-5" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"></img>
                        </div>
                </div>
                
                { 
                    routing && <div className="flex self-center px-6 text-gray-500">
                                <span>{ currentPath.split("/").join(" / ") }</span>
                            </div>
                }
            </div>
        )
    }
    const menuConfig = config

    const getRegex = (code) => {
        const regex1 = /(usuarios|incidencia)/        ;
        const result = regex1.exec(code)
        return result
    }
    const renderMenu = (menuConfig) => {
        return (
            <ul class="flex space-x-6 px-4 text-sm text-center dark:border-gray-700 dark:text-gray-400">
                {
                    menuConfig?.map((item) => {
                        return (
                            <li class="mr-2">
                                <ActiveLink href={item?.path}>{item?.label}</ActiveLink>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${700}px)`);
    
        // Check on mount (callback is not called until a change occurs)
        if (media.matches) {
          // setIsOpenSidebar(false)
        }
    }, [])
    return (
        <div className="min-h-full flex flex-col">
            <div>
                <ReactiveHeader></ReactiveHeader>
            </div>
            <div className="container bg-gray-100 dark:bg-neutral-900">
                { children }
            </div>
        </div>
    )
}