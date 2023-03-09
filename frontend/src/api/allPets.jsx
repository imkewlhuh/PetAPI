import axios from 'axios';
import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import PetList from '../components/petListing.jsx';

let baseURL = '';

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:8080';
} else {
  baseURL = 'https://petapi-production.up.railway.app';
}

export default function AllPetsButton() {
    axios.defaults.baseURL = baseURL;

    const [pets, setPets] = useState();
    const [showPets, setShowPets] = useState(false);

    const loadPets = async () => {
        const petsData = await axios.get("http://localhost:8080/pets/");

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
