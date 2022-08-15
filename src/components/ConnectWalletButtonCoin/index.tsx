import React from 'react'
import { Button, ButtonProps, useWalletModal} from '@pancakeswap-libs/uikit'
import useAuth from '../../hooks/useAuth'
import useI18n from '../../hooks/useI18n'

const UnlockButton: React.FC<ButtonProps> = (props) => {
  const TranslateString = useI18n()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <div>
      {/* <div className="connect_bscscan_wallet">
        <ConnectWalletButtonCoin className="connect-btn" width="100%" />
        <h2>Click to Connect to Wallet</h2> 
      </div> */}



    <Button onClick={onPresentConnectModal} {...props}>
      { 
        localStorage.getItem("token_address")
        ? 
        /* eslint-disable prefer-template */
        localStorage.getItem("token_address")?.slice(0,4)+"..."+(localStorage.getItem("token_address")?.slice((localStorage.getItem('token_address') || '{}')?.length-4, localStorage.getItem("token_address")?.length ))
        :
        TranslateString(292, 'Click to Connect to Wallet') 
      }
    </Button>
    </div>
  )
}

export default UnlockButton
