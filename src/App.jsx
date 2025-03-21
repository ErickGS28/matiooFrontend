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

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <div className="min-h-full">
          <div>
            <Routes>
              <Route path="/" element={<Form setUser={setUser} />} />
              <Route path="/home" element={<Home user={user} />} />
              <Route path="/responsible" element={<Responsible user={user} />} />
              <Route path="/interns" element={<Interns user={user} />} />
              <Route path="/listItem" element={<ListItem user={user}/>} />
              <Route path="/commonArea" element={<CommonArea user={user}/>} />
              <Route path="/itemType" element={<ItemType user={user}/>} />
              <Route path="/item" element={<Item user={user}/>} />
              <Route path="/brand" element={<Brand user={user}/>} />
              <Route path="/model" element={<Model user={user}/>} />
              <Route path="/checkEmail" element={<CheckEmail user={user}/>} />
              <Route path="/confirmCode" element={<ConfirmCode user={user}/>} />
              <Route path="/newPassword" element={<NewPassword user={user}/>} />
              <Route path="/responsibleHome" element={<ResponsibleHome />} /> 

              
            </Routes>
          </div>
        </div>
      </MantineProvider>
    </Router>
  );
}

export default App;
