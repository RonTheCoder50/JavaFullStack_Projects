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

import { Link } from "react-router"
import axios from "axios";
import { useNavigate } from "react-router"
import { useState } from "react"

export default function LoginPage() {
    const [info, setInfo] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    async function handleSubmit() {
        try {
            const resp = await axios.post('http://localhost:8080/auth/login', info); //gives bearer token
            if(resp.data === "bad404") {
                alert('wrong user-email or password, try again!');
                console.log(resp.data);
            }
            
            const userInfoAPI = await axios.get('http://localhost:8080/auth/profile', 
                {headers: {
                    authorization: `Bearer ${resp.data}`
                }}
            );

            const userData = {
                id: userInfoAPI.data.id,
                username: userInfoAPI.data.username,
                email: userInfoAPI.email,
                password: userInfoAPI.password,
                role: userInfoAPI.data.role    
            }
            console.log("user: ", userData);

            localStorage.setItem('user', JSON.stringify(userData)); //user info store!
            localStorage.setItem('token', resp.data); //JWT token store!
            navigate('/dashboard');
            
            setInfo({
                name: '',
                email: '',
                password: ''
            });
        } catch (err) {
            console.log("error: " + err);

            if (err.response && err.response.status === 401) {
                alert("Invalid email or password ❌");
            } else {
                alert("Something went wrong ⚠️");
            }
        }
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