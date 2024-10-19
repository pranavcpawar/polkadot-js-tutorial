import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'components/App'
import { PolkadotProvider } from 'hooks/usePolkadot'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <PolkadotProvider>
    <App />
  </PolkadotProvider>
)
