import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Menu, Dropdown, notification } from 'antd';
import styles from '../../styles/nav.module.scss';
import Link from 'next/link'

const Home: NextPage = () => {

  const aboutMenu = (
      <Menu>
          <Menu.Item>关于我</Menu.Item>
          <Menu.Item>退出登录</Menu.Item>
      </Menu>
  );
  return (
    <nav className={styles['page-header']}>
        <div>
            <div className="logo-space">
              <Link  href={'/'} />
            </div>
            <div className="search">
            </div>
            <div className="navigate">
                <Link href={'/'} />
                <Link href={'/'} />
                <Dropdown overlay={aboutMenu} >
                    <Link href={'/about'}/>
                </Dropdown>
            </div>
        </div>
    </nav>
  );
}

export default Home
