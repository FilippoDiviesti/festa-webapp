import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import md5 from 'md5';
import Swal from 'sweetalert2'



function Login () {

    if (sessionStorage.getItem("token")){
        sessionStorage.removeItem("token");
    }

    let navigate = useNavigate();  

    const loginFunc = async event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        
        
        await axios.post("https://1elthz.deta.dev/login", {"nome":data.get("nome"), "cognome":data.get("cognome"), "password":md5(data.get("password"))}).then((res) => {
            if(res["data"]["result"] != "error"){
                sessionStorage.setItem("token", res["data"]["result"]);
                if(data.get("nome") == "admin" && data.get("cognome") == "admin"){
                    navigate("/admin");
                }
                else{
                    navigate("/profile");
                }
                
            }
            else{
                loginError();
            }
        });
        
        
    }

    return(

        <div>

            <Box onSubmit={loginFunc} component='form' sx={{marginTop: '-3vh' ,display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <h1 className="titolo"><strong>LED PARTY</strong></h1>

                <div className="subtitolo">
                    <p style={{fontWeight: 600, fontSize:'5vh'}}>Login</p>
                    <p style={{marginTop:'-3vh'}}>Accedi per visualizzare il QRCode e le informazioni del tuo profilo.</p>
                </div>

                <div className="box">
                    <TextField name = "nome" margin="normal" label="Nome" id="outlined-size-normal" defaultValue="" required />
                    <TextField name = "cognome" margin="normal" label="Cognome" id="outlined-size-normal" defaultValue="" required />
                    <TextField name = "password" margin="normal" label="Password" id="outlined-size-normal" defaultValue="" required type={'password'}/>
                    <Button style={{marginTop: '3vh'}} variant="outlined" type="submit">LOGIN</Button>
                    <p id="subtit">Non sei registrato?   <a href="/register">Registrati</a></p>
                </div>
            </Box>

        </div>
    )
}


function loginError(){
    Swal.fire({
        title:'CREDENZIALI ERRATE',
        icon:'error',
        showConfirmButton: false,
        timer:2000
    })
}


export default Login;