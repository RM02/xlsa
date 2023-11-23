import { useRouter } from "next/navigation"
import { motion } from 'framer-motion';

export default function DynamicHeader () {

    const router = useRouter();
    
    return (
        <motion.div
            animate={{
                scale: [1, 1.2, 1.2, 1, 1],
            }}
            transition={{
                repeat: Infinity,
                velocity: 0.5,
                duration: 20
            }}
        >
            <div className='z-20 flex justify-center mt-10'>
                <div className='flex self-center mx-auto justify-between bg-neutral-900 rounded-3xl px-2 py-2'>
                    {/* <Image width={50} height={50} className="h-12 w-6" src="/1.jpeg"></Image> */}
                    <button onClick={() => router.push("/")} className={'text-neutral-50 text-4xl font-extrabold px-4'}>Bteno.</button>
                    <div className="flex px-10">

                    </div>
                {/* <div className='hidden sm:flex w-full flex-wrap justify-around self-center rounded-lg text-neutral-50 text-semibold text-md mx-auto'>
                    <div>
                    <a>Funcionalidades</a>
                    </div>
                    <div>
                    <a>Planes</a>
                    </div>
                    <div>
                    <a href='/contacto'>Contacto</a>
                    </div>
                </div> */}
                    <div className='flex self-end'>
                        <button onClick={() => router.push("#adaptable")} className='px-4 py-2 bg-gradient-to-r via-orange-400 from-orange-500 to-orange-500 rounded-3xl text-neutral-50 font-semibold hover:bg-neutral-50 hover:bg-gradient-to-r hover:via-neutral-50 hover:from-neutral-50 hover:text-orange-500'>Comenzar</button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}