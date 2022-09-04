import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import md5 from 'md5';


function Login () {

    if (sessionStorage.getItem("token")){
        sessionStorage.removeItem("token");
    }

    let navigate = useNavigate();  

    const loginFunc = async event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if(data.get("nome") == "admin" && data.get("cognome") == "admin" && md5(data.get("password")) == "de5ee4d060b1dee4c13424e2a75917c5"){
            sessionStorage.setItem("token", "de5ee4d060b1dee4c13424e2a75917c5");
            navigate("/admin");
        }
        else{
            await axios.post("https://1elthz.deta.dev/login", {"nome":data.get("nome"), "cognome":data.get("cognome"), "password":md5(data.get("password"))}).then((res) => {
                if(res["data"]["result"] != "error"){
                    sessionStorage.setItem("token", res["data"]["result"]);
                    navigate("/profile");
                }
                else{
                    alert("CREDENZIALI ERRATE");
                }
            });
        }
        
    }

    return(

        <div>

        <Box onSubmit={loginFunc} component='form' sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            <h1><strong>-- FESTA --</strong></h1>
            <p style={{fontSize:'20px'}}>Login</p>
            <TextField name = "nome" margin="normal" label="Nome" id="outlined-size-normal" defaultValue="" required />
            <TextField name = "cognome" margin="normal" label="Cognome" id="outlined-size-normal" defaultValue="" required />
            <TextField name = "password" margin="normal" label="Password" id="outlined-size-normal" defaultValue="" required type={'password'}/>
            <Button variant="outlined" type="submit">LOGIN</Button>
            <p id="subtit">Non sei registrato?   <a href="/register">Registrati</a></p>
        </Box>

    </div>
    )
}

export default Login;