import Avatar from 'components/Avatar'
import ConnectWallet from 'components/ConnectWallet'
import logo from 'assets/logo.svg'

export default function Header() {
  return (
    <nav className="flex w-[90%] items-center justify-between rounded-[0.5em] border-2 border-[#252525] p-1">
      <Avatar size="medium" src={logo} />
      <div className="flex items-center justify-center p-2 text-white">
        <ConnectWallet />
      </div>
    </nav>
  )
}
