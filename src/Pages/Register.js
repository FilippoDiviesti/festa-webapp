import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Register () {
    return(
    <div>

        <Box component='form' sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            <h1><strong>-- FESTA --</strong></h1>
            <p style={{fontSize:'20px'}}>Registrazione</p>
            <TextField margin="normal" label="Nome" id="outlined-size-normal" defaultValue="" required />
            <TextField margin="normal" label="Cognome" id="outlined-size-normal" defaultValue="" required />
            <TextField margin="normal" label="Password" id="outlined-size-normal" defaultValue="" required type={'password'}/>
            <TextField margin="normal" label="Conferma Password" id="outlined-size-normal" defaultValue="" required type={'password'}/>
            <Button variant="outlined" onClick={() => {
                alert('api call')
            }}>REGISTRATI</Button>
            <p id="subtit">Sei già registrato?   <a href="/login">Login</a></p>
        </Box>

    </div>
    )
}

export default Register;