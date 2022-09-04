import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import "../Styles/Profile.css";
import axios from 'axios';
import QRCode from "react-qr-code";


function Profile () {

    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [pagamento, setPagamento] = useState(0);

    let navigate = useNavigate();    

    useEffect(() => {
        async function ciccio(){
            if(sessionStorage.getItem("token")){
                await axios.post("https://1elthz.deta.dev/getUserInfo", {"token":sessionStorage.getItem("token")}).then(({data}) => {
                setNome(data['result'][0]);
                setCognome(data['result'][1]);
                setPagamento(data['result'][2]);
            })
            }else{
            navigate("/login");
        }
            
        }
        ciccio();
    }, [])

    return(
        <div>

        <Box component='form' sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>

            <div className="tit">
                <h1>CIAO {nome}, PRONTO PER LA FESTA?</h1>
            </div>
            <div className="code">
                <div className="codediv">
                    <div className="tit">
                        <p style={{fontSize:'20px'}}><strong>QR-CODE:</strong></p>
                    </div>
                    {sessionStorage.getItem("token")?<QRCode value={sessionStorage.getItem("token")}/>:''}
                </div>
            </div>
            <div className="info">
                <div className="subtit">
                    <p style={{fontSize:'20px'}}><strong>NOME:</strong>{nome}</p>
                </div>
                <div className="subtit">
                    <p style={{fontSize:'20px'}}><strong>COGNOME:</strong>{cognome}</p>
                </div>
                <div className="subtit">
                    <p style={{fontSize:'20px'}}><strong>STATO PAGAMENTO:</strong>{pagamento==0?'non pagato':'pagato'}</p>
                </div>
            </div>
        </Box>

        </div>
    )
}

export default Profile;