import axios from 'axios';
import { useState } from 'react';
import {
    Button, FormControl, FormLabel, Input,
    NumberInput, NumberInputField, Alert
} from '@chakra-ui/react';
import { baseURL } from '../constants.js';

export default function UpdatePetButton() {
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [petId, setPetId] = useState();
    const [showInput, setShowInput] = useState(false);
    const [showMsg, setShowMsg] = useState(false);
    const [error, setError] = useState(false);

    const updatePet = async () => {
        const pet = { name, species };

        if (pet.name === "" || pet.species === "") {
            console.log("New name and species required!");
            setError(true);
        } else {
            console.log(pet);
            const token = sessionStorage.getItem("token");

            await axios.put(`${baseURL}/pets/${petId}`, pet, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
                console.log(res);

                if (res.status == 200) {
                    console.log("Pet updated!");
                    setError(false);
                };
            }).catch(() => setError(true));
        };

        setShowMsg(true);
    };

    return (
        <>
            <Button onClick={() => {
                setShowInput(!showInput);
                setShowMsg(false);
                if (showInput == false) {
                    setPetId(null);
                    setName("");
                    setSpecies("");
                }
            }}>Edit Pet</Button>
            {showInput ?
                <>
                    <FormControl>
                        <FormLabel>Pet ID</FormLabel>
                        <NumberInput min={1}>
                            <NumberInputField onChange={(e) => setPetId(parseInt(e.target.value))} />
                        </NumberInput>
                        <FormLabel>New Pet Name</FormLabel>
                        <Input onChange={(e) => setName(e.target.value.toLowerCase())} size={"sm"} type='text' id="newName" placeholder='Please enter your updated pet name' />
                        <FormLabel>New Species</FormLabel>
                        <Input onChange={(e) => setSpecies(e.target.value.toLowerCase())} size={"sm"} type='text' id="newSpecies" placeholder='Please enter your updated pet species(ie: dog, cat, etc)' />
                        <Button onClick={updatePet}>Edit Pet</Button>
                    </FormControl>
                    {showMsg ?
                        error ?
                            <Alert status='error'>Failed to update!</Alert>
                            : <Alert status='success'>Successfully updated pet.</Alert>
                        : ""
                    }
                </>
                : ""
            }
        </>
    )
}