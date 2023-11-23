"use client"
import Footer from "@/components/footer"
import Header from "@/components/header"

export default function () {
    return (
        <div className='h-screen bg-gradient-to-r via-orange-400 from-orange-500 to-orange-500'>
            <Header></Header>
            <div className="h-full px-12 flex flex-col justify-between py-2">
                <div className='h-1/6'></div>
                <div className="flex flex-col h-4/6 justify-center">
                    <div className="mx-auto">
                        <p className='text-5xl sm:text-8xl font-extrabold text-neutral-50'>Comparte tus ideas</p>
                    </div>
                    <div className="mt-8 mx-auto space-y-4">
                        <p className="text-xl text-center">Contactanos a través del correo electronico</p>
                        <p className='text-neutral-900 text-4xl font-extrabold text-center'>support@bteno.com</p>
                    </div>
                </div>
                <div>
                    <Footer></Footer>
                </div>
            </div>
        </div>
    )
}