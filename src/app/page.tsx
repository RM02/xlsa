"use client"
import Head from "next/head";
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Carousel } from 'react-responsive-carousel';

import {
  useSpring,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface ParallaxProps {
  baseVelocity: number;
}

function ParallaxText({ baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false
    });
  
    /**
     * This is a magic wrapping for the length of the text - you
     * have to replace for wrapping that works for you or dynamically
     * calculate
     */
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  
    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
  
      /**
       * This is what changes the direction of the scroll once we
       * switch scrolling directions.
       */
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
  
      moveBy += directionFactor.current * moveBy * velocityFactor.get();
  
      baseX.set(baseX.get() + moveBy);
    });
  
    /**
     * The number of times to repeat the child text should be dynamically calculated
     * based on the size of the text and viewport. Likewise, the x motion value is
     * currently wrapped between -20 and -45% - this 25% is derived from the fact
     * we have four children (100% / 4). This would also want deriving from the
     * dynamically generated number of children.
     */
    return (
      <div style={{ margin: 0, display: "flex", flexWrap: "nowrap", whiteSpace: "nowrap", overflow: "hidden" }}>
        <motion.div style={{ x, fontWeight: 600, textTransform: "uppercase", fontSize: "64px", display: "flex", flexWrap: "nowrap", color: "#fafafa" }}>

          <img className="bg-white p-2" style={{ display: "block", marginRight: "30px", height: "100px" }} src="/covault.png"></img>
          <img className="p-2" style={{ display: "block", marginRight: "30px", height: "100px" }} src="/covault.png"></img>
          <img className="bg-white p-2" style={{ display: "block", marginRight: "30px", height: "100px" }} src="/covault.png"></img>
          <img className="p-2" style={{ display: "block", marginRight: "30px", height: "100px" }} src="/covault.png"></img>
          <img className="bg-white p-2" style={{ display: "block", marginRight: "30px", height: "100px" }} src="/covault.png"></img>

        </motion.div>
      </div>
    );
  }

