/* eslint-disable prefer-template */
/* eslint-disable no-useless-concat */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/no-danger */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable block-scoped-var */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/*  eslint-disable-line prefer-template */
import React from 'react'; 
import Highcharts from 'highcharts'
import MetaTags from 'react-meta-tags'
import HighchartsReact from 'highcharts-react-official'
import NumberFormat from 'react-number-format'
import { Link, withRouter } from 'react-router-dom'; 
import Switch from "react-switch";
import * as myConstClass from '../../../constants/Constants';
import * as marketConstants from '../../../constants/market_details'; 
import Swap from '../../Swap/index';
import ConnectWalletButtonCoin from '../../../components/ConnectWalletButtonCoin'

const KEYS_TO_FILTERS = ['name', 'symbol']
class market_details extends React.Component<any, any>
{ 
    constructor (props: any) {  
    super(props);
   
    this.handleChange = this.handleChange.bind(this);
    this.state = {   
      isBNB: false,
      dxSale: "Pancake v2",
      tokenExchanges:marketConstants.tokenExchanges, 
      current_market_price: "",
      blockchainSite: [],   
      website_base_url:myConstClass.website_base_url,
      api_base_url:myConstClass.api_base_url,
      exchange_list:myConstClass.exchange_list,
      getMarketsDetails:"",      
      crytoCurrencySymbol:marketConstants.currency_object,   
      cryptoCurrencyLogo: "",
      getGraphData:"",
      graphDate: "1",
      tokenName:"",  
      get_symbols_data: "", 
      market_desc: "",
      search_contract_address: "",
      valid_search_address : false,
      tokenaddressconnected: localStorage.getItem("token_address"),
      connectedtokenlist: [],
      walletTokenUsdBal: 0,
      search_enable: false
    }

  }  

  componentDidMount()
  {  
    const {exchange_list} = this.state;
    for (let index = 0; index < exchange_list.length; index++) {
      if (exchange_list[index].symbol === window.location.pathname.substring(8).toLowerCase()) {
        this.setState({cryptoCurrencyLogo: exchange_list[index].image})
        break;
      }
    }

    const {tokenaddressconnected} = this.state
    this.getMarketsDetails();
    this.getGraphData(1);  
    this.getSymbolContents(); 
    this.getTokensList(tokenaddressconnected);
    console.log(localStorage.getItem("token_address"));
  }

  handleChange(isBNB) {
    const {dxSale} = this.state;
    this.getGraphData("", dxSale, isBNB)
    this.setState({ isBNB });
  }

  async handleDxSale(event) {
    var dxSaleplace = "";
    if (event.target.value === "PCSV1") {
      dxSaleplace = "Pancake"
    } else {
      dxSaleplace = "Pancake v2"
    }
    this.setState({dxSale: dxSaleplace});
    this.getGraphData("", dxSaleplace);
  }

  getGraphData(datetime: any, dxSalePlace = "", isBnbDisplay = undefined)
  { 
    if (datetime === "") {
      const {graphDate} = this.state;
      datetime = graphDate;
    }
    this.setState({graphDate: datetime})

    let symbolName: string
    let from_date: string | number | Date
    let to_date: string | number | Date

    const {crytoCurrencySymbol, first_token_symbol, dxSale, isBNB} = this.state  
     
    let first_token_symbols = window.location.pathname.substring(8);
    first_token_symbols = first_token_symbols.toLowerCase();
    if(crytoCurrencySymbol[first_token_symbols] !== 'undefined')
    {  
        symbolName = crytoCurrencySymbol[first_token_symbols];
 
        from_date = new Date();
        from_date =  from_date.setDate(from_date.getDate() - 1);
        from_date =  Date.parse((new Date(from_date)).toString())/1000;
        to_date = Date.parse((new Date()).toString())/1000;

        if(datetime === 1)
        {  
          from_date = new Date(); 
           from_date =  from_date.setDate(from_date.getDate() - 1);
           from_date =  Date.parse((new Date(from_date)).toString())/1000;
           to_date = Date.parse((new Date()).toString())/1000;
        }
        else if(datetime === 2)
        { 
          from_date = new Date(); 
           from_date =  from_date.setDate(from_date.getDate() - 7);
           from_date =  Date.parse(new Date(from_date).toString())/1000;
           to_date = Date.parse((new Date()).toString())/1000;
        }
        else if(datetime === 3)
        { 
           from_date = new Date();
           from_date =  from_date.setDate(from_date.getDate() - 20);
           from_date =  Date.parse((new Date(from_date).toString()))/1000;
           to_date = Date.parse((new Date()).toString())/1000;
        }

        const excPlace = (dxSalePlace === "") ? dxSale : dxSalePlace
        if (isBnbDisplay === undefined) {
          isBnbDisplay = isBNB;
        }
        /* alert(isBnbDisplay)
        alert(excPlace)
        alert(datetime) */
         
        /* eslint-disable-next-line prefer-template */
        fetch("https://api.coingecko.com/api/v3/coins/"+symbolName+"/market_chart/range?vs_currency="+((isBnbDisplay===false)?"usd":"bnb")+"&from="+from_date+"&to="+to_date, {
          method:'GET'
        }).then(res => res.json())
        .then(
          (result) => {
              this.setState({
                getGraphData:result.prices
              })
            
        });
    } 
    
  }


