"use client"
import { usePathname, useRouter } from 'next/navigation'
 
function ActiveLink({ children, href }) {
  
    const pathname = usePathname();
    const router = useRouter();

    const dynamicClass = (pathname === href) ? 'font-medium inline-flex items-center justify-center py-2 border-b-2 border-b rounded-t-lg hover:text-gray-600 border-neutral-800 group text-neutral-800' : 'dark:text-neutral-400 text-neutral-400 inline-flex items-center justify-center py-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 group' 
 
 
  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }
 
  return (
    <a href={href} onClick={handleClick} className={dynamicClass}>
      {children}
    </a>
  )
}
 
export default ActiveLink