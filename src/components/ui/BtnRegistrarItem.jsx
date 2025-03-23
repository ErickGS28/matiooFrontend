import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BtnRegistrarItem({ onAgregar }) {
    const [item, setItem] = useState("");
  // Estados para cada campo
  const [itemType, setItemType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [code, setCode] = useState("");
  const [owner, setOwner] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState(true);

  const handleClick = () => {
    const newItem = {
        item,
      itemType,
      brand,
      model,
      serialNumber,
      code,
      owner,
      assignedTo,
      location,
      status,
    };
    if (onAgregar) onAgregar(newItem);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
      <div>
                      <button
                        type="submit"
                        className="flex items-center justify-center ml-auto bg-green-confirm text-white font-semibold py-1 px-4 rounded-full w-[160px] shadow-purple-200 shadow-lg cursor-pointer"
                      >
                        <p className="text-[1.5em] mr-2">+</p>
                        Agregar
                      </button>
                    </div>
      </PopoverTrigger>

      <PopoverContent
        side="right"
        align="center"
        sideOffset={5}
        className="z-50 p-4 w-full max-w-[24em] bg-white border border-gray-200 overflow-y-auto max-h-[90vh] translate-y-5"
      >
        <div className="w-full m-auto space-y-4 ">
          <div className="mb-2 flex items-center justify-center border-b border-gray-200 pb-2">
            <img src="/asidebarIMG/item.png" alt="Registrar Item" className="w-[4em]" />
          </div>


          <div className="grid gap-2">
            <Label htmlFor="item" className="text-gray-800">
              Bien
            </Label>
            <Input
              type="text"
              id="item"
              placeholder="Ingresa el bien"
              className="border-gray-300"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>

          {/* Tipo de Bien */}
          <div className="grid gap-2">
            <Label htmlFor="itemType" className="text-gray-800">
              Tipo de Bien
            </Label>
            <Select>
              <SelectTrigger className="w-full border-gray-300">
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monitor" onClick={() => setItemType("Monitor")}>
                  Monitor
                </SelectItem>
                <SelectItem value="laptop" onClick={() => setItemType("Laptop")}>
                  Laptop
                </SelectItem>
                <SelectItem value="tablet" onClick={() => setItemType("Tablet")}>
                  Tablet
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Marca */}
          <div className="grid gap-2">
            <Label htmlFor="brand" className="text-gray-800">
              Marca
            </Label>
            <Select>
              <SelectTrigger className="w-full border-gray-300">
                <SelectValue placeholder="Selecciona una marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brandA" onClick={() => setBrand("Brand A")}>
                  Brand A
                </SelectItem>
                <SelectItem value="brandB" onClick={() => setBrand("Brand B")}>
                  Brand B
                </SelectItem>
                <SelectItem value="brandC" onClick={() => setBrand("Brand C")}>
                  Brand C
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Modelo */}
          <div className="grid gap-2">
            <Label htmlFor="model" className="text-gray-800">
              Modelo
            </Label>
            <Select>
              <SelectTrigger className="w-full border-gray-300">
                <SelectValue placeholder="Selecciona un modelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modelX" onClick={() => setModel("Model X")}>
                  Model X
                </SelectItem>
                <SelectItem value="modelY" onClick={() => setModel("Model Y")}>
                  Model Y
                </SelectItem>
                <SelectItem value="modelZ" onClick={() => setModel("Model Z")}>
                  Model Z
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Número de Serie */}
          <div className="grid gap-2">
            <Label htmlFor="serialNumber" className="text-gray-800">
              Número de Serie
            </Label>
            <Input
              type="text"
              id="serialNumber"
              placeholder="Ingresa número de serie"
              className="border-gray-300"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
            />
          </div>

          {/* Código */}
          <div className="grid gap-2">
            <Label htmlFor="code" className="text-gray-800">
              Código
            </Label>
            <Input
              type="text"
              id="code"
              placeholder="Ingresa el código"
              className="border-gray-300"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          {/* Propietario (Select) */}
          <div className="grid gap-2">
            <Label htmlFor="owner" className="text-gray-800">
              Propietario
            </Label>
            <Select>
              <SelectTrigger className="w-full border-gray-300">
                <SelectValue placeholder="Selecciona un propietario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="owner1" onClick={() => setOwner("Owner 1")}>
                  Owner 1
                </SelectItem>
                <SelectItem value="owner2" onClick={() => setOwner("Owner 2")}>
                  Owner 2
                </SelectItem>
                <SelectItem value="owner3" onClick={() => setOwner("Owner 3")}>
                  Owner 3
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Asignado a (Select) */}
          <div className="grid gap-2">
            <Label htmlFor="assignedTo" className="text-gray-800">
              Asignado a
            </Label>
            <Select>
              <SelectTrigger className="w-full border-gray-300">
                <SelectValue placeholder="Selecciona a quien se asigna" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user1" onClick={() => setAssignedTo("User 1")}>
                  User 1
                </SelectItem>
                <SelectItem value="user2" onClick={() => setAssignedTo("User 2")}>
                  User 2
                </SelectItem>
                <SelectItem value="user3" onClick={() => setAssignedTo("User 3")}>
                  User 3
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ubicación (Select) */}
          <div className="grid gap-2">
            <Label htmlFor="location" className="text-gray-800">
              Ubicación
            </Label>
            <Select>
              <SelectTrigger className="w-full border-gray-300">
                <SelectValue placeholder="Selecciona una ubicación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="location1" onClick={() => setLocation("Ubicación 1")}>
                  Ubicación 1
                </SelectItem>
                <SelectItem value="location2" onClick={() => setLocation("Ubicación 2")}>
                  Ubicación 2
                </SelectItem>
                <SelectItem value="location3" onClick={() => setLocation("Ubicación 3")}>
                  Ubicación 3
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

        

          {/* Botón Agregar */}
          <div className="flex justify-center mt-4">
            <Button type="button" className="bg-green-confirm" onClick={handleClick}>
              Agregar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
