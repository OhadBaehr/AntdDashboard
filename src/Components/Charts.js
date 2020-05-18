import React from 'react';
import Chart from 'react-apexcharts';
import './Charts.less';
import { Typography } from 'antd';
import moment from 'moment';
const { Title } = Typography;

function getNumberOfUsers(data) {
	return Object.keys(data).length;
}

function getRepetitionBirthday(data) {
	let birthdays = Array.from(new Set(data.flatMap((p) => p.birthday.split('-').splice(-1)))).sort();
	let bla = birthdays.map(
		(count, i) =>
			(count = data.reduce(function (n, person) {
				return n + (person.birthday.split('-').splice(-1)[0] === birthdays[i]);
			}, 0))
	);
	return bla;
}
function generateFillColor(indx) {
	let colors = ['#F44336', '#008ffb', '#feb019', '#E91E63', '#ff4560', '#9C27B0', '#00e396'];
	let index = indx % colors.length;
	return colors[index];
}
function reformatDate(dateStr) {
	let dArr = dateStr.split('-'); // ex input "2010-01-18"
	return `${dArr[2]}-${dArr[1]}-${dArr[0]}`;
}
function getRepetitionCountry(data) {
	let propertyCount = Array.from(new Set(data.flatMap((p) => p.country)));
	let bla = propertyCount.map(
		(count, i) =>
			(count = data.reduce(function (n, person) {
				return n + (person.country === propertyCount[i]);
			}, 0))
	);
	return bla;
}

function getProfilePictureData(data) {
	const withProfile = Object.keys(data.filter((p) => p.profile != null && p.profile !== '')).length;
	const noProfile = getNumberOfUsers(data) - withProfile;
	return [withProfile, noProfile];
}

const ColumnChart = (props) => {
	const chartData = {
		series: [
			{
				data: getRepetitionBirthday(Object.values(props.data))
			}
		],
		options: {
			chart: {
				height: 350,
				type: 'bar'
			},
			colors: ['#F44336', '#008ffb', '#feb019', '#E91E63', '#ff4560', '#9C27B0', '#00e396'],
			plotOptions: {
				bar: {
					distributed: true,
					columnWidth: props.dateTime ? '25%' : '60%'
				}
			},
			title: {
				text: 'Birth Year Distribution',
				align: 'center',
				style: {
					fontSize: '19px',
					color: '#666',
					fontWeight: 'normal',
					fontFamily:
						"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
				}
			}, yaxis: {
				show: false,
			},
			dataLabels: {
				enabled: true
			},
			legend: {
				show: false
			},
			xaxis: {
				categories: Array.from(new Set(Object.values(props.data)
					.flatMap((p) => p.birthday.split('-').splice(-1))))
					.sort(),
				labels: {
					style: {
						fontSize: '13px',
						bottom: true
					}
				}
			},
			tooltip: {
				enabled: false
			}
		}
	};
	return (
		<div>
			<Chart
				className="chart-default"
				options={chartData.options}
				series={chartData.series}
				type="bar"
				height={300}
			/>
		</div>
	);
};

const UserCounter = (props) => {
	const numberOfUser = getNumberOfUsers(Object.values(props.data));
	return (
		<Title level={3} className="data-message" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
			{numberOfUser} {numberOfUser === 1 ? 'User' : 'Users'}
		</Title>
	);
};

const PieChartBirthYear = (props) => {
	const chartData = {
		series: getRepetitionCountry(Object.values(props.data)),
		options: {
			labels: Array.from(new Set(Object.values(props.data).flatMap((p) => p.country))),
			chart: {
				type: 'donut'
			},
			legend: {
				position: 'bottom'
			},
			title: {
				text: 'Country Distribution',
				align: 'center',
				style: {
					fontSize: '19px',
					fontWeight: 'normal',
					color: '#666',
					fontFamily:
						"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
				}
			},
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200
						},
						legend: {
							position: 'bottom'
						}
					}
				}
			]
		}
	};
	return (
		<div>
			<Chart
				className="chart-default"
				options={chartData.options}
				series={chartData.series}
				width={280}
				height={300}
				type="donut"
			/>
		</div>
	);
};

const LineChart = (props) => {
	const chartData = {
		series: [
			{
				data: props.data.flatMap((p, idx) => ({
					x: p.name,
					y: [new Date(reformatDate(p.birthday)).getTime(), new Date().getTime()],
					fillColor: generateFillColor(idx)
				}))
				,
			},
		],
		options: {
			chart: {
				height: 350,
				type: 'rangeBar'
			},
			title: {
				text: 'Age Distribution',
				align: 'center',
				style: {
					fontSize: '19px',
					fontWeight: 'normal',
					color: '#666',
					fontFamily:
						"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
				}
			},
			plotOptions: {
				bar: {
					horizontal: true,
					distributed: true,
					dataLabels: {
						hideOverflowingLabels: false
					}
				}
			},
			dataLabels: {
				enabled: true,
				formatter: function (val, opts) {
					// var label = opts.w.globals.labels[opts.dataPointIndex]
					let a = moment(val[0]);
					let b = moment(val[1]);
					let diff = b.diff(a, 'years');
					return diff + (diff > 1 ? ' years' : ' years');
				},
				style: {
					colors: ['#f3f4f5', '#fff']
				}
			},
			yaxis:{
				max: new Date().getTime(),
			},
			xaxis: {
				type: 'datetime'
			},
			grid: {
				show: false
			}
		}
	};
	return (
		<Chart options={chartData.options} series={chartData.series} type="rangeBar" height={350} />
	);
};

const PieChartProfiles = (props) => {
	const chartData = {
		series: getProfilePictureData(Object.values(props.data)),
		options: {
			labels: ['With profile picture', 'Without profile picture'],
			chart: {
				type: 'donut'
			},
			colors: ['#9C27B0', '#F44336'],
			legend: {
				position: 'bottom'
			},
			title: {
				text: 'Profile Picture Distribution',
				align: 'center',
				style: {
					fontSize: '19px',
					fontWeight: 'normal',
					color: '#666',
					fontFamily:
						"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
				}
			},
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200
						},
						legend: {
							position: 'bottom'
						}
					}
				}
			]
		}
	};
	return (
		<div>
			<Chart
				className="chart-default"
				options={chartData.options}
				series={chartData.series}
				width={280}
				height={300}
				type="donut"
			/>
		</div>
	);
};

export default ColumnChart;
export { PieChartBirthYear, UserCounter, LineChart, PieChartProfiles };
