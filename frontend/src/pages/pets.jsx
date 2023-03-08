import { Button, Box, Container } from "@chakra-ui/react";
import UserPetsButton from "../api/userPets.jsx";
import NewPetButton from "../api/newPet.jsx";
import UpdatePetButton from "../api/updatePet.jsx";
import DeleteAllButton from "../api/deleteAll.jsx";
import DeletePetButton from "../api/deletePet.jsx";

export default function UserPets(props) {
    return (
        <Container textAlign={'center'}>
            <h1>{props.name}'s Pets</h1>
            <br />
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} >
                <UserPetsButton />
                <br />
                <NewPetButton />
                <br />
                <UpdatePetButton />
                <br />
                <DeletePetButton />
                <br />
                <DeleteAllButton />
                <br />
                <Button onClick={() => {props.logoutUser()}} >Log Out</Button>
            </Box>
        </Container>
    )
}