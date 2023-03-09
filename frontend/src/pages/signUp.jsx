import { useState } from 'react';
import axios from 'axios';
import {
    Container, Button, FormControl, FormLabel,
    Input, InputGroup, InputRightElement,
    Alert
} from "@chakra-ui/react";
import { baseURL } from '../constants.js';

export default function SignUp(props) {
    const [newUser, setNewUser] = useState("");
    const [newPass, setNewPass] = useState("");
    const [show, setShow] = useState(false);
    const [showMsg, setShowMsg] = useState(false);
    const [error, setError] = useState(false);
    const togglePass = () => setShow(!show);

    const handleSignUp = async () => {
        if (newUser == "" || newPass == "") {
            console.log("Enter a new name and/or password!");
            setError(true);
        } else {
            const newAccount = {
                username: newUser,
                password: newPass
            };

            console.log(newAccount);

            await axios.post(`${baseURL}/auth/signup`, newAccount).then((res) => {
                console.log(res);

                if (res.status == 201) {
                    console.log("User created");
                    setShowMsg(true);
                    setError(false);
                };
            }).catch(() =>
                setError(true)
            );
        };
    };

    return (
        <Container>
            <h1>Sign Up</h1>
            <br />
            <FormControl>
                <FormLabel>New Username</FormLabel>
                <Input onChange={(e) => setNewUser(e.target.value)} size={"lg"} type='text' id="newUser" placeholder='Create your username' />
                <FormLabel>New Password</FormLabel>
                <InputGroup>
                    <Input onChange={(e) => setNewPass(e.target.value)} size={"lg"} type={show ? 'text' : 'password'} id="newPass" placeholder='Create your password' />
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
                            Invalid username and/or password!
                        </Alert>
                    </> : ""
                }
                <br />
                <Button marginEnd={3} onClick={handleSignUp} bgColor={"blue.200"}>Create Account</Button>
                <Button marginEnd={3} bgColor={"blue.200"} onClick={() => props.LogIn()}>Log In</Button>
                <Button onClick={() => { props.signInGuestUser() }} bgColor={"blue.200"}>Proceed as Guest</Button>
            </FormControl>
            <br />
            {showMsg ?
                error ? <Alert status='error'>Failed to create account. Something went wrong.</Alert>
                    : <Alert status='success'>Account successfully created! Proceed to login page.</Alert>
                : ""
            }
        </Container>
    )
};