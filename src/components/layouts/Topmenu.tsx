/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-curly-brace-presence */ 
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'; 
import UnlockButton from '../ConnectWalletButton'

class Topmenu extends Component<any, any> {
  constructor(props: any) 
  {
    super(props);
    this.state = { 
        full_name:localStorage.getItem('local_set_full_name'), 
        valid_user: false,
        url_path: ""
    }  
  } 
  
  componentDidMount()
  {  
    console.log(window.location.pathname);
    
     this.setLogoutTimeFun();   
     if(localStorage.getItem("token")){ 
      this.setState({valid_user: true})  
    }
  } 

  componentDidUpdate(){
    // eslint-disable-next-line react/destructuring-assignment
    if(window.location.pathname !== this.state.url_path){ 
        this.setState({url_path: window.location.pathname})  
        this.setState({full_name: localStorage.getItem('local_set_full_name')}) 
     this.setLogoutTimeFun();  
        if(localStorage.getItem("token")){ 
            this.setState({valid_user: true})  
        }
        else{ 
          this.setState({valid_user: false})  
          localStorage.removeItem('token');
        } 
    }
  }
  
  setLogoutTimeFun() 
  { 
    if(localStorage.getItem('local_user_expire_time'))
    {
      const local_user_expire_time = new Date(localStorage.getItem("local_user_expire_time") || '{}');
      const local_present_time = new Date();
       
        if(local_present_time > local_user_expire_time)
        {   
            localStorage.setItem('alert_message', 'Login session expired, login to continue.');
            localStorage.removeItem('token');
            localStorage.removeItem('local_set_full_name');
            localStorage.removeItem('local_set_email_id');
            localStorage.removeItem('local_email_verify_status');
            localStorage.removeItem('local_user_login_time');
            localStorage.removeItem('local_user_expire_time');
            this.props.history.push('/auth/login');
        } 
    }
  } 

  logout(){
    localStorage.setItem('alert_message', 'We hope to see you soon!');
    localStorage.removeItem('token');
    localStorage.removeItem('local_set_full_name');
    localStorage.removeItem('local_set_email_id');
    localStorage.removeItem('local_email_verify_status');
    localStorage.removeItem('local_user_login_time');
    localStorage.removeItem('local_user_expire_time');
    localStorage.removeItem('local_set_user_name');
    localStorage.removeItem('reverify_sent_email_status');
    this.props.history.push('/auth/login');
  }
  
render()
{   
    return(
      <div id="Header_wrapper">
        <header id="Header">
          <div id="Action_bar">
            <div className="container">
              <div className="column one">
                <ul className="social">
                  <li key={'a1'}><a href="https://twitter.com/arranonetwork" target="_blank" rel="noreferrer"><i className="fa fa-twitter" aria-hidden="true" /></a></li>
                  <li key={'a2'}><a href="https://t.me/arranonetwork" target="_blank"><i className="fa fa-telegram" aria-hidden="true" /></a></li>
                  <li key={'a3'}><a href="https://medium.com/@Arrano" target="_blank"><i className="fa fa-medium" aria-hidden="true" /></a></li>
                  <li key={'a4'}><a href="https://www.reddit.com/user/ArranoNetwork" target="_blank"><i className="fa fa-reddit-alien" aria-hidden="true" /></a></li>
                </ul> 
              </div>
            </div>
          </div>
          <div className="header_placeholder" />
          <div id="Top_bar" style={{backgroundColor: "#222326 !important", position: "initial"}}>
            <div className="container">
              <div className="column one"> 
                <nav className="navbar navbar-expand-md bg-transparent navbar_top_menu navbar-dark">
                <Link className="navbar-brand" to="/"><img src="/assets/users/images/logo.png" alt="Logo" /></Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                  <span className="navbar-toggler-icon"></span>
                </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    {
                      this.state.valid_user ? 
                      <ul className="navbar-nav ml-auto">
                       <li className="nav-item">
                          <Link to="/"><span>Home</span></Link>
                       </li>
                       
                      <li>
                        <Link to="/"><span className="info_dot blink_me"></span><span>Swap ANDX</span></Link>
                      </li>  
 
                      <li className="nav-item" >
                          <Link to="/"><span>Bounty 2.0</span></Link>
                      </li>
                      
                      <li >
                        <Link to="/market"><span></span><span>Markets</span></Link>
                      </li>

                      

                      <li className="nav-item">
                        <Link to="/user/dashboard"><span> Dashboard</span></Link>
                      </li>
                      
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                        {this.state.full_name} 
                        </a>
                        <div className="dropdown-menu">
                          <Link className="dropdown-item" to="/user/profile"><span><i className="fa fa-user" aria-hidden="true"></i> Profile</span></Link>
                          <Link className="dropdown-item" to="/user/connections"><span><i className="fa fa-connectdevelop" aria-hidden="true"></i> Connections</span></Link>
                          <Link className="dropdown-item " to="/user/ano-funds"><span><i className="fas fa-coins"></i> ANO Funds</span></Link>
                          <Link className="dropdown-item" to="/user/rewards"><span><span><i className="fa fa-ticket" aria-hidden="true"></i> Rewards</span></span></Link>
                          <a className="dropdown-item" href="https://medium.com/@Arrano" target="_blank"><i className="fa fa-th" aria-hidden="true"></i> <span>Blog</span></a>
                          
                          <a className="dropdown-item" onClick={()=> this.logout()}><i className="fa fa-sign-out" aria-hidden="true"></i> <span>Logout</span></a>
                        </div>
                      </li>
                    </ul>
                      :
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item"> 
                            <Link to="/"><span>Home</span></Link>
                        </li>
                        <li>
                          <a href="https://arrano-auth.vercel.app/swap-andx"><span className="info_dot blink_me"></span><span>Swap ANDX</span></a>
                        </li>  
                        <li>
                          <Link to="/market" data-toggle="collapse" data-target="#collapsibleNavbar"><span></span><span>Markets</span></Link>
                        </li> 
                        <li className="nav-item">
                          <a href="https://arrano-auth.vercel.app/auth/login"><span>Login</span></a>
                        </li>
                        <li className="nav-item">
                          <a href="https://arrano-auth.vercel.app/register"><span>Register</span></a>
                      </li>
                      <li style={{paddingRight: '0'}}>
                        <UnlockButton />
                      </li>
                  </ul>
                }
              </div>
              </nav> 
              </div>
            </div>
            
          </div>
        </header>  
      </div> 
    )
  }
} 
export default withRouter(Topmenu)