import { SignupInput } from "@100xdevs/medium-common";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config";

export const Auth = ({type} : {type:"signup" | "signin"}) =>{
    const [postInputs,setPostInputs] = useState<SignupInput>({
        name:"",
        email:"",
        password:""
    })
    const navigate = useNavigate();
    async function sendRequest(){
        try{
            const response  = await axios.post(`${BACKEND_URL}/api/v1/user/${type=="signup" ? "signup" : "signin"}`,postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem('token',jwt);
            navigate("/blogs");
        }catch(e){
            alert("Error while signing up")
        }   

    }
    return(
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="">
                    <div className="text-4xl font-bold px-10">
                        {type=='signup' ? "Create an account" : "Log in your account"}
                    </div>
                    <div className="text-slate-400 text-xl text-center">
                        {type=="signup" ? "Already have an account?" : "Don't have an account?"}
                        <Link className="underline pl-2" to={type=="signup" ? "/signin" : "/signup"}>{type=='signup' ? 'Log In' : "Sign Up"}</Link>
                    </div>
                    {type=="signup" ? <LabelledInputs label="Username" placeholder="Enter your username" onChange={(e)=>{
                            setPostInputs({
                                ...postInputs,
                                name:e.target.value
                            })
                        }}/> : null}
                        <LabelledInputs label="Email" placeholder="dummy@gmail.com" onChange={(e)=>{
                             setPostInputs({
                                ...postInputs,
                                email:e.target.value
                            })
                        }}/>
                        <LabelledInputs label="Password" type="password" placeholder="" onChange={(e)=>{
                             setPostInputs({
                                ...postInputs,
                                password:e.target.value
                            })
                        }}/>
                        <button type="submit" onClick={sendRequest} className="text-white bg-blue-700 mt-4 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{type=="signin" ? "Sign In" : "Sign Up"}</button>

                </div>
               <div>
             
               </div>
            </div>         
        </div>
    )
}
interface labelInputType{
    label:string;
    placeholder:string;
    onChange:(e:any)=>void;
    type?:string
}
const LabelledInputs = ({label,placeholder,onChange,type} : labelInputType)=>{
    return(
        <div className="mt-4">
            <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    )
}