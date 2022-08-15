import React from 'react'
import { Button, ButtonProps, useWalletModal} from '@pancakeswap-libs/uikit'
import useAuth from '../../hooks/useAuth'
import useI18n from '../../hooks/useI18n'

const UnlockButton: React.FC<ButtonProps> = (props) => {
  const TranslateString = useI18n()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button onClick={onPresentConnectModal} {...props}>
      { 
        localStorage.getItem("token_address")
        ? 
        /* eslint-disable prefer-template */
        localStorage.getItem("token_address")?.slice(0,4)+"..."+(localStorage.getItem("token_address")?.slice((localStorage.getItem('token_address') || '{}')?.length-4, localStorage.getItem("token_address")?.length ))
        :
        TranslateString(292, 'Connect') 
      }
    </Button>

  )
}

export default UnlockButton
