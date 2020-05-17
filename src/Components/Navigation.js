import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../Routes';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import './Navigation.less';
const { Header, Content, Footer, Sider } = Layout;
const Navigation = () => (
	<Layout className="layout" style={{ border: '2px solid #001529' }}>
		<Header className={'menu-overide'}>
			<div className="logo" />
			<Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ '1' ]}>
				<Menu.Item key="1" icon={<UserOutlined />}>
					Home
					<Link to={ROUTES.HOME} />
				</Menu.Item>
				<Menu.Item key="2" icon={<UserOutlined />}>
					User Overview
					<Link className="link-item" to={ROUTES.USERDETAILS} />
				</Menu.Item>
				<Menu.Item key="3" icon={<UploadOutlined />}>
					Statistics
					<Link className="link-item" to={ROUTES.STATISTICS} />
				</Menu.Item>
			</Menu>
		</Header>
	</Layout>
);
export default Navigation;
