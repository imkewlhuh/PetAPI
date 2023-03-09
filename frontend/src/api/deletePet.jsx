import axios from 'axios';
import { useState } from 'react';
import {
    Button, FormControl, FormLabel, NumberInput,
    NumberInputField, Alert
} from '@chakra-ui/react';
import { baseURL } from '../constants.js';

export default function DeletePetButton() {
    const [petId, setPetId] = useState();
    const [showInput, setShowInput] = useState(false);
    const [showMsg, setShowMsg] = useState(false);
    const [error, setError] = useState(false);

    const deletePet = async () => {
        const token = sessionStorage.getItem("token");

        await axios.delete(`${baseURL}/pets/${petId}`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            console.log(res);

            if (res.status == 200) {
                console.log("Pet deleted!");
                console.log(deletePet);
                setError(false);
            };
        }).catch(() => setError(true));

        setShowMsg(true);
    };

    return (
        <>
            <Button bgColor={"red.600"} onClick={() => {
                setShowInput(!showInput);
                setShowMsg(false);
                if (showInput == false) {
                    setPetId(null);
                }    
            }}>Delete Pet</Button>
            {showInput ?
                <>
                    <FormControl>
                        <FormLabel>Pet ID</FormLabel>
                        <NumberInput min={1}>
                            <NumberInputField onChange={(e) => setPetId(parseInt(e.target.value))} />
                        </NumberInput>
                        <br />
                        <Alert status='error'>Are you sure you want to delete this pet?</Alert>
                        <Button bgColor={"red.600"} onClick={deletePet}>Yes, Delete Pet</Button>
                    </FormControl>
                    {showMsg ?
                        error ?
                            <Alert status='error'>Failed to delete!</Alert>
                            : <Alert status='success'>Successfully deleted pet.</Alert>
                        : ""
                    }
                </>
                : ""
            }
        </>
    )
}