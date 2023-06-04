import React from 'react';
import { Flowbite } from 'flowbite-react';

import Nav from './components/Nav';
import Overview from './components/Overview';



function App() {
  return (
    <div className='w-full h-[100vh] dark:bg-[#111926]'>
      <Flowbite>
        <Nav />
        <Overview />
    </Flowbite >
    </div>
  );
}

export default App;
