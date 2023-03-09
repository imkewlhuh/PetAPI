import axios from 'axios';
import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import PetList from '../components/petListing.jsx';

export default function AllPetsButton() {

    const [pets, setPets] = useState();
    const [showPets, setShowPets] = useState(false);

    const loadPets = async () => {
        const petsData = await axios.get(`${baseURL}/pets/`);

        console.log(petsData);

        if (petsData.status == 200) {
            setPets(petsData.data.pets);
            setShowPets(true);
            console.log("success");
        } else {
            console.log("Failed to fetch pets!")
        };
    };
    return (
        <>
            <Button onClick={() => {
                if (showPets == true) {setShowPets(false)} else {loadPets()}}}>View All Pets</Button>
            {showPets ? pets.map((pet) => <PetList {...pet} key={pet.id} />) : ""}
        </>
    )
}
