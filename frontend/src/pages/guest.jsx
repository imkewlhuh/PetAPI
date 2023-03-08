import { Button, Box, Container } from "@chakra-ui/react";
import AllPetsButton from "../api/allPets.jsx";
import GetPetButton from "../api/getPet.jsx";
import GetSpeciesButton from "../api/getSpecies.jsx";

export default function Guest(props) {
    return (
        <Container textAlign={"center"}>
            <h1>Hello, Guest!</h1>
            <br />
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} >
                <AllPetsButton />
                <br />
                <GetPetButton />
                <br />
                <GetSpeciesButton />
                <br />
                <Button onClick={() => {props.logoutGuestUser()}} >Log Out</Button>
            </Box>
        </Container>
    )
}