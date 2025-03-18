import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BtnRegisterHeader({ tileBtn, imgPopover, infoLabel, infoBtn }) {
    const [navegar, setNavegar] = useState("");

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div>
                <button
    type="submit"
    className="flex items-center ml-auto bg-green-confirm text-white font-semibold py-1 px-4 rounded-full w-[120px] shadow-purple-200 shadow-lg cursor-pointer"
>
    <p className="text-[1.5em] mr-2">+</p>
    {tileBtn}
</button>

                </div>
            </PopoverTrigger>
            <PopoverContent className="p-4 w-[20em] mr-[12em] bg-white border-1 border-black">
                <div className="w-[90%] m-auto">
                    <div className="mt-[2em] flex items-center justify-center border-b border-purple-100">
                        <img src={imgPopover} alt="Cerrar sesión" className="w-[4em] mb-[2em]" />
                    </div>

                    

                    <div className="mt-[0.5em] grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="commonArea" className="text-darkpurple-title">{infoLabel}</Label>
                        <Input type="text" id="commonArea" placeholder="" className="border-black"/>
                    </div>

                    <div className="mt-[1.5em] mb-[2em] flex justify-center">
                        <Button type="submit" className="bg-green-confirm">{infoBtn}</Button>
                    </div>



                </div>
            </PopoverContent>
        </Popover>
    );
}
