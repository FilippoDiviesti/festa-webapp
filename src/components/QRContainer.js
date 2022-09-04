import React, {Component} from "react";
import QrReader from 'react-qr-scanner';
import QRCode from "react-qr-code";
import Box from '@mui/material/Box';
import axios from 'axios';
import Button from '@mui/material/Button';


class QRContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            result:null, 
            nome:'*',
            cognome:'*',
            pagamento:0,
            last:''
        }
        this.handleScan = this.handleScan.bind(this)
    }
    handleScan(data){
        if(data && data['text']!=this.state.last){

            this.setState({
                result:data['text'],
                last:data['text']
            }, async () => {
                await axios.post("https://1elthz.deta.dev/getUserInfo", {"token":data['text']}).then(({data}) => {
                    this.setState({nome:data['result'][0], cognome:data['result'][1], pagamento:data['result'][2]})
                })
            })

        }
        
    }
    handleError(err){
        console.error(err);
    }
    render(){
        const previewstyle = {
            height:'40vh', wight:'40vw', display:'flex', justifyContent:'center'
        }
        const camStyle = {
            display:'flex', justifyContent:'center', marginTop:'-50px'
        }
        const textStyle = {
            fontSize:'30px', textAlign:'center', marginTop:'-50px'
        }
        return(
            <React.Fragment>
                <div style={camStyle}>
                    <QrReader delay = {100} style={previewstyle} onError = {this.handleError} onScan={this.handleScan} />
                </div>

                <div>

        <Box component='form' sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>

            
            {this.state.pagamento==0?<Button variant="outlined">APPROVA PAGAMENTO</Button>:'HA GIÀ PAGATO'}
            <Button variant="outlined">APPROVA ENTRATA</Button>

            <div className="code">
                <div className="codediv">
                    <div className="tit">
                        <p style={{fontSize:'20px'}}><strong>QR-CODE:</strong></p>
                    </div>
                    {this.state.result?<QRCode value={this.state.result}/>:''}
                </div>
            </div>
            <div className="info">
                <div className="subtit">
                    <p style={{fontSize:'20px'}}><strong>NOME:</strong>{this.state.nome}</p>
                </div>
                <div className="subtit">
                    <p style={{fontSize:'20px'}}><strong>COGNOME:</strong>{this.state.cognome}</p>
                </div>
                <div className="subtit">
                    <p style={{fontSize:'20px'}}><strong>STATO PAGAMENTO:</strong>{this.state.pagamento==0?'non pagato':'pagato'}</p>
                </div>
            </div>




        </Box>

        </div>
            </React.Fragment>
        )

    }
}

export default QRContainer;