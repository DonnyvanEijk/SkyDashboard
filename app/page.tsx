"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [submittedUser, setSubmittedUser] = useState<string | null>(null);
  const [searchedCard, setSearchedCard] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://vft1uf-ip-178-85-159-52.tunnelmole.net/api/users `)
        setUserData(response.data);
        console.log(response.status);
      } catch (error) {
        console.error("There was an error making a connection to the API:", error);
      }
    };

    fetchData();
  }, []);

  const handleUserInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUser(event.target.value.trim().toLowerCase());
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedUser(selectedUser);
  };

  const filteredUserData = submittedUser ? userData.filter((user: any) => user.name.toLowerCase() === submittedUser) : [];

  const renderUserData = () => {
    if (filteredUserData.length === 0) {
      return (
        <div className='flex justify-center'>
          <p>No data found</p>
        </div>
      );
    }
  
    return filteredUserData.map((item: any, index: any) => (
      <div key={index} className="max-w-3xl mx-auto">
        <Card>
          <div className='p-4'>
            <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
            <p>
              Unique cards: {item.cardInventory.length}
            </p>
            <p>{item.count}</p>
          </div>
          <div className="flex justify-between p-4">
            <h3 className="text-xl font-bold mb-2">Inventory:</h3>
            <div className="text-xl font-bold">{item.SkyCoins} Skycoins🪙</div>
          </div>
          <ScrollArea className="w-full h-[20rem]">
            <ul className='p-5'>
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  value={searchedCard}
                  onChange={(e) => setSearchedCard(e.target.value)}
                  placeholder="Search card name"
                  className="flex-grow border p-2 rounded-l"
                />
                <button
                  type="button"
                  onClick={() => setSearchedCard('')}
                  className="bg-gray-300 text-gray-700 p-2 rounded-r"
                >
                  Clear
                </button>
              </div>
              {item.cardInventory
                .filter((inventoryItem: any) =>
                  inventoryItem.name.toLowerCase().includes(searchedCard.toLowerCase())
                )
                .map((inventoryItem: any, inventoryIndex: any) => (
                  <li className="flex items-center gap-5 p-3 border-b border-gray-300 last:border-b-0" key={inventoryIndex}>
                    <div className='lg:text-[1rem] flex gap-[8vw]'>
                      <div className='flex flex-col justify-center'>
                        <p>{inventoryItem.name}</p>
                        <p>{inventoryItem.value} Skycoins🪙</p>
                        <p>Amount: {inventoryItem.count}</p>
                      </div>
                      <div className='bg-zinc-800 p-4 rounded'>
                        <p>Health: {inventoryItem.health}</p>
                        <p>Strength: {inventoryItem.strength}</p>
                        <p>Defense: {inventoryItem.defense}</p>
                      </div>
                    </div>
                    <div className='flex flex-1 justify-end'>
                      {inventoryItem.photo && (
                        <img className="w-[6rem] lg:w-[8vw] rounded-lg" src={inventoryItem.photo} alt={inventoryItem.name} />
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </ScrollArea>
        </Card>
        <Separator />
      </div>
    ));
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h3 className="text-semibold text-2xl mt-10">Skycards Dashboard</h3>
      <form onSubmit={handleFormSubmit} className="mt-5 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
        <label htmlFor="user-input" className="sr-only">Enter a user name:</label>
        <div className="flex items-center">
          <input id="user-input" type="text" value={selectedUser} onChange={handleUserInputChange} className="flex-grow border p-2 rounded-l" placeholder="Enter a user name" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">Submit</button>
        </div>
      </form>
      <div className="mt-5 w-full">
        {renderUserData()}
      </div>
    </div>
  );
}



export default Home;
