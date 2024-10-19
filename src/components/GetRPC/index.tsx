import { u8aToHex } from '@polkadot/util'
import { decodeAddress } from '@polkadot/util-crypto'
import { usePolkadot } from 'hooks/usePolkadot'
export default function GetRPC({
  rpc,
  setRpc,
  pubKey,
  setPubKey,
  isRPC,
  setIsRPC
}: {
  rpc: string
  setRpc: React.Dispatch<React.SetStateAction<string>>
  pubKey: string
  setPubKey: React.Dispatch<React.SetStateAction<string>>
  isRPC: boolean
  setIsRPC: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { state, getChain } = usePolkadot()

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="flex flex-col items-center justify-center gap-2 text-white">
        <div className="flex w-[95vw] max-w-2xl flex-col items-start justify-center space-y-1 rounded-[0.5em] border-2 border-[#202020] p-4 focus-within:border-[#404040] sm:w-screen">
          <span className="h-6 text-xs text-[#9b9b9b]">Public Key</span>
          <button
            onClick={() =>
              // TODO: add logic here
              setPubKey(u8aToHex(decodeAddress(state.selectedAccount)))
            }
            className="w-full items-center justify-center rounded-[8px] bg-[rgb(230,0,122,0.2)] px-4 py-2 text-white active:scale-95"
          >
            <h3 className="font-unbounded text-sm text-[#E6007A]">Get</h3>
          </button>
          <div className="flex w-full items-center justify-between">
            <input
              type="text"
              readOnly
              placeholder="0x..."
              className="h-10 w-full bg-inherit font-unbounded text-2xl tracking-tight text-[#FFFFFF] outline-none placeholder:text-[#5d5d5d]"
              value={pubKey}
            />
          </div>
          <span className="h-3 w-full text-xs text-[#9b9b9b]" />
        </div>
      </div>
      <form className="flex flex-col items-center justify-center gap-2 text-white">
        <div className="flex w-[95vw] max-w-2xl flex-col items-start justify-center space-y-1 rounded-[0.5em] border-2 border-[#202020] p-4 focus-within:border-[#404040] sm:w-screen">
          <span className="h-6 text-xs text-[#9b9b9b]">Chain RPC</span>
          <div className="flex w-full items-center justify-between">
            <input
              required
              type="text"
              className="h-10 w-full bg-inherit font-unbounded text-2xl tracking-tight text-[#FFFFFF] outline-none placeholder:text-[#5d5d5d]"
              value={rpc}
              onChange={(e) => setRpc(e.target.value)}
            />
          </div>
          <span className="h-3 w-full text-xs text-[#9b9b9b]" />
        </div>
        <button
          type="submit"
          disabled={!rpc}
          onClick={() => {
            setIsRPC(!isRPC)
            getChain(rpc)
          }}
          className="w-full items-center justify-center rounded-[8px] bg-[rgb(230,0,122,0.2)] px-4 py-2 text-white active:scale-95"
        >
          <h3 className="font-unbounded text-sm text-[#E6007A]">Submit</h3>
        </button>
      </form>
    </div>
  )
}
