import { usePolkadot } from 'hooks/usePolkadot'

export default function AccountInfo({
  rpc,
  isRPC,
  setIsRPC,
  setRpc
}: {
  rpc: string
  isRPC: boolean
  setIsRPC: React.Dispatch<React.SetStateAction<boolean>>
  setRpc: React.Dispatch<React.SetStateAction<string>>
}) {
  const {
    account,
    getSS58Prefix,
    getAddress,
    getBalances,
    getNonce,
    getDecimals,
    setAccount
  } = usePolkadot()

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex h-9 w-full place-items-end items-center justify-center gap-1">
        <div className="h-full w-1/2 items-end justify-end rounded-[8px] bg-[rgb(230,0,122,0.2)] px-4 py-2 text-white active:scale-95">
          <h3 className="font-unbounded text-sm tracking-tight text-[#E6007A]">
            {account.chain ? account.chain : 'loading...'}
          </h3>
        </div>
        <button
          className="h-full w-1/2 items-end justify-end rounded-[8px] bg-[rgb(230,0,122,0.2)] px-4 py-2 text-white active:scale-95"
          onClick={() => {
            setIsRPC(!isRPC)
            setRpc('')
            setAccount({
              address: '-',
              chain: '',
              balances: '-',
              ss58PrefixFormat: undefined,
              nonce: '-',
              symbol: '-',
              decimals: 0
            })
          }}
        >
          <h3 className="font-unbounded text-sm text-[#E6007A]">Change RPC</h3>
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 text-white">
        <div className="flex w-[95vw] max-w-2xl flex-col items-start justify-center space-y-1 rounded-[0.5em] border-2 border-[#202020] p-4 focus-within:border-[#404040] sm:w-screen">
          <span className="h-6 text-xs text-[#9b9b9b]">SS58 Prefix Format</span>
          <button
            onClick={() => getSS58Prefix(rpc)}
            className="w-full items-center justify-center rounded-[8px] bg-[rgb(230,0,122,0.2)] px-4 py-2 text-white active:scale-95"
          >
            <h3 className="font-unbounded text-sm text-[#E6007A]">Get</h3>
          </button>
          <div className="flex w-full items-center justify-between">
            <input
              type="text"
              readOnly
              placeholder="-"
              className="h-10 w-full bg-inherit font-unbounded text-xl tracking-tight text-[#FFFFFF] outline-none placeholder:text-[#5d5d5d]"
              value={account.ss58PrefixFormat ?? ''}
            />
          </div>
          <span className="h-3 w-full text-xs text-[#9b9b9b]" />
        </div>
        <div className="flex w-[95vw] max-w-2xl flex-col items-start justify-center space-y-1 rounded-[0.5em] border-2 border-[#202020] p-4 focus-within:border-[#404040] sm:w-screen">
          <span className="h-6 text-xs text-[#9b9b9b]">Decimals</span>
          <button
            onClick={() => getDecimals(rpc)}
            className="w-full items-center justify-center rounded-[8px] bg-[rgb(230,0,122,0.2)] px-4 py-2 text-white active:scale-95"
          >
            <h3 className="font-unbounded text-sm text-[#E6007A]">Get</h3>
          </button>
          <div className="flex w-full items-center justify-between">
            <input
              type="text"
              readOnly
              placeholder="-"
              className="h-10 w-full bg-inherit font-unbounded text-xl tracking-tight text-[#FFFFFF] outline-none placeholder:text-[#5d5d5d]"
              value={account.decimals}
            />
          </div>
          <span className="h-3 w-full text-xs text-[#9b9b9b]" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 text-white">
        <div className="flex w-[95vw] max-w-2xl flex-col items-start justify-center space-y-1 rounded-[0.5em] border-2 border-[#202020] p-4 focus-within:border-[#404040] sm:w-screen">
          <span className="h-6 text-xs text-[#9b9b9b]">Address</span>
          <button
            onClick={() => getAddress(rpc)}
            className="w-full items-center justify-center rounded-[8px] bg-[rgb(230,0,122,0.2)] px-4 py-2 text-white active:scale-95"
          >
            <h3 className="font-unbounded text-sm text-[#E6007A]">Get</h3>
          </button>
          <div className="flex w-full items-center justify-between">
            <input
              type="text"
              readOnly
              placeholder="-"
              className="h-10 w-full bg-inherit font-unbounded text-xl tracking-tight text-[#FFFFFF] outline-none placeholder:text-[#5d5d5d]"
              value={account.address}
            />
          </div>
          <span className="h-3 w-full text-xs text-[#9b9b9b]" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 text-white">
        <div className="flex w-[95vw] max-w-2xl flex-col items-start justify-center space-y-1 rounded-[0.5em] border-2 border-[#202020] p-4 focus-within:border-[#404040] sm:w-screen">
          <span className="h-6 text-xs text-[#9b9b9b]">Balances</span>
          <button
            onClick={() => getBalances(rpc)}
            className="w-full items-center justify-center rounded-[8px] bg-[rgb(230,0,122,0.2)] px-4 py-2 text-white active:scale-95"
          >
            <h3 className="font-unbounded text-sm text-[#E6007A]">Get</h3>
          </button>
          <div className="flex w-full items-center justify-between">
            <input
              type="text"
              readOnly
              placeholder="-"
              className="h-10 w-full bg-inherit font-unbounded text-xl tracking-tight text-[#FFFFFF] outline-none placeholder:text-[#5d5d5d]"
              value={account.balances}
            />
          </div>
          <span className="h-3 w-full text-xs text-[#9b9b9b]" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 text-white">
        <div className="flex w-[95vw] max-w-2xl flex-col items-start justify-center space-y-1 rounded-[0.5em] border-2 border-[#202020] p-4 focus-within:border-[#404040] sm:w-screen">
          <span className="h-6 text-xs text-[#9b9b9b]">Nonce</span>
          <button
            onClick={() => getNonce(rpc)}
            className="w-full items-center justify-center rounded-[8px] bg-[rgb(230,0,122,0.2)] px-4 py-2 text-white active:scale-95"
          >
            <h3 className="font-unbounded text-sm text-[#E6007A]">Get</h3>
          </button>
          <div className="flex w-full items-center justify-between">
            <input
              type="text"
              readOnly
              placeholder="-"
              className="h-10 w-full bg-inherit font-unbounded text-xl tracking-tight text-[#FFFFFF] outline-none placeholder:text-[#5d5d5d]"
              value={account.nonce}
            />
          </div>
          <span className="h-3 w-full text-xs text-[#9b9b9b]" />
        </div>
      </div>
    </div>
  )
}
