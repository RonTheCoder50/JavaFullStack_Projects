import { Button } from "@/components/ui/button"

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Link, useNavigate } from "react-router"
import { useState } from "react"

import { userLoginAPI, userProfileAPI } from "./API"

export default function LoginPage() {
    const [info, setInfo] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    async function handleSubmit() {
        //api calls !
        try {
            const loginToken = await userLoginAPI(info); 
            const userInfo = await userProfileAPI(loginToken, info);

            const userData = {
                id: userInfo.id,
                username: userInfo.username,
                email: userInfo.email,
                password: userInfo.password,
                role: userInfo.role    
            }

            console.log("user: ", userData);
            localStorage.setItem('user', JSON.stringify(userData)); //user info store!
            localStorage.setItem('token', loginToken); //JWT token store!
            navigate('/dashboard');
        } catch(err) {
            console.log(err);
        }
            
        setInfo({
            name: '',
            email: '',
            password: ''
        });
    }

    function handleEmail(e) {
        setInfo({
            ...info,
            email: e.target.value
        });
    }

    function handlePassword(e) {
        setInfo({
            ...info,
            password: e.target.value
        });
    }

    return (
        <section className="w-full min-h-screen flex justify-center items-center bg-gray-100">
            <Card className="w-full max-w-sm shadow-lg">
                <CardHeader>
                    <CardTitle>
                        Login in to your account
                    </CardTitle>

                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>

                    <CardAction>
                        <Button variant="link">
                            <Link to={'/register'}>
                                Sign up
                            </Link>
                        </Button>
                    </CardAction>
                </CardHeader>

                <CardContent>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    onSmash={handleEmail}
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    onSmash={handlePassword}
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex-col gap-2">
                    <Button
                        type="submit"
                        className="w-full"
                        onClick={() => handleSubmit()}
                    >
                        Login
                    </Button>
                    <Button variant="outline" className="w-full">
                        Login with Google
                    </Button>
                </CardFooter>
            </Card>
        </section>
    );
}