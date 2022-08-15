/* eslint-disable prefer-template */
/* eslint-disable no-console */
import React from 'react';
import { withRouter } from 'react-router-dom'; 

class Register extends React.Component<any, any> { 

    componentDidMount()
    {    
        console.log("https://arrano-auth.vercel.app"+window.location.pathname);
        
        window.location.replace("https://arrano-auth.vercel.app"+window.location.pathname)
    }

    render(){
        return(
                <></>
        )
    } 
}

export default withRouter(Register);