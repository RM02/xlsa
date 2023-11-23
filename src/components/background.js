import { Environment, Sphere } from "@react-three/drei"

export default function Background () {
    return (
        <>
            <Environment preset="sunset"></Environment>
            <Sphere scale={[100, 100, 100]} rotation-y={Math.PI / 2}></Sphere>
        </>
    )
}