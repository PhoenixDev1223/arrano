/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-useless-concat */
/* eslint-disable prefer-template */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/no-danger */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable block-scoped-var */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable-next-line prefer-template */
import React from 'react';
import Highcharts from 'highcharts'
import MetaTags from 'react-meta-tags'
import HighchartsReact from 'highcharts-react-official'
import { ethers } from 'ethers';
import Switch from "react-switch";
import * as myConstClass from '../../../constants/Constants';
import * as marketConstants from '../../../constants/market_details';
import Swap from '../../Swap/index';
import ConnectWalletButtonCoin from '../../../components/ConnectWalletButtonCoin'

const KEYS_TO_FILTERS = ['name', 'symbol']
class Coin_hook extends React.Component<any, any>
{
  constructor(props: any) {
    super(props);
   
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      isBNB: false,
      dxSale: "Pancake v2",
      tokenExchanges: marketConstants.tokenExchanges,
      current_market_price: "",
      blockchainSite: [],
      website_base_url: myConstClass.website_base_url,
      api_base_url: myConstClass.api_base_url,
      getMarketsDetails: "",
      crytoCurrencySymbol: marketConstants.currency_object,
      getGraphData: "",
      graphDate: "1",
      tokenName: "",
      get_symbols_data: "",
      market_desc: "",
      search_contract_address: window.location.pathname.substring(12),
      valid_search_address: false,
      tokenaddressconnected: localStorage.getItem("token_address"),
      connectedtokenlist: [],
      walletTokenUsdBal: 0,
      exchangelist: [],
      tokensymbol: "",
      tokenType: "",
      contract_usdt_price: "0",
      contract_1h_change: "0",
      contract_24h_change: "0",
      contract_24h_volume: "0",
      contract_liquidity_val: "0",
      market_cap: "0",
      tokentransactions: [],
      search_enable: false
    }

  }



  async componentDidMount() {
    const { tokenaddressconnected } = this.state
    this.getMarketsDetails();
    this.getGraphData(1);
    this.getSymbolContents();
    // this.getTokendetails(window.location.pathname.substring(12)) 
    // this.getTokenTransactions(window.location.pathname.substring(12))
    this.OnContractSearch("1")
    this.getTokensList(tokenaddressconnected);
    await this.getTokenUsdPrice();
    await this.get1hChange();
    await this.get24hChange();
    await this.get24hVolume();
    await this.getMarketCap();
  }

  componentDidUpdate() {
    const { tokenaddressconnected } = this.state

    if (tokenaddressconnected !== localStorage.getItem("token_address")) {
      window.location.reload();
    }
  }

  handleChange(isBNB) {
    const {dxSalePlace} = this.state;
    this.getGraphData("", dxSalePlace, isBNB)
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

  async getTokenUsdPrice() {
    this.setState({ valid_search_address: false });
    const { search_contract_address } = this.state;

    const dateSince = ((new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).toISOString())
    const query = `
                query
                {
                  ethereum(network: bsc) {
                    dexTrades(
                      date: {since: "` + dateSince + `"}
                      any: [{baseCurrency: {is: `+ '"' + search_contract_address + '"' + `}, quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}}, {baseCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}, quoteCurrency: {is: "0xe9e7cea3dedca5984780bafc599bd69add087d56"}}]
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
        this.setState({ contract_usdt_price: result.data.ethereum.dexTrades[0].quote * result.data.ethereum.dexTrades[1].quote })
      })
      .catch(console.error);
  }

  get1hChange() {
    this.setState({ valid_search_address: false })

    const { search_contract_address } = this.state

    const date = ((new Date(Date.now() - 1 * 60 * 60 * 1000)).toISOString())
    const query = `
                query
                {
                  ethereum(network: bsc) {
                    dexTrades(
                      date: {in: "` + date + `"}
                      any: [{baseCurrency: {is: `+ '"' + search_contract_address + '"' + `}, quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}}, {baseCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}, quoteCurrency: {is: "0xe9e7cea3dedca5984780bafc599bd69add087d56"}}]
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
    const { contract_usdt_price } = this.state;
    fetch(url, opts)
      .then(res => res.json())
      .then(result => {

        this.setState({ contract_1h_change: (contract_usdt_price / (result.data.ethereum.dexTrades[0].quote * result.data.ethereum.dexTrades[1].quote) - 1) * 100 })
      })
      .catch(console.error);
  }

  get24hChange() {
    this.setState({ valid_search_address: false })

    const { search_contract_address } = this.state

    const date = ((new Date(Date.now() - 24 * 60 * 60 * 1000)).toISOString())
    const query = `
                query
                {
                  ethereum(network: bsc) {
                    dexTrades(
                      date: {in: "` + date + `"}
                      any: [{baseCurrency: {is: `+ '"' + search_contract_address + '"' + `}, quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}}, {baseCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}, quoteCurrency: {is: "0xe9e7cea3dedca5984780bafc599bd69add087d56"}}]
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
    const { contract_usdt_price } = this.state;
    fetch(url, opts)
      .then(res => res.json())
      .then(result => {

        this.setState({ contract_24h_change: (contract_usdt_price / (result.data.ethereum.dexTrades[0].quote * result.data.ethereum.dexTrades[1].quote) - 1) * 100 })
      })
      .catch(console.error);
  }

  get24hVolume() {
    this.setState({ valid_search_address: false })

    const { search_contract_address } = this.state

    const dateSince = ((new Date(Date.now() - 24 * 60 * 60 * 1000)).toISOString())
    const query = `
                query
                {
                  ethereum(network: bsc) {
                    dexTrades(
                      date: {since: "` + dateSince + `"}
                      baseCurrency: {is: `+ '"' + search_contract_address + '"' + `}
                      options: {desc: "tradeAmount"}
                    ) {
                      tradeAmount(in: USD)
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

    fetch(url, opts)
      .then(res => res.json())
      .then(result => {
        this.setState({ contract_24h_volume: result.data.ethereum.dexTrades[0].tradeAmount })
      })
      .catch(console.error);
  }

  async getMarketCap() {
    const { tokenDecimals, search_contract_address, contract_usdt_price } = this.state;

    const mainnetUrl = "https://bsc-dataseed.binance.org/";
    const provider = new ethers.providers.JsonRpcProvider(mainnetUrl);
    //    if (tokenType.indexOf('ERC') >= 0 ) {
    //      mainnetUrl = 'https://bsc-dataseed.binance.org/'
    //    } else {
    //      mainnetUrl = 'https://mainnet.infura.io/v3/5fd436e2291c47fe9b20a17372ad8057'
    //    }

    const tokenAbi = ["function totalSupply() view returns (uint256)"];
    const tokenContract = new ethers.Contract(search_contract_address, tokenAbi, provider);
    const supply = await tokenContract.totalSupply() / (10 ** tokenDecimals);
    this.setState({ market_cap: supply * contract_usdt_price });

    const pairAbi = ["function getPair(address first, address second) view returns (address)"]
    const pairContract = new ethers.Contract("0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73", pairAbi, provider);
    const pairAddr = await pairContract.getPair(search_contract_address, '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c');

    const liqAbi = ["function getReserves() view returns (uint112, uint112, uint32)", "function token0() view returns (address)"];
    const liqContract = new ethers.Contract(pairAddr, liqAbi, provider);
    const reserve = await liqContract.getReserves();
    const token0 = await liqContract.token0();
    const liquidity = ((token0.toLowerCase() === search_contract_address.toLowerCase()) ? reserve[0] : reserve[1]) / (10 ** tokenDecimals) * contract_usdt_price * 2;
    this.setState({ contract_liquidity_val: liquidity })
  }
 
  getTokenTransactions(user_address:any){
    this.setState({valid_search_address: false}) 
    const dateSince = ((new Date(Date.now() - 24 * 60 * 60 * 1000)).toISOString())
    console.log(dateSince)
    const query = `
                query
                {
                  ethereum(network: bsc) {
                    dexTrades(
                      any: [{baseCurrency: {is: `+'"'+user_address+'"'+`}}]
                      date: {since: `+'"'+dateSince+'"'+` }
                      options: {desc: ["tradeIndex", "block.timestamp.time"], limitBy: {each: "baseCurrency.symbol", limit: 10}}
                    ) {
                      exchange {
                        name
                      }
                      baseCurrency {
                        symbol
                        address
                      }
                      transaction {
                        hash
                      }
                      block {
                        timestamp {
                          time(format: "%Y-%m-%d %H:%M:%S")
                        }
                        height
                      }
                      tradeIndex
                      buyAmount: baseAmount
                      buyAmountInUsd: baseAmount
                      quoteCurrency {
                        symbol
                        address
                      }
                      sellAmountInUsd: quoteAmount
                      tradeAmountInUsd: tradeAmount(in: USD)          
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
          fetch(url, opts)
              .then(res => res.json())
              .then(result=>{ 
                this.setState({tokentransactions: result.data.ethereum.dexTrades})           
              })
              .catch(console.error);
  }

  getTokendetails(user_address: any) {
    this.setState({ valid_search_address: false })

    const query = `
                query
                { 
                  ethereum(network: bsc) {
                    address(address: {is: `+ '"' + user_address + '"' + `}){

                      annotation
                      address

                      smartContract {
                        contractType
                        currency{
                          symbol
                          name
                          decimals
                          tokenType
                        }
                      }
                      balance
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
    fetch(url, opts)
      .then(res => res.json())
      .then(result => {
        if (result.data.ethereum === null) {
          this.setState({ valid_search_address: true })
        }
        else {
          this.setState({ valid_search_address: false })
          this.setState({ tokensymbol: result.data.ethereum.address[0].smartContract.currency.symbol })
          this.setState({ tokenType: result.data.ethereum.address[0].smartContract.currency.tokenType })
          this.setState({ tokenDecimals: result.data.ethereum.address[0].smartContract.currency.decimals })
        }


      })
      .catch(console.error);
  }

  async getTokensList(wallet_address: any) {

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


  getTokenexchange(wallet_address: any) {

    const query = `
          query{
            ethereum(network: bsc){
              dexTrades(options:{desc: "amount"},
                date: {since: null till: null }
                baseCurrency: {is: `+ '"' + wallet_address + '"' + `}
                ) {

                  exchange {
                    fullName
                  }

                  trades: count
                  takers: count(uniq: takers)
                  makers: count(uniq: makers)

                  amount: baseAmount
                  baseCurrency{symbol}
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
    fetch(url, opts)
      .then(res => res.json())
      .then(result => {
        this.setState({ exchangelist: result.data.ethereum.dexTrades })
      })
      .catch(console.error);
  }


  getGraphData(datetime: any, dxSalePlace = "", isBnbDisplay = undefined) {
    if (datetime === "") {
      const {graphDate} = this.state;
      datetime = graphDate;
    }
    this.setState({graphDate: datetime})

    let symbolName: string
    let from_date: string | number | Date
    let to_date: string | number | Date

    const { crytoCurrencySymbol, first_token_symbol , dxSale} = this.state


    let first_token_symbols = window.location.pathname.substring(9);
    first_token_symbols = first_token_symbols.toLowerCase();
    if (crytoCurrencySymbol[first_token_symbols] !== 'undefined') {
      symbolName = crytoCurrencySymbol[first_token_symbols];

      from_date = new Date();
      from_date = from_date.setDate(from_date.getDate() - 1);
      from_date = Date.parse((new Date(from_date)).toString()) / 1000;
      to_date = Date.parse((new Date()).toString()) / 1000;

      if (datetime === 1) {
        from_date = new Date();
        from_date = from_date.setDate(from_date.getDate() - 1);
        from_date = Date.parse((new Date(from_date)).toString()) / 1000;
        to_date = Date.parse((new Date()).toString()) / 1000;
      }
      else if (datetime === 2) {
        from_date = new Date();
        from_date = from_date.setDate(from_date.getDate() - 7);
        from_date = Date.parse(new Date(from_date).toString()) / 1000;
        to_date = Date.parse((new Date()).toString()) / 1000;
      }
      else if (datetime === 3) {
        from_date = new Date();
        from_date = from_date.setDate(from_date.getDate() - 31);
        from_date = Date.parse((new Date(from_date).toString())) / 1000;
        to_date = Date.parse((new Date()).toString()) / 1000;
      }


      this.setState({ valid_search_address: false })

      const { search_contract_address, isBNB } = this.state

      // const dateSince = ((new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)).toISOString())
      const dateSince = new Date(from_date * 1000);
      const fromDate = dateSince.toISOString();
      const dateTill = new Date(to_date * 1000);
      const toDate = dateTill.toISOString();

      const excPlace = (dxSalePlace === "") ? dxSale : dxSalePlace
      /* const query = `
                    query
                    {
                      ethereum(network: bsc) {
                        dexTrades(
                          exchangeName : {is: "`+ excPlace + `"}
                          date: {since: "` + fromDate + `"}
                          any: [{baseCurrency: {is: `+ '"' + search_contract_address + '"' + `}, quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}}, {baseCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}, quoteCurrency: {is: "0xe9e7cea3dedca5984780bafc599bd69add087d56"}}]
                          options: {asc: "timeInterval.hour"}
                        ) {
                          timeInterval {
                            hour(count: 3)
                          }
                          baseCurrency {
                            symbol
                          }        
                          quoteCurrency {
                            symbol
                          }
                          quote: quotePrice
                        }
                      }
                    }
              ` ; */
      const query = `
                    query
                    {
                      ethereum(network: bsc) {
                        dexTrades(
                          exchangeName : {is: "`+ excPlace + `"}
                          date: {since: "` + fromDate + `"}
                          any: [{baseCurrency: {is: `+ '"' + search_contract_address + '"' + `}, quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}}]
                          options: {asc: "timeInterval.hour"}
                        ) {
                          timeInterval {
                            hour(count: 3)
                          }
                          baseCurrency {
                            symbol
                          }        
                          quoteCurrency {
                            symbol
                          }
                          quote: quotePrice
                          buyAmount: baseAmount
                          sellAmount: quoteAmount
                          tradeAmountInUsd: tradeAmount(in: USD)
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
      fetch(url, opts)
        .then(res => res.json())
        .then(result => {
          var prices: number[][] = [];
          var arr = result.data.ethereum.dexTrades;
          if (isBnbDisplay === undefined) {
            isBnbDisplay = isBNB; 
          }

          console.log("arr", arr)
          for (let index = 0; index < arr.length; index++) {
            if (arr[index] !== undefined) {
              var rate = 0
              if (isBnbDisplay === false) {
                rate = arr[index].tradeAmountInUsd / arr[index].buyAmount;
              } else {
                rate = arr[index].quote;
              }
              

              var date = new Date(arr[index].timeInterval.hour)
              var val: number[] = []
              val[0] = date.getTime()
              val[1] = rate;

              prices.push(val)
            }
          }
            
          /* for (let index = 0; index < arr.length / 2; index++) {
            if (arr[index * 2] !== undefined && arr[index * 2 + 1] !== undefined) {
              var rate = 0
              if (isBnbDisplay === false) {
                rate = arr[index * 2].quote * arr[index * 2 + 1].quote;
              } else {
                rate = arr[index * 2 + 1].quote;
              }
              

              var date = new Date(arr[index * 2].timeInterval.hour)
              var val: number[] = []
              val[0] = date.getTime()
              val[1] = rate;

              prices.push(val)
            }
          } */
          
          this.setState({
            getGraphData: prices
          })



        })
        .catch(console.error);
    }

  }


  getSingleTokenGraph() {

    const { tokensymbol, first_token_symbol, getGraphData, isBNB} = this.state

    const houroptions = {
      chart: {
        zoomType: 'x',
        height: '320',
        backgroundColor: '#2f3142',
        color: '#ffffff'
      },

      title: {

        /* eslint-disable-next-line prefer-template */
        text: this.Capitalize(tokensymbol),
        align: 'left',
        color: 'white'
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
        name: '<strong>Price in ' + (isBNB ? 'BNB' : '$') +'</strong>',
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



  getMarketsDetails() {

    const { crytoCurrencySymbol, first_token_symbol, tokenExchanges, website_base_url } = this.state;

    const { history } = this.props
 
    let symbolName: string
    let res2: any[]
    let res: string
    let createObj: { url?: any; name?: any; }
    let innerResult2: { base: any; image: any; identifier: any; market_name: any; last_price: any; volume: any; trust_score: any; bid_ask_spread_percentage: any; last_traded_at: any; trade_url: any; }[]
    let innnerResult: any[]
    let identifier: string | number
    let exchangeImage: string | undefined
    let first_token_symbols = window.location.pathname.substring(9);
    first_token_symbols = first_token_symbols.toLowerCase();
    if (crytoCurrencySymbol[first_token_symbols] !== 'undefined') {
      /* eslint-disable-next-line prefer-template */
      fetch("https://api.coingecko.com/api/v3/coins/" + crytoCurrencySymbol[first_token_symbols], {
        method: 'GET'
      }).then(post => post.json())
        .then(
          (result) => {
            // this.setState({market_desc: result.description.en})

            if (!result.error) {
              innnerResult = [] as any;
              if (result.links.blockchain_site) {
                result.links.blockchain_site.map((item: string) => {
                  if (item !== '') {
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

              innerResult2 = [] as any;
              if (result.tickers) {
                result.tickers.map((item: any) => {
                  if (item.target === 'USD') {
                    identifier = item.market.identifier
                    exchangeImage = tokenExchanges[identifier]
                    if (exchangeImage === undefined) {
                      /* eslint-disable-next-line prefer-template */
                      exchangeImage = website_base_url + 'assets/images/exchange.png';
                    }

                    const objCreate2 = {
                      base: item.base,
                      image: exchangeImage,
                      identifier: item.market.identifier,
                      market_name: item.market.name,
                      last_price: item.last,
                      volume: item.volume,
                      trust_score: item.trust_score,
                      bid_ask_spread_percentage: item.bid_ask_spread_percentage,
                      last_traded_at: item.last_traded_at,
                      trade_url: item.trade_url
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
                getMarketsDetails: result,
                tokenName: result.id,
                blockchainSite: innnerResult,
                marketData: innerResult2,
                current_market_price: result.market_data.current_price.usd
              })

            }
            else {
              console.log(window.location.pathname);

            }
            return null
          });
    }
    else {
      console.log(window.location.pathname);
    }
  }

  getSymbolContents() {
    const { api_base_url } = this.state
    const data = {
      symbol: window.location.pathname.substring(9)
    };

    /* eslint-disable-next-line prefer-template */
    fetch(api_base_url + "/markets/symbol_contents", {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(
        (result) => {
          if (result.status === true) {
            this.setState({ get_symbols_data: result.alert_message })
          }
        });

  }


  blockchainSite() {
    let res: string
    let res2: any[]
    let createObj: { url?: any; name?: any; }
    const result = [] as any;

    const { getMarketsDetails } = this.state

    if (getMarketsDetails) {
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
      blockchainSite: result
    });
  }

  convertvalue(labelValue: any) { 
    
    return Math.abs(Number(labelValue)) >= 1.0e+9

      /* eslint-disable-next-line prefer-template */
      ? Math.trunc(Math.abs(Number(labelValue)) / 1.0e+9 * 100) / 100 + "B"

      : Math.abs(Number(labelValue)) >= 1.0e+6

        /* eslint-disable-next-line prefer-template */
        ? Math.trunc(Math.abs(Number(labelValue)) / 1.0e+6 * 100) / 100 + "M"

        : Math.abs(Number(labelValue)) >= 1.0e+3

          /* eslint-disable-next-line prefer-template */
          ? Math.trunc(Math.abs(Number(labelValue)) / 1.0e+3 * 100) / 100 + "K"

          : Number(Math.abs(Number(labelValue))).toFixed(2);

  }

  OnContractSearch(type: any) {

    this.setState({ valid_search_address: false })

    const { search_contract_address, valid_search_address } = this.state

    console.log(search_contract_address);

    const {history} = this.props
    

    if (search_contract_address) {
      this.getTokendetails(search_contract_address)
      this.getTokenexchange(search_contract_address)
      this.getTokenTransactions(search_contract_address)
      this.setState({search_enable: false})
      if(type === "2"){
        history.push(search_contract_address) 
        window.location.reload()
      } 
    }
    else {
      this.setState({ valid_search_address: false })
    }
  }

  Capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  connectwalletfun() {
    console.log("helklo")
  }


  render() {

    const {
      tokenExchanges,
      current_market_price,
      blockchainSite,
      website_base_url,
      api_base_url,
      getMarketsDetails,
      crytoCurrencySymbol,
      getGraphData,
      tokenName,
      marketData,
      search_enable,
      get_symbols_data, market_desc,valid_search_address, search_contract_address, tokenaddressconnected, connectedtokenlist, walletTokenUsdBal, exchangelist, tokensymbol, tokenType, tokenDecimals, contract_usdt_price, contract_1h_change, contract_24h_change, contract_24h_volume, contract_liquidity_val, market_cap, tokentransactions, isBNB, dxSale} = this.state

    if (tokenaddressconnected !== localStorage.getItem("token_address")) {
      this.connectwalletfun();
    }
    return (
      <div id="Content" className="market_detail_page bscscan_page" style={{ background: '#e9edf2' }}>
        <MetaTags>
          <title> {(window.location.pathname.substring(9))}
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
          <meta property="og:title" content={current_market_price + ' | Arrano.network'} />
          <meta property="og:image" content="/.png" />
        </MetaTags>


        <div className="container-fluid">
          {/* <div className="row">
            <div className="col-md-4"/>
            <div className="col-md-4">
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search by Address" />
                <div className="input-group-append">
                  <span className="input-group-text"><i className="fas fa-search" /></span>
                </div>
              </div>
            </div>
          </div> */}
         
          <div className="main_block_elements_mobile">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="form-group pancake_swap_exchange">
                  <select className="form-control">
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

                <div className="search_token_address_coin">
                  <div className="input-group token_address_search">
                    <div className="input-group-append">
                      <span className="input-group-text" onClick={() => this.setState({search_enable: true})}><i className="fas fa-search" /></span>
                    </div>
                  </div>
                </div>

                {
                  search_enable
                  ?
                  <div className="market_values search_element_block">
                    <div className="search_close_fun"><i  onClick={() => this.setState({search_enable: false})} className="fas fa-times"/></div>
                    <div className="input-group"> 
                      <input type="text" value={search_contract_address} onChange={(e) => this.setState({ search_contract_address: e.target.value })} className="form-control" placeholder="Search by Contract Address" />
                      <div className="input-group-append">
                        <span className="input-group-text" onClick={() => this.OnContractSearch("2")}><i className="fas fa-search" /></span>
                      </div>
                    </div>
                    <p>{valid_search_address && "Enter valid contract address"}</p>
                  </div>
                  :
                  null 
                }

              </div>
            </div>
                
            <div className="market_values market_details_top">
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                      <div className="col-md-4 col-12">
                          <div className="market_values market_tokens_details">
                            <div className="media">
                              <img src="/bsc_logo.png" alt="John Doe" className="mr-3 rounded-circle" />
                              <div className="media-body">
                                <h4>{tokensymbol}
                                {
                                  contract_24h_change >= 0 ?
                                  <span className="main_coin_percent positive_growth blink_me">1h {Number.parseFloat(contract_1h_change).toFixed(2)} %</span>
                                  :
                                  <span className="main_coin_percent negative_growth blink_me">1h {Number.parseFloat(contract_1h_change).toFixed(2)} %</span>
                                }
                                </h4>
                                <h5>$ {Number.parseFloat(contract_usdt_price).toFixed(9)}
                                
                                </h5>  
                              </div>
                            </div>
                          </div>
                        </div>


                    <div className="col-md-8">
                      <ul className="coin_block_quick_details">
                        <li className="change_24h_quick">
                          <h4>24h Change</h4>
                          <h5>
                          {
                            contract_24h_change >= 0 ?
                            <span className="positive_growth blink_me">{Number.parseFloat(contract_24h_change).toFixed(2)} %</span>
                            :
                            <span className="negative_growth blink_me">{Number.parseFloat(contract_24h_change).toFixed(2)} %</span>
                          }
                          </h5>
                        </li>

                        

                        <li className="volume_24h_quick">
                          <h4>24h Volume</h4>
                          <h5>$ {Number.parseInt(contract_24h_volume).toFixed(2)}</h5>
                        </li>

                        <li className="liquidity_24h_quick">
                          <h4>Liquidity</h4>
                          <h5>$ {Number.parseInt(contract_liquidity_val).toFixed(2)}</h5>
                        </li>

                        <li className="marketcap_24h_quick">
                          <h4>Marketcap</h4>
                          <h5>$ {Number.parseInt(market_cap).toFixed(2)}</h5>
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
          

          <div className="row">
            <div className="col-md-3">
              {/* <button className="exchange_mobile_button" type="button">Exchange</button> */}
              <div className="homeswap_form market_form_details">
                <Swap />

                
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
                        connectedtokenlist.map((e: any) => {
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

              {
                tokenaddressconnected !== localStorage.getItem("token_address")
                  ?
                  this.connectwalletfun()
                  :
                  null
              }
            </div>

            <div className="col-md-9">
              <div className="row desktop_view_display">
                <div className="col-md-12 text-right">
                  <div className="search_token_address_coin">
                    <div className="input-group token_address_search">
                      <input type="text" value={search_contract_address} onChange={(e) => this.setState({ search_contract_address: e.target.value })} className="form-control" placeholder="Search by Contract Address" />
                      <div className="input-group-append">
                        <span className="input-group-text" onClick={() => this.OnContractSearch("2")}><i className="fas fa-search" /></span>
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
                              <img src="/bsc_logo.png" alt="John Doe" className="mr-3 rounded-circle" />
                              <div className="media-body">
                                <h4>{tokensymbol}
                                {
                                  contract_24h_change >= 0 ?
                                  <span className="main_coin_percent positive_growth blink_me">1h {Number.parseFloat(contract_1h_change).toFixed(2)} %</span>
                                  :
                                  <span className="main_coin_percent negative_growth blink_me">1h {Number.parseFloat(contract_1h_change).toFixed(2)} %</span>
                                }
                                </h4>
                                <h5>$ {Number.parseFloat(contract_usdt_price).toFixed(9)}
                                
                                </h5>  
                              </div>
                            </div>
                          </div>
                        </div>


                        <div className="col-md-8">
                          <ul className="coin_block_quick_details">
                            <li className="change_24h_quick">
                              <h4>24h Change</h4>
                              <h5>
                              {
                                contract_24h_change >= 0 ?
                                <span className="positive_growth blink_me">{Number.parseFloat(contract_24h_change).toFixed(2)} %</span>
                                :
                                <span className="negative_growth blink_me">{Number.parseFloat(contract_24h_change).toFixed(2)} %</span>
                              }
                              </h5>
                            </li>

                            

                            <li className="volume_24h_quick">
                              <h4>24h Volume</h4>
                              <h5>$ {Number.parseInt(contract_24h_volume)}</h5>
                            </li>

                            <li className="liquidity_24h_quick">
                              <h4>Liquidity</h4>
                              <h5>$ {Number.parseInt(contract_liquidity_val)}</h5>
                            </li>

                            <li className="marketcap_24h_quick">
                              <h4>Marketcap</h4>
                              <h5>$ {Number.parseInt(market_cap)}</h5>
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

              <div className="chart_main desktop_view_display">
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
              
              <div className="coin_token_details">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a className="nav-link active" data-toggle="tab" href="#Overview">Overview</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#Exchange">Exchange</a>
                    </li>

                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#transactions">Transactions</a>
                    </li>
                  </ul>

                  <div className="tab-content main_tab_content_list">
                    <div className="tab-pane active show" id="Overview">
                      <div className="market_details">
                        <div className="row">
                          <div className="col-md-6">
                            <table style={{ marginTop: '15px' }}>
                              <tbody>
                                <tr>
                                  <td>
                                    <h5><i className="fas fa-chart-line" aria-hidden="true" /> Market Cap Rank</h5>
                                  </td>
                                  <td>:</td>
                                  <td>
                                    <h6 className="main_span_types">-</h6>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h5><i className="fas fa-percentage" aria-hidden="true" /> Circulating Supply</h5>
                                  </td>
                                  <td>:</td>
                                  <td style={{ textAlign: 'left' }}>-</td>
                                </tr>
                                <tr>
                                  <td>
                                    <h5><i className="fas fa-globe" aria-hidden="true" /> Website</h5>
                                  </td>
                                  <td>:</td>
                                  <td>
                                    <h6 className="main_span_types">-</h6>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="col-md-6 col-12">
                            <table className="table ">
                              <tbody>
                                <tr>
                                  <td>
                                    <h5> Tags</h5>
                                  </td>
                                  <td>:</td>
                                  <td>
                                    <h6 className="main_span_types">-</h6>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h5> Community</h5>
                                  </td>
                                  <td>:</td>
                                  <td>
                                    <h6 className="main_span_types">-</h6>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ width: '115px' }}>
                                    <h5> Explorers</h5>
                                  </td>
                                  <td>:</td>
                                  <td>
                                    <h6 className="main_span_types">-</h6>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      {/* <div className="overview_details" id="details_overview">
                        {get_symbols_data ? null : <><h2 style={{ textTransform: "capitalize" }}>{getMarketsDetails.id}</h2><br /></>}
                        <div dangerouslySetInnerHTML={{ __html: (get_symbols_data ? get_symbols_data.currency_contents : market_desc) }} />
                      </div> */}
                    </div>

                    <div className="tab-pane fade market_exchange" id="Exchange">
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Exchange</th>
                              <th>Trades Count</th>
                              <th>Takers</th>
                              <th>Makers</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              exchangelist.map((e: any) => {
                                return <tr>
                                  <td>{e.exchange.fullName}</td>
                                  <td>{e.trades}</td>
                                  <td>{e.trades}</td>
                                  <td>{e.makers}</td>
                                  <td>{e.amount}</td>
                                </tr>
                              }
                              )}

                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="tab-pane fade market_exchange" id="transactions">
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                              <tr>
                                <th>Time</th>
                                <th>Traded</th>
                                <th>Token Price</th>
                                <th>Value</th>
                                <th>DEX</th>
                              </tr>
                          </thead>
                          <tbody>
                            {
                              tokentransactions.map((e:any)=>{
                              return <tr>
                                <td>{e.block.timestamp.time}</td>
                                <td>{Number.parseFloat((e.baseCurrency.symbol === "WBNB") ? e.sellAmountInUsd : e.buyAmountInUsd).toFixed(2)} {(e.baseCurrency.symbol === "WBNB") ? e.quoteCurrency.symbol : e.baseCurrency.symbol}</td>
                                <td>{Number.parseFloat((e.tradeAmountInUsd / ((e.baseCurrency.symbol === "WBNB") ? e.sellAmountInUsd : e.buyAmountInUsd)).toString()).toFixed(7)} USD</td>
                                <td>{Number.parseFloat(e.tradeAmountInUsd).toFixed(4)} USD</td>
                                <td><a rel="noreferrer" href={"https://bscscan.com/tx/"+e.transaction.hash} target="_blank">{e.exchange.name}</a></td>
                              </tr>
                              }
                            )}
                          </tbody>
                        </table>
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
                  </div>
                </div>
              </div>
            </div>
            {/* coming soon popup ends here */} 
        </div>
      </div>  
    );
  }
}

// export default withRouter(connect(mapStateToProps,mapDispatchToProps)(market_details))


export default Coin_hook;