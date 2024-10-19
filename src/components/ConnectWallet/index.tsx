import { usePolkadot } from 'hooks/usePolkadot'
import { truncate } from 'utils'

export default function ConnectWallet() {
  const { loadAccounts, state } = usePolkadot()
  return (
    <button
      onClick={loadAccounts}
      className="w-[224px] items-center justify-center rounded-[8px] bg-[rgb(230,0,122,0.2)] px-4 py-2 text-white active:scale-95"
    >
      <h1 className="font-unbounded text-sm font-medium tracking-tight text-[#E6007A] ">
        {state.selectedAccount ? truncate(state.selectedAccount) : 'Connect'}
      </h1>
    </button>
  )
}
