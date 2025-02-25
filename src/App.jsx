import React from 'react';
import '@mantine/core/styles.css';
import { MantineProvider, Button, AngleSlider, Table } from '@mantine/core';
import './index.css';
import Demo from './Demo';
import Img from './Img';



function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <h1 className="text-3xl font-bold underline text-center text-blue-500 mb-0">
        Hello world!
      </h1>
      <div className="flex flex-col items-center justify-center mt-2">
        <Button>Hola, Mantine!</Button>
        <AngleSlider className='mt-5' aria-label="Angle slider" size={60} thumbSize={8} />
        <Demo /> 


       
      </div>
    </MantineProvider>
  );
}

export default App;
