import axios from 'axios';
import { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import PetList from '../components/petListing.jsx';
import { baseURL } from '../constants.js';

export default function UserPetsButton() {
    const [pets, setPets] = useState();
    const [showPets, setShowPets] = useState(false);

    const userPets = async () => {
        const token = sessionStorage.getItem("token");
        const petData = await axios.get(`${baseURL}/pets/user`, { headers: { Authorization: `Bearer ${token}` } });

        console.log(petData);

        if (petData.status == 200) {
            setPets(petData.data.pets);
            setShowPets(!showPets);
            console.log("success");
        } else {
            console.log("Failed to fetch pets!")
        };
    };
    return (
        <>
            <Button onClick={userPets}>View My Pets</Button>
            {showPets ?
                <Box display={"flex"} justifyContent={"space-evenly"} width={"100vw"}>
                    {pets.map((pet) => <PetList {...pet} key={pet.id} />)}
                </Box>
                : ""
            }
        </>
    )
}