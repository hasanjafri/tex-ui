import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import ScatterChart from 'recharts/lib/chart/ScatterChart';
import ZAxis from 'recharts/lib/cartesian/ZAxis';

class SimpleScatterChart extends React.Component {
  render() {
    return (
      <ResponsiveContainer width="99%" height={420}>
        <ScatterChart width={400} height={400} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <XAxis dataKey={'longitude'} name="longitude" unit="°" type="number" domain={[-180, 180]} allowDuplicatedCategory={false}/>
            <YAxis dataKey={'latitude'} name="latitude" unit="°" type="number" domain={[-90, 90]}/>
            <ZAxis dataKey={'elevation'} range={[300, 1000]} name="elevation" unit="m" type="number"/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            {this.props.data}
        </ScatterChart>
      </ResponsiveContainer>
    );
  }
}

export default SimpleScatterChart;