/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React from 'react'
import { Link } from 'react-router-dom'
import MetaTags from 'react-meta-tags' 
import ContentLoader from "react-content-loader"; 
import Axios from 'axios'
import * as myConstClass from '../../../constants/Constants'

class Market extends React.Component<any, any> {

  constructor(props)
  {
    super(props);
    this.state = {      
        markets_list_data: [],
        exchanges_ids: myConstClass.exchange_list
    } 
  }

  componentDidMount()
  {   
    Axios.get("https://api.coingecko.com/api/v3/exchanges/binance")
    .then(response=>{     

      const markets_lists_data: any = [];
      const exchange_list : any = [];

      const {exchanges_ids} = this.state

      exchanges_ids.map((e)=>{ 
        response.data.tickers.map((item)=>{
          if(e.id === item.coin_id){
            if(exchange_list.indexOf(item.coin_id) === -1){ 
              const  obj = {id: e.id, symbol: e.symbol, image: e.image, volume: item.volume, last: item.last }  
              markets_lists_data.push(obj)  
              exchange_list.push(e.id)
            }
          }    
        })
      }) 
 
      this.setState({markets_list_data: markets_lists_data}) 
      
    })  
  }
  

  render()
  {
    const {markets_list_data } = this.state 
    return (
      <> 
      <div id="Content" className="markets_list_page">
      <MetaTags>
          <title>Markets - Decentralized Exchange | DEX </title>
          <link rel="canonical" href="https://arrano.network/" />
          <meta name="description" content=" Arrano Network is a powerful and user-friendly decentralized exchange developed by the Arrano Developers community. Arrano DEX..." />
          <meta name="keyword" content="Arrano Network, Arrano DEX, ANO Token, Arrano Tokens, Arrano DeFi, Arrano airdrop , ANO Defi token , Arrano Network Community , Arrano Launchpad, Arrano Exchange Arrano Defi Project , ANO governance token" />
          <meta property="og:title" content="Markets - Decentralized Exchange | DEX" />
          <meta property="og:image" content="/bsc_logo.png" />
        </MetaTags> 
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h4 className="mt-3 market_title">DeFi Tokens</h4>
                <p>Live market price and token details.</p>
              </div>
            </div>
            <div className="row">
            <div className="col-md-12">   
               
              <div className="row">
                {
                  markets_list_data.length > 0 ?
                  <>
                   { 
                     markets_list_data.map((item) => {
                      return <div className="col-md-3">
                      {/* eslint-disable-next-line prefer-template */}
                        <Link to={"/market/"+item.symbol.toUpperCase()}>
                          <div className="main_market_display">
                            <div className="media">
                              <div className="media-body">
                                <h4 style={{textTransform:"uppercase"}}>{item.symbol}</h4>
                                <h6>$ {item.last}</h6>
                                <p>Vol: {parseFloat(item.volume).toFixed(2)}</p>  
                              </div>
                              <img src={item.image} alt={item.symbol} className="ml-3" />
                            </div>
                          </div>
                        </Link>
                      </div>
                     }) 
                   }
                  </>
                  :
                  <>
                    <div className="row">
                <div className="col-md-3">
                  <div className="main_market_display">
                    <div className="media">
                      <div className="media-body">
                        <div className="row">
                          <div className="col-md-8">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="30%" height="10px" />
                              <rect x="0" y="15" rx="0" width="50%" height="20px" />
                              <rect x="0" y="40" rx="0" width="60%" height="10px" />
                            </ContentLoader>
                          </div>
                          <div className="col-md-4">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="100%" height="50px" />
                              
                            </ContentLoader>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="main_market_display">
                    <div className="media">
                      <div className="media-body">
                        <div className="row">
                          <div className="col-md-8">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="30%" height="10px" />
                              <rect x="0" y="15" rx="0" width="50%" height="20px" />
                              <rect x="0" y="40" rx="0" width="60%" height="10px" />
                            </ContentLoader>
                          </div>
                          <div className="col-md-4">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="100%" height="50px" />
                              
                            </ContentLoader>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="main_market_display">
                    <div className="media">
                      <div className="media-body">
                        <div className="row">
                          <div className="col-md-8">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="30%" height="10px" />
                              <rect x="0" y="15" rx="0" width="50%" height="20px" />
                              <rect x="0" y="40" rx="0" width="60%" height="10px" />
                            </ContentLoader>
                          </div>
                          <div className="col-md-4">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="100%" height="50px" />
                              
                            </ContentLoader>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="main_market_display">
                    <div className="media">
                      <div className="media-body">
                        <div className="row">
                          <div className="col-md-8">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="30%" height="10px" />
                              <rect x="0" y="15" rx="0" width="50%" height="20px" />
                              <rect x="0" y="40" rx="0" width="60%" height="10px" />
                            </ContentLoader>
                          </div>
                          <div className="col-md-4">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="100%" height="50px" />
                              
                            </ContentLoader>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <div className="main_market_display">
                    <div className="media">
                      <div className="media-body">
                        <div className="row">
                          <div className="col-md-8">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="30%" height="10px" />
                              <rect x="0" y="15" rx="0" width="50%" height="20px" />
                              <rect x="0" y="40" rx="0" width="60%" height="10px" />
                            </ContentLoader>
                          </div>
                          <div className="col-md-4">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="100%" height="50px" />
                              
                            </ContentLoader>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="main_market_display">
                    <div className="media">
                      <div className="media-body">
                        <div className="row">
                          <div className="col-md-8">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="30%" height="10px" />
                              <rect x="0" y="15" rx="0" width="50%" height="20px" />
                              <rect x="0" y="40" rx="0" width="60%" height="10px" />
                            </ContentLoader>
                          </div>
                          <div className="col-md-4">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="100%" height="50px" />
                              
                            </ContentLoader>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="main_market_display">
                    <div className="media">
                      <div className="media-body">
                        <div className="row">
                          <div className="col-md-8">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="30%" height="10px" />
                              <rect x="0" y="15" rx="0" width="50%" height="20px" />
                              <rect x="0" y="40" rx="0" width="60%" height="10px" />
                            </ContentLoader>
                          </div>
                          <div className="col-md-4">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="100%" height="50px" />
                              
                            </ContentLoader>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="main_market_display">
                    <div className="media">
                      <div className="media-body">
                        <div className="row">
                          <div className="col-md-8">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="30%" height="10px" />
                              <rect x="0" y="15" rx="0" width="50%" height="20px" />
                              <rect x="0" y="40" rx="0" width="60%" height="10px" />
                            </ContentLoader>
                          </div>
                          <div className="col-md-4">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="100%" height="50px" />
                              
                            </ContentLoader>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <div className="main_market_display">
                    <div className="media">
                      <div className="media-body">
                        <div className="row">
                          <div className="col-md-8">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="30%" height="10px" />
                              <rect x="0" y="15" rx="0" width="50%" height="20px" />
                              <rect x="0" y="40" rx="0" width="60%" height="10px" />
                            </ContentLoader>
                          </div>
                          <div className="col-md-4">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="100%" height="50px" />
                              
                            </ContentLoader>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="main_market_display">
                    <div className="media">
                      <div className="media-body">
                        <div className="row">
                          <div className="col-md-8">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="30%" height="10px" />
                              <rect x="0" y="15" rx="0" width="50%" height="20px" />
                              <rect x="0" y="40" rx="0" width="60%" height="10px" />
                            </ContentLoader>
                          </div>
                          <div className="col-md-4">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="100%" height="50px" />
                              
                            </ContentLoader>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="main_market_display">
                    <div className="media">
                      <div className="media-body">
                        <div className="row">
                          <div className="col-md-8">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="30%" height="10px" />
                              <rect x="0" y="15" rx="0" width="50%" height="20px" />
                              <rect x="0" y="40" rx="0" width="60%" height="10px" />
                            </ContentLoader>
                          </div>
                          <div className="col-md-4">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="100%" height="50px" />
                              
                            </ContentLoader>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="main_market_display">
                    <div className="media">
                      <div className="media-body">
                        <div className="row">
                          <div className="col-md-8">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="30%" height="10px" />
                              <rect x="0" y="15" rx="0" width="50%" height="20px" />
                              <rect x="0" y="40" rx="0" width="60%" height="10px" />
                            </ContentLoader>
                          </div>
                          <div className="col-md-4">
                            <ContentLoader speed={1}
                              backgroundColor="#ABB0B2" foregroundColor="#ecebeb"  className="content_rewards" width="100%" height="50px">
                              <rect x="0" y="0" rx="0" width="100%" height="50px" />
                              
                            </ContentLoader>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                  </>
                }
                
                
                
                </div>
              </div>
            </div>
          </div>
          </div>
        </>
    );
  }
}

export default Market;
