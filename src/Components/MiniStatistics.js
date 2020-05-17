import React, { useContext } from 'react'
import DefaultUserData, { userData } from '../Store'
import './Statistics.less'
import { Typography } from 'antd';
import { FrownOutlined } from '@ant-design/icons'
import ColumnChart, { PieChartBirthYear, UserCounter, PieChartProfiles } from './Charts'
const { Title } = Typography;

const MiniStatistics = (props) => {
    const { data } = useContext(DefaultUserData)
    return (

        <div className="statistics-container">
            {data.length ?
                <>
                    <UserCounter data={data} />
                    <div className="charts-row">
                        <ColumnChart data={data} />
                        <PieChartBirthYear data={data} />
                    </div>
                </>
                :
                <Title level={3} className="data-message" style={{ color: "rgba(0, 0, 0, 0.65)" }}>No Data to Show <FrownOutlined /></Title>
            }
        </div>

    )
}

export default MiniStatistics