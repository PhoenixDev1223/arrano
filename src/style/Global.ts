import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }

  ul {
    list-style: none; 
  }

  li {
    display: flex;
    align-items: center;
  }

  .ivjYHr{
    display:none;
}
.etICQo {
  
  background-color: #efdf02;
  color: #444343;
}
.dkssfC {
  background-color: transparent;
  color: #aca000;
}
.cVcfmQ {
  color: #0d0d0d;
   
}
.gpNzCb {
  color: #0d0d0d9e;
  
}
.cqDcBG{
background: linear-gradient(to top right, #baa306 0%, #efdf02 100%);
border: 0px solid #bba407 !important;
box-shadow: 0 0 4px #000 !important;
}
.ywvqG {
  color: #0d0d0d;
  
}
.itlviw {
   
  color: #d9ca00;
 
}
.hOHFCO {

  color: #efdf02;
 
}
.iTStsT {
  color: #0d0d0d;
  
}
.eggwsi {
  color: #444343;
}
.ctEzcz svg {
  fill: #0d0d0d;
}
.hZpnTq {
  
  fill: #0d0d0d;
   
}
.hdNWeR svg {
  display: none;
 
}
 

.iuuYre {
  fill: #0d0d0d;
}
.cNgHew {
  color: #0d0d0d;
  
}
.cdroFr {
  color:#0d0d0d;
  
}
.jMGdep {
 
  color: #070708;
 
}
.cjpbdO {
  color: #0d0d0d;
}

.bwDifc {
  color: #0d0d0d;
   
}

 
.boRdxV {
    color: #aea205;
     
}
`

export default GlobalStyle
