import React, {useEffect} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import "../Styles/Profile.css";

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

            <div className="tit">
                <h1>BENTORNATO //nome, PRONTO PER LA FESTA?</h1>
            </div>
            <div className="code">
                <div>
                    <p style={{fontSize:'20px'}}><strong>CODICE:</strong></p>
                    qrcode
                </div>
            </div>
            <div className="info">
                <div className="subtit">
                    <p style={{fontSize:'20px'}}><strong>NOME:</strong></p>
                </div>
                <div className="subtit">
                    <p style={{fontSize:'20px'}}><strong>COGNOME:</strong></p>
                </div>
                <div className="subtit">
                    <p style={{fontSize:'20px'}}><strong>STATO PAGAMENTO:</strong></p>
                </div>
                <div className="subtit">
                    <p style={{fontSize:'20px'}}><strong>DATA CREAZIONE DELL'ACCOUNT:</strong></p>
                </div>
            </div>
        </Box>

        </div>
    )
}

export default Login;