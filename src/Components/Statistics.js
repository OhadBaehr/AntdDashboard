import React, { useContext } from 'react'
import ColumnChart, { PieChartBirthYear, UserCounter, LineChart, PieChartProfiles } from './Charts'
import DefaultUserData, { userData } from '../Store'
import { FrownOutlined } from '@ant-design/icons';
import './Statistics.less'
import { Typography } from 'antd';
const { Title } = Typography;
const Statistics = (props) => {
    const { data } = useContext(DefaultUserData)
    return (

        <div className="statistics-container">
            {data.length ?
                <>
                    <UserCounter data={data} />
                    <div className="charts-row">
                        <PieChartBirthYear data={data} />
                        <PieChartProfiles data={data} />
                    </div>
                    <div className="entire-row-chart">
                        <ColumnChart dateTime={true} data={data} />
                    </div>
                    <div className="entire-row-chart">
                        <LineChart data={data} />
                    </div>
                </>
                :
                <Title level={3} className="data-message" style={{ color: "rgba(0, 0, 0, 0.65)" }}>No Data to Show <FrownOutlined /></Title>
            }
        </div>

    )
}



export default Statistics