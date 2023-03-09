import axios from 'axios';
import { useState } from 'react';
import { Alert, Button } from '@chakra-ui/react';
import { baseURL } from '../constants.js';

export default function DeleteAllButton() {
    const [showInput, setShowInput] = useState(false);
    const [showMsg, setShowMsg] = useState(false);
    const [error, setError] = useState(false);

    const deletePets = async () => {
        const token = sessionStorage.getItem("token");
        await axios.delete(`${baseURL}/pets/user`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            console.log(res);

            if (res.status == 200) {
                setError(false);
                console.log("pets successfully deleted");
            };
        }).catch(() => setError(true));

        setShowMsg(true);
    };

    return (
        <>
            <Button bgColor={"red.600"} onClick={() => {
                setShowInput(!showInput);
                setShowMsg(false);
            }}>Delete All Pets</Button>
            {showInput ?
                <>
                    <Alert status='error'>Are you sure you want to delete ALL of your pets?</Alert>
                    <Button bgColor={"red.600"} onClick={deletePets}>Yes, Delete</Button>
                    {showMsg ?
                        error ?
                            <Alert status='error'>Failed to delete! Something went wrong.</Alert>
                            : <Alert status='success'>Successfully deleted all pets.</Alert>
                        : ""
                    }
                </>
                : ""
            }
        </>
    )
}