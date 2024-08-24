"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from  "next/image";

const Home = () => {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`https://sky-py.onrender.com/api/users`);
            // const response2 = await axios.get(`https://sky-py.onrender.com/cards`);
            setUserData(response.data);
            // setCardData(response2.data);
        
          } catch (error) {
            console.error("There was an error making a connection to the API:", error);
          }
        };
    
        fetchData();
      }, []);


    return (
        <div>

    <div className="flex flex-col justify-center items-center">
        <h1 className="font-semibold flex justify-center items-center mt-10 text-[3rem] mb-20">The Collector Dashboard</h1>

        <div>
            <Link href="/skycards">
                <Card className="w-[20vw] h-[50vh] flex items-center flex-col transition hover:text-zinc-400 hover:scale-[1.02]">
                    <h2 className="font-semibold text-[1.3rem] mt-7">Skycards</h2>
                    <p>Collect skycards from skylands!</p>
                    <p>Total cards pulled: {}</p>
                    
                </Card> 
            </Link>
        </div>
        
    </div>
    </div> );
}
 
export default Home;