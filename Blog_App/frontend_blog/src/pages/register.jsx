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

import { userRegisterAPI, userLoginAPI } from "./API"

export default function RegisterPage() {
    const [info, setInfo] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    async function handleSubmit() {
        const data = await userRegisterAPI(info); //register api call
        const token = await userLoginAPI(info); //login api call
        localStorage.setItem('token', token); //storing jwt token on localStorage
        const userData = {
                id: data.id,
                username: data.username,
                email: info.email,
                password: info.password,
                role: data.role
        }

        localStorage.setItem('user', JSON.stringify(userData)); //storing login userdata locally
        navigate('/dashboard');
            
        setInfo({
            name: '',
            email: '',
            password: ''
        });
    }

    function handleName(e) {
        setInfo({
            ...info,
            username: e.target.value
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
                    <CardTitle>Sign up to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to sign up to your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">
                            <Link to={'/login'}>
                                Log in
                            </Link>
                        </Button>
                    </CardAction>
                </CardHeader>

                <CardContent>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor='text'>Name</Label>
                                <Input
                                    onSmash={handleName}
                                    type="text"
                                    placeholder="eg.John"
                                    value={info.username}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    onSmash={handleEmail}
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={info.email}
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
                                    onSmash={handlePassword}
                                    id="password"
                                    type="password"
                                    value={info.password}
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
                        Sign up
                    </Button>
                    <Button variant="outline" className="w-full">
                        Sign up with Google
                    </Button>
                </CardFooter>
            </Card>
        </section>
    );
}