import React, { useState, lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import Form from "./components/templates/login/Form";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RedirectIfAuthenticated from "./components/auth/RedirectIfAuthenticated";
import ResponsibleInCharge from "./components/templates/responsible/ResponsibleInCharge";

// Lazy load components
const Home = lazy(() => import("./components/templates/admin/Home"));
const Responsible = lazy(() => import("./components/templates/admin/Responsible"));
const Interns = lazy(() => import("./components/templates/admin/Interns"));
const ListItem = lazy(() => import("./components/templates/admin/ListItem"));
const CommonArea = lazy(() => import("./components/templates/admin/CommonArea"));
const ItemType = lazy(() => import("./components/templates/admin/ItemType"));
const Item = lazy(() => import("./components/templates/admin/Item"));
const Brand = lazy(() => import("./components/templates/admin/Brand"));
const Model = lazy(() => import("./components/templates/admin/Model"));
const CheckEmail = lazy(() => import("./components/templates/login/CheckEmail"));
const ConfirmCode = lazy(() => import("./components/templates/login/ConfirmCode"));
const NewPassword = lazy(() => import("./components/templates/login/NewPassword"));
const ResponsibleHome = lazy(() => import("./components/templates/responsible/responsibleHome"));
const InternHome = lazy(() => import("./components/templates/intern/InternHome"));
const ItemIntern = lazy(() => import("./components/templates/intern/ItemIntern"));

function App() {
  const [user, setUser] = useState(null);
  const [windowSizeValid, setWindowSizeValid] = useState(true);
  const minWidth = 800;
  const minHeight = 600;

  const checkWindowSize = () => {
    if (window.outerWidth < minWidth || window.outerHeight < minHeight) {
      setWindowSizeValid(false);
    } else {
      setWindowSizeValid(true);
    }
  };

  useEffect(() => {
    checkWindowSize(); // Verificar al iniciar

    window.addEventListener('resize', checkWindowSize);
    return () => window.removeEventListener('resize', checkWindowSize);
  }, []);

  if (!windowSizeValid) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#C5AEFF",
        }}
      >
        <h2>
          El tamaño de la ventana es demasiado pequeño. Por favor, redimensiona la ventana a un mínimo de {minWidth}px de ancho y {minHeight}px de alto.
        </h2>
      </div>
    );
  }

  return (
    <Router>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <div className="min-h-full">
          <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
          <div>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={
                  <RedirectIfAuthenticated>
                    <Form setUser={setUser} />
                  </RedirectIfAuthenticated>
                } />
                <Route path="/checkEmail" element={<CheckEmail user={user} />} />
                <Route path="/confirmCode" element={<ConfirmCode user={user} />} />
                <Route path="/newPassword" element={<NewPassword user={user} />} />

                {/* Rutas para ADMIN */}
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute allowedRoles="ADMIN">
                      <Home user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/responsible"
                  element={
                    <ProtectedRoute allowedRoles="ADMIN">
                      <Responsible user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/interns"
                  element={
                    <ProtectedRoute allowedRoles="ADMIN">
                      <Interns user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/listItem"
                  element={
                    <ProtectedRoute allowedRoles="ADMIN">
                      <ListItem user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/commonArea"
                  element={
                    <ProtectedRoute allowedRoles="ADMIN">
                      <CommonArea user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/itemType"
                  element={
                    <ProtectedRoute allowedRoles="ADMIN">
                      <ItemType user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/item"
                  element={
                    <ProtectedRoute allowedRoles="ADMIN">
                      <Item user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/brand"
                  element={
                    <ProtectedRoute allowedRoles="ADMIN">
                      <Brand user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/model"
                  element={
                    <ProtectedRoute allowedRoles="ADMIN">
                      <Model user={user} />
                    </ProtectedRoute>
                  }
                />

                {/* Rutas específicas para roles */}
                <Route
                  path="/responsibleHome"
                  element={
                    <ProtectedRoute allowedRoles="RESPONSIBLE">
                      <ResponsibleHome />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/responsibleInCharge"
                  element={
                    <ProtectedRoute allowedRoles="RESPONSIBLE">
                      <ResponsibleInCharge />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/internHome"
                  element={
                    <ProtectedRoute allowedRoles="INTERN">
                      <InternHome />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/itemIntern"
                  element={
                    <ProtectedRoute allowedRoles="INTERN">
                      <ItemIntern />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Suspense>
          </div>
        </div>
      </MantineProvider>
    </Router>
  );
}

export default App;
