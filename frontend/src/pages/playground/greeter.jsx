import React, {useState} from "react";
import Layout from "../../templates/Layout";
import Head from 'next/head'
import Navbar from "../../components/Navbar/Navbar";
import ViewGreeting from "../../views/Greeter/ViewGreeting";
import InputGreeting from "../../views/Greeter/InputGreeting";

export const VIEW = {
    READ: 'READ',
    CREATE: 'CREATE'
};

export default function Greeter () {
    const [view, setView] = useState(VIEW.READ);

    const viewGreetingInput = () => setView(VIEW.CREATE);
    const viewReadGreeting = () => setView(VIEW.READ);

    return (
        <Layout>
            <Head>
                <title>Saying Hello!</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="bg-cyan-100 min-h-screen w-screen">
                <Navbar/>
                <div className="flex w-full pt-24 items-center justify-center">
                    {view === VIEW.READ && <ViewGreeting onChangeView={viewGreetingInput}/>}
                    {view === VIEW.CREATE && <InputGreeting onBack={viewReadGreeting} onChangeView={viewReadGreeting}/>}
                </div>
            </div>
        </Layout>
    )
}