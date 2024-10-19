import { usePolkadot } from 'hooks/usePolkadot'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Sign() {
  const { signMessage } = usePolkadot()
  const [message, setMessage] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const isValid = await signMessage(message)
      if (isValid) {
        toast.success('Sign successful')
      }
      setMessage('')
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-1"
    >
      <div className="flex w-[95vw] max-w-2xl flex-col items-start justify-center space-y-1 rounded-[0.5em] border-2 border-[#202020] p-4 focus-within:border-[#404040] sm:w-screen">
        <span className="h-6 text-xs text-[#9b9b9b]">Message</span>
        <div className="flex w-full items-center justify-between">
          <input
            type="text"
            placeholder="Enter message to sign"
            className="h-8 w-full bg-inherit font-unbounded text-2xl tracking-tight text-[#FFFFFF] outline-none placeholder:text-[#5d5d5d]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full items-center justify-center rounded-[8px] bg-[rgb(230,0,122,0.2)] px-4 py-2 text-white active:scale-95"
      >
        <h3 className="font-unbounded text-sm text-[#E6007A]">Verify</h3>
      </button>
    </form>
  )
}
