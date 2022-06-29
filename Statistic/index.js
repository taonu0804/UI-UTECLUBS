import React, { Component } from 'react';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import './style.css';

class StatisticFeature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'SK1', Attendee: 58},
                {name: 'SK2', Attendee: 68},
                {name: 'SK3', Attendee: 54},
                {name: 'SK4', Attendee: 33},
                {name: 'SK5', Attendee: 45},
                {name: 'SK6', Attendee: 23},
            ]
        }
    }

    render() {
        const { data } = this.state;
    
        return (
        <div className='chart-name'>
            <p className='name-'><b>EVENT STATISTIC</b></p>

            <ResponsiveContainer className="chart" height={600}>
                <LineChart
                width={400}
                height={600}
                data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="Attendee" stroke="#8884d8" activeDot={{r: 4}}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
        );
    }
}

export default StatisticFeature;