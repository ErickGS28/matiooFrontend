import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

/**
 * SelectWithSearch - Un componente Select con funcionalidad de búsqueda
 * @param {Object} props - Propiedades del componente
 * @param {string} props.value - Valor seleccionado actualmente
 * @param {Function} props.onValueChange - Función a llamar cuando cambia el valor
 * @param {string} props.placeholder - Texto de placeholder para el select
 * @param {Array} props.items - Array de objetos con id y name para mostrar como opciones
 * @param {string} props.triggerClassName - Clases CSS para el trigger del select
 * @param {string} props.label - Etiqueta opcional para mostrar encima del select
 */
export function SelectWithSearch({ 
  value, 
  onValueChange, 
  placeholder, 
  items = [], 
  triggerClassName = "", 
  label = null 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [isOpen, setIsOpen] = useState(false);

  // Actualizar items filtrados cuando cambia la búsqueda o los items
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchQuery, items]);

  // Manejar apertura/cierre del select
  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) {
      // Limpiar búsqueda al cerrar
      setSearchQuery('');
    }
  };

  return (
    <div>
      {label && <div className="mb-1 text-sm font-medium text-gray-700">{label}</div>}
      <Select 
        value={value} 
        onValueChange={onValueChange}
        open={isOpen}
        onOpenChange={handleOpenChange}
      >
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <div className="px-2 py-2">
            <Input
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-2"
              onClick={(e) => e.stopPropagation()} // Evitar que se cierre el select al hacer clic en el input
            />
          </div>
          <div className="max-h-[200px] overflow-y-auto">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <SelectItem key={item.id} value={item.id.toString()}>
                  {item.name}
                </SelectItem>
              ))
            ) : (
              <div className="px-2 py-2 text-sm text-gray-500 text-center">
                No se encontraron resultados
              </div>
            )}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
}
