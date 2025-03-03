import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Form } from "./components/Form";
import Home from "./components/Home";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <div className="flex items-center justify-center mt-5 min-h-screen">
          <div className="flex justify-center items-center shadow-lg h-auto p-12 w-lg">
            <Routes>
              <Route path="/" element={<Form setUser={setUser} />} />
              <Route path="/home" element={<Home user={user} />} />
            </Routes>
          </div>
        </div>
      </MantineProvider>
    </Router>
  );
}

export default App;
