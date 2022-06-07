import React, { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'

import { SelectAccount } from './SelectAccount'
import { SelectPayer } from './SelectPayer'
import { LinkingButton } from './LinkingButton'

import { useScrollIntoView } from '../Hooks/useScrollIntoView'

import { getAccounts } from '../Utilts/linking-helpers'

import ExpandIcon from '../ImageAssets/Open.svg'
import CollapseIcon from '../ImageAssets/Close.svg'
import { ReactComponent as Checkmark } from '../ImageAssets/bte_check.svg'
import { ReactComponent as LoaderSVG } from '../ImageAssets/oval.svg'

import { colors } from '../Theme/colors'

const Container = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 0.75rem;
  box-shadow: 0 0.375rem 0.5rem 0 ${colors.boxShadow};
  background-color: ${colors.mossGreen};
  margin-bottom: 1.25rem;
  position: relative;

  &[aria-expanded='false'] {
    background: url(${ExpandIcon}) no-repeat right 0.5rem top 1.125rem,
      ${colors.mossGreen};
  }
`

interface HeadingProps {
  expanded: boolean
}

const Heading = styled.h1`
  box-sizing: border-box;
  color: ${colors.white};
  width: 100%;
  margin: 0;
  font-size: 1.7rem;
  font-weight: 300;
  padding: 0.75rem 2.5rem 0.75rem 1.25rem;
  cursor: ${({ expanded }: HeadingProps) => (expanded ? 'default' : 'pointer')};
  border-radius: inherit;
`

const Subheading = styled.p`
  margin: 0;
  line-height: 1.5rem;
`

const Content = styled.div`
  color: ${colors.white};
  letter-spacing: 0.1px;
  word-break: normal;
  padding: 0 1.25rem 2.25rem 1.25rem;
  max-width: calc(670rem / 16);
`

const CollapseBtn = styled.button`
  background: url(${CollapseIcon}) no-repeat center/auto;
  position: absolute;
  height: 1.5rem;
  width: 1.5rem;
  right: 0.5rem;
  bottom: 1.25rem;
  border: none;
  cursor: pointer;
`

const Steps = styled.ol`
  display: flex;
  flex-direction: column;
  list-style-position: inside;
  padding-left: 1.75rem;
  margin-top: 0.75rem;

  @media (max-width: 700px) {
    padding: 0;
  }
`

const Step = styled.li`
  line-height: 24px;
  margin-bottom: 1.25rem;
`

const StepInfo = styled.p`
  margin-top: 1rem;
  margin-bottom: 0;
`
const Error = styled(StepInfo)`
  color: ${colors.errorRed};
`
const StepInfoImportant = styled(StepInfo)`
  font-weight: bold;
`

const InputContainer = styled.div`
  display: flex;
  margin-top: 10px;
  max-width: calc(535rem / 16);
  box-sizing: border-box;
  height: 60px;
  border: 1px solid ${colors.selectBorder};
  border-radius: 15px;
  background-color: ${colors.selectBackground};
  box-shadow: inset 2px 2px 6px 0 ${colors.selectShadow};
  align-items: center;
  justify-content: center;
`

const Input = styled.input`
  height: 58px;
  width: 90%;
  font-family: Overpass;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.25rem;
  background-color: transparent;
  border: none;
  color: ${colors.white};
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${colors.white};
  }
`

interface ConnectBtnProps {
  disabled: boolean
}

const ConnectBtn = styled.button`
  display: inline-flex;
  background: ${colors.oliveGreen};
  color: ${(props: ConnectBtnProps) =>
    props.disabled ? colors.buttonDisabled : 'white'};
  margin-top: 10px;
  width: 100%;
  max-width: calc(535rem / 16);
  height: 60px;
  border-radius: 15px;
  border: ${(props: ConnectBtnProps) =>
    props.disabled
      ? `1px solid ${colors.borderDisabled}`
      : `1px solid ${colors.white}`};
  box-shadow: 0 6px 8px 0 ${colors.boxShadow};
  font-size: 18px;
  font-weight: 600;
  line-height: 20px;
  text-transform: uppercase;
  align-items: center;
  justify-content: center;
  cursor: ${(props: ConnectBtnProps) => (props.disabled ? 'none' : 'pointer')};
  position: relative;
  opacity: ${(props: ConnectBtnProps) => props.disabled && 0.6};

  @media (max-width: 400px) {
    font-size: 16px;
  }
`

const CheckIcon = styled(Checkmark)`
  position: absolute;
  top: 14px;
  right: 20px;
`

const Loader = styled(LoaderSVG)`
  position: absolute;
  top: 13px;
  right: 20px;
`

export const Linking = () => {
  const [expanded, setExpanded] = useState<boolean>(false)

  const handleExpand = useCallback(() => {
    if (expanded) {
      return
    }
    setExpanded(true)
  }, [expanded])

  const [accounts, setAccounts] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [filteredAccounts, setFilteredAccounts] = useState<any[]>([])

  const [linkingAccount, setLinkingAccount] = useState<any>()
  const [payerAccount, setPayerAccount] = useState<any>()

  const [did, setDid] = useState<string>('')
  const [loadingWallets, setLoadingWallets] = useState<boolean>(false)
  const loadWalletAccounts = async () => {
    if (accounts.length) return
    setError(null)
    setLoadingWallets(true)
    const {allAccounts,filteredAccounts} = await getAccounts()
    if (!allAccounts.length) {
      setError('No wallets found')
      setLoadingWallets(false)
      return
    }
    setAccounts(allAccounts)
    setFilteredAccounts(filteredAccounts)
    setLoadingWallets(false)
  }

  const cardRef = useRef<HTMLDivElement>(null)
  useScrollIntoView(expanded, cardRef)

  return (
    <Container aria-expanded={expanded} ref={cardRef}>
      <Heading onClick={handleExpand} expanded={expanded}>
        Link your web3name and your account address
      </Heading>

      {expanded && (
        <Content>
          <Subheading>
            To link your web3name to your account address:
          </Subheading>
          <Steps>
            <Step>Open your Sporran extension</Step>

            <Step>Click “Manage on-chain DID” </Step>

            <Step>
              Click the clipboard icon to the right of your DID to copy it
            </Step>

            <Step>
              Paste your DID into the field below:
              <InputContainer>
                <Input
                  placeholder="Enter DID"
                  onInput={(e) => setDid((e.target as HTMLInputElement).value)}
                />
              </InputContainer>
            </Step>

            <Step>
              Click “Connect to wallet”
              <ConnectBtn
                disabled={accounts.length > 0}
                onClick={() => loadWalletAccounts()}
              >
                {accounts.length > 0 ? 'Wallets Loaded' : 'Connect To Wallet'}
                {accounts.length > 0 && <CheckIcon />}
                {loadingWallets && <Loader />}
              </ConnectBtn>
              {error && <Error>{error}</Error>}
              <StepInfo>
                This triggers pop-ups to request access to your Polkadot-enabled
                extensions, including Sporran.
              </StepInfo>
            </Step>

            <Step>Click “Allow access” on each wallet </Step>

            <Step>
              Click the arrow next to “Choose Account Name” to open the dropdown
              list. Choose the account address you wish to link to your web3name
              <SelectAccount
                accounts={accounts}
                selected={linkingAccount}
                onSelect={setLinkingAccount}
              />
            </Step>

            <Step>
              Choose the account address you wish to pay the transaction fees
              from. (This may be a different account. Please ensure you choose a
              wallet containing enough KILT to cover the transaction fee –
              currently around 0.0045 KILT.)
              <SelectPayer
                accounts={filteredAccounts}
                selected={payerAccount}
                onSelect={setPayerAccount}
              />
            </Step>

            <Step>
              Click “Link DID With Account Address” (By clicking this button,
              you accept the Terms and Conditions.)
              <StepInfoImportant>
                Note, linking a DID/web3name with an account address is done on
                the blockchain and therefore public and a permanent record. If
                you want to keep your address and funds private, don’t link the
                address to your DID.
              </StepInfoImportant>
              <LinkingButton
                linkingAccount={linkingAccount}
                did={did}
                payerAccount={payerAccount}
              />
              <StepInfo>
                This opens up Sporran which asks you to sign the linking. Enter
                your password and click “Sign”.
              </StepInfo>
              <StepInfo>
                The extension of the account you are linking will pop up. Enter
                your password for that account and click “Sign”.
              </StepInfo>
            </Step>
          </Steps>

          <StepInfo>That's it.</StepInfo>
          <CollapseBtn
            onClick={() => setExpanded(false)}
            aria-label="Collapse content"
          />
        </Content>
      )}
    </Container>
  )
}
