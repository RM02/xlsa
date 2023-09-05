"use client"
import { MenuComponent } from "@/components/sidebarComponent"
import { AppContext } from "@/context/appContext"
import LayoutPrimary from "@/layouts/layoutPrimary"
import MobileLayout from "@/layouts/mobileLayout"
import { usePathname } from "next/navigation"
import { useContext, useEffect, useState } from "react"

export default function Layout ({ children }) {

    const { account } = useContext(AppContext);
    const [screen, setScreen] = useState(false);
    const [label, setLabel] = useState('initial');
    const [currentMenu, setMenu] = useState([
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
            label: "Organizaciones"
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
    ]);

    const currentPath = usePathname();

    const menuConfig = {
        primary: [
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
                label: "Organizaciones"
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
        ],
        secondary: [
            {
                label: "Usuarios",
                path: "/dashboard/proyectos/axlas/usuarios"
            },
            {
                label: "Incidencias",
                path: "/dashboard/proyectos/axlas/incidencia"
            },
            {
                label: "Reportes",
                path: "/dashboard/proyectos/axlas/a"
            },
            {
                label: "Ajustes",
                path: "/dashboard/proyectos/axlas/ajustes"
            },
        ]
    } 
    const getRegex = (code) => {
        const regex1 = /(usuarios|incidencia)/        ;
        const result = regex1.exec(code)
        return result
    }
    const s = (data) => setLabel(data)

    const renderMobileLayout = (config) => {

        return <MobileLayout config={config}>
            { children }
        </MobileLayout>
    }
    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${700}px)`);
    
        // Check on mount (callback is not called until a change occurs)
        if (media.matches) {
          setScreen(true)
        }
        switch (currentPath) {
            case getRegex(currentPath)?.input:
                setMenu(menuConfig['secondary'])
                setLabel("secondary")
                break
            default:
                setMenu(menuConfig['primary'])
                setLabel("primary")
                break
        }
    }, [])

    return <LayoutPrimary>{ children }</LayoutPrimary>
}