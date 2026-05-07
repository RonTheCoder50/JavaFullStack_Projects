import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { useState } from "react"
import { Link } from "react-router"
import { loginAPI } from "@/API"

export default function LoginPage() {
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
        const response = await loginAPI(info);
        console.log("server response: ", response === undefined ? 'no response | request failed' : response.data);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Card className="w-[400px] shadow-xl">
            <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
                Enter your email below to login
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
                        onChange={handlePassword} 
                        type="password" 
                    />
                </div>

                <Button className="w-full" onClick={(e) => handleSubmit(e)}>
                    Login
                </Button>
            </form>
            </CardContent>
        </Card>
        </div>
    )
}