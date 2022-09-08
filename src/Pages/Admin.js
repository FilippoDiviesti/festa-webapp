import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import QRCode from "react-qr-code";
import QRContainer from "../components/QRContainer";

function Admin () {

    let navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('token')){
            navigate('/login')
        }
        
        async function ciccio(){
            
            await axios.post("https://1elthz.deta.dev/checkAdminToken", {"token":sessionStorage.getItem("token")}).then(({data}) => {
                if(data['result'] == 'error'){
                    navigate('/login')
                }
            })
            
        }
        ciccio();

    }, [])

    return(
        <div>

        <Box component='form' sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            <QRContainer />
        </Box>

        </div>
    )
}

export default Admin;