import './App.css';
import {Outlet} from "react-router-dom";
import Asside from "./components/asside/Asside";
import {useEffect, useState} from "react";
import {TestNavBar} from "./components/sidebar/TestNavBar";

function App() {
    // z-20 flex left-0  w-[70%] h-full flex-col gap-8 pt-2  bg-white    items-center border border-black fixed md:w-[40%]  lg:left-0 lg:w-[20%]
    return (
        <div>
            <TestNavBar/>
            <main className='flex flex-row'>
                <Asside/>
                <section className='main-container'>

                    <div className='w-full max-w-4xl'><Outlet/></div>
                </section>
            </main>
        </div>

    );
}

export default App;
