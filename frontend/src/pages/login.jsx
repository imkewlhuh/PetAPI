import { useState } from 'react';
import axios from 'axios';
import {
    Container, Button, FormControl, FormLabel,
    Input, InputGroup, InputRightElement,
    Alert
} from "@chakra-ui/react";
import { baseURL } from '../constants.js';

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const togglePass = () => setShow(!show);

    const handleLogin = async () => {

        const user = {
            username,
            password
        };

        console.log(user);

        await axios.post(`${baseURL}/auth/login`, user).then((res) => {
            console.log(res);

            if (res.status == 200) {
                console.log("logged in");
                sessionStorage.setItem("token", res.data.token);
                props.loginUser(username);
                setError(false);
            };
        }).catch(() =>
            setError(true)
        );
    };

    return (
        <Container>
            <h1>Login</h1>
            <br />
            <FormControl>
                <FormLabel>Username</FormLabel>
                <Input onChange={(e) => setUsername(e.target.value)} size={"lg"} type='text' id="username" placeholder='Please enter your username' />
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input onChange={(e) => setPassword(e.target.value)} size={"lg"} type={show ? 'text' : 'password'} id="password" placeholder='Please enter your password' />
                    <InputRightElement width={"4.5em"} height={"3em"} paddingEnd={"2"}>
                        <Button onClick={togglePass}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                {error ?
                    <>
                        <br />
                        <Alert status='error'>
                            Wrong username and/or password!
                        </Alert>
                    </> : ""
                }
                <br />
                <Button marginEnd={3} onClick={handleLogin} bgColor={"blue.200"}>Submit</Button>
                <Button marginEnd={3} bgColor={"blue.200"} onClick={() => props.signUp()}>Sign Up</Button>
                <Button onClick={() => { props.loginGuestUser() }} bgColor={"blue.200"}>Proceed as Guest</Button>
            </FormControl>
            <br />
        </Container>
    )
};