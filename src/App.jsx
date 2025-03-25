import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Form from "./components/templates/login/Form";
import Home from "./components/templates/admin/Home";
import Responsible from "./components/templates/admin/Responsible";
import Interns from "./components/templates/admin/Interns";
import ListItem from "./components/templates/admin/ListItem";
import CommonArea from "./components/templates/admin/CommonArea";
import ItemType from "./components/templates/admin/ItemType";
import Item from "./components/templates/admin/Item";
import Brand from "./components/templates/admin/Brand";
import Model from "./components/templates/admin/Model";
import CheckEmail from "./components/templates/login/CheckEmail";
import ConfirmCode from "./components/templates/login/ConfirmCode";
import NewPassword from "./components/templates/login/NewPassword";
import ResponsibleHome from "./components/templates/responsible/responsibleHome";
import InternHome from "./components/templates/intern/InternHome";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ItemIntern from "./components/templates/intern/ItemIntern";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <div className="min-h-full">
          <div>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Form setUser={setUser} />} />
              <Route path="/checkEmail" element={<CheckEmail user={user}/>} />
              <Route path="/confirmCode" element={<ConfirmCode user={user}/>} />
              <Route path="/newPassword" element={<NewPassword user={user}/>} />
              
              {/* Admin only routes */}
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
                    <ListItem user={user}/>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/commonArea" 
                element={
                  <ProtectedRoute allowedRoles="ADMIN">
                    <CommonArea user={user}/>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/itemType" 
                element={
                  <ProtectedRoute allowedRoles="ADMIN">
                    <ItemType user={user}/>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/item" 
                element={
                  <ProtectedRoute allowedRoles="ADMIN">
                    <Item user={user}/>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/brand" 
                element={
                  <ProtectedRoute allowedRoles="ADMIN">
                    <Brand user={user}/>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/model" 
                element={
                  <ProtectedRoute allowedRoles="ADMIN">
                    <Model user={user}/>
                  </ProtectedRoute>
                } 
              />
              
              {/* Role-specific routes */}
              <Route 
                path="/responsibleHome" 
                element={
                  <ProtectedRoute allowedRoles="RESPONSIBLE">
                    <ResponsibleHome />
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
          </div>
        </div>
      </MantineProvider>
    </Router>
  );
}

export default App;
