import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { loginAPI } from "@/API"
import PasswordInput from "@/components-project/passwordInp"
import { useTheme } from "./theme"

export default function LoginPage() {
    const { theme } = useTheme();
    const [info, setInfo] = useState({username: '', password: ''});

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
        setLoading(true);

        if(info.username.trim().length === 0 || 
            info.password.trim().length === 0
        ) {
            alert(`enter creaditials first!`);
            return;
        } 
        
        const response = await loginAPI(info);
        if(response?.data) {
            console.log("Login Success!");

            localStorage.setItem("token", response.data.bearerToken);  
            localStorage.setItem("user", JSON.stringify(response.data));

            navigate('/main');
            setLoading(false);
        }
    }

    return (
        <div 
            className={`
                flex
                min-h-screen 
                items-center 
                justify-center 
                ${theme === 'light'
                    ? 'bg-gray-100'
                    : 'bg-zinc-900'
                }
            `}
        >
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

                <div className="space-y-2">
                    <Label>Password</Label>
                    <PasswordInput 
                        value={info.password}
                        onChange={handlePassword}
                    />
                </div>

                <Button
                    disabled={loading}
                    className="w-full"
                    onClick={(e) => handleSubmit(e)}
                >
                    {
                        loading ? 'Wait...' : 'Login' 
                    }
                </Button>
            </form>
            </CardContent>
        </Card>
        </div>
    )
}