  getSingleTokenGraph() {

    const {tokenName,first_token_symbol, getGraphData, isBNB } = this.state
    
    const houroptions = {
      chart: {
        zoomType: 'x',
        height: '320',
        backgroundColor: '#2f3142',
        color: '#ffffff'
      },
    
          title: {
            
        /* eslint-disable-next-line prefer-template */
              text: this.Capitalize(tokenName)+" ("+window.location.pathname.substring(8)+")",
              align: 'left'
          },
    
          subtitle: {
            text: document.ontouchstart === undefined ?
              '' : ' '
          },
    
          tooltip: {
    
            fontStyle: "oblique",
            shadow: false,
            borderWidth: 0,
            backgroundColor: 'white',
            valueDecimals: 8
          },
    
          xAxis: {
            type: 'datetime',
            lineWidth: 1,
            minorGridLineWidth: 1,
            lineColor: '#ddd',
            labels: {
              enabled: true
            },
            minorTickLength: 1,
            tickLength: 0,
            gridLineWidth: 1,
            dateTimeLabelFormats: {
              day: "%e. %b",
              month: "%b '%y",
              year: "%Y"
            }
          },
    
          yAxis: {
            title: {
              text: ''
            },
            lineWidth: 1,
            minorGridLineWidth: 1,
            lineColor: 'transparent',
            labels: {
              enabled: true
            },
            minorTickLength: 1,
            tickLength: 0,
            gridLineWidth: 1,
          },
    
          colors: ['#fff'],
    
          legend: {
            enabled: false
          },
    
          plotOptions: {
    
            area: {
              fillColor: {
                linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1
                },
                stops: [
                  [0, '#ffffff'],
                  [1, '#ffffff']
                ]
              },
              marker: {
                radius: 0
              },
              lineWidth: 2,
              states: {
                hover: {
                  lineWidth: 2
                }
              },
              threshold: null
            }
          },
          
          series: [{
            name:'<strong>Price in ' + (isBNB ? 'BNB' : '$') +'</strong>',
            data: getGraphData
          }]
    }
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={houroptions}
      />
    )
  }

  
  
  getMarketsDetails()
  { 
     
    const {crytoCurrencySymbol, first_token_symbol, tokenExchanges, website_base_url} = this.state;

    const {history}=this.props 

    let symbolName: string
    let res2: any[]
    let res: string
    let createObj: { url?: any; name?: any; }
    let innerResult2: { base: any; image: any; identifier: any; market_name: any; last_price: any; volume: any; trust_score: any; bid_ask_spread_percentage: any; last_traded_at: any; trade_url: any; }[]
    let innnerResult: any[]
    let identifier: string | number
    let exchangeImage: string | undefined
    let first_token_symbols =  window.location.pathname.substring(8);
    first_token_symbols = first_token_symbols.toLowerCase();
    console.log(crytoCurrencySymbol[first_token_symbols])
    if(crytoCurrencySymbol[first_token_symbols] !== 'undefined')
    {  
      // console.log(crytoCurrencySymbol[first_token_symbols])
      //   symbolName = crytoCurrencySymbol[first_token_symbol]; 
      //   console.log(symbolName);
      //   console.log(crytoCurrencySymbol[first_token_symbol]);
        
        

        /* eslint-disable-next-line prefer-template */
        fetch("https://api.coingecko.com/api/v3/coins/"+crytoCurrencySymbol[first_token_symbols], {
          method:'GET'
        }).then(post => post.json())
        .then(
          (result) =>{  
            // this.setState({market_desc: result.description.en})
            
            if(!result.error)
            {  
              innnerResult = [] as  any;
              if(result.links.blockchain_site)
              {
               result.links.blockchain_site.map((item: string) => { 
                        if(item !== '')
                            { 
                              res = item.replace("https://", "");
                              res2 = res.split(".");
                              createObj = {};
                              createObj.url = item;
                              createObj.name = res2[0];
                              innnerResult.push(createObj)  
                            } 
                            return null
                }
                  );
              }

              innerResult2 = [] as  any;
              console.log(result.tickers)
              if(result.tickers)
              { 
                  result.tickers.map((item: any) => {
                    if(item.target === 'USD')
                    { 
                      identifier = item.market.identifier
                      exchangeImage = tokenExchanges[identifier]
                      if(exchangeImage === undefined)
                      { 
                        /* eslint-disable-next-line prefer-template */
                        exchangeImage = website_base_url+'assets/images/exchange.png';
                      }

                      const objCreate2 = {
                        base : item.base,
                        image : exchangeImage,
                        identifier : item.market.identifier,
                        market_name : item.market.name,
                        last_price : item.last,
                        volume : item.volume,
                        trust_score : item.trust_score,
                        bid_ask_spread_percentage : item.bid_ask_spread_percentage,
                        last_traded_at : item.last_traded_at,
                        trade_url : item.trade_url
                      }

                      // let objCreate2
                      // objCreate2.base = item.base
                      // objCreate2.image = exchangeImage
                      // objCreate2.identifier = item.market.identifier
                      // objCreate2.market_name = item.market.name
                      // objCreate2.last_price = item.last
                      // objCreate2.volume = item.volume
                      // objCreate2.trust_score = item.trust_score
                      // objCreate2.bid_ask_spread_percentage = item.bid_ask_spread_percentage
                      // objCreate2.last_traded_at = item.last_traded_at
                      // objCreate2.trade_url = item.trade_url
                      innerResult2.push(objCreate2)
                    }
                    return null
                  })
                
               
              }
              
              this.setState({
                getMarketsDetails:result,
                tokenName:result.id,
                blockchainSite:innnerResult,
                marketData:innerResult2,
                current_market_price:result.market_data.current_price.usd
              })
              
            }
            else
            {
              console.log(window.location.pathname);
              
            }
            return null
        });
    }
    else
    { 
              console.log(window.location.pathname);
    }
  }
    
getSymbolContents() 
{ 
  const { api_base_url} = this.state
  const data = {
    symbol: window.location.pathname.substring(8)
  };
  
        /* eslint-disable-next-line prefer-template */
  fetch(api_base_url+"/markets/symbol_contents", {
      method:'POST', 
      body:JSON.stringify(data)
    }).then(res => res.json())
    .then(
    (result) => {  
      if(result.status === true) 
      {
        this.setState({  get_symbols_data: result.alert_message  }) 
      }
  });
  
}

async getTokensList(wallet_address:any){  
  var query = `
      query{
        ethereum(network: bsc) {
        address(address: {is: `+ '"' + wallet_address + '"' + `}) {
          address
          balances(height: {lteq: 10814942}) {
            currency {
              symbol
              address
              name
              decimals
            }
            value
          }
        }             
      }
    }
      ` ;

    const url = "https://graphql.bitquery.io/";
    const opts = {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "BQYAxReidkpahNsBUrHdRYfjUs5Ng7lD"
    },
    body: JSON.stringify({
    query
    })
    };
    await fetch(url, opts)
    .then(res => res.json())
    .then(result => {
    result.data.ethereum.address[0].balances.map((item: any) => {

      if (item.currency.address === "-") {
        item.currency.address = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"
      }
      var dateSince = ((new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).toISOString())
      query = `
                            query
                            {
                              ethereum(network: bsc) {
                                dexTrades(
                                  date: {since: "` + dateSince + `"}
                                  any: [{baseCurrency: {is: `+ '"' + item.currency.address + '"' + `}, quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}}, {baseCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}, quoteCurrency: {is: "0xe9e7cea3dedca5984780bafc599bd69add087d56"}}]
                                  options: {desc: ["block.height"], limitBy: {each: "baseCurrency.symbol", limit: 1}}
                                ) {
                                  baseCurrency {
                                    symbol
                                  }
                                  block {
                                    height
                                  }
                                  transaction {
                                    index
                                  }
                            
                                  quoteCurrency {
                                    symbol
                                  }
                                  quote: quotePrice
                                }
                              }
                            }
                      ` ;

      const tokenBalOpts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "BQYAxReidkpahNsBUrHdRYfjUs5Ng7lD"
        },
        body: JSON.stringify({
          query
        })
      };

      fetch(url, tokenBalOpts)
        .then(tokenBalRes => tokenBalRes.json())
        .then(tokenBalResult => {
          if (item.currency.address === "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c") {
            item.quotePrice = tokenBalResult.data.ethereum.dexTrades[0].quote;
          } else {
            item.quotePrice = tokenBalResult.data.ethereum.dexTrades[0].quote * tokenBalResult.data.ethereum.dexTrades[1].quote;
          }
          this.setState({ connectedtokenlist: result.data.ethereum.address[0].balances })
          const { walletTokenUsdBal } = this.state

          this.setState({ walletTokenUsdBal: walletTokenUsdBal + item.quotePrice * item.value })
        })
        .catch(console.error);
      return null;
    })
    })
    .catch(console.error);

}


blockchainSite()
{ 
  let res: string
  let res2: any[] 
  let createObj: { url?: any; name?: any; }
  const result = [] as  any;

  const {getMarketsDetails} = this.state
  
   if(getMarketsDetails)
   {
    getMarketsDetails.links.blockchain_site.map((item: string) => { 
      res = item.replace("https://", "")
      res2 = res.split(".")
      createObj = {}
      createObj.url = item;
      createObj.name = res2[0];
      result.push(createObj); 
      return null;
    });
   }

   this.setState({
    blockchainSite:result
   }); 
}   

  convertvalue(labelValue: any) {
    return Math.abs(Number(labelValue)) >= 1.0e+9

        /* eslint-disable-next-line prefer-template */
    ? Math.trunc(Math.abs(Number(labelValue)) / 1.0e+9*100)/100 + "B"

    : Math.abs(Number(labelValue)) >= 1.0e+6 
    
        /* eslint-disable-next-line prefer-template */
    ? Math.trunc(Math.abs(Number(labelValue)) / 1.0e+6*100)/100 + "M"

    : Math.abs(Number(labelValue)) >= 1.0e+3

        /* eslint-disable-next-line prefer-template */
    ? Math.trunc(Math.abs(Number(labelValue)) / 1.0e+3*100)/100 + "K"

    : Math.abs(Number(labelValue));

}

  Capitalize(str: string){
     return str.charAt(0).toUpperCase() + str.slice(1);
  }

  OnContractSearch(){
    console.log(localStorage.getItem("token_address")); 

    const {history}=this.props 

    
    this.setState({valid_search_address: false})

    const {search_contract_address,valid_search_address} = this.state

    if(search_contract_address){
        console.log(search_contract_address); 
       history.push('/market/bsc/'+search_contract_address);

    }
    else{ 
      this.setState({valid_search_address: true})
    }
  }
    
 
  render()
  {
    const {   
      tokenExchanges,
      current_market_price,
      blockchainSite,   
      website_base_url,
      api_base_url, 
      exchange_list,
      getMarketsDetails,      
      crytoCurrencySymbol,   
      cryptoCurrencyLogo,
      getGraphData,
      tokenName,  
      marketData,
      get_symbols_data, market_desc, search_contract_address,search_enable, valid_search_address, tokenaddressconnected, connectedtokenlist, walletTokenUsdBal, isBNB, dxSale} = this.state

    
    return (
      <div id="Content" className="market_detail_page" style={{background: '#e9edf2'}}>
         <MetaTags>
          <title> {(window.location.pathname.substring(8))} 
           (${
          getMarketsDetails 
          ?
          getMarketsDetails.market_data.current_price.usd
          :
          null
          }) | Arrano.network </title>
          <link rel="canonical" href="https://arrano.network/" />
          {
              get_symbols_data ?
              <>
                 <meta name="description" content={get_symbols_data.meta_description} />
                  <meta name="keyword" content={get_symbols_data.meta_keywords} />
              </>
              :
              null
          }

           {/* eslint-disable-next-line prefer-template  */}
          <meta property="og:title" content={current_market_price+' | Arrano.network'} />
          <meta property="og:image" content="/bsc_logo.png" />
        </MetaTags>
        
         
        <div className="container-fluid">
          
        <div className="main_block_elements_mobile">
            
                
            <div className="market_values market_details_top">
              <div className="row">
                <div className="col-md-12">
                {
            getMarketsDetails 
            ?
                  <div className="row">
                    <div className="col-md-4 col-12">
                      {
                        search_enable
                        ?
                        <div className="search_element_block">
                         <div className="search_close_fun"><i  onClick={() => this.setState({search_enable: false})} className="fas fa-times"/></div>
                         <div className="input-group">
                           <input type="text" className="form-control" value={search_contract_address} onChange={(e)=> this.setState({search_contract_address: e.target.value})} placeholder="Search by Contract Address" />
                           <div className="input-group-append">
                             <span className="input-group-text" onClick={()=> this.OnContractSearch()}><i className="fas fa-search" /></span>
                           </div>
                         </div> 
                       </div> 
                       :
                       null 
                      }
                      <div className="market_values market_tokens_details">
                        <div className="media">
                          <img src="/bsc_logo.png" alt="John Doe" className="mr-3 rounded-circle" />
                          <div className="media-body">
                            <div className="row">
                              <div className="col-8">
                                <h4 style={{ textTransform:"capitalize" }}>{getMarketsDetails.id}
                                  {
                                  getMarketsDetails.market_data.price_change_percentage_24h >= 0 ?
                                  <span className="positive_growth blink_me main_coin_percent">1h {getMarketsDetails.market_data.price_change_percentage_24h.toFixed(2)}%</span>
                                  :
                                  <span className="negative_growth blink_me main_coin_percent">1h {getMarketsDetails.market_data.price_change_percentage_24h.toFixed(2)}%</span>
                                  }
                                </h4>
                                <h5><NumberFormat value={getMarketsDetails.market_data.current_price.usd } displayType='text' thousandSeparator="," prefix='$'  data-enable-time/></h5>
                              </div>

                              <div className="col-4">
                                <div className="input-group token_address_search">
                                  <div className="input-group-append">
                                    <span className="input-group-text" onClick={() => this.setState({search_enable: true})}><i className="fas fa-search" /></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                              
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-8">
                      <ul className="coin_block_quick_details coin_details_link_view">
                        <li className="volume_24h_quick">
                          <h4>24 Hour Trading Vol</h4>
                          <h5>{this.convertvalue(getMarketsDetails.market_data.total_volume.usd)}</h5>
                        </li>

                        <li className="liquidity_24h_quick">
                          <h4>Market Cap</h4>
                          <h5>{this.convertvalue(getMarketsDetails.market_data.market_cap.usd)}</h5>
                        </li>

                        <li className="marketcap_24h_quick">
                          <h4>24h Low-24h High</h4>
                          <h5>${this.convertvalue(getMarketsDetails.market_data.low_24h.usd)} - {this.convertvalue(getMarketsDetails.market_data.high_24h.usd)}</h5>
                        </li>
                      </ul>
                    </div>                      
                  </div>
                  :
                  null
                }
                </div>
              </div>
            </div>

            {/* <div className="row">
              <div className="col-md-12 text-center">
                <div className="market_values market_details_top">
                  <div className="input-group">
                    <input type="text" className="form-control" value={search_contract_address} onChange={(e)=> this.setState({search_contract_address: e.target.value})} placeholder="Search by Contract Address" />
                    <div className="input-group-append">
                      <span className="input-group-text" onClick={()=> this.OnContractSearch()}><i className="fas fa-search" /></span>
                    </div>
                  </div>
                  <p>{valid_search_address && "Enter valid contract address"}</p>
                </div>
              </div>
            </div> */}

            <div className="chart_main">
                <div id="tooltip" />
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#home" onClick={() => { this.getGraphData(1) }}>24H</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#home" onClick={() => { this.getGraphData(2) }}>1W</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#home" onClick={() => { this.getGraphData(3) }}>1M</a>
                  </li>
                </ul>

                <div className="tab-content">
                  <div className="tab-pane active" id="home">
                    {this.getSingleTokenGraph()}
                  </div>
                </div>
              </div>
          </div>



          {/* {
            getMarketsDetails 
            ?

            <div className="row">
              <div className="col-md-3">
                <div className="market_values market_tokens_details">
                  <div className="media">
                    <img src="/favicon.png" alt="John Doe" className="mr-3 rounded-circle" />
                    <div className="media-body">
                      <h4 style={{ textTransform:"capitalize" }}>{getMarketsDetails.id}</h4>
                      <h5><NumberFormat value={getMarketsDetails.market_data.current_price.usd } displayType='text' thousandSeparator="," prefix='$'  data-enable-time/>
                        {
                          getMarketsDetails.market_data.price_change_percentage_24h >= 0 ?
                          <span className="positive_growth blink_me"><i className="fas fa-caret-up"/> {getMarketsDetails.market_data.price_change_percentage_24h.toFixed(2)}%</span>
                          :
                          <span className="negative_growth blink_me"><i className="fas fa-caret-down"/> {getMarketsDetails.market_data.price_change_percentage_24h.toFixed(2)}%</span>
                        }
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="market_values market_details_top">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-4 col-6">
                          <h4>24 Hour Trading Vol</h4>
                          <h5>{this.convertvalue(getMarketsDetails.market_data.total_volume.usd)}</h5>
                        </div>
                        <div className="col-md-4 col-6">
                          <h4>Market Cap</h4>
                          <h5>{this.convertvalue(getMarketsDetails.market_data.market_cap.usd)}</h5>
                        </div>
                        <div className="col-md-4 col-12">
                          <h4>24h Low-24h High</h4>
                          <h5>${this.convertvalue(getMarketsDetails.market_data.low_24h.usd)} - {this.convertvalue(getMarketsDetails.market_data.low_24h.usd)}</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
                        <input type="text" className="form-control" value={search_contract_address} onChange={(e)=> this.setState({search_contract_address: e.target.value})} placeholder="Search by Contract Address" />
                        <div className="input-group-append">
                          <span className="input-group-text" onClick={()=> this.OnContractSearch()}><i className="fas fa-search" /></span>
                        </div>
                      </div>
                      <p>{valid_search_address && "Enter valid contract address"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            // <div className="row">
            //   {console.log(getMarketsDetails) }
            //   <div className="col-md-4 coins_value_symbol">
            //     <h5 style={{ textTransform:"capitalize" }}>{getMarketsDetails.id}</h5>
            //     <h3><NumberFormat className="h3-tag" value={getMarketsDetails.market_data.current_price.usd } displayType='text' thousandSeparator="," prefix='$'  data-enable-time/>
            //       {
            //         getMarketsDetails.market_data.price_change_percentage_24h >= 0 ?
            //         <span className="green_up"><i className="fas fa-caret-up"/> {getMarketsDetails.market_data.price_change_percentage_24h.toFixed(2)}%</span>
            //         :
            //         <span className="red_down"><i className="fas fa-caret-down"/> {getMarketsDetails.market_data.price_change_percentage_24h.toFixed(2)}%</span>
            //       }
            //     </h3>
            //   </div>
            
            //   <div className="col-md-8"> 
            //     <div className="row">
            //       <div className="col-md-4">
            //         <div className="market_values">
            //           <h4>Market Cap</h4>
            //           <h5><NumberFormat value={getMarketsDetails.market_data.market_cap.usd} displayType='text' thousandSeparator="," prefix='$' /></h5>
            //         </div>
            //       </div>
            //       <div className="col-md-4">
            //         <div className="market_values">
            //           <h4>24 Hour Trading Vol</h4>
            //           <h5><NumberFormat value={getMarketsDetails.market_data.total_volume.usd} displayType='text' thousandSeparator="," prefix='$' /></h5>
            //         </div>
            //       </div>
            //       <div className="col-md-4">
            //         <div className="market_values">
            //           <h4>24h Low-24h High</h4>
            //           <h5>${getMarketsDetails.market_data.low_24h.usd}-{getMarketsDetails.market_data.low_24h.usd}</h5>
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // </div>
            :
            null
          } */}
          

          <div className="row">
            <div className="col-md-3">
              <div className="homeswap_form market_form_details">
                <Swap/> 

                {/* <ul className="nav nav-tabs hometabs_btn">
                  <li className="active"><a data-toggle="tab" href="#home" className="active">Swap</a></li>
                  <li><a data-toggle="tab" href="#menu1">Liquidity</a></li> 
                </ul>

                <div className="tab-content">
                  <div id="home" className="tab-pane fade in active show">
                      
                  </div>
                  <div id="menu1" className="tab-pane fade">
                  <Pool />
                  </div>
                  </div> */}

                  
                  {/* <Swap/> */}
                  {/* <Pool /> */}
              </div>

              <h4 className="your_wallet_main">Your Wallet </h4>

              {
                localStorage.getItem("token_address")
                ?
                <div className="connect_wallet_balance">
                  <h2>$ {Number.parseFloat(walletTokenUsdBal).toFixed(4)}</h2>
                  <div className="wallet_balance_token_list">
                    
                    {
                      connectedtokenlist.map((e:any)=>{
                        return <div className="wallet_token_display token_list_border_bottom">
                          <div className="row">
                            <div className="col-md-6 col-6">
                              <h4>{e.currency.symbol}</h4>
                              <h4>$ {Number.parseFloat(e.quotePrice).toFixed(8)}</h4>
                            </div>

                            <div className="col-md-6  col-6 text-right">
                              <h4>{e.value}</h4>
                              <h4>$ {(e.quotePrice * e.value).toFixed(8)}</h4>
                            </div>
                          </div>
                        </div>

                      }) 
                    }
                  </div>
                </div>
                :
                <div className="connect_bscscan_wallet">
                  <ConnectWalletButtonCoin className="connect-btn" width="100%" />
                </div>
              }
            </div>

              <div className="col-md-9">  
              <div className="row desktop_view_display">
                <div className="col-md-12 text-right">
                  <div className="search_token_address_coin">
                    <div className="input-group token_address_search">
                      <input type="text" value={search_contract_address} onChange={(e) => this.setState({ search_contract_address: e.target.value })} className="form-control" placeholder="Search by Contract Address" />
                      <div className="input-group-append">
                        <span className="input-group-text" onClick={() => this.OnContractSearch()}><i className="fas fa-search" /></span>
                      </div>
                    </div>
                    <p>{valid_search_address && "Enter valid contract address"}</p>
                  </div>
                  <div className="form-group pancake_swap_exchange">
                    
                    <select className="form-control" onChange={(e) => this.handleDxSale(e)}>
                      <option>PCSV2</option>
                      <option>PCSV1</option>
                    </select>
                  </div>
                
                  <div className="swith_toggle">
                      <p>USD</p>
                      <label>
                      <Switch
                        checked={isBNB}
                        onChange={this.handleChange}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={48}
                        className="react-switch"
                        id="material-switch"
                        />
                      </label>
                      
                      <p>BNB</p>
                  </div>
                  
                </div>
              </div>
                  
              <div className="market_values market_details_top desktop_view_display">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-4 col-6">
                          <div className="market_values market_tokens_details">
                            <div className="media">
                              <img src={cryptoCurrencyLogo} alt="John Doe" className="mr-3 rounded-circle" />
                              {
                              getMarketsDetails 
                              ?
                              <div className="media-body">
                              <h4 style={{ textTransform:"capitalize" }}>{getMarketsDetails.id}</h4>
                                <h5><NumberFormat value={getMarketsDetails.market_data.current_price.usd } displayType='text' thousandSeparator="," prefix='$'  data-enable-time/>
                                  {
                                    getMarketsDetails.market_data.price_change_percentage_24h >= 0 ?
                                    <span className="positive_growth blink_me"><i className="fas fa-caret-up"/> {getMarketsDetails.market_data.price_change_percentage_24h.toFixed(2)}%</span>
                                    :
                                    <span className="negative_growth blink_me"><i className="fas fa-caret-down"/> {getMarketsDetails.market_data.price_change_percentage_24h.toFixed(2)}%</span>
                                  }
                                </h5>
                                
                                {/* <h3><NumberFormat className="h3-tag" value={getMarketsDetails.market_data.current_price.usd } displayType='text' thousandSeparator="," prefix='$'  data-enable-time/>
                                {
                                  getMarketsDetails.market_data.price_change_percentage_24h >= 0 ?
                                  <span className="green_up"><i className="fas fa-caret-up"/> {getMarketsDetails.market_data.price_change_percentage_24h.toFixed(2)}%</span>
                                    :
                                  <span className="red_down"><i className="fas fa-caret-down"/> {getMarketsDetails.market_data.price_change_percentage_24h.toFixed(2)}%</span>
                                  }
                                </h3> */}
                              </div>
                              :
                              null
                              }
                            </div>
                          </div>
                        </div>


                        <div className="col-md-8">
                          <ul className="coin_block_quick_details">
                            <li className="change_24h_quick">
                              <h4>24 Hour Trading Vol</h4>
                              
                              {
                              getMarketsDetails 
                              ?
                              <h5>{this.convertvalue(getMarketsDetails.market_data.total_volume.usd)}</h5>
                              :
                              null
                              }
                            </li>
              
                            <li className="volume_24h_quick">
                              <h4>Market Cap</h4>
                              {
                              getMarketsDetails 
                              ?
                              <h5><NumberFormat value={getMarketsDetails.market_data.market_cap.usd} displayType='text' thousandSeparator="," prefix='$' /></h5>
                              :
                              null
                              }
                            </li>

                            <li className="marketcap_24h_quick">
                              <h4>24h Low-24h High</h4>
                              {
                              getMarketsDetails 
                              ?
                              <h5>${this.convertvalue(getMarketsDetails.market_data.low_24h.usd)} - {this.convertvalue(getMarketsDetails.market_data.high_24h.usd)}</h5>
                              :
                              null
                              }
                            </li>
                          </ul>

                          {/* <div className="row">

                            
                            <div className="col-md-3 col-6">
                              <h4>24h Change</h4>
                              <h5>
                              {
                                contract_24h_change >= 0 ?
                                <span className="positive_growth blink_me">{Number.parseFloat(contract_24h_change).toFixed(2)} %</span>
                                :
                                <span className="negative_growth blink_me">{Number.parseFloat(contract_24h_change).toFixed(2)} %</span>
                              }</h5>
                            </div>

                            <div className="col-md-3 col-6">
                              
                            </div>

                            <div className="col-md-3 col-6">
                              <h4>Liquidity</h4>
                              <h5>$ {this.convertvalue(contract_liquidity_val)}</h5>
                            </div>

                            <div className="col-md-3 col-6">
                              
                            </div>
                          </div> */}
                        </div>                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="chart_main">
                <div id="tooltip" />
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a className="nav-link active" data-toggle="tab" href="#home" onClick={() => {this.getGraphData(1)}}>24H</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#home" onClick={() => {this.getGraphData(2)}}>1W</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#home" onClick={() => {this.getGraphData(3)}}>1M</a>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div className="tab-pane active" id="home">
                      {this.getSingleTokenGraph()}
                    </div>
                  </div>
              </div>

              <div className="">
            <div className=" coin_token_details">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link active" data-toggle="tab" href="#Overview">Overview</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#Exchange">Exchange</a>
                </li>
              </ul>
              
              <div className="tab-content main_tab_content_list">
                <div className="tab-pane active show" id="Overview">
                {
                   getMarketsDetails ?
                  <div className="market_details">
                    <div className="row">
                      <div className="col-md-6">
                        <table style={{marginTop: '15px'}}>
                          <tbody>
                          <tr>
                            <td><h5><i className="fas fa-chart-line"/> Market Cap Rank</h5></td>
                            <td>:</td>
                            <td>
                              <h6 className="main_span_types">#{getMarketsDetails.market_cap_rank}</h6>
                            </td>
                          </tr>
                          <tr>
                            <td><h5><i  className="fas fa-percentage"/> Circulating Supply</h5></td>
                            <td>:</td>
                            <td style={{textAlign:'left'}}>
                              <NumberFormat className="h3-tag" value={getMarketsDetails.market_data.circulating_supply} displayType='text' thousandSeparator="," prefix='$' />
                            </td>
                          </tr>
                          <tr>
                            <td><h5><i className="fas fa-globe"/> Website</h5></td>
                            <td>:</td>
                            <td>
                              <h6 className="main_span_types"><a href={getMarketsDetails.links.homepage[0]} target="_blank" rel="noreferrer" >{getMarketsDetails.links.homepage[0]}</a></h6>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="col-md-6 col-12">
                        <table className="table ">
                        <tbody>
                          <tr>
                            <td><h5> Tags</h5></td>
                            <td>:</td>
                            <td>
                              <h6 className="main_span_types">
                                {
                                  getMarketsDetails.categories.map((item: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined) =>
                                  <span >{item}</span> 
                                  )
                                }
                              </h6>
                            </td>
                          </tr>
                          
                          <tr>
                            <td><h5> Community</h5></td>
                            <td>:</td>
                            <td>
                            <h6 className="main_span_types">
                              {
                                getMarketsDetails.links.official_forum_url && getMarketsDetails.links.official_forum_url !== '' ?
                            /* eslint-disable-next-line prefer-template */
                            <span><a href={getMarketsDetails.links.official_forum_url+""}  target="_blank" rel="noreferrer" >{getMarketsDetails.links.official_forum_url}</a> </span>
                                :
                                null
                              }
                              
                              {
                                getMarketsDetails.links.twitter_screen_name && getMarketsDetails.links.twitter_screen_name !== '' ?
                                /* eslint-disable-next-line prefer-template */
                                <span><a href={"https://twitter.com/"+getMarketsDetails.links.twitter_screen_name} target="_blank" rel="noreferrer" >Twitter</a></span>
                                :
                                null
                              }

                              {
                                getMarketsDetails.links.facebook_username && getMarketsDetails.links.facebook_username !== '' ?
                                /* eslint-disable-next-line prefer-template */
                                <span><a href={"https://www.facebook.com/"+getMarketsDetails.links.facebook_username} target="_blank" rel="noreferrer" >Facebook</a></span>
                                :
                                null
                              }

                              {
                                getMarketsDetails.links.subreddit_url && getMarketsDetails.links.subreddit_url !== '' ?
                                <span><a href={getMarketsDetails.links.subreddit_url} target="_blank" rel="noreferrer" >Reddit</a> </span>
                                :
                                null
                              } 
                            </h6>
                            </td>
                          </tr>
                          <tr>
                            <td style={{width:'115px'}}><h5> Explorers</h5></td>
                            <td>:</td>
                            <td>
                              <h6 className="main_span_types">
                                {
                                  blockchainSite ?
                                  blockchainSite.map((item: { url: string | undefined; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => 
                                  <span ><a href={item.url}  target="_blank" rel="noreferrer" >{item.name}</a> </span>
                                  )
                                  :
                                  null
                                }
                              </h6>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
 
                    </div>
                  </div>
                  :
                  null
                }

                  {/* <div className="overview_details" id="details_overview"> 
                    {get_symbols_data ? null : <><h2 style={{ textTransform:"capitalize" }}>{getMarketsDetails.id}</h2><br /></>}    
                            <div dangerouslySetInnerHTML={{ __html: (get_symbols_data ? get_symbols_data.currency_contents : market_desc) }} />  
                        </div> */}
                    </div> 
                    
                    <div className="tab-pane fade market_exchange" id="Exchange">
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                              <tr>
                                <th>Exchange</th>
                                <th>Pair</th>
                                <th>Price</th>
                                <th  className="mobile_hide_col">Volume %</th>
                                <th  className="mobile_hide_col">Volume</th>
                                <th  className="mobile_hide_col">Last Traded</th>
                                <th  className="mobile_hide_col">Trust Score</th>
                              </tr>
                          </thead>
                          <tbody> 
                            {
                              marketData 
                              ?
                              marketData.map((item: { trade_url: string | undefined; image: string | undefined; market_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; base: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; last_price: number; bid_ask_spread_percentage: number; volume: number; trust_score: string | undefined; }) => 
                              <tr >
                                <td>
                                    <a href={item.trade_url} target="_blank" rel="noreferrer"  >
                                      <div className="media">
                                          <div className="media-left">
                                            <img src={item.image} className="media-object" alt="market" />
                                          </div>
                                          <div className="media-body">
                                            <h4 className="media-heading">{item.market_name} </h4>
                                          </div>
                                      </div>
                                    </a>
                                </td>
                                <td>
                                    <a href={item.trade_url} target="_blank" rel="noreferrer"  >
                                      <h5>{item.base}/USDT</h5>
                                    </a>
                                </td>
                                <td>
                                    <a href={item.trade_url} target="_blank" rel="noreferrer"  >
                                      <h5>
                                          <NumberFormat value={item.last_price.toFixed(4)} displayType='text' thousandSeparator="," prefix='$' />               
                                      </h5>
                                    </a>
                                </td>
                                <td className="mobile_hide_col">
                                    <a href={item.trade_url} target="_blank" rel="noreferrer"  >
                                      <h5>
                                        {
                                          item.bid_ask_spread_percentage ?
                                          item.bid_ask_spread_percentage > 0?
                                          <span className="status_green">{item.bid_ask_spread_percentage.toFixed(2)} % <i className="fa fa-caret-up" aria-hidden="true" /></span>
                                          :
                                          <span className="status_red">{item.bid_ask_spread_percentage.toFixed(2)} % <i className="fa fa-caret-down" aria-hidden="true" /></span>
                                          :
                                          null
                                        }
                                      </h5>
                                    </a>
                                </td>
                                <td>
                                    <a href={item.trade_url} target="_blank" rel="noreferrer"  >
                                      <h5>
                                      <NumberFormat value={item.volume.toFixed(4)} displayType='text' thousandSeparator="," prefix=''/>    
                                      
                                      </h5>
                                    </a>
                                </td>
                                <td className="mobile_hide_col">
                                    <a href={item.trade_url} target="_blank" rel="noreferrer"  >
                                      Recently
                                    </a>
                                </td>
                                <td className="mobile_hide_col">
                                    <a href={item.trade_url} target="_blank" rel="noreferrer"  >
                                      <div className={item.trust_score} />
                                    </a>
                                </td>
                              </tr>
                              )
                              :
                              null
                              }
                          
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* coming soon popup starts      */}
        <div className="modal" id="ComingSoon">
            <div className="modal-dialog claim_auto modal-sm">
              <div className="modal-content ">
                <div className="modal-body ">
                <button type="button" className="close" data-dismiss="modal" >&times;</button>
                  <h2>Coming Soon!</h2>
                  <p>The Decentralized will be coming soon</p>
                </div>
              </div>
            </div>
          </div>
          {/* coming soon popup ends here */} 
        </div>
    );
  }
}

// export default withRouter(connect(mapStateToProps,mapDispatchToProps)(market_details))


export default withRouter(market_details);