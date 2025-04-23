import '../public/static/css/prism.css'
import 'remixicon/fonts/remixicon.css'
import { JetBrains_Mono } from 'next/font/google'
import Router from 'next/router'
import * as gtag from '../lib/gtag'
import CommandBar from '../components/CommandBar'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

const Noop = ({ children }) => children

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: '500',
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export default function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || Noop
  
  return (
    <main className={jetbrainsMono.className}>
      <CommandBar>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CommandBar>
    </main>
  )
}