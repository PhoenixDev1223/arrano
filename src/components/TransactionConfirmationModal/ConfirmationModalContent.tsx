import React from 'react'
import { Wrapper, Section, BottomSection, ContentHeader } from './helpers'

type ConfirmationModalContentProps = {
  title: string
  onDismiss: () => void
  topContent: () => React.ReactNode
  bottomContent: () => React.ReactNode
}

const ConfirmationModalContent = ({ title, bottomContent, onDismiss, topContent }: ConfirmationModalContentProps) => {
  return (
    <Wrapper>
      <Section className="confirm_swap_popup">
        <ContentHeader onDismiss={onDismiss}>{title}</ContentHeader>
        {topContent()}
      </Section>
      <BottomSection gap="12px" className="confirm_swap_popup">{bottomContent()}</BottomSection>
    </Wrapper>
  )
}

export default ConfirmationModalContent
