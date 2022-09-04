import React, {useEffect} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function Login () {

    let navigate = useNavigate();    

    useEffect(() => {
        if(sessionStorage.getItem("token") == 0){
            navigate("/login");
        }
    }, [])

    return(
        <div>

        <Box component='form' sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            BENTORNATO, PRONTO PER LA FESTA?
            <div className="code">
                CODICE:
            </div>
            <div className="info">
                NOME:
                COGNOME:
                STATO PAGAMENTO:
                DATA CREAZIONE ACCOUNT:
            </div>
        </Box>

        </div>
    )
}

export default Login;