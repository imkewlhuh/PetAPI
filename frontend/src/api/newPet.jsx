import axios from 'axios';
import { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Alert } from '@chakra-ui/react';

export default function NewPetButton() {
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [showMsg, setShowMsg] = useState(false);
    const [error, setError] = useState(false);

    const newPet = async () => {
        const pet = { name, species };

        if (pet.name === "" || pet.species === "") {
            console.log("Name and species required!");
            setError(true);
        } else {
            console.log(pet);
            const token = sessionStorage.getItem("token");

            await axios.post("http://localhost:8080/pets/new", pet, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
                console.log(res);

                if (res.status == 201) {
                    console.log("Pet added!");
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
                    setName("");
                    setSpecies("");
                };
            }}>Add New Pet!</Button>
            {showInput ?
                <>
                    <FormControl>
                        <FormLabel>Pet Name</FormLabel>
                        <Input onChange={(e) => setName(e.target.value.toLowerCase())} size={"sm"} type='text' id="petName" placeholder='Please enter your pet name' />
                        <FormLabel>Species</FormLabel>
                        <Input onChange={(e) => setSpecies(e.target.value.toLowerCase())} size={"sm"} type='text' id="petSpecies" placeholder='Please enter your pet species(ie: dog, cat, etc)' />
                        <br />
                        <Button onClick={newPet}>Add Pet</Button>
                    </FormControl>
                    {showMsg ?
                        error ?
                            <Alert status='error'>Failed to add!</Alert>
                            : <Alert status='success'>Pet successfully added!</Alert>
                        : ""
                    }
                </>
                : ""
            }

        </>
    )
}