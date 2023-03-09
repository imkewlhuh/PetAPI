import axios from 'axios';
import { useState, useEffect } from 'react';
import {
    Button, FormControl, FormLabel, Alert,
    Select, 
} from '@chakra-ui/react';
import PetList from '../components/petListing.jsx';
import { baseURL } from '../constants.js';

export default function GetSpeciesButton() {
    const [species, setSpecies] = useState("");
    const [speciesList, setSpeciesList] = useState();
    const [pets, setPets] = useState();
    const [showSpecies, setShowSpecies] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getList() {
            const petsData = await axios.get(`${baseURL}/pets`);

            console.log(petsData);

            if (petsData.status == 200) {
                let allPets = petsData.data.pets;
                let allSpecies = [];
                
                allPets.forEach(pet => {
                    if (!allSpecies.includes(pet.species)) {
                        allSpecies.push(pet.species);
                    }
                });

                console.log(allSpecies);
                setSpeciesList(allSpecies);

                console.log("success");
            } else {
                console.log("Failed to fetch pets!")
            };
        }

        getList();
    }, [])

    const getSpecies = async () => {
        if (species == "") {
            setError(true);
            setShowSpecies(true);
            console.log("Choose a species!")
        } else {
            await axios.get(`http://localhost:8080/pets/species/${species}`).then((res) => {
                console.log(res);

                if (res.status == 200) {
                    setPets(res.data.pets);
                    setError(false);
                    console.log("Retrieved species!");
                };
            }).catch(() => setError(true));
            setShowSpecies(true);
        };
    };


    return (
        <>
            <Button onClick={() => {
                setShowInput(!showInput);
                setShowSpecies(false);
                if (showInput == false) {
                    setSpecies("");
                }
            }}>Get Species</Button>
            {showInput ?
                <>
                    <FormControl>
                        <FormLabel>Current Pet Species</FormLabel>
                        <Select onChange={(e) => setSpecies(e.target.value)} placeholder='Select species'>
                            {speciesList.map((species) =>
                                <option className='options' value={species}>{species}</option>
                            )}
                        </Select>
                        <br />
                        <Button onClick={getSpecies}>Fetch All</Button>
                    </FormControl>
                    {showSpecies ?
                        error ?
                            <Alert status='error'>Failed to find species!</Alert>
                            :
                            <>
                                {pets.map(pet => <PetList {...pet} key={pet.id} />)}
                            </>
                        : ""
                    }
                </>
                : ""
            }
        </>
    )
}