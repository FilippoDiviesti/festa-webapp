import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import md5 from 'md5';
import Swal from 'sweetalert2'


function Register () {

    let navigate = useNavigate();  

    const registerFunc = async event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(data.get("password") == data.get("password2")){
            await axios.post("https://1elthz.deta.dev/addNewUser", {"nome":data.get("nome"), "cognome":data.get("cognome"), "password":md5(data.get("password"))}).then((res) => {
                if(res["data"]["result"] == "closed"){
                    closedError()
                }
                else if(res["data"]["result"] != "error"){
                    sessionStorage.setItem("token", res["data"]["result"]);
                    navigate("/profile");
                }
            });
        }else{
            passError();
        }
    }


    return(
    <div>

        <Box onSubmit={registerFunc} component='form' sx={{marginTop: '-6vh', display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            <h1 className="titolo"><strong>Festa</strong></h1>

            <div className="subtitolo">
                <p style={{fontWeight: 600, fontSize:'5vh'}}>Registrazione</p>
                <p style={{marginTop:'-3vh'}}>Registrati per ottenere il tuo QRCode e partecipare alla festa.</p>
            </div>

            <div className="box">
                <TextField name = 'nome' margin="normal" label="Nome" id="outlined-size-normal" defaultValue="" required />
                <TextField name = 'cognome' margin="normal" label="Cognome" id="outlined-size-normal" defaultValue="" required />
                <TextField name = 'password' margin="normal" label="Password" id="outlined-size-normal" defaultValue="" required type={'password'}/>
                <TextField name = 'password2' margin="normal" label="Conferma Password" id="outlined-size-normal" defaultValue="" required type={'password'}/>
                <Button style={{marginTop: '3vh'}} variant="outlined" type="submit">REGISTRATI</Button>
                <p id="subtit">Sei già registrato?   <a href="/login">Login</a></p>
            </div>
        </Box>

    </div>
    )
}

function passError(){
    Swal.fire({
        title:'LE PASSWORD NON COINCIDONO',
        icon:'error',
        showConfirmButton: false,
        timer:2000
    })
}

function closedError(){
    Swal.fire({
        title:'POSTI ESAURITI',
        icon:'error',
        showConfirmButton: false,
        timer:2000
    })
}

export default Register;