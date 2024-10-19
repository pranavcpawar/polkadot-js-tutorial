import { usePolkadot } from 'hooks/usePolkadot'
import Header from './Header'
import AccountInfo from './Account'
import GetRPC from './GetRPC'
import Transfer from './Transfer'
import { Toaster } from 'sonner'
// import Sign from './Sign'

function App() {
  // TODO
  const { rpc, setRpc, pubKey, setPubKey, isRPC, setIsRPC } = usePolkadot()

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center space-y-4 overflow-hidden p-3">
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Header />
      <div className="flex flex-1 flex-col place-items-start items-center justify-start gap-4">
        <h3 className="font-unbounded text-lg tracking-tight text-white sm:text-xl">
          Polkadot-JS API Tutorial
        </h3>
      </div>
      {/* <Sign /> */}
      <Transfer />
      <div className="flex flex-1 flex-col place-items-start items-center justify-start gap-4">
        {isRPC ? (
          <AccountInfo
            rpc={rpc}
            isRPC={isRPC}
            setIsRPC={setIsRPC}
            setRpc={setRpc}
          />
        ) : (
          <GetRPC
            isRPC={isRPC}
            setIsRPC={setIsRPC}
            setPubKey={setPubKey}
            pubKey={pubKey}
            setRpc={setRpc}
            rpc={rpc}
          />
        )}
      </div>
    </div>
  )
}

export default App
