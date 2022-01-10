import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.scss'
import Nav from '../components/nav';

const Home: NextPage = () => {
  return (
    <main>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className="page-container">
          <span className="loading"></span>
          {
              <div>
                hello world
              </div>
          }
      </div>
    </main>
  )
}

export default Home