export default function Home() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["end end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [200, 0]);

  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 1.2]);

  interface ParallaxProps {
    children: string;
    baseVelocity: number;
  }
  return (
    <div className='bg-gradient-to-t from-slate-900 via-purple-900 to-slate-900'>
     <Head>
        <title>Bteno</title>
        <meta name="description" content="La IA que reduce los accidentes laborales. Construye programas de seguridad laboral para aumentar el bienestar de todos los trabajadores."/>
        <meta name="keywords" content="Programa Seguridad Laboral Riesgos Reportes Software IA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png"/>
        <meta
            property="og:image"
            content="https://www.bteno.com/bteno.png"
            />
      </Head>

      <main>
      
        <header className="flex w-full justify-center z-10 py-6">
            <div className="flex flex-rows w-3/4 justify-between rounded-lg">
              <div className="flex flex-cols">
                <img className="h-6 self-center" src="logo.png"></img>
                <h1 className="text-neutral-200 font-medium text-xl mx-4 self-center">Bteno</h1>
              </div>

              <ul className="hidden sm:flex sm:flex-cols justify-center space-x-4 text-neutral-200">
                <li className="self-center">
                    <Link href={"#features"}>Funcionalidades</Link>
                </li>
                <li className="self-center">
                    <Link href={"#post"}>Publicaciones</Link>
                </li>
                <li className="self-center">
                    <Link href={"#contact"}>Contacto</Link>
                </li>
              </ul>
              <div className="justify-end">
                <Link href={"/auth"} className="border px-4 p-2 rounded-lg text-neutral-200">Ingresar</Link>
              </div>
            </div>
        </header>

        <section ref={targetRef} id="home" className="relative overflow-hidden z-0 pt-28 md:pt-40 xl:pt-45 rounded-b-[3rem]">

            <div className="max-w-7xl mx-auto">
                <div className="absolute -z-10 pointer-events-none inset-0 overflow-hidden -mx-28">
                    <div className="absolute -z-1 -top-[128%] sm:-top-[107%] xl:-top-[73%] left-1/2 -translate-x-1/2 -u-z-10 hero-circle-gradient w-full h-[1282px] rounded-full max-w-[1282px]">
                    </div>
                    <div className="absolute -z-1 -top-[112%] sm:-top-[93%] xl:-top-[62%] left-1/2 -translate-x-1/2 -u-z-10 hero-circle-gradient w-full h-[1046px] rounded-full max-w-[1046px]">
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -u-z-10">
                        <img src="https://ai-tool-tailwind.preview.uideck.com/images/blur-02.svg" alt="blur" className="max-w-none"/>
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -u-z-10">
                        <img src="https://ai-tool-tailwind.preview.uideck.com/images/blur-01.svg" alt="blur" className="max-w-none"/>
                    </div>
                </div>
            </div>

            <div className="mx-auto px-4 pt-18 sm:px-20 relative z-1">
                <div className="text-center">
                    <Link href="/" className="text-purple-200 hover:hero-subtitle-hover relative mb-5 font-medium text-sm inline-flex items-center gap-2 py-2 px-4.5 rounded-full">
                        <img src="https://ai-tool-tailwind.preview.uideck.com/images/icon-title.svg" alt="icon"/>
                        <span className="hero-subtitle-text">
                            Construyendo bienestar
                        </span>
                    </Link>
                        <motion.h1 initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="text-white mb-6 text-5xl font-extrabold sm:text-8xl leading-normal">
                            La IA que
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-red-600"> reduce</span> los
                            accidentes laborales.
                        </motion.h1>
                        <p className="text-purple-400 mx-auto max-w-[900px] tracking-[0.1rem] mt-10 mb-9 font-medium md:text-lg sm:leading-normal">
                            Bteno es una herramienta para construir tus programas de seguridad laboral. 
                            Todo lo que necesitas- procedimientos, protocolos, procesos peligrosos que puedes facilmente configurar.
                        </p>
                        <Link href={"/authg/create-account"} className="border inline-flex rounded-lg py-3 px-7 text-white font-medium ease-in duration-300 hover:opacity-80 hover:bg-purple-900">
                            Solicitar demo 
                        </Link>
                </div>
            </div>
            <div className="mt-20 mb-12 bg-transparent px-2 sm:px-8" data-wow-delay="0.1s">
                <motion.img style={{ scale: scale, x: x }} className="relative sm:border-4 sm:border-purple-600" src="report.png" alt="hero" />
            </div>
        </section>


        <section id="features" className="overflow-hidden pt-28 xl:pt-28 scroll-mt-17">
            <div className="mx-auto px-4 pt-18 sm:px-20 relative z-1">
                <div className="text-center">

                    <motion.h1 initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="text-white mb-6 text-5xl font-extrabold sm:text-8xl leading-normal">
                        <span className="text-transparent bg-clip-text bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">Protege</span> a tus empleados.
                    </motion.h1>
                    <p className="text-purple-400 mx-auto max-w-[900px] mt-10 mb-9 font-medium md:text-lg leading-loose">
                        Nuestra herramienta IA está diseñada para empoderar las capacidades de las empresas,
                        haciendolo más eficiente, exacta y amigable.
                    </p>
                </div>
                <div className="relative">
                    <div className="features-row-border rotate-90 w-1/2 h-[1px] absolute top-1/2 left-1/2 -translate-y-1/2 lg:-translate-x-1/3 lg:left-1/4 hidden lg:block">
                    </div>
                    <div className="features-row-border rotate-90 w-1/2 h-[1px] absolute top-1/2 right-1/2 -translate-y-1/2 lg:right-[8.3%] hidden lg:block">
                    </div>

                    <div className="flex flex-wrap justify-center">

                        <motion.div initial={{ y: 200, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ velocity: 5, duration: 3 }} className="w-full sm:w-1/2 lg:w-1/3 border-r border-b border-purple-900">
                            <div className="group relative overflow-hidden text-center py-8 sm:py-10 xl:py-15 px-4 lg:px-8 xl:px-13">
                                <span className="group-hover:opacity-100 opacity-0 features-bg absolute w-full h-full left-0 top-0 -z-1"></span>
                                    <span className="icon-border relative max-w-[80px] w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                                    <img src="https://ai-tool-tailwind.preview.uideck.com/images/icon-01.svg" alt="icon" />
                                </span>
                                <h4 className="font-semibold text-lg text-white mb-4">
                                Personalización de programas
                                </h4>
                                <p className="font-medium text-purple-400">
                                    Con nuestra herramienta la construcción de programas de seguridad laboral es mucho más ágil.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ y: 200, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ velocity: 5, duration: 3 }} className="w-full sm:w-1/2 lg:w-1/3 border-r border-b border-purple-900">
                            <div className="group relative overflow-hidden text-center py-8 sm:py-10 xl:py-15 px-4 lg:px-8 xl:px-13">
                                <span className="group-hover:opacity-100 opacity-0 features-bg absolute w-full h-full left-0 top-0 -z-1"></span>
                                <span className="icon-border relative max-w-[80px] w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                                    <img src="https://ai-tool-tailwind.preview.uideck.com/images/icon-02.svg" alt="icon" />
                                </span>
                                <h4 className="font-semibold text-lg text-white mb-4">
                                    Mejoras continuas
                                </h4>
                                <p className="font-medium text-purple-400">
                                    Analizamos los procesos para brindarte recomendaciones a tu programa de seguridad laboral.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ y: 200, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ velocity: 5, duration: 3 }} className="w-full sm:w-1/2 lg:w-1/3 border-b border-purple-900">
                            <div className="group relative overflow-hidden text-center py-8 sm:py-10 xl:py-15 px-4 lg:px-8 xl:px-13">
                                <span className="group-hover:opacity-100 opacity-0 features-bg absolute w-full h-full left-0 top-0 -z-1"></span>
                                <span className="icon-border relative max-w-[80px] w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                                    <img src="https://ai-tool-tailwind.preview.uideck.com/images/icon-03.svg" alt="icon" />
                                </span>
                                <h4 className="font-semibold text-lg text-white mb-4">
                                Análisis de riesgos
                                </h4>
                                <p className="font-medium text-purple-400">
                                    Ayudamos a las empresas a crear entornos de trabajo seguros y saludables para sus empleados.
                                </p>
                            </div>
                        </motion.div>
                    </div>
            
                    <div className="features-row-border w-full h-[1px]"></div>

                    <div className="flex flex-wrap justify-center">

                        <motion.div initial={{ y: 200, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ velocity: 5, duration: 3 }}  className="w-full sm:w-1/2 lg:w-1/3 border-r border-purple-900">
                            <div className="group relative overflow-hidden text-center py-8 sm:py-10 xl:py-15 px-4 lg:px-8 xl:px-13">
                                <span className="group-hover:opacity-100 opacity-0 features-bg absolute w-full h-full left-0 top-0 -z-1 rotate-180"></span>
                                <span className="icon-border relative max-w-[80px] w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                                    <img src="https://ai-tool-tailwind.preview.uideck.com/images/icon-04.svg" alt="icon" />
                                </span>
                                <h4 className="font-semibold text-lg text-white mb-4">
                                    Reportes
                                </h4>
                                <p className="font-medium text-purple-400">
                                    Recopila, documenta y notifica incidencias.
                                    Los reportes ayudan a las empresas a cumplir con las normativas de seguridad.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ y: 200, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ velocity: 5, duration: 3 }} className="w-full sm:w-1/2 lg:w-1/3 border-r border-purple-900">
                            <div className="group relative overflow-hidden text-center py-8 sm:py-10 xl:py-15 px-4 lg:px-8 xl:px-13">
                                <span className="group-hover:opacity-100 opacity-0 features-bg absolute w-full h-full left-0 top-0 -z-1 rotate-180"></span>
                                <span className="icon-border relative max-w-[80px] w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                                    <img src="https://ai-tool-tailwind.preview.uideck.com/images/icon-05.svg" alt="icon" />
                                </span>
                                <h4 className="font-semibold text-lg text-white mb-4">
                                    Integración de equipos
                                </h4>
                                <p className="font-medium text-purple-400">
                                    Bteno es un entorno de trabajo donde las organizaciones
                                    pueden compartir información entre sus equipos de trabajos.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ y: 200, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ velocity: 5, duration: 3 }} className="w-full sm:w-1/2 lg:w-1/3 border-purple-900">
                            <div className="group relative overflow-hidden text-center py-8 sm:py-10 xl:py-15 px-4 lg:px-8 xl:px-13">
                                <span className="group-hover:opacity-100 opacity-0 features-bg absolute w-full h-full left-0 top-0 -z-1 rotate-180"></span>
                                <span className="icon-border relative max-w-[80px] w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                                    <img src="https://ai-tool-tailwind.preview.uideck.com/images/icon-06.svg" alt="icon" />
                                </span>
                                <h4 className="font-semibold text-lg text-white mb-4">
                                Generación de contenido
                                </h4>
                                <p className="font-medium text-purple-400">
                                    Nuestra herramienta tiene la capacidad de contribuir al desarrollo de nuevas medidas y procedimientos de seguridad laboral.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>


        <section className="h-screen mt-20 sm:py-20">
            <div className="max-w-[1170px] mx-auto sm:px-8 xl:px-0">
                <div className="grid sm:grid-cols-12 gap-2" data-highlighter>

                    <div className="sm:col-span-12">
                        <div className="py-10 sm:p-6 relative border border-purple-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100 to-teal-100 sm:rounded-[2rem]">
                            <div className="relative overflow-hidden rounded-3xl p-10 xl:p-15 box-hover">
                                <div className="flex items-center justify-between relative z-20">
                                    <div className="w-3/4 w-full">
                                        <span className="hero-subtitle-gradient relative mb-4 font-medium text-sm inline-flex items-center gap-2 py-2 px-4.5 rounded-full">
                                            <img src="https://ai-tool-tailwind.preview.uideck.com/images/icon-title.svg" alt="icon"/>
                                            <span className="hero-subtitle-text">
                                                Poderosa herramienta IA
                                            </span>
                                        </span>
                                        <h3 className="text-purple-800 text-3xl mb-4.5 font-bold text-heading-4">
                                            Asistencia Inteligente
                                        </h3>
                                        <p className="font-medium mb-10 mt-4 text-neutral-900 leading-loose">
                                            Nuestra herramienta está diseñada para empoderar a las organizaciones con capacidades excepcionales...
                                            Haciendo del proceso de construcción e implementación de los programas de seguridad mucho más sencillo y ágil.
                                        </p>
                                        <Link href={"/subscribe"} className="bg-purple-800 text-white relative inline-flex items-center gap-1.5 rounded-full py-3 px-6 text-sm ease-in duration-300 hover:shadow-button">
                                            Subcribir
                                            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.3992 5.60002L8.22422 0.350024C7.99922 0.125024 7.64922 0.125024 7.42422 0.350024C7.19922 0.575024 7.19922 0.925025 7.42422 1.15002L11.6242 5.42503H0.999219C0.699219 5.42503 0.449219 5.67502 0.449219 5.97502C0.449219 6.27502 0.699219 6.55003 0.999219 6.55003H11.6742L7.42422 10.875C7.19922 11.1 7.19922 11.45 7.42422 11.675C7.52422 11.775 7.67422 11.825 7.82422 11.825C7.97422 11.825 8.12422 11.775 8.22422 11.65L13.3992 6.40002C13.6242 6.17502 13.6242 5.82502 13.3992 5.60002Z" fill="white" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="max-w-[428px] w-full hidden sm:block">
                                        <img src="https://ai-tool-tailwind.preview.uideck.com/images/big-icon.svg" alt="icon" />
                                    </div>
                                </div>

                                <div className="absolute -z-10 pointer-events-none inset-0 overflow-hidden -mx-28">
                                    <span className="absolute right-0 bottom-0"><img src="images/shape-01.png" alt="shape" /></span>
                                    <span className="absolute left-0 top-0"><img src="images/shape-02.svg" alt="shape" /></span>
                                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0">
                                        <img src="images/blur-03.svg" alt="blur" className="max-w-none"/>
                                    </span>
                                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0">
                                        <img src="images/blur-04.svg" alt="blur" className="max-w-none"/>
                                    </span>
                                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0">
                                        <img src="images/blur-05.svg" alt="blur" className="max-w-none"/>
                                    </span>
                                    <span className="absolute right-0 top-0">
                                        <img src="images/shape-03.svg" alt="shape" className="max-w-none" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <section className="justify-center py-20">
            <div className="mx-auto max-w-[1170px] xl:px-0">
                <h2 className="text-center text-white sm:mb-4 text-2xl font-extrabold sm:text-4xl xl:text-heading-2">
                    Nuestros Aliados
                </h2>
            </div>
            <div className="mx-auto max-w-[1170px] xl:px-0">
                <div className="relative sm:pt-24 pt-20">                    
                    <ParallaxText baseVelocity={5}></ParallaxText>
                </div>
            </div>
        </section>
        {/* Publicaciones */}
        <section id="post" className="py-20 lg:py-25">
            <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">

                <div className="wow fadeInUp mb-16 text-center">
                    <span className="hero-subtitle-gradient relative mb-4 font-medium text-sm inline-flex items-center gap-2 py-2 px-4.5 rounded-full">
                    <img src="https://ai-tool-tailwind.preview.uideck.com/images/icon-title.svg" alt="icon"/>
                    <span className="hero-subtitle-text text-neutral-400"> Publicaciones recientes </span>
                    </span>
                    <h2 className="text-white mb-4.5 text-2xl font-extrabold sm:text-4xl xl:text-heading-2">
                      Últimas Actualizaciones
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    <div className="wow fadeInUp group">
                        <div className="mb-6 overflow-hidden rounded-xl">
                            <img src="https://ai-tool-tailwind.preview.uideck.com/images/blog-01.png" alt="image" className="ease-linear w-full duration-500 scale-100 group-hover:scale-125" />
                        </div>
                        <div className="flex flex-wrap gap-2 items-center mb-4">
                            <span className="font-medium text-xs hover:text-white cursor-pointer py-[3px] px-2 rounded-full bg-white/[0.07] border border-white/10 hover:border-white/25 ease-out duration-300">
                            Design
                            </span>
                            <span className="font-medium text-xs hover:text-white cursor-pointer py-[3px] px-2 rounded-full bg-white/[0.07] border border-white/10 hover:border-white/25 ease-out duration-300">
                            Engineering
                            </span>
                        </div>
                        <h4>
                            <a href="blog-single.html" className="text-white font-semibold text-xl ease-in duration-300 hover:opacity-80">
                            La inteligencia artificial y la seguridad laboral: oportunidades y riesgos
                            </a>
                        </h4>
                        <p className="font-medium mt-4 text-neutral-400">
                        En esta publicación, se discute las oportunidades y los riesgos que la inteligencia artificial (IA) representa para la seguridad laboral. 
                        Explicando cómo la IA puede ayudar a mejorar la seguridad laboral en los siguientes aspectos...
                        </p>
                        <div className="flex items-center gap-4 flex-wrap mt-6 text-purple-400">
                            <div className="flex items-center gap-2 flex-wrap cursor-pointer ease-in duration-300 hover:text-white">
                                <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 8.75C7.65625 8.75 5.78125 6.90625 5.78125 4.65625C5.78125 2.40625 7.65625 0.5625 10 0.5625C12.3438 0.5625 14.2188 2.40625 14.2188 4.65625C14.2188 6.90625 12.3438 8.75 10 8.75ZM10 1.96875C8.4375 1.96875 7.1875 3.1875 7.1875 4.65625C7.1875 6.125 8.4375 7.34375 10 7.34375C11.5625 7.34375 12.8125 6.125 12.8125 4.65625C12.8125 3.1875 11.5625 1.96875 10 1.96875Z" />
                                <path d="M16.5938 19.4688C16.2188 19.4688 15.875 19.1562 15.875 18.75V17.8438C15.875 14.5938 13.25 11.9688 10 11.9688C6.75 11.9688 4.125 14.5938 4.125 17.8438V18.75C4.125 19.125 3.8125 19.4688 3.40625 19.4688C3 19.4688 2.6875 19.1562 2.6875 18.75V17.8438C2.6875 13.8125 5.96875 10.5625 9.96875 10.5625C13.9688 10.5625 17.25 13.8437 17.25 17.8438V18.75C17.2813 19.125 16.9688 19.4688 16.5938 19.4688Z" />
                                </svg>
                                <span className="text-sm font-medium">Alex Demo</span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap cursor-pointer ease-in duration-300 hover:text-white">
                                <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 3.3125H15.875V2.625C15.875 2.25 15.5625 1.90625 15.1562 1.90625C14.75 1.90625 14.4375 2.21875 14.4375 2.625V3.3125H5.53125V2.625C5.53125 2.25 5.21875 1.90625 4.8125 1.90625C4.40625 1.90625 4.09375 2.21875 4.09375 2.625V3.3125H2.5C1.4375 3.3125 0.53125 4.1875 0.53125 5.28125V16.1563C0.53125 17.2188 1.40625 18.125 2.5 18.125H17.5C18.5625 18.125 19.4687 17.25 19.4687 16.1563V5.25C19.4687 4.1875 18.5625 3.3125 17.5 3.3125ZM1.96875 9.125H4.625V12.2188H1.96875V9.125ZM6.03125 9.125H9.3125V12.2188H6.03125V9.125ZM9.3125 13.625V16.6875H6.03125V13.625H9.3125ZM10.7187 13.625H14V16.6875H10.7187V13.625ZM10.7187 12.2188V9.125H14V12.2188H10.7187ZM15.375 9.125H18.0312V12.2188H15.375V9.125ZM2.5 4.71875H4.125V5.375C4.125 5.75 4.4375 6.09375 4.84375 6.09375C5.25 6.09375 5.5625 5.78125 5.5625 5.375V4.71875H14.5V5.375C14.5 5.75 14.8125 6.09375 15.2187 6.09375C15.625 6.09375 15.9375 5.78125 15.9375 5.375V4.71875H17.5C17.8125 4.71875 18.0625 4.96875 18.0625 5.28125V7.71875H1.96875V5.28125C1.96875 4.96875 2.1875 4.71875 2.5 4.71875ZM1.96875 16.125V13.5938H4.625V16.6563H2.5C2.1875 16.6875 1.96875 16.4375 1.96875 16.125ZM17.5 16.6875H15.375V13.625H18.0312V16.1563C18.0625 16.4375 17.8125 16.6875 17.5 16.6875Z" />
                                </svg>
                                <span className="text-sm font-medium">25 Mar, 2025</span>
                            </div>
                        </div>
                    </div>
                    <div className="wow fadeInUp group">
                        <div className="mb-6 overflow-hidden rounded-xl">
                            <img src="https://ai-tool-tailwind.preview.uideck.com/images/blog-01.png" alt="image" className="ease-linear w-full duration-500 scale-100 group-hover:scale-125" />
                        </div>
                        <div className="flex flex-wrap gap-2 items-center mb-4">
                            <span className="font-medium text-xs hover:text-white cursor-pointer py-[3px] px-2 rounded-full bg-white/[0.07] border border-white/10 hover:border-white/25 ease-out duration-300">
                            Design
                            </span>
                            <span className="font-medium text-xs hover:text-white cursor-pointer py-[3px] px-2 rounded-full bg-white/[0.07] border border-white/10 hover:border-white/25 ease-out duration-300">
                            Engineering
                            </span>
                        </div>
                        <h4>
                            <a href="blog-single.html" className="text-white font-semibold text-xl ease-in duration-300 hover:opacity-80">
                              Ejemplos de cómo la inteligencia artificial se está utilizando para mejorar la seguridad laboral
                            </a>
                        </h4>
                        <p className="font-medium mt-4 text-neutral-400">
                          La empresa de atención médica Johnson & Johnson está utilizando la IA para ayudar a los trabajadores lesionados a recuperarse más rápidamente. 
                          La IA crea programas de rehabilitación personalizados que se adaptan a las necesidades individuales del trabajador...
                        </p>
                        <div className="flex items-center gap-4 flex-wrap mt-6 text-purple-400">
                            <div className="flex items-center gap-2 flex-wrap cursor-pointer ease-in duration-300 hover:text-white">
                                <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 8.75C7.65625 8.75 5.78125 6.90625 5.78125 4.65625C5.78125 2.40625 7.65625 0.5625 10 0.5625C12.3438 0.5625 14.2188 2.40625 14.2188 4.65625C14.2188 6.90625 12.3438 8.75 10 8.75ZM10 1.96875C8.4375 1.96875 7.1875 3.1875 7.1875 4.65625C7.1875 6.125 8.4375 7.34375 10 7.34375C11.5625 7.34375 12.8125 6.125 12.8125 4.65625C12.8125 3.1875 11.5625 1.96875 10 1.96875Z" />
                                <path d="M16.5938 19.4688C16.2188 19.4688 15.875 19.1562 15.875 18.75V17.8438C15.875 14.5938 13.25 11.9688 10 11.9688C6.75 11.9688 4.125 14.5938 4.125 17.8438V18.75C4.125 19.125 3.8125 19.4688 3.40625 19.4688C3 19.4688 2.6875 19.1562 2.6875 18.75V17.8438C2.6875 13.8125 5.96875 10.5625 9.96875 10.5625C13.9688 10.5625 17.25 13.8437 17.25 17.8438V18.75C17.2813 19.125 16.9688 19.4688 16.5938 19.4688Z" />
                                </svg>
                                <span className="text-sm font-medium">Alex Demo</span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap cursor-pointer ease-in duration-300 hover:text-white">
                                <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 3.3125H15.875V2.625C15.875 2.25 15.5625 1.90625 15.1562 1.90625C14.75 1.90625 14.4375 2.21875 14.4375 2.625V3.3125H5.53125V2.625C5.53125 2.25 5.21875 1.90625 4.8125 1.90625C4.40625 1.90625 4.09375 2.21875 4.09375 2.625V3.3125H2.5C1.4375 3.3125 0.53125 4.1875 0.53125 5.28125V16.1563C0.53125 17.2188 1.40625 18.125 2.5 18.125H17.5C18.5625 18.125 19.4687 17.25 19.4687 16.1563V5.25C19.4687 4.1875 18.5625 3.3125 17.5 3.3125ZM1.96875 9.125H4.625V12.2188H1.96875V9.125ZM6.03125 9.125H9.3125V12.2188H6.03125V9.125ZM9.3125 13.625V16.6875H6.03125V13.625H9.3125ZM10.7187 13.625H14V16.6875H10.7187V13.625ZM10.7187 12.2188V9.125H14V12.2188H10.7187ZM15.375 9.125H18.0312V12.2188H15.375V9.125ZM2.5 4.71875H4.125V5.375C4.125 5.75 4.4375 6.09375 4.84375 6.09375C5.25 6.09375 5.5625 5.78125 5.5625 5.375V4.71875H14.5V5.375C14.5 5.75 14.8125 6.09375 15.2187 6.09375C15.625 6.09375 15.9375 5.78125 15.9375 5.375V4.71875H17.5C17.8125 4.71875 18.0625 4.96875 18.0625 5.28125V7.71875H1.96875V5.28125C1.96875 4.96875 2.1875 4.71875 2.5 4.71875ZM1.96875 16.125V13.5938H4.625V16.6563H2.5C2.1875 16.6875 1.96875 16.4375 1.96875 16.125ZM17.5 16.6875H15.375V13.625H18.0312V16.1563C18.0625 16.4375 17.8125 16.6875 17.5 16.6875Z" />
                                </svg>
                                <span className="text-sm font-medium">25 Mar, 2025</span>
                            </div>
                        </div>
                    </div>
                    <div className="wow fadeInUp group">
                        <div className="mb-6 overflow-hidden rounded-xl">
                            <img src="https://ai-tool-tailwind.preview.uideck.com/images/blog-01.png" alt="image" className="ease-linear w-full duration-500 scale-100 group-hover:scale-125" />
                        </div>
                        <div className="flex flex-wrap gap-2 items-center mb-4">
                            <span className="font-medium text-xs hover:text-white cursor-pointer py-[3px] px-2 rounded-full bg-white/[0.07] border border-white/10 hover:border-white/25 ease-out duration-300">
                            Design
                            </span>
                            <span className="font-medium text-xs hover:text-white cursor-pointer py-[3px] px-2 rounded-full bg-white/[0.07] border border-white/10 hover:border-white/25 ease-out duration-300">
                            Engineering
                            </span>
                        </div>
                        <h4>
                            <a href="blog-single.html" className="text-white font-semibold text-xl ease-in duration-300 hover:opacity-80">
                            Futuro de la inteligencia artificial y la seguridad laboral
                            </a>
                        </h4>
                        <p className="font-medium mt-4 text-neutral-400">
                        La IA se volverá cada vez más sofisticada. 
                        A medida que la IA se desarrolle, será capaz de identificar riesgos potenciales de accidentes con mayor precisión y brindar asistencia a los trabajadores de manera más efectiva...
                        </p>
                        <div className="flex items-center gap-4 flex-wrap mt-6 text-purple-400">
                            <div className="flex items-center gap-2 flex-wrap cursor-pointer ease-in duration-300 hover:text-white">
                                <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 8.75C7.65625 8.75 5.78125 6.90625 5.78125 4.65625C5.78125 2.40625 7.65625 0.5625 10 0.5625C12.3438 0.5625 14.2188 2.40625 14.2188 4.65625C14.2188 6.90625 12.3438 8.75 10 8.75ZM10 1.96875C8.4375 1.96875 7.1875 3.1875 7.1875 4.65625C7.1875 6.125 8.4375 7.34375 10 7.34375C11.5625 7.34375 12.8125 6.125 12.8125 4.65625C12.8125 3.1875 11.5625 1.96875 10 1.96875Z" />
                                <path d="M16.5938 19.4688C16.2188 19.4688 15.875 19.1562 15.875 18.75V17.8438C15.875 14.5938 13.25 11.9688 10 11.9688C6.75 11.9688 4.125 14.5938 4.125 17.8438V18.75C4.125 19.125 3.8125 19.4688 3.40625 19.4688C3 19.4688 2.6875 19.1562 2.6875 18.75V17.8438C2.6875 13.8125 5.96875 10.5625 9.96875 10.5625C13.9688 10.5625 17.25 13.8437 17.25 17.8438V18.75C17.2813 19.125 16.9688 19.4688 16.5938 19.4688Z" />
                                </svg>
                                <span className="text-sm font-medium">Alex Demo</span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap cursor-pointer ease-in duration-300 hover:text-white">
                                <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 3.3125H15.875V2.625C15.875 2.25 15.5625 1.90625 15.1562 1.90625C14.75 1.90625 14.4375 2.21875 14.4375 2.625V3.3125H5.53125V2.625C5.53125 2.25 5.21875 1.90625 4.8125 1.90625C4.40625 1.90625 4.09375 2.21875 4.09375 2.625V3.3125H2.5C1.4375 3.3125 0.53125 4.1875 0.53125 5.28125V16.1563C0.53125 17.2188 1.40625 18.125 2.5 18.125H17.5C18.5625 18.125 19.4687 17.25 19.4687 16.1563V5.25C19.4687 4.1875 18.5625 3.3125 17.5 3.3125ZM1.96875 9.125H4.625V12.2188H1.96875V9.125ZM6.03125 9.125H9.3125V12.2188H6.03125V9.125ZM9.3125 13.625V16.6875H6.03125V13.625H9.3125ZM10.7187 13.625H14V16.6875H10.7187V13.625ZM10.7187 12.2188V9.125H14V12.2188H10.7187ZM15.375 9.125H18.0312V12.2188H15.375V9.125ZM2.5 4.71875H4.125V5.375C4.125 5.75 4.4375 6.09375 4.84375 6.09375C5.25 6.09375 5.5625 5.78125 5.5625 5.375V4.71875H14.5V5.375C14.5 5.75 14.8125 6.09375 15.2187 6.09375C15.625 6.09375 15.9375 5.78125 15.9375 5.375V4.71875H17.5C17.8125 4.71875 18.0625 4.96875 18.0625 5.28125V7.71875H1.96875V5.28125C1.96875 4.96875 2.1875 4.71875 2.5 4.71875ZM1.96875 16.125V13.5938H4.625V16.6563H2.5C2.1875 16.6875 1.96875 16.4375 1.96875 16.125ZM17.5 16.6875H15.375V13.625H18.0312V16.1563C18.0625 16.4375 17.8125 16.6875 17.5 16.6875Z" />
                                </svg>
                                <span className="text-sm font-medium">25 Mar, 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="h-screen flex justify-center z-0">
            <div className="sm:w-5/6 self-center relative">
                <div className="relative sm:mx-4 cta-box-gradient bg-dark sm:rounded-[2rem] overflow-hidden sm:px-6 py-10 z-20">

                    <span className="absolute left-0 bottom-0 -z-1"><img src="https://ai-tool-tailwind.preview.uideck.com/images/grid.svg" alt="grid" /></span>
                    <div className="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                        <span className="absolute left-1/2 bottom-0 -translate-x-1/2 z-20">
                            <img src="https://ai-tool-tailwind.preview.uideck.com/images/blur-22.svg" alt="blur" className="max-w-none"/>
                        </span>
                        <span className="absolute left-1/2 bottom-0 -translate-x-1/2 z-10">
                            <img src="https://ai-tool-tailwind.preview.uideck.com/images/blur-23.svg" alt="blur" className="max-w-none"/>
                        </span>
                        <span className="absolute left-1/2 bottom-0 -translate-x-1/2 z-10">
                            <img src="https://ai-tool-tailwind.preview.uideck.com/images/blur-24.svg" alt="blur" className="max-w-none"/>
                        </span>
                    </div>

                    <div className="w-full h-60 overflow-hidden absolute -z-1 -bottom-25 left-1/2 -translate-x-1/2">
                        <div className="stars"></div>
                        <div className="stars2"></div>
                    </div>
                    <div className="text-center">
                        <span className="text-purple-200 relative mb-4 font-medium text-sm inline-flex items-center gap-2 py-2 rounded-full">
                            <img src="https://ai-tool-tailwind.preview.uideck.com/images/icon-title.svg" alt="icon"/>
                                <span className="hero-subtitle-text">
                                Prueba de forma gratuita
                                </span>
                            </span>
                            <motion.h2 initial={{ scale: 0.8, y: 100 }} whileInView={{ scale: 1.2, y: 0 }} transition={{ duration: 0.5, velocity: 3 }} className="text-center text-white py-4 px-2 text-2xl font-extrabold sm:text-6xl xl:text-heading-2 z-10">
                                ¿Esperas el próximo <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-red-600">accidente</span>?
                            </motion.h2>
                                <p className="sm:w-2/3 mx-auto font-medium my-10 px-6 text-purple-200 sm:text-xl text-md">
                                    Solicita nuestros servicios. La herramienta IA está diseñada para hacer tu proceso más eficiente, exacto y amigable.
                                </p>
                    </div>
                    <div className="z-20 text-center">

                            <Link href={"#"} className="border-2 inline-flex rounded-lg py-3 px-7 text-white font-medium hover:opacity-80 hover:bg-purple-90 z-20">
                                Solicitar demo
                            </Link>
                    </div>
                </div>
            </div>
        </section>

        <section id="contact" className="pt-18 sm:pt-20 xl:pt-27.5 pb-11">
            <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
                <div className="flex flex-wrap items-center justify-between gap-10">
                    <div className="max-w-[352px] w-full">
                        <h3 className="text-heading-5 text-white mb-2 text-3xl">
                            Escribenos
                        </h3>
                        <p className="font-medium text-neutral-400 mt-4">
                            Mantente informado con todas las novedades de esta herramienta.
                        </p>
                    </div>

                    <div className="max-w-[534px] w-full">
                        <form>
                            <div className="flex items-center gap-4">
                                <div className="max-w-[395px] w-full">
                                <   input id="email" type="email" name="email" placeholder="Correo electrónico" className="rounded-lg border border-white/[0.12] bg-white/[0.05] focus:border-purple w-full py-3 px-6 outline-none" />
                                </div>
                                <a href="/subscribe" className="border relative rounded-lg text-white text-sm flex items-center gap-1.5 py-3.5 px-7 shadow-button hover:button-gradient-hover hover:shadow-none">
                                    Subscribe
                                </a>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-cols space-x-6 w-full">
                        <a>
                            <img className="h-8" src="/linkedin.svg"></img>
                        </a>
                        <a>
                            <img className="h-8" src="/instagram.svg"></img>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <div className="mx-auto max-w-[1170px] h-[1px] mb-10 bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 opacity-25"></div>

        <footer className="bottom-0">
            <div className="sm:flex sm:flex-cols justify-between sm:mx-20 ">
                <div className="flex flex-cols">
                    <div className="px-4">
                        <div>
                        <div className="flex space-x-4">
                            <img className="h-6 self-center" src="logo.png"></img>
                            <h1 className="text-white text-3xl">Bteno.</h1>
                        </div>
                            <p className="text-neutral-400 mt-2">La herramienta IA que reduce tus accidentes laborales.</p>
                        </div>
                        <div className="text-neutral-400">
                            <p>Eneru Tech. Todos los derechos reservados.</p>
                        </div>
                        <div className="text-neutral-400 pt-4 space-y-2"> 
                            <div className="text-xl font-medium text-white">
                                (58) 4248216040
                            </div>
                            <div className="text-md">
                                bteno@enerutech.com
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sm:flex sm:flex-col justify-center sm:py-0 pt-4">
                    <div className="flex sm:mt-0 mt-4">
                        <ul className="flex flex-col self-cend text-neutral-400 px-4 space-y-2">
                            <p className="text-neutral-200 py-2">Navegación</p>
                            <Link href={"#features"}>Funcionalidades</Link>
                            <Link href={"#post"}>Publicaciones</Link>
                            <Link href={"#contact"}>Contactos</Link>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <div className="h-[1px] mt-8 bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 opacity-25"></div>
                <div className="h-[2px] bg-white mt-4 bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 opacity-25"></div>
                <div className="h-[3px] bg-white mt-4 bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 opacity-25"></div>
                <div className="h-[4px] bg-white mt-4 bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 opacity-25"></div>
                <div className="h-[5px] bg-white mt-4 bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 opacity-25"></div>
            </div>
        </footer>
      </main>
    </div>
  )
}
