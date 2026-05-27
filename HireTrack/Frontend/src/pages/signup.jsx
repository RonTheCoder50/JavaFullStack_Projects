import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { Link, useNavigate } from "react-router"
import { useState } from "react"

import { signupAPI } from "@/API"

export default function SignupPage() {
    const [info, setInfo] = useState({
        username: '',
        password: '', 
        email: ''
    });

    const navigate = useNavigate();

    function handleInput(e) {
        const {name, value} = e.target;
        setInfo(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        //signup + first login -> fetch to main page.
        const response = await signupAPI(info);
        if(response) {
            console.log("server response: ", response);

            localStorage.setItem("token", response.bearerToken);
            localStorage.setItem("user", JSON.stringify(response));

            navigate('/main');   
        } 
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Card className="w-[400px] shadow-xl">
            <CardHeader>
            <CardTitle className="text-2xl">Create Account</CardTitle>

            <CardDescription>
                Enter your details to create your account
            </CardDescription>
            </CardHeader>

            <CardContent>
            <form className="space-y-4">
                <InputComponent 
                    name={'Username'}
                    type={'text'}
                    value={info.username}
                    onChange={handleInput}
                    placeholder={'jack123'}
                />

                <InputComponent 
                    name={'Email'}
                    type={'email'}
                    value={info.email}
                    onChange={handleInput}
                    placeholder={'john123@gmail.com'}
                />

                <InputComponent 
                    name={'Password'}
                    type={'password'}
                    value={info.password}
                    onChange={handleInput}
                />

                <Button 
                    className="w-full"
                    onClick={(e) => handleSubmit(e)}
                >
                    Sign Up
                </Button>
                
                <div className="flex justify-center gap-6 items-center text-sm">
                    <p>already login ?</p>
                    <Link
                        to={'/login'}
                    >
                        <span className="text-blue-800 underline underline-offset-1">login</span>
                    </Link>
                </div>
            </form>
            </CardContent>
        </Card>
        </div>
    );
}

function InputComponent({ name, type, value, onChange, placeholder }) {
    return (
        <div className="space-y-2">
            <Label>{name}</Label>
                <Input
                    name={name.toLowerCase()}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
        </div>
    );
}