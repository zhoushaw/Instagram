import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Menu, Dropdown, notification } from 'antd';
// import styles from '../../styles/nav.module.scss';
import Link from 'next/link'

const Home: NextPage = () => {

  const aboutMenu = (
      <Menu>
          <Menu.Item>关于我</Menu.Item>
          <Menu.Item>退出登录</Menu.Item>
      </Menu>
  );
  return (
    <nav className='fixed top-0 w-full z-10 bg-white border-b border-gray-500 transition-height ease-in-out duration-200'>
        <div className='box-border flex flex-row justify-center items-center mx-auto my-0'>
            <div className="logo-space">
              <Link  href={'/'} > link to</Link>
            </div>
            <div className="search">
            </div>
            <div className="navigate">
                {/* <Link href={'/'} />
                <Link href={'/'} /> */}
                <Dropdown overlay={aboutMenu} >
                    <Link href={'/about'}> to </Link>
                </Dropdown>
            </div>
        </div>
    </nav>
  );
}

export default Home
