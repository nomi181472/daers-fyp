
import { PieChart } from 'react-minimal-pie-chart';

const PChart = () => {
    return (
        <PieChart
            radius = {10}
            data={[
                { title: 'One', value: 10, color: '#E38627' },
                { title: 'Two', value: 15, color: '#C13C37' },
                { title: 'Three', value: 20, color: '#6A2135' }]}
                lineWidth={98}
               labelPosition={57}
               animate={true}
               reveal={true}
        />);
}

export default PChart;