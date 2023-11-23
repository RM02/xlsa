"use client"
import { useState } from "react"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function () {
    const [org_name, setOrg] = useState()
    const [sector, setSector] = useState()
    const [addr, setAddr] = useState()

    const [value, setValue] = useState("4248844908")

    const save = () => {
        console.log(org_name, sector, addr)
    }
    return( 
        <div className="flex py-12 sm:p-20 justify-center">
            <div className="bg-white border border-neutral-200 w-3/4">
                <div className="flex flex-col bg-white border-b border-neutral-200 p-4 px-6">
                    <p className="font-extrabold text-md text-neutral-600 w-full">Nuevo organización</p>
                    <p className="font-medium text-md text-neutral-600 my-2">Este proyecto solo tiene una instancia. La información es distribuida a los integrantes de este espacio.</p>
                </div>
                <div className="sm:flex sm:flex-row justify-between bg-white border-b border-neutral-200 p-4 px-6">
                    <div>
                        <p className="font-medium text-md text-neutral-600 py-2">Nombre o Razón social</p>
                    </div>
                    <div className="w-3/4">
                        <input className="border border-neutral-200 focus:outline-none focus:border-neutral-200 focus:ring-2 focus:ring-neutral-200 rounded-lg w-full p-2" onChange={(e) => setOrg(e.target.value)} value={org_name}></input>
                    </div>
                </div>
                <div className="sm:flex sm:flex-row justify-between bg-white border-b border-neutral-200 p-4 px-6">
                    <div>
                        <p className="font-medium text-md text-neutral-600 py-2">Sector</p>
                    </div>
                    <div className="w-3/4">
                        <input className="border border-neutral-200 focus:outline-none focus:border-neutral-200 focus:ring-2 focus:ring-neutral-200 rounded-lg w-full p-2" onChange={(e) => setSector(e.target.value)} value={sector}></input>
                    </div>
                </div>
                <div className="sm:flex sm:flex-row justify-between bg-white border-b border-neutral-200 p-4 px-6">
                    <div>
                        <p className="font-medium text-md text-neutral-600 py-2">Dirección</p>
                    </div>
                    <div className="w-3/4">
                        <input className="border border-neutral-200 focus:outline-none focus:border-neutral-200 focus:ring-2 focus:ring-neutral-200 rounded-lg w-full p-2" onChange={(e) => setAddr(e.target.value)} value={addr}></input>
                    </div>
                </div>
                <div className="sm:flex sm:flex-row justify-between bg-white border-b border-neutral-200 p-4 px-6">
                    <div>
                        <p className="font-medium text-md text-neutral-600 py-2">Telefono</p>
                    </div>
                    <div className="w-3/4">
                        <PhoneInput
                            style={{ "border": "2px solid"}}
                            defaultCountry="VE"
                            className="border border-neutral-200 focus:outline-none focus:border-neutral-200 focus:ring-2 focus:ring-neutral-200 rounded-lg w-full p-2 px-4"
                            value={value}
                            onChange={setValue}/>
                    </div>
                </div>
{/*                 <div className="sm:flex sm:flex-row justify-between bg-white border-b border-neutral-200 p-4 px-6">
                    <div>
                        <p className="font-medium text-md text-neutral-600 py-2">Nombre</p>
                    </div>
                    <div className="w-3/4">
                        <input className="border border-neutral-200 rounded-lg w-full p-2" onChange={(e) => setname(e.target.value)}></input>
                    </div>
                </div> */}
                <div className="flex flex-row justify-between p-4">
                    <div>
                        <button className="border rounded-lg border-neutral-200 px-4 py-2">Cancelar</button>
                    </div>
                    <div>
                        <button onClick={() => save()} className="bg-neutral-900 text-neutral-50 rounded-lg px-4 py-2 font-extrabold">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}