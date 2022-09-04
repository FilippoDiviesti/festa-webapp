import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import md5 from 'md5';

function Register () {

    let navigate = useNavigate();  

    const registerFunc = async event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(data.get("password") == data.get("password2")){
            await axios.post("https://1elthz.deta.dev/addNewUser", {"nome":data.get("nome"), "cognome":data.get("cognome"), "password":md5(data.get("password"))}).then((res) => {
                if(res["data"]["result"] != "error"){
                    sessionStorage.setItem("token", res["data"]["result"]);
                    navigate("/profile");
                }
            });
        }else{
            alert('le password non coincidono');
        }
    }


    return(
    <div>

        <Box onSubmit={registerFunc} component='form' sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            <h1><strong>-- FESTA --</strong></h1>
            <p style={{fontSize:'20px'}}>Registrazione</p>
            <TextField name = 'nome' margin="normal" label="Nome" id="outlined-size-normal" defaultValue="" required />
            <TextField name = 'cognome' margin="normal" label="Cognome" id="outlined-size-normal" defaultValue="" required />
            <TextField name = 'password' margin="normal" label="Password" id="outlined-size-normal" defaultValue="" required type={'password'}/>
            <TextField name = 'password2' margin="normal" label="Conferma Password" id="outlined-size-normal" defaultValue="" required type={'password'}/>
            <Button variant="outlined" type="submit">REGISTRATI</Button>
            <p id="subtit">Sei già registrato?   <a href="/login">Login</a></p>
        </Box>

    </div>
    )
}

export default Register;