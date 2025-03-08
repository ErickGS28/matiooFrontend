import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Form } from "./components/templates/Form";
import { Home } from "./components/templates/Home";
import Responsible from "./components/templates/Responsible";
import Interns from "./components/templates/Interns";


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
            </Routes>
          </div>
        </div>
      </MantineProvider>
    </Router>
  );
}

export default App;
