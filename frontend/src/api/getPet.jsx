import axios from 'axios';
import { useState } from 'react';
import {
    Button, FormControl, FormLabel, NumberInput,
    NumberInputField, Alert
} from '@chakra-ui/react';
import PetList from '../components/petListing.jsx';
import { baseURL } from '../constants.js';

export default function GetPetButton() {
    const [petId, setPetId] = useState();
    const [pet, setPet] = useState();
    const [showPet, setShowPet] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [error, setError] = useState(false);

    const getPet = async () => {

        await axios.get(`${baseURL}/pets/${petId}`).then((res) => {
            console.log(res);

            if (res.status == 200) {
                setPet(res.data.pet);
                setShowPet(true);
                setError(false);
                console.log("Retrieved pet.");
            };
        }).catch(() => setError(true));
        setShowPet(true);
    };


    return (
        <>
            <Button onClick={() => {
                setShowInput(!showInput);
                setShowPet(false);
                if (showInput == false) {
                    setPetId(null);
                }
            }}>Get Pet</Button>
            {showInput ?
                <>
                    <FormControl>
                        <FormLabel>Pet ID</FormLabel>
                        <NumberInput min={1}>
                            <NumberInputField onChange={(e) => setPetId(parseInt(e.target.value))} />
                        </NumberInput>
                        <br />
                        <Button onClick={getPet}>Fetch Pet</Button>
                    </FormControl>
                    {showPet ?
                        error ?
                            <Alert status='error'>Failed to find pet!</Alert>
                            : <PetList {...pet} />
                        : ""
                    }
                </>
                : ""
            }
        </>
    )
}