"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from 'sonner'

const Email = () => {
    const router = useRouter();

    const handleContactRedirect = () => {
        router.push('/');
    };

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(''); 
    const [inquiryType, setInquiryType] = useState('');
    const [isEmailSending, setIsEmailSending] = useState(false);

    const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behavior
    
        if (!username || !email || !message || !inquiryType) {
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
                    inquiryType: inquiryType
                }),
            };
    
            // Make a POST request using fetch
            const response = await fetch('https://hgs97p-ip-109-36-137-231.tunnelmole.net/api/sendEmail', requestOptions);
            const responseData = await response.json(); // Parse the response JSON
    
            if (response.ok) {
                console.log('Email sent successfully');
                console.log('Response from server:', responseData); // Log the response data from the server
                toast('Email sent succesfully')
                setIsEmailSending(false);
                // Clear the form fields after sending the message
                setUsername('');
                setEmail('');
                setMessage('');
                setInquiryType('');
            } else {
                console.error('Error sending email:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };
      
    return (
        <div>
<Toaster />
       
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="max-w-md p-8 border rounded-lg shadow-lg bg-zinc-800">
                <h3 className="text-2xl mb-4">Contact Developer</h3>
                <form onSubmit={handleSendMessage} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block">Username:</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block">Message:</label>
                        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label htmlFor="inquiryType" className="block">Type:</label>
                        <select id="inquiryType" value={inquiryType} onChange={(e) => setInquiryType(e.target.value)} className="w-full border rounded-md px-3 py-2">
                            <option value="">Select an option</option>
                            <option value="Klacht">Klacht</option>
                            <option value="Compliment">Compliment</option>
                            <option value="Vraag">Vraag</option>
                            <option value="Anders">Anders</option>
                        </select>
                    </div>
                    <button type="submit" disabled={isEmailSending} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-300 disabled:bg-blue-800">
                       {isEmailSending ? "Sending..." : "Send Email"}
                    </button>
                </form>
            </div>
            <Button onClick={handleContactRedirect} className="mt-4">Back to Homepage</Button>
        </div>
        </div>
    );
}
 
export default Email;