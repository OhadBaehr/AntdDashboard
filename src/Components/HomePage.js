import React from 'react';
import './HomePage.less';
import AntdIcon from '../Images/AntdIcon.svg';
import ReactIcon from '../Images/ReactIcon.svg';
const Homepage = () => (
	<div className="homepage-container">
		<div>This project is created with the React UI library antd</div>
		<div className="react-antd-images">
			<img
				src={AntdIcon}
				alt={'Ant Design Icon'}
				className="homepage-icon"
				style={{ width: '25vw', maxWidth: 200 }}
			/>
			<span style={{ fontSize: 30, margin: '0 20px', color: '#aaa' }}>+</span>
			<img
				src={ReactIcon}
				alt={'Ant Design Icon'}
				className="homepage-icon"
				style={{ width: '25vw', maxWidth: 200 }}
			/>
		</div>
		<div>Enjoy!</div>
	</div>
);

export default Homepage;
