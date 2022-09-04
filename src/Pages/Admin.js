import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import "../Styles/Admin.css";
import axios from 'axios';
import QRCode from "react-qr-code";
import QRContainer from "../components/QRContainer";

function Admin () {

    return(
        <div>

        <Box component='form' sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            <QRContainer />
        </Box>

        </div>
    )
}

export default Admin;