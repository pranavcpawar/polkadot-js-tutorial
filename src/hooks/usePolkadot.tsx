import {
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react'
import { ApiPromise, WsProvider } from '@polkadot/api'
import {
  web3Enable,
  web3Accounts,
  web3FromSource
} from '@polkadot/extension-dapp'
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { TypeRegistry } from '@polkadot/types'
import {
  decodeAddress,
  encodeAddress,
  signatureVerify
} from '@polkadot/util-crypto'
import { AccountInfo } from '@polkadot/types/interfaces'
import { stringToHex } from '@polkadot/util'

export type Account = {
  address: string
  chain: string
  balances: string
  ss58PrefixFormat: number | undefined
  nonce: string
  symbol: string
  decimals: number | undefined
}

export type User = {
  address: string
  amount: number
}

export type State = {
  connected: boolean
  selectedAccount: string | undefined
}

const initialState: State = {
  connected: false,
  selectedAccount: undefined
}

type Action =
  | { type: 'SET_CONNECTED'; payload: boolean }
  | { type: 'SET_SELECTED_ACCOUNT'; payload: string | undefined }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CONNECTED':
      return { ...state, connected: action.payload }
    case 'SET_SELECTED_ACCOUNT':
      return { ...state, selectedAccount: action.payload }
    default:
      return state
  }
}

interface IPolkadotContextType {
  state: State
  account: Account
  user: User
  setUser: Dispatch<React.SetStateAction<User>>
  setAccount: Dispatch<React.SetStateAction<Account>>
  setSelectedAccount: (account: string | undefined) => void
  loadAccounts: () => void
  getSS58Prefix: (rpc: string) => void
  getAddress: (rpc: string) => void
  getBalances: (rpc: string) => void
  getNonce: (rpc: string) => void
  getDecimals: (rpc: string) => void
  getChain: (rpc: string) => void
  isRPC: boolean
  setIsRPC: Dispatch<React.SetStateAction<boolean>>
  rpc: string
  pubKey: string
  setRpc: Dispatch<React.SetStateAction<string>>
  setPubKey: Dispatch<React.SetStateAction<string>>
  transferFunds: (user: User, rpc: string) => Promise<string | undefined>
  signMessage: (message: string) => Promise<boolean>
}

const PolkadotContext = createContext<IPolkadotContextType | null>(null)

export const PolkadotProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [user, setUser] = useState<User>({
    address: '',
    amount: 0
  })
  const [isRPC, setIsRPC] = useState<boolean>(false)
  const [rpc, setRpc] = useState<string>('')
  const [pubKey, setPubKey] = useState<string>('')
  const [account, setAccount] = useState<Account>({
    address: '-',
    chain: '',
    balances: '-',
    ss58PrefixFormat: undefined,
    nonce: '-',
    symbol: '-',
    decimals: 0
  })
  const [, setInjectedAccounts] = useState<InjectedAccountWithMeta[]>()

  const setConnected = useCallback((connected: boolean) => {
    dispatch({ type: 'SET_CONNECTED', payload: connected })
  }, [])

  const setSelectedAccount = useCallback((account: string | undefined) => {
    dispatch({ type: 'SET_SELECTED_ACCOUNT', payload: account })
  }, [])

  const loadAccounts = useCallback(async () => {
    // TODO: add logic to load accounts
    const extension = await web3Enable('Polkadot-JS API Tutorial')

    if (extension.length > 0) {
      const allAccounts = await web3Accounts()
      setInjectedAccounts(allAccounts)
      localStorage.setItem('isConnected', 'true')
      setConnected(true)

      if (allAccounts.length >= 1) {
        setSelectedAccount(allAccounts[0].address)
      }
    }
  }, [setConnected, setSelectedAccount])

  async function initPolkadotAPI(rpc: string) {
    // TODO: add logic to init polkadot api
    await web3Enable('Polkadot-JS API Tutorial')
    const registry = new TypeRegistry()

    try {
      const api = await ApiPromise.create({
        provider: new WsProvider(rpc),
        registry
      })
      await api.isReady
      return api
    } catch (error) {
      console.error(error)
      return null
    }
  }
  const getSS58Prefix = async (rpc: string) => {
    // TODO: add logic to get ss58 prefix
    const api = await initPolkadotAPI(rpc)
    if (api) {
      setAccount({
        ...account,
        ss58PrefixFormat: api.registry
          .getChainProperties()
          ?.ss58Format.unwrap()
          .toNumber()
      })
    } else {
      setAccount({
        ...account,
        ss58PrefixFormat: undefined
      })
    }
  }

  const getChain = async (rpc: string) => {
    // TODO: add logic to get address
    const api = await initPolkadotAPI(rpc)

    if (api) {
      setAccount({
        ...account,
        chain: (await api.rpc.system.chain()).toHuman()
      })
    } else {
      setAccount({
        ...account,
        chain: '-'
      })
    }
  }
  const getAddress = async (rpc: string) => {
    // TODO: add logic to get address
    const api = await initPolkadotAPI(rpc)

    if (api) {
      setAccount({
        ...account,
        address: encodeAddress(
          decodeAddress(state.selectedAccount),
          account.ss58PrefixFormat
        )
      })
    } else {
      setAccount({
        ...account,
        address: '-'
      })
    }
  }
  const getDecimals = async (rpc: string) => {
    // TODO: add logic to get decimals
    const api = await initPolkadotAPI(rpc)
    if (api) {
      setAccount({
        ...account,
        decimals: api.registry
          .getChainProperties()
          ?.tokenDecimals.unwrap()
          .toArray()[0]
          .toNumber()
      })
    } else {
      setAccount({
        ...account,
        decimals: 0
      })
    }
  }

  const getBalances = async (rpc: string) => {
    // TODO: add logic to get balances
    const api = await initPolkadotAPI(rpc)
    if (api) {
      setAccount({
        ...account,
        balances: (
          (await api.query.system.account(state.selectedAccount)) as AccountInfo
        ).data.free.toHuman()
      })
    } else {
      setAccount({
        ...account,
        balances: '-'
      })
    }
  }

  const getNonce = async (rpc: string) => {
    // TODO: add logic to get nonce
    const api = await initPolkadotAPI(rpc)
    if (api) {
      setAccount({
        ...account,
        nonce: (await api.rpc.system.accountNextIndex(pubKey)).toString()
      })
    } else {
      setAccount({
        ...account,
        nonce: '-'
      })
    }
  }

  const transferFunds = async (user: User, rpc: string) => {
    // TODO: add logic to transfer funds
    const api = await initPolkadotAPI(rpc)
    const transferAmount = user.amount * 10 ** account.decimals!
    const allAccounts = await web3Accounts()
    const firstAccount = allAccounts[0]

    const balance = Number(
      (
        (await api?.query.system.account(pubKey)) as AccountInfo
      ).data.free.toString()
    )

    if (balance > 0 && balance >= transferAmount) {
      const transfer = api?.tx.balances.transferKeepAlive(
        user.address,
        transferAmount.toString()
      )
      const injector = await web3FromSource(firstAccount.meta.source)
      const hash = await transfer?.signAndSend(firstAccount.address, {
        signer: injector.signer
      })

      if (hash) {
        return `${hash}`
      }
    } else {
      throw new Error('Insufficient funds')
    }
  }

  const signMessage = async (message: string) => {
    // TODO: add logic to sign message
    const tempAccount = await web3Accounts().then((accounts) => accounts[0])

    const injector = await web3FromSource(tempAccount.meta.source)
    const signRaw = injector?.signer?.signRaw

    if (!signRaw) {
      throw new Error('Sign raw not available')
    }

    const { signature } = await signRaw({
      address: tempAccount.address,
      data: stringToHex(message),
      type: 'bytes'
    })

    const { isValid } = signatureVerify(message, signature, tempAccount.address)

    if (isValid) return true
    else return false
  }

  useEffect(() => {
    if (localStorage.getItem('isConnected') === 'true') {
      loadAccounts()
    }
  }, [loadAccounts])

  return (
    <PolkadotContext.Provider
      value={{
        state,
        user,
        setUser,
        account,
        setAccount,
        setSelectedAccount,
        loadAccounts,
        getSS58Prefix,
        getAddress,
        getBalances,
        getDecimals,
        getNonce,
        getChain,
        isRPC,
        setIsRPC,
        rpc,
        setRpc,
        pubKey,
        setPubKey,
        transferFunds,
        signMessage
      }}
    >
      {children}
    </PolkadotContext.Provider>
  )
}

export const usePolkadot = () => {
  const context = useContext(PolkadotContext)
  if (!context) {
    throw new Error('usePolkadot must be used within a PolkadotProvider')
  }
  return context
}
