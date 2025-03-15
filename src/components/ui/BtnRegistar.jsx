import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BtnRegistrar() {
    const [navegar, setNavegar] = useState("");

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div>
                    <button
                        type="submit"
                        className="ml-auto bg-green-confirm text-white font-semibold py-2 px-4 rounded-full w-[160px] shadow-purple-200 shadow-lg cursor-pointer"
                    >
                        Registrar
                    </button>
                </div>
            </PopoverTrigger>
            <PopoverContent className="p-4 w-[20em] mr-[12em] bg-white border-1 border-black">
                <div className="w-[90%] m-auto">
                    <div className="mb-[1em] flex items-center justify-center border-b border-purple-100">
                        <img src="/responsiblePopover.png" alt="Cerrar sesión" className="w-[4em]" />
                    </div>

                    <div className="mt-[1em] grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="name" className="text-darkpurple-title">Nombre</Label>
                        <Input type="text" id="name" placeholder="" className="border-black"/>
                    </div>

                    <div className="mt-[0.5em] grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="lastname" className="text-darkpurple-title">Apellidos</Label>
                        <Input type="text" id="lastname" placeholder="" className="border-black"/>
                    </div>

                    <div className="mt-[0.5em] grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="user" className="text-darkpurple-title">Usuario</Label>
                        <Input type="text" id="user" placeholder="" className="border-black"/>
                    </div>

                    <div className="mt-[0.5em] grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="password" className="text-darkpurple-title">Contraseña</Label>
                        <Input type="text" id="password" placeholder="" className="border-black"/>
                    </div>

                    <div className="mt-[0.5em]">
                    <Label htmlFor="password" className="text-darkpurple-title mb-[0.5em]">Seleccionar bien</Label>
                        <Select>
                            <SelectTrigger className="w-[180px] border-black">
                                <SelectValue placeholder="Bien"/>
                            </SelectTrigger>
                            <SelectContent className="bg-purple-100 border-black">
                                <SelectItem value="1">Monitor Barq</SelectItem>
                                <SelectItem value="2">Mesa Yanpol</SelectItem>
                                <SelectItem value="3">Mouse Razer Viper Mini</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="mt-[1em] flex justify-center">
                        <Button type="submit" className="bg-green-confirm">Agregar Responsable</Button>
                    </div>



                </div>
            </PopoverContent>
        </Popover>
    );
}
