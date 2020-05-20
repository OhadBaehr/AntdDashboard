import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../Routes';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import './Navigation.less';
const { Header} = Layout;
function getCurrentPage(){
	const routes=Object.values(ROUTES)
	for(let i=1; i<=routes.length;i++){
		console.log(window.location.pathname,routes[i])
		if(window.location.pathname.indexOf(routes[i])!==-1){
			return i+1
		}
	}
	return 1
}
const Navigation = () => (
	<Layout className="layout" style={{ border: '2px solid #001529' }}>
		<Header className={'menu-overide'}>
			<div className="logo" />
			<Menu theme="dark" mode="horizontal" defaultSelectedKeys={`${getCurrentPage()}`}>
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
