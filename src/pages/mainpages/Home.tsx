import React from 'react';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';  
import Footer from '../../components/layouts/Footer';
import Swap from '../Swap/index'
import Pool from '../Pool/index'

class Home extends React.Component<any, any> {
  
  constructor(props: any)
  { 
    super(props);  

    this.state = {
      getMarketsList: []
    }

  } 
  
  componentDidMount()
  { 
    this.getMarketsList();  
  }

  getMarketsList()
  {
    
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum%2Cchainlink%2Cwrapped-bitcoin%2Cyearn-finance&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=24h", {
      method:'GET', 
    }).then(res => res.json())
    .then(
      (result: any) => {
          this.setState({
            getMarketsList:result
          }) 
     });

  } 
 
  render(){ 
    const { getMarketsList } = this.state;
    return (
      <>
      <div id="Content"> 
      <MetaTags>
          <title>Arrano Network | Blockchain for New-age financing, Smart contracts and NFT&#39;s </title>
          <link rel="canonical" href="https://arrano.network/" />
          <meta name="description" content=" A Collaborative workspace and bloclkchain platform for development of fair crypto products like decentralized exchange, P2P, Crypto Wallet, Trade analytics and Launchpad built over smart contracts and NFT's. Powered by 2 native assets ANO token and ANDX toeken." />
          <meta name="keyword" content="Arrano Network, ANDX token , ANO Token , Arrano Tokens, Arrano DeFi , Arrano airdrop , ANO Defi token , Arrano Network Community , Arrano Launchpad, Arrano Exchange Arrano Defi Project, Arrano blockchain, Arrano Smart contracts, Arrano P2P, Arrano Mobile app, Arrano Wallet, NFT token, Tron TRX, ethereum ETH, binance BNB, Bitcoin BTC" />
          <meta property="og:title" content="Arrano Network | Blkockchan for New-age financing, Smart contracts and NFT's" />
          <meta property="og:image" content="/bsc_logo.png" />
        </MetaTags>
        <div className="content_wrapper clearfix"> 
          <div className="sections_group">
            <div className="entry-content">
              <div className="mfn-main-slider" id="mfn-rev-slider">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="defi_banner_left">
                        <p>Introducing</p>
                        <h1>Arrano Blockchain</h1>
                        <h2>One stop platform for Smart Contracts, <span>NFT</span>’s and Crypto products.</h2>
                        <div className="border_main_color_gradient" />                        <p>Label you work on Blockchain technology, Build Apps, Decentralized exchange, wallet, Launchpad and more crypto solutions. </p> 
                        <Link to="/roadmap">
                          <button className="button_outline" type="button"><img src="assets/images/roadmap_banner_icon.png" alt="roadmap_banner_icon"/>Roadmap</button>
                        </Link> 

                        <h5 className="claim_token andx_defi"><a href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0xb63a911ae7dc40510e7bb552b7fcb94c198bbe2d" target="_blank" rel="noreferrer" className="defi_announce"><span className="blink_me">ANDX BEP20 Swap is Live</span></a></h5>
 
                        
                      </div>
                    </div>
                    <div className="col-md-1"/>
                    <div className="col-md-5">
                      <div className="homeswap_form home_form_swap">
                      <div className="col-md-12">
                        <ul className="nav nav-tabs hometabs_btn">
                          <li className="active"><a data-toggle="tab" href="#home" className="active">Swap</a></li>
                          <li><a data-toggle="tab" href="#menu1">Liquidity</a></li> 
                        </ul>
                      </div>
                      
                      <div className="tab-content">
                        <div id="home" className="tab-pane fade in active show">
                          <Swap/> 
                        </div>
                        <div id="menu1" className="tab-pane fade">
                          <Pool />
                        </div>
                        </div>

                         
                        {/* <Swap/> */}
                        {/* <Pool /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section mcb-section equal-height-wrap token_sale_values">
                <div className="container"> 
                  <div className="row">
                    <div className="col-md-6">
                      <div className="token_block_value">
                        <div className="row">
                          <div className="col-md-12 col-12">
                            <h6 className="live_trading"><span className="blink_me">Trading Live </span></h6>
                            <h4><img src="/assets/images/andx.png" alt="ANDX" /> Arrano DEX <span>ANDX</span></h4>
                            <p className="mb-4">Defi token to power up blockchain developments</p>
                            <div className="row"> 
                              <div className="col-md-7">
                                <p>Total Supply</p>
                                <h2><span>81800</span> ANDX <span className="live_trading"><span style={{background: '#3861fb'}}><a href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0xb63a911ae7dc40510e7bb552b7fcb94c198bbe2d" target="_blank" rel="noreferrer"  style={{color: '#fff', fontWeight: 400}}>Trade Now</a></span></span></h2>
                              </div>
                            </div>

                            <ul className="quick_links"> 
                              <li><a href="https://bscscan.com/token/0xb63a911ae7dc40510e7bb552b7fcb94c198bbe2d" target="_blank" rel="noreferrer"><img alt="search" src="/assets/images/ano_andx_search.png" /> Contract</a></li>
                              <li><a href="https://t.me/arranonetwork" target="_blank" rel="noreferrer"><img src="/assets/images/ano_andx_user.png"  alt="ano_andx_user"/> Community</a></li>
                              <li><a href="http://arrano.network/whitepaper.pdf" target="_blank" rel="noreferrer"><img src="/assets/images/ano_andx_whitepaper.png"  alt="ano_andx_whitepaper" /> Whitepaper</a></li>
                            </ul>
                            
                            <ul className="nav nav-tabs andx_navbar">
                              <li><a data-toggle="tab" className="active" href="#ANDX_trading">ANDX Trading</a></li>
                              <li><a data-toggle="tab" href="#andx_wallet">ANDX Wallet</a></li>
                              
                            </ul>

                            <div className="tab-content tabs_content_trading_live">
                              <div id="ANDX_trading" className="tab-pane fade in active show">
                               

                                <div className="panel-group" id="faqAccordion">
                                  <div className="panel panel-default ">
                                      <div className="panel-heading accordion-toggle question-toggle collapsed" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question0">
                                          <h4 className="panel-title">
                                            <span className="ing"><img src="/assets/images/bnb.png" alt="bnb"/>Binance Smart Chain (BSC) </span>
                                        </h4>
                                      </div>
                                      <div className="panel-collapse collapse show">
                                          <div className="panel-body">
                                              <ul className="tabs_content_ul">
                                                <li><a href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0xb63a911ae7dc40510e7bb552b7fcb94c198bbe2d" target="_blank" rel="noreferrer"><img src="/assets/images/pancake.png" alt="pancake" />Pancake Swap</a></li>
                                                <li><img src="/assets/images/burger.png"  alt="burger" />Burger Swap</li>
                                                <li><img src="/assets/images/graph.png" alt="graph" />The Graph Token Swap</li>
                                              </ul>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="panel panel-default ">
                                      <div className="panel-heading accordion-toggle collapsed question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question1">
                                          <h4 className="panel-title">
                                          <span className="ing"><img src="/assets/images/trx.png"  alt="trx" />Tron Smart Chain (TSC)</span>
                                        </h4>

                                      </div>
                                      <div className="panel-collapse collapse show">
                                        <div className="panel-body">
                                            <ul className="tabs_content_ul">
                                              <li><img src="/assets/images/just.png"  alt="just" />Just Swap</li>
                                              <li><img src="/assets/images/juld.png"  alt="graph" />Juld Swap</li>
                                              <li><img src="/assets/images/graph.png"  alt="graph" />Grap Token Swap</li>
                                            </ul>
                                        </div>
                                      </div>
                                  </div>

                                  <div className="panel panel-default ">
                                      <div className="panel-heading accordion-toggle collapsed question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question1">
                                          <h4 className="panel-title">
                                          <span className="ing"><img src="/assets/images/deth.png" alt="graph" />Ethereum Network (ERC 20)</span>
                                        </h4>

                                      </div>
                                      <div className="panel-collapse collapse show">
                                        <div className="panel-body">
                                            <ul className="tabs_content_ul">
                                              <li><img src="/assets/images/d1inch.png" alt="d1inch" />1Inch</li>
                                              <li><img src="/assets/images/dcurve.png" alt="dcurve" />Curve</li>
                                              <li><img src="/assets/images/duni.png" alt="duni" />Uniswap</li>
                                            </ul>
                                        </div>
                                      </div>
                                  </div>
                              </div>

                              </div>
                              <div id="andx_wallet" className="tab-pane fade">
                                <div className="panel panel-default ">
                                    <div className="panel-heading accordion-toggle collapsed question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question1">
                                        <h4 className="panel-title">
                                        <span className="ing">Supported Wallets</span>
                                      </h4>
                                    </div>
                                    <div className="panel-collapse collapse show">
                                      <div className="panel-body">
                                          <ul className="tabs_content_ul">
                                            <li><img src="/assets/images/meta_mask.png" alt="meta_mask" />Meta Mask</li>
                                            <li><img src="/assets/images/trust_wallet.png" alt="trust_wallet" />Trust Wallet</li>
                                            <li><img src="/assets/images/bnb.png" alt="bnb" />Binance Wallet</li>
                                          </ul>
                                      </div>
                                    </div>
                                  </div>
                              </div>
                             
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="token_block_value">
                        <div className="row">
                          <div className="col-md-12 col-12">
                            <h6 className="live_trading"><span>Distribution</span></h6>
                            <h4><img src="/assets/images/ano_home.png" alt="ANDX" /> Arrano Token <span>ANO</span></h4>
                            <p className="mb-4">Native token of Arrano blockchain network</p>
                            <div className="row">
                              <div className="col-md-6">
                                <p>Total Supply</p>
                                <h2><span>1 Bn</span> <span className="growth_rate">ANO</span></h2>
                              </div>
                              <div className="col-md-6">
                                <p>Community Distribution</p>
                                <h2><span>49%</span></h2>
                              </div>
                            </div> 
                            <div className="main_ano_coming_soon">
                            <ul className="quick_links"> 
                              <li><a href="https://bscscan.com/token/0xb63a911ae7dc40510e7bb552b7fcb94c198bbe2d" target="_blank" rel="noreferrer"><img src="/assets/images/ano_andx_search.png" alt="ano_andx_search" /> Contract</a></li>
                              <li><a href="https://t.me/arranonetwork" target="_blank" rel="noreferrer"><img src="/assets/images/ano_andx_user.png" alt="ano_andx_user" /> Community</a></li>
                              <li><a href="http://arrano.network/whitepaper.pdf" target="_blank" rel="noreferrer"><img src="/assets/images/ano_andx_whitepaper.png"  alt="ano_andx_whitepaper"/> Whitepaper</a></li>
                            </ul>
                              <ul className="nav nav-tabs andx_navbar">
                                <li><a data-toggle="tab" className="active" href="#ANDX_trading">ANDX Trading</a></li>
                                <li><a data-toggle="tab" href="#andx_wallet">ANDX Wallet</a></li>
                                
                              </ul>

                              <div className="tab-content tabs_content_trading_live">
                                <div id="ANDX_trading" className="tab-pane fade in active show">
                                

                                  <div className="panel-group" id="faqAccordion">
                                  <div className="panel panel-default ">
                                      <div className="panel-heading accordion-toggle question-toggle collapsed" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question0">
                                          <h4 className="panel-title">
                                            <span className="ing"><img src="/assets/images/bnb.png" alt="bnb" />Binance Smart Chain (BSC) </span>
                                        </h4>
                                      </div>
                                      <div className="panel-collapse collapse show">
                                          <div className="panel-body">
                                              <ul className="tabs_content_ul">
                                                <li><a href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0xb63a911ae7dc40510e7bb552b7fcb94c198bbe2d" target="_blank" rel="noreferrer"><img src="/assets/images/pancake.png" alt="pancake" />Pancake Swap</a></li>
                                                <li><img src="/assets/images/burger.png" alt="burger" />Burger Swap</li>
                                                <li><img src="/assets/images/graph.png" alt="graph" />The Graph Token Swap</li>
                                              </ul>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="panel panel-default ">
                                      <div className="panel-heading accordion-toggle collapsed question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question1">
                                          <h4 className="panel-title">
                                          <span className="ing"><img src="/assets/images/trx.png" alt="trx" />Tron Smart Chain (TSC)</span>
                                        </h4>

                                      </div>
                                      <div className="panel-collapse collapse show">
                                        <div className="panel-body">
                                            <ul className="tabs_content_ul">
                                              <li><img src="/assets/images/just.png"  alt="just"/>Just Swap</li>
                                              <li><img src="/assets/images/juld.png"  alt="juld"/>Juld Swap</li>
                                              <li><img src="/assets/images/graph.png" alt="graph" />Grap Token Swap</li>
                                            </ul>
                                        </div>
                                      </div>
                                  </div>

                                  <div className="panel panel-default ">
                                      <div className="panel-heading accordion-toggle collapsed question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question1">
                                          <h4 className="panel-title">
                                          <span className="ing"><img src="/assets/images/deth.png" alt="deth" />Ethereum Network (ERC 20)</span>
                                        </h4>

                                      </div>
                                      <div className="panel-collapse collapse show">
                                        <div className="panel-body">
                                            <ul className="tabs_content_ul">
                                              <li><img src="/assets/images/d1inch.png" alt="d1inch" />1Inch</li>
                                              <li><img src="/assets/images/dcurve.png" alt="dcurve" />Curve</li>
                                              <li><img src="/assets/images/duni.png" alt="duni" />Uniswap</li>
                                            </ul>
                                        </div>
                                      </div>
                                  </div>
                                </div>
                                </div>
                               
                              </div>
                             
                            </div>
                            <div className="main_block_live_distribution">
                                <h3>ANO Token<br/>Community Allocation is Live</h3>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section mcb-section home_market_section">
                <div className="container"> 
                    <div className="row">
                      <div className="col-md-6 arranomarkets">
                        <h3>Arrano Markets</h3>
                        <h5>Watch and Track Details and live reports of Defi tokens. Live Price, Graphs, Available exchanges, links and more. </h5>
                        <a href="/market"><button className="market_button_main" type="button">Visit Page</button></a>
                      </div>
                      <div className="col-md-6">
                        <ul>
                          {
                            getMarketsList 
                            ?
                            <>
                            {
                                getMarketsList.map((item) =>{
                                return (<li> 
                                   {/* eslint-disable-next-line prefer-template */}
                                  <Link to={"/market/"+item.symbol.toUpperCase()}>
                                    <div className="main_market_display">
                                      <div className="media">
                                        <div className="media-body">
                                          <h4 style={{textTransform:"uppercase"}}>{item.symbol}</h4>
                                          <h6>$ {item.current_price}</h6>
                                          {
                                            item.price_change_percentage_24h > 0 ?
                                            <p className="green">{(item.price_change_percentage_24h).toFixed(2)}% in 24Hrs</p>
                                            :
                                            <p className="red">{(item.price_change_percentage_24h).toFixed(2)}% in 24Hrs</p>
                                          }
                                        </div>
                                        <img src={item.image} alt={item.symbol} className="ml-3" />
                                      </div>
                                    </div>
                                  </Link>
                                </li>)
                                } 
                                )
                            }
                            </>
                            :
                            null
                          }
                      
                        </ul>
                      </div>
                    </div>
                </div>
              </div>

              <div className="section mcb-section ano_product_home">
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <h3>Arrano Products</h3>
                      <p>Fair Crypto products developed by the Arrano Experts with 8+ years of industry experience.</p>
                    </div>
                    <div className="col-md-8">
                    <div id="demo" className="carousel slide" data-ride="carousel">
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row">
                              <div className="col-md-4">
                                <div className="market_product">
                                  <img src="/assets/images/prod5.png" alt="Arrano P2P"/>
                                  <h4>Arrano P2P</h4>
                                  <p>Convert your Crypto to Fiat instantly.</p>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="market_product">
                                  <img src="/assets/images/prod1.png" alt="Portfolio Tracker"/>
                                  <h4>Portfolio Tracker </h4>
                                  <p>Tool to track your trading performance </p>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="market_product">
                                  <img src="/assets/images/prod2.png" alt="Launchpad"/>
                                  <h4>Launchpad</h4>
                                  <p>Tokenized funding on new crypto projects.</p>
                                </div>
                              </div>
                            </div>

                        </div>
                        <div className="carousel-item">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="market_product">
                                <img src="/assets/images/prod3.png" alt="Arrano Academy"/>
                                <h4>Arrano Academy</h4>
                                <p>Learn blockchain and crypto from experts. </p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="market_product">
                                <img src="/assets/images/prod4.png" alt="Tokenized Stocks"/>
                                <h4>Tokenized Stocks</h4>
                                <p>Buy/Sell real stocks on blockchain platform </p>
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="market_product">
                                <img src="/assets/images/prod6.png" alt="Arrano Talk" />
                                <h4>Arrano Talk</h4>
                                <p>Buy/Sell real stocks on blockchain platform </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                      </div>

                      
                      <a className="carousel-control-prev" href="#demo" data-slide="prev">
                        <span className="carousel-control-prev-icon"/>
                      </a>
                      <a className="carousel-control-next" href="#demo" data-slide="next">
                        <span className="carousel-control-next-icon"/>
                      </a>

                    </div>
                    </div>
                  </div>
                  

                </div>
              </div>

             
              <div className="section mcb-section network_council">
                <div className="section_wrapper mcb-section-inner">
                  <div className="wrap mcb-wrap one valign-top clearfix">
                    <div className="mcb-wrap-inner ">
                      <div className="column mcb-column one column_fancy_heading">
                        <div className="fancy_heading fancy_heading_icon">
                          <h2 className="title">The Arrano Network Community</h2>
                          <p>An open-source administrative Body of Arrano Network that consists of top contributors with authority to make decisions, perform basic operations, or develop DApps as per the community standards.</p>
                        </div>
                      </div>
                      <div className="column mcb-column one column_blog ">
                        <div className="column_filters">
                          <div className="blog_wrapper isotope_wrapper clearfix container">
                            <div className="posts_group lm_wrapper col-4 grid">
                              <div className="post-item isotope-item clearfix post type-post format-standard has-post-thumbnail hentry category-mobile category-motion tag-css3 tag-design tag-eclipse tag-framework tag-grid">
                                <div className="date_label">
                                  February 3, 2017
                                </div>
                                <div className="image_frame post-photo-wrapper scale-with-grid image">
                                  <img src="/assets/images/network-council-1.png" className="scale-with-grid wp-post-image" alt="Developer" />
                                </div>
                                <div className="post-desc-wrapper council_description">
                                  <div className="post-desc">
                                    <div className="post-title">
                                      <h2 className="entry-title" itemProp="headline"><a href="content/betheme/post_page_7.html">Developer</a></h2>
                                    </div>
                                    <div className="post-excerpt">
                                      <p>Front-end Developers and UX/UX designers who contribute their skills to build Arrano Network’s Defi Modules. Work under a pool environment with contributions all recorded individually.  
                                      </p>
                                    </div>
                                    <div className="post-footer">
                                      <h6><a href="https://arrano.network/r?path=1">Join Now</a> <a href="https://arrano.network/claim-ano#developer" className="pull-right">View More</a></h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="post-item isotope-item clearfix post type-post format-standard has-post-thumbnail hentry category-motion category-photography tag-html5 tag-mysql tag-themeforest tag-wordpress tag-zend">
                                <div className="date_label">
                                  February 3, 2017
                                </div>
                                <div className="image_frame post-photo-wrapper scale-with-grid image">
                                  <div className="image_frame post-photo-wrapper scale-with-grid image">
                                    <img src="/assets/images/network-council-2.png" className="scale-with-grid wp-post-image" alt="Media & Authors" />
                                  </div>
                                </div>
                                <div className="post-desc-wrapper council_description">
                                  <div className="post-desc">
                                    <div className="post-title">
                                      <h2 className="entry-title" itemProp="headline"><a href="content/betheme/post_page_5.html">Media &amp; Authors</a></h2>
                                    </div>
                                    <div className="post-excerpt">
                                      <p>Right from creating rich content in text, images, and AV form to promoting it over Social media, blogs, forums, Visual platforms, and Podcasts, these Media contributors play an important role.</p>
                                    </div>
                                    <div className="post-footer">
                                      <h6><a href="https://arrano.network/r?path=2">Join Now</a> <a href="https://arrano.network/claim-ano#media" className="pull-right">View More</a></h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="post-item isotope-item clearfix post type-post format-standard has-post-thumbnail hentry category-mobile category-photography tag-css3 tag-eclipse tag-themeforest tag-zend">
                                <div className="date_label">
                                  February 3, 2017
                                </div>
                                <div className="image_frame post-photo-wrapper scale-with-grid image">
                                  <div className="image_frame post-photo-wrapper scale-with-grid image">
                                    <img src="/assets/images/network-council-3.png" className="scale-with-grid wp-post-image" alt="Traders" />
                                  </div>
                                </div>
                                <div className="post-desc-wrapper">
                                  <div className="post-desc council_description">
                                    <div className="post-title">
                                      <h2 className="entry-title" itemProp="headline"><a href="content/betheme/post_page_1.html">Traders</a></h2>
                                    </div>
                                    <div className="post-excerpt">
                                      <p>This is for the active Investors who will buy the Arrano token , hold it, or exchange it over different wallets and exchange to enjoy the leverages of token price and other DeFi products. </p>
                                    </div>
                                    <div className="post-footer">
                                      <h6><a href="https://arrano.network/r?path=3">Join Now</a> <a href="https://arrano.network/claim-ano#introduces" className="pull-right">View More</a></h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="post-item isotope-item clearfix post type-post format-standard has-post-thumbnail hentry category-mobile tag-design tag-eclipse">
                                <div className="date_label">
                                  February 3, 2017
                                </div>
                                <div className="image_frame post-photo-wrapper scale-with-grid image">
                                  <div className="image_frame post-photo-wrapper scale-with-grid image">
                                    <img src="/assets/images/network-council-4.png" className="scale-with-grid wp-post-image" alt="Introducers" />
                                  </div>
                                </div>
                                <div className="post-desc-wrapper">
                                  <div className="post-desc council_description">
                                    <div className="post-title">
                                      <h2 className="entry-title" itemProp="headline"><a href="content/betheme/post_page_3.html">Introducers</a></h2>
                                    </div>
                                    <div className="post-excerpt">
                                      <p>They Promote platforms to connections over different social platforms and create great impact on ground-level authority of projects by educating people to understand Arrano Network.</p>
                                    </div>
                                    <div className="post-footer">
                                      <h6><a href="https://arrano.network/r?path=4">Join Now</a> <a href="https://arrano.network/claim-ano#traders" className="pull-right">View More</a></h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="section mcb-section home_media_partners">
                <div className="container">
                  <div className="col-md-12">
                    <h3>Partners</h3>
                    <p>Promoted and Supported by</p>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="media_partners_block">
                          <ul>
                            <li>
                            <a href="https://www.newsbtc.com/press-releases/this-defi-token-is-your-opportunity-to-enter-2021-with-new-age-decentralized-finance/">
                            
                              <img src="/assets/images/newsbtc.png" alt="newsbtc" /></a>
                            </li>
                            <li>
                            <a href="https://visionary-finance.com/is-andx-token-suitable-for-long-term-investment/">
                           
                              <img src="/assets/images/vf.png" style={{width: '60px'}}  alt="vf"/></a>
                            </li>
                            <li>
                            <a href="https://coingape.com/arrano-dex-launch-could-propel-its-native-token-andx-to-moon/">
                           
                              <img src="/assets/images/coingape.png" alt="coingape" /></a>
                            </li>
                            <li>
                            <a href="https://coinpedia.org/">
                            
                              <img src="/assets/images/coinpedia.png"  alt="coinpedia" /></a>
                            </li>
                            <li>
                            <a href="https://www.coingecko.com/">
                              
                              <img src="/assets/images/coingeeko.webp" alt="coingeeko" /></a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="modal" id="andx_usecases">
                <div className="modal-dialog claim_auto readmore_ano_tokens">
                  <div className="modal-content ">
                    <div className="modal-body text-left">
                      <button type="button" className="close" data-dismiss="modal" >&times;</button>
                      
                      <h2>Use Cases of ANDX token</h2>
                      <ul>
                        <li>Holding ANDX will make you stake holder of Arrano Dex.</li>
                        <li>Trade ANDX on multiple DEX platforms.</li>
                        <li>Promoted to premium member of the community.</li>
                        <li>Authority to Vote in decisions of Arrano developments</li>
                        <li>Get special rewards and earning opportunities. </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal" id="ano_usecases">
                <div className="modal-dialog claim_auto readmore_ano_tokens">
                  <div className="modal-content ">
                    <div className="modal-body text-left">
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                      
                      <h2>Use Cases of ANO token</h2>
                      <ul>
                        <li>Get Rewards </li>
                        <li>Pay transaction fees of decentralized exchange and others </li>
                        
                        <li>Lending, Staking and other Financing</li>
                        <li>Trade on Exchanges on listing</li>
                        <li>Convert to Fiat currency in Arrano P2P.</li>
                        <li>Make Utility Payments 
                          <ul>
                            <li>Mobile Recharge</li>
                            <li>Bill Payments</li>
                            <li>Ticket Booking</li>
                            <li>Ecommerce</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </>
    );
  } 
}

export default Home;