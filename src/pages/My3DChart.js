import React from 'react';
import Plot from 'react-plotly.js';

const My3DChart = () => (
    <Plot
        data={[
            {
                type: 'scatter3d',
                mode: 'markers',
                x: [1, 2, 3, 4],
                y: [10, 20, 30, 40],
                z: [5, 15, 25, 35],
                marker: { size: 10, color: 'blue' },
            },
        ]}
        layout={{ title: '3D Scatter Plot' }}
    />
);

export default My3DChart;
