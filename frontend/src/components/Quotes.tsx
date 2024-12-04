import { useState,useEffect } from "react";
export const Quotes = () => {
    const quotes = [
        "Believe in yourself and all that you are.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "The way to get started is to quit talking and begin doing.",
        "Your limitation—it's only your imagination.",
        "Push yourself, because no one else is going to do it for you.",
        "Great things never come from comfort zones.",
        "Dream it. Wish it. Do it.",
        "Success doesn’t just find you. You have to go out and get it.",
        "The harder you work for something, the greater you’ll feel when you achieve it.",
        "Dream bigger. Do bigger."
    ];

    const [quote,setQuote] = useState('');
    const getRandomQuote = () =>{
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    }
    useEffect(()=>{
        getRandomQuote();
    },[])
    
    return (
    <div className="bg-slate-200 h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className="max-w-lg">
                <div className="text-4xl font-bold">
                    {quote}
                </div>
                <div className=" max-w-md text-xl font-semibold mt-4">
                    Ankit Ghosh
                </div>
                <div className="max-w-md text-sm font-light text-slate-500">
                    CEO | World Corp
                </div>
            </div> 
        </div>
    </div>
    )
}