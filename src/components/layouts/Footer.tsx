import React from 'react';
import { Link } from 'react-router-dom';

  // eslint-disable-next-line react/prefer-stateless-function
class Footer extends React.Component { 

  render() { 
    return(
      <div>
        <footer id="Footer" className="clearfix">
          <div className="widgets_wrapper">
            <div className="section_wrapper mcb-section-inner">
              <div className="row footer_newsletter">
                <div className="col-md-4" />
                <div className="col-md-4" style={{textAlign: "center"}}>
                  <p>
                    <a href="https://arranonetwork.gitbook.io/arrano-network/" target="_blank" rel="noreferrer"><span><u style={{color: "white"}}>Gitbook</u></span></a>
                    <a href="https://arranonetwork.statuspage.io/" target="_blank" rel="noreferrer"><span><u style={{color: "white"}}>Status</u></span></a>
                    <Link to="/tokens"><span><u style={{color: "white"}}>About Tokens</u></span></Link>  
                  </p>
                </div>
              </div>
      
              <div className="row footer_newsletter" style={{display:"none"}}>
                <div className="col-md-4" />
                <div className="col-md-4">
                  <h5>Subscribe for latest news and updates.</h5>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="input-group mb-3">
                        <input type="text" className="form-control" value="" id="subscribe_id"  placeholder="Enter Email ID" readOnly/>
                        <button type="button">Subscribe</button>
                      </div>
                      <div id="error_subscribe" />
                      <div className="spinner-grow" role="status" id="subscribe_loader" style={{display: 'none'}}>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer_copy">
            <div className="container">
              <div className="column one">
                <div className="copyright">
                  <p>© 2021 Arrano Network, All rights reserved</p>
                </div>
              </div>
            </div>
          </div>
        </footer> 
      </div>
    )
  }
}

export default Footer;