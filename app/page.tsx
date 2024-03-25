"use client"
import { FaStar } from 'react-icons/fa'; // Import the star icon component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';


import { RiMagicLine } from 'react-icons/ri'; // Import the magic icon component
import { stringify } from 'querystring';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';




const Home = () => {
  const [userData, setUserData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [submittedUser, setSubmittedUser] = useState<string | null>(null);
  const [searchedCard, setSearchedCard] = useState('');
  const [showCardData, setShowCardData] = useState(false);
  const [sortType, setSortType] = useState(''); // Add sortType state
  const [isUsernameFilled, setIsUsernameFilled] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); 
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [isUserActive, setIsUserActive] = useState(false);


  const router = useRouter();

  const handleContactRedirect = () => {
    router.push('/contact');
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://sky-py.onrender.com/api/users`);
        const response2 = await axios.get(`https://sky-py.onrender.com/cards`);
        setUserData(response.data);
        setCardData(response2.data);
    
      } catch (error) {
        console.error("There was an error making a connection to the API:", error);
      }
    };

    fetchData();
  }, []);

  const handleUserInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUser(event.target.value.trim().toLowerCase());
    setIsUsernameFilled(!!event.target.value); // Update isUsernameFilled based on whether input value exists
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedUser(selectedUser);
    setShowCardData(false); // Reset showCardData state to hide card data
  };

  const handleShowCardData = () => {
    setShowCardData(prevState => !prevState);
  };
  const renderCardData = () => {
    if (!showCardData) return null;
  
    const filteredCards = cardData.filter((card: any) =>
      card.name.toLowerCase().includes(searchedCard.toLowerCase())
    );
  
    return (
      <div>
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
        <ScrollArea className='max-h-[30rem] overflow-y-auto rounded-[10px]  border-gray-700 border'>
          {filteredCards.map((card: any, index: any) => (
            <div key={index} className="p-4  rounded-md mb-4 shadow-md hover:shadow-lg transition duration-300">
              <div className="flex justify-between items-center mb-4">
                <div className=''>
                   <h3 className="text-lg font-semibold mb-2 bg-zinc-800 p-3 rounded">
                   {card.rarity === 'legendary' && <FaStar className="text-yellow-500 mb-3" />}
                  {card.rarity === 'dark' && <RiMagicLine className="text-purple-600" />}
                  {card.name} 
                  {card.quote && <h4 className='font-light'>{card.quote}</h4>}
                  
                </h3>
                <div className='font-light'>Rarity: {card.rarity == "dark" && <h3 className='bg-purple-800 rounded p-4'>Dark</h3>}  {card.rarity == "legendary" && <h3 className='bg-yellow-600 rounded p-4'>Legendary</h3>}   {card.rarity == "rare" && <h3 className='bg-cyan-800 rounded p-4'>Rare</h3>} {card.rarity == "uncommon" && <h3 className='bg-green-600 rounded p-4'>Uncommon</h3> }  {card.rarity == "common" && <h3 className='bg-zinc-600 rounded p-4'>Common</h3>} {card.rarity == "lightcore" && <h3 className='bg-gray-400 rounded p-4'></h3>} {card.rariry == "giants" && <h3 className='bg-orange-600 rounded p-4'>Giant</h3>} {card.rarity == "shop exclusive" && <h3 className='bg-purple-400 text-black rounded p-4'>Shop exclusive</h3>}</div>
                <div className='font-light p-2 relative left-[-0.5rem]'> Series: {card.game == "Spyros Adventure" && <h3 className='bg-cyan-700 p-4 rounded mt-4'>Spyros adventure</h3>} {card.game == "Giants" && <h3 className='bg-orange-500 p-4 rounded mt-4'>Giants</h3>} {card.game == "Swap Force" && <h3 className='bg-green-600 p-4 rounded mt-4'>Swap Force </h3>}  </div>
                </div>
               
                <div>
                    <div className='flex justify-center items-center'>
                        <img src={card.cardfront} alt={card.name} className="w-[7vw] object-cover rounded-[0.5rem]" />
                    </div>
              
                </div>
              </div>
    
             
              <p><strong>Health:</strong> {card.health}</p>
              <p><strong>Defense:</strong> {card.defense}</p>
              <p><strong>Strength:</strong> {card.strength}</p>

              <p className='mb-10'><strong>Value:</strong> {card.value}</p>
              <Separator/>
            </div>
          ))}
        </ScrollArea>
      </div>
    );
  };

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    if (!username || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }
    setIsEmailSending(true);
  
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the Content-Type header to application/json
        },
        body: JSON.stringify({  // Stringify the data object
          username: username,
          email: email,
          message: message,
        }),
      };
  
      // Make a POST request using fetch
      const response = await fetch('https://mgmgyk-ip-84-241-195-56.tunnelmole.net/api/sendEmail', requestOptions);
      const responseData = await response.json(); // Parse the response JSON
  
      if (response.ok) {
        console.log('Email sent successfully');
        console.log('Response from server:', responseData); // Log the response data from the server
        alert("Your message has been sent to the developer.");
        setIsEmailSending(false);
        // Clear the form fields after sending the message
        setUsername('');
        setEmail('');
        setMessage('');
      } else {
        console.error('Error sending email:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
  
  const renderUserData = () => {
    if (submittedUser && !showCardData) {
      const filteredUserData = userData.filter((user: any) => user.name.toLowerCase() === submittedUser);
  
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
                <div className="flex justify-end mb-4">
                  <label htmlFor="sort-select" className="mr-2">Sort by:</label>
                  <select
                    id="sort-select"
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                    className="border p-2 rounded"
                  >
                    <option value="">Default</option> {/* Default value */}
                    <option value="title">Name</option>
                  
                  </select>
                </div>
                {item.cardInventory
                  .slice() // Create a copy of the array to prevent mutating the original data
                  .sort((a: any, b: any) => {
                    if (sortType === 'title') {
                      return a.name.localeCompare(b.name);
                    } else if (sortType === 'rarity') {
                      return a.rarity.localeCompare(b.rarity);
                    } else {
                      // Default sort by action
                      return 0; // No sorting applied
                    }
                  })
                  .filter((inventoryItem: any) =>
                    inventoryItem.name.toLowerCase().includes(searchedCard.toLowerCase())
                  )
                  .map((inventoryItem: any, inventoryIndex: any) => (
                    <li className="flex items-center gap-5 p-3 border-b border-gray-300 last:border-b-0" key={inventoryIndex}>
                      <div className='lg:text-[1rem] flex gap-[8vw]'>
                        <div className='flex flex-col justify-center'>
                          
                         {inventoryItem.skylanderid && (
                              <p >Id: {inventoryItem.skylanderid} </p>
                          )}
                         
                          <p>
                  
                            {inventoryItem.name} 
                            {inventoryItem.name.toLowerCase().includes('legendary') && <FaStar className="text-yellow-500" />}
                            {inventoryItem.name.toLowerCase().includes('dark ') && <RiMagicLine className="text-purple-600" />}
                          </p>
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
    } else if (showCardData) {
      return (
        <div>
          <ul>
            {renderCardData()}
          </ul>
        </div>
      );
    }
};


  return (
    <div className="relative">
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h3 className="text-semibold text-2xl mt-10">Skycards Dashboard</h3>
        <form onSubmit={handleFormSubmit} className="mt-5 w-[100%] md:w-[70%] lg:w-1/2 xl:w-1/3">
          <label htmlFor="user-input" className="sr-only">Enter a user name:</label>
          <div className="flex items-center w-full">
            <input id="user-input" type="text" value={selectedUser} onChange={handleUserInputChange} className="flex-grow border p-2 rounded-l" placeholder="Enter a user name" />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">Submit</button>
            <button type="button" onClick={handleShowCardData} className="bg-green-500 text-white p-2 ml-2 rounded-md hover:bg-green-600 transition-all duration-300 w-[10rem]">All Cards</button>
          </div>
        </form>
        <div className="mt-5 w-full">
          {renderUserData()}
        </div>
      </div>


      {/* New form for contacting the developer */}
      <div className="absolute top-0 right-0 z-50 m-4 ">
        <Button onClick={handleContactRedirect}>Contact Developer</Button>
      </div>



    </div>
   
  );
}


export default Home;
