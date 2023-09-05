"use client"
import { SidebarComponent } from "@/components/sidebarComponent";
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function LayoutPrimary ({ children, params }) {

    const currentPath = usePathname();
    const router = useRouter();

    const [isOpen, setOpen] = useState(false);    

    const menuConfig = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
                </svg>,
            path: "/dashboard/proyectos/xlsa"
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>,
            path: "/dashboard/proyectos/xlsa/usuarios"
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                </svg>,
            path: "/dashboard/proyectos/xlsa/incidencia"
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>,
            path: "/dashboard/proyectos/xlsa/reporte"
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>,
            path: "/dashboard/proyectos/xlsa/ajustes"
        },
    ]
    const menuDashboard = [
        {
            label: "Proyectos",
            children: [
                {
                    label: "Todos",
                    path: "/dashboard/proyectos"
                }
            ]
        },
        {
            label: "Organizaciones",
            children: [
                {
                    label: "Todos",
                    path: "/dashboard/proyectos"
                }
            ]
        },
        {
            label: "Cuenta",
            children: [
                {
                    label: "Preferencias",
                    path: "/dashboard/perfil"
                }
            ]
        }
    ]
    const getRegex = (code) => {
        const regex = /dashboard\/proyectos\/[a-z]+/;
        const result = regex.exec(code)
        return result
    }
    const Breadcrumbs = ({ children }) => {
        return (
            <div className="flex h-12">
                { children &&   <div className="flex w-24 self-center justify-center border-r border-neutral-800 dark:text-neutral-50 dark:border-gray-100 dark:border-r">
                                    { children }
                                </div>
                }
                
                <div className="flex self-center px-6 hover:text-neutral-800 text-neutral-400 dark:text-neutral-400">
                    <span>{ currentPath.split("/").join(" / ") }</span>
                </div>
            </div>
        )
    }

    const Logo = () => {
        return (
            <div className="self-center flex-shrink-0" onClick={() => router.push("/dashboard")}>
                <img className="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"></img>
            </div>
        )
    }
    const renderSideBar = () => {
        
        let isRender =              getRegex(currentPath)?.input
        let currentBodyConfig =     menuDashboard;
        let bottomConfig =          { visibleIcon: true, visibleLabel: false };
        let topElement =            <h1 className="dark:text-neutral-200 font-medium">Dashboard</h1>
        
        if (isRender) {
            currentBodyConfig = menuConfig;
            bottomConfig = bottomConfig
            topElement = <Logo></Logo>
        }
        return <SidebarComponent bodyConfig={currentBodyConfig} bottomConfig={bottomConfig}>
                    { topElement }
                </SidebarComponent>
    }

    useEffect (() => {
    },[])

    return (
        <div className="h-full bg-neutral-50">
            <header className="bg-white sticky inset-x-0 top-0 z-50 border-b border-neutral-200 h-12">
                <nav className="flex items-center justify-between px-4 h-full" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="/dashboard/proyectos">
                            <span className="sr-only">Your Company</span>
                            <img className="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt=""></img>
                        </a>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        <Breadcrumbs></Breadcrumbs>
                    </div>

                    <div className="flex lg:hidden">
                        <button onClick={() => setOpen(!isOpen) } type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6 dark:text-neutral-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                </nav>
                {/*                 {
                    isOpen &&   <div className={'lg:hidden dark:bg-neutral-900'} role="dialog" aria-modal="true">
                                    <div className="fixed inset-0 z-50 dark:bg-neutral-900"></div>
                                        <div className={"fixed dark:bg-neutral-900 inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"}>
                                            <div className="flex items-center justify-between p-2 lg:px-8 border-b border-neutral-200 dark:bg-neutral-900 dark:border-neutral-600">
                                                <a href="#" className="-m-1.5 p-1.5">
                                                    <span className="sr-only">Your Company</span>
                                                    <img className="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt=""></img>
                                                </a>
                                                <button onClick={() => setOpen(!isOpen) } type="button" className="rounded-md text-gray-700">
                                                    <span className="sr-only">Close menu</span>
                                                    <svg className="h-6 w-6 dark:text-neutral-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        <div className="mt-6 flow-root dark:bg-neutral-900">
                                            { renderSideBar() }
                                        </div>
                                    </div>
                                </div>
                } */}
            </header>
                                
            <div className="flex h-full">
                <div className={ getRegex(currentPath)?.input ? "bg-white border-r border-neutral-200 sm:fixed left-0 top-[47px] min-h-full" : "bg-white lg:flex w-48 hidden border-r border-neutral-200 min-h-full" }>
                    { renderSideBar() }
                </div>
                <div className="w-full sm:ms-[73px] bg-neutral-50">
                    { children }
                </div>
            </div>

        </div>
    )
}