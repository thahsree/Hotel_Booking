import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './chart.css';

const data = [
    {name:"January" , Total:16000},
    {name:"February" , Total:25000},
    {name:"March" , Total:78000},
    {name:"April" , Total:35000},
    {name:"May" , Total:10000},
    {name:"June" , Total:30000},
    
]

function Chart({aspect , title}) {
    return (
        <div className='chart'>
            <div className="title">{title}</div>
            <ResponsiveContainer width='100%' aspect={aspect}>
            <AreaChart width={730} height={250} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke='gray'/>
                <YAxis stroke='gray'/>
                <CartesianGrid strokeDasharray="3 3" className='chartGrid'/>
                <Tooltip />
                <Area type="monotone" dataKey="Total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />

            </AreaChart>
            </ResponsiveContainer>

        </div>
    );
}

export default Chart;