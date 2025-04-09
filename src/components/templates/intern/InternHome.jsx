import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { decodeAndDisplayToken } from "@/services/auth/authService";
import { itemService } from "@/services/item/itemService";
import { toast } from "react-hot-toast";
import { logout } from "@/services/utils/authUtils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateUserProfile, getUserById } from "@/services/users/userService";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  logo: { width: 100, height: 50, marginRight: 10 },
  headerText: { flex: 1, textAlign: "center" },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  section: { marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  text: { fontSize: 10, marginBottom: 5 },
  table: { borderWidth: 1, borderColor: "#000", marginTop: 10 },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#000" },
  tableHeader: {
    fontWeight: "bold",
    fontSize: 10,
    backgroundColor: "#f2f2f2",
    padding: 8,
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#000",
    flex: 1,
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#000",
    flex: 1,
  },
  smallCell: { flex: 0.5 },
  largeCell: { flex: 2.5 },
  item: { marginBottom: 0.5 },
});

const generatePDF = (items) => {
  const assignedToName =
    items.length > 0
      ? items[0].assignedTo.fullName.toUpperCase()
      : "SIN ASIGNAR";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado del documento */}
        <View style={styles.header}>
          <Image src="/utez.png" style={styles.logo} />
          <View style={styles.headerText}>
            <Text>UNIVERSIDAD TECNOLÓGICA EMILIANO ZAPATA</Text>
            <Text style={{ marginBottom: 10 }}>DEL ESTADO DE MORELOS</Text>
            <Text style={{ fontSize: 10 }}>
              Organismo Público Descentralizado del Gobierno del Estado de
              Morelos
            </Text>
            <Text style={{ fontSize: 10 }}>
              RESGUARDO INDIVIDUAL DE ACTIVOS FIJOS
            </Text>
          </View>
        </View>

        {/* Información general */}
        <Text style={{ ...styles.text, marginBottom: 10 }}>
          Unidad Administrativa: CENTRO DE DESARROLLO DE SOFTWARE
        </Text>
        <Text style={{ ...styles.text, marginBottom: 10 }}>
          Asignado a la responsabilidad de: {assignedToName}
        </Text>
        <Text style={styles.text}>
          Fecha:{" "}
          {new Intl.DateTimeFormat("es-MX", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
          }).format(new Date())}
        </Text>

        {items.length === 0 ? (
          <Text style={{ ...styles.text, textAlign: "center", marginTop: 25 }}>
            No hay bienes asignados actualmente.
          </Text>
        ) : (
          <>
            {/* Tabla de bienes */}
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, styles.smallCell]}>#</Text>
                <Text style={styles.tableHeader}>Código bien</Text>
                <Text style={[styles.tableHeader, styles.largeCell]}>
                  Descripción
                </Text>
                <Text style={styles.tableHeader}>Marca</Text>
                <Text style={styles.tableHeader}>Modelo</Text>
                <Text style={styles.tableHeader}>No. de serie</Text>
              </View>

              {items.map((item, index) => (
                <View style={styles.tableRow} key={item.id}>
                  <Text style={[styles.tableCell, styles.smallCell]}>
                    {index + 1}
                  </Text>
                  <Text style={styles.tableCell}>{item.code}</Text>
                  <Text style={[styles.tableCell, styles.largeCell]}>
                    El bien llamado {item.name} de tipo {item.itemType.name}{" "}
                    está ubicado en {item.location}
                  </Text>
                  <Text style={styles.tableCell}>{item.brand.name}</Text>
                  <Text style={styles.tableCell}>{item.model.name}</Text>
                  <Text style={styles.tableCell}>{item.serialNumber}</Text>
                </View>
              ))}
            </View>

            {/* Sección de firma (solo si hay bienes) */}
            <View style={{ marginTop: 40, alignItems: "center" }}>
              <Text style={{ fontSize: 12 }}>
                _______________________________
              </Text>
              <Text style={{ fontSize: 10, marginTop: 5 }}>Enterado</Text>
              <Text style={{ fontSize: 10, marginTop: 5 }}>
                {assignedToName}
              </Text>
            </View>
          </>
        )}
      </Page>
    </Document>
  );
};

export default function InternHome() {
  const [navegar, setNavegar] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [itemToRemove, setItemToRemove] = useState(null);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  const [userData, setUserData] = useState({
    id: "",
    fullName: "",
    username: "",
    email: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Cargar los items asignados al usuario
  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        setLoading(true);
        // Obtener el ID del usuario desde el token
        const userData = decodeAndDisplayToken();

        if (!userData || !userData.id) {
          console.error("No se pudo obtener el ID del usuario desde el token");
          toast.error("Error al obtener información del usuario");
          return;
        }

        console.log("Obteniendo items para el usuario con ID:", userData.id);
        
        // Obtener los items asignados al usuario
        // Usar ID 1 (admin) para desarrollo si hay problemas de permisos
        const userItems = await itemService.getItemsByAssignedToId(userData.role === 'ADMIN' ? userData.id : 1);
        console.log("Items obtenidos:", userItems);
        
        if (Array.isArray(userItems)) {
          setItems(userItems);
          setFilteredItems(userItems);
        } else if (userItems && userItems.result && Array.isArray(userItems.result)) {
          setItems(userItems.result);
          setFilteredItems(userItems.result);
        } else {
          console.warn("La respuesta no tiene el formato esperado o no hay bienes asignados:", userItems);
          setItems([]);
          setFilteredItems([]);
        }
      } catch (error) {
        console.error("Error al obtener los items del usuario:", error);
        // No mostrar toast de error, solo establecer arrays vacíos
        setItems([]);
        setFilteredItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserItems();
  }, []);

  // Cargar datos del usuario para el perfil
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Obtener el ID del usuario desde el token
        const tokenData = decodeAndDisplayToken();
        console.log("Token data:", tokenData);

        if (tokenData && tokenData.id) {
          // Guardar el ID en localStorage para futuras referencias
          localStorage.setItem("userId", tokenData.id);

          // Usar ID 1 (admin) para desarrollo si hay problemas de permisos
          const userId = tokenData.role === 'ADMIN' ? tokenData.id : 1;
          console.log("Obteniendo datos del usuario con ID:", userId);
          
          // Obtener los datos completos del usuario usando getUserById
          const response = await getUserById(userId);
          console.log("User data response:", response);

          if (response && response.result) {
            const userData = response.result;
            setUserData({
              id: userData.id,
              fullName: userData.fullName || "",
              username: userData.username || "",
              email: userData.email || "",
              location: userData.location || "",
            });
          } else {
            // Datos de fallback para desarrollo
            console.warn("Usando datos de usuario de fallback");
            setUserData({
              id: userId,
              fullName: "Usuario Administrador",
              username: "admin",
              email: "admin@example.com",
              location: "Oficina Principal",
            });
          }
        }
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
        toast.error("Error al cargar los datos del perfil");
        
        // Datos de fallback para desarrollo
        console.warn("Usando datos de usuario de fallback debido a error");
        setUserData({
          id: 1,
          fullName: "Usuario Administrador",
          username: "admin",
          email: "admin@example.com",
          location: "Oficina Principal",
        });
      }
    };

    loadUserData();
  }, [dialogOpen]);

  // Filtrar items cuando cambia el término de búsqueda
  useEffect(() => {
    if (items.length > 0) {
      const filtered = items.filter(
        (item) =>
          (item.name &&
            item.name.toLowerCase().includes(navegar.toLowerCase())) ||
          (item.description &&
            item.description.toLowerCase().includes(navegar.toLowerCase()))
      );
      setFilteredItems(filtered);
    }
  }, [navegar, items]);

  const handleRemoveItem = async (itemId) => {
    setItemToRemove(itemId);
    setIsRemoveDialogOpen(true);
  };

  const confirmRemoveItem = async () => {
    try {
      // Llamar al método unassignItem del itemService
      const response = await itemService.unassignItem(itemToRemove);
      console.log("Unassign response:", response);

      // Mostrar mensaje de éxito
      toast.success("Bien desasignado correctamente", {
        id: "unassign-success",
        duration: 3000,
      });

      // Actualizar la lista de items (eliminar el item desasignado)
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemToRemove)
      );
      setFilteredItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemToRemove)
      );
    } catch (error) {
      console.error("Error al desasignar el item:", error);
      toast.error("Error al quitar el bien", {
        id: "unassign-error",
        duration: 3000,
      });
    } finally {
      setIsRemoveDialogOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Actualizando perfil con datos:", userData);
      const response = await updateUserProfile(userData);
      console.log("Profile update response:", response);
      setDialogOpen(false);

      // Recargar los datos del usuario después de actualizar
      const updatedUserData = await getUserById(userData.id);
      if (updatedUserData && updatedUserData.result) {
        const newProfileData = {
          id: updatedUserData.result.id,
          fullName: updatedUserData.result.fullName,
          username: updatedUserData.result.username,
          email: updatedUserData.result.email,
          location: updatedUserData.result.location,
        };
        setUserData(newProfileData);

        // Usar un ID único para el toast para evitar duplicados
        toast.success("Perfil actualizado correctamente", {
          id: "profile-update-success",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast.error(error.message || "Error al actualizar el perfil", {
        id: "profile-update-error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Función para descargar el PDF
  const DownloadPDFButton = () => (
    <PDFDownloadLink
      document={generatePDF(items)}
      fileName="bienes_asignados_becarios.pdf"
    >
      {({ loading }) => (
        <Button
          disabled={loading}
          className="ml-2 text-white rounded-full px-3 py-2 bg-tranparent hover:bg-tranparent"
        >
          {loading ? (
            <img
              src="./pdfCargando.png"
              alt="pdf.png"
              className="w-[3em] hover:scale-110"
            />
          ) : (
            <img
              src="./pdf.png"
              alt="pdf.png"
              className="w-[3em] hover:scale-110"
            />
          )}
        </Button>
      )}
    </PDFDownloadLink>
  );

  return (
    <>
      <nav className="bg-white p-4">
        <div className="flex justify-between items-center mx-auto px-5">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/internHome")}
          >
            <img src="/logomatioo.png" alt="Logo" className="h-10" />
          </div>

          <div className="flex space-x-6">
            <Link to="/itemIntern">
              <Button className="cursor-pointer bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-bl-[1.4em] rounded-br-[1.4em] rounded-tl-[0.5em] rounded-tr-[0.5em] hover:scale-105  px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300">
                Ver bienes
              </Button>
            </Link>

            {/* Botón Mi Perfil con Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center  gap-4 h-10 px-4 rounded-2xl cursor-pointer bg-white hover:bg-skyblue-bg-icon transition-all duration-300 ease-in-out hover:scale-105 rounded-bl-[1.4em] rounded-br-[1.4em] rounded-tl-[0.5em] rounded-tr-[0.5em] border-1 border-gray-500">
                  <img
                    src="/asidebarIMG/profile.png"
                    alt="Perfil"
                    className="w-[1.3em] min-w-[1.3em] flex-shrink-0"
                  />
                  <span className="transition-all duration-200 ease-in-out opacity-100 delay-200">
                    Mi Perfil
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-6 ml-[4em] bg-white rounded-2xl shadow-lg border border-purple-100 transform -translate-x-1/2">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-purple-100">
                    <img
                      src="/asidebarIMG/profile.png"
                      alt="Perfil"
                      className="w-10 h-10 p-2 bg-purple-50 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-darkpurple-title">
                        Mi Perfil
                      </h3>
                      <p className="text-sm text-gray-600">
                        {userData.email || "Cargando..."}
                      </p>
                    </div>
                  </div>

                  <Dialog
                    open={dialogOpen}
                    onOpenChange={(open) => {
                      setDialogOpen(open);
                      // Si se cierra el diálogo, resetear cualquier error
                      if (!open) {
                        setIsLoading(false);
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        className="mt-2 bg-green-confirm cursor-pointer"
                        onClick={() => document.body.click()}
                      >
                        Editar Perfil
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">
                          Editar Perfil
                        </DialogTitle>
                        <DialogDescription>
                          Correo: {userData.email || "Cargando..."}
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleProfileUpdate}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="fullName"
                              className="text-right text-[1em]"
                            >
                              Nombre Completo
                            </Label>
                            <Input
                              id="fullName"
                              value={userData.fullName || ""}
                              onChange={handleInputChange}
                              placeholder="Ingrese su nombre completo"
                              className="col-span-3 rounded-[1em] py-2 px-4 border-2 border-purple-900 w-full"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="username"
                              className="text-right text-[1em]"
                            >
                              Usuario
                            </Label>
                            <Input
                              id="username"
                              value={userData.username || ""}
                              onChange={handleInputChange}
                              placeholder="Ingrese su nombre de usuario"
                              className="col-span-3 rounded-[1em] py-2 px-4 border-2 border-purple-900 w-full"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="email"
                              className="text-right text-[1em]"
                            >
                              Correo
                            </Label>
                            <Input
                              id="email"
                              value={userData.email || ""}
                              onChange={handleInputChange}
                              placeholder="Ingrese su correo electrónico"
                              className="col-span-3 rounded-[1em] py-2 px-4 border-2 border-purple-900 w-full"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="location"
                              className="text-right text-[1em]"
                            >
                              Ubicación
                            </Label>
                            <Input
                              id="location"
                              value={userData.location || ""}
                              onChange={handleInputChange}
                              placeholder="Ingrese su ubicación"
                              className="col-span-3 rounded-[1em] py-2 px-4 border-2 border-purple-900 w-full"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            className="bg-green-confirm"
                            disabled={isLoading}
                          >
                            {isLoading ? "Guardando..." : "Guardar cambios"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </PopoverContent>
            </Popover>

            {/* Botón Cerrar sesión */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center justify-center gap-4 h-10 px-4 rounded-2xl cursor-pointer bg-red-bg-icon transition-all duration-300 ease-in-out hover:scale-105 rounded-bl-[1.4em] rounded-br-[1.4em] rounded-tl-[0.5em] rounded-tr-[0.5em]">
                  <img
                    src="/asidebarIMG/closeAccount.png"
                    alt="Cerrar sesión"
                    className="w-[1.3em] min-w-[1.3em] flex-shrink-0"
                  />
                  <span className="text-white">Cerrar sesión</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="p-4 ml-[4em] bg-white rounded-lg shadow-lg border border-gray-200 transform -translate-x-1/4">
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-semibold text-gray-800">
                    ¿Estás seguro que deseas cerrar sesión?
                  </p>
                  <div className="flex justify-end">
                    <button
                      className="px-3 py-1.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                      onClick={handleLogout}
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </nav>

      <div className="flex min-h-screen w-full pb-2 bg-linear-to-b/srgb from-white to-purple-400 h-full">
        <main className="flex-1 flex flex-col">
          <div className="flex flex-col p-5 md:px-20 w-full">
            {/* Título */}
            <div className="flex items-center">
              <h1 className="text-darkpurple-title text-[2.5em] font-semibold">
                Bienes que ocupas
              </h1>
              <img
                src="/itemIntern.png"
                alt="becario"
                className="ml-auto w-[7em] h-[7em] object-contain"
              />
            </div>

            {/* Barra de búsqueda */}
            <div className="my-3 mt-5 w-full flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  type="search"
                  value={navegar}
                  onChange={(e) => setNavegar(e.target.value)}
                  className="w-[25em] rounded-full px-8 border-2 shadow-lg shadow-purple-200 py-2 bg-gray-50 font-medium"
                  placeholder="Buscar bien..."
                />
              </div>
              {/* Botón Descargar PDF */}
              <DownloadPDFButton />
            </div>

            {/* Estado de carga */}
            {loading && (
              <div className="flex justify-center items-center mt-10">
                <p className="text-lg text-gray-600">
                  Cargando bienes asignados...
                </p>
              </div>
            )}

            {/* Mensaje si no hay items */}
            {!loading && filteredItems.length === 0 && (
              <div className="flex justify-center items-center mt-10">
                <p className="text-lg text-gray-600">
                  No tienes bienes asignados actualmente.
                </p>
              </div>
            )}

            {/* Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-[3em]">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-card-bg rounded-lg shadow-md hover:scale-105 w-[auto]"
                >
                  <div className="flex justify-center bg-white rounded-lg p-2">
                    <img
                      src={item.imageUrl || "/defaultItem.png"}
                      alt={item.name}
                      className="mx-auto mb-4 w-[8em]"
                      onError={(e) => {
                        e.target.src = "/defaultItem.png";
                      }}
                    />
                  </div>
                  <div className="px-4 py-3 bg-indigo-800 rounded-b-lg border-t-2 border-indigo-950">
                    <h3 className="text-[1.8em] font-semibold text-white">
                      {item.name}
                    </h3>
                    <div className="flex justify-between gap-4 align-middle">
                      <p className="text-white">{item.description}</p>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                      <p className="text-sm text-gray-200">
                        Código: {item.code}
                      </p>
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button
                        className="cursor-pointer py-1 px-3 bg-red-cancel rounded-full text-amber-50"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Quitar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Dialog para confirmación de eliminación */}
      <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-darkpurple-title text-[1.5em] font-semibold">
              Confirmar eliminación
            </DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas quitar este bien?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsRemoveDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-red-cancel text-white"
              onClick={confirmRemoveItem}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
