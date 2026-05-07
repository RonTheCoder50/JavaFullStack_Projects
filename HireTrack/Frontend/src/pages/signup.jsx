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

import { Link } from "react-router"
import { useState } from "react"

import { loginAPI, signupAPI } from "@/API"

export default function SignupPage() {
    const [info, setInfo] = useState({username: '', password: ''});

    function handleUsername(e) {
        setInfo({
            ...info,
            username: e.target.value
        });
    }

    function handlePassword(e) {
        setInfo({
            ...info,
            password: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await signupAPI(info);
        console.log("server response: ", response.data);

        //now login for bearer token.
        const resp = await loginAPI(info);
        console.log("token", resp.data);
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
                <div className="space-y-2">
                    <Label>Username</Label>
                    <Input
                        type="text"
                        value={info.username}
                        onChange={handleUsername}
                        placeholder="jack123"
                    />
                </div>

                {/* <div className="space-y-2">
                <Label>Email</Label>
                <Input
                    type="email"
                    placeholder="m@example.com"
                />
                </div> */}

                <div className="space-y-2">
                    <Label>Password</Label>
                    <Input 
                        type="password"
                        value={info.password}
                        onChange={handlePassword} 
                    />
                </div>

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