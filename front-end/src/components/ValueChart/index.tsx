
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface EnergyChartProps  {
  data: invoice[]
}

const  ValueChart: React.FC<EnergyChartProps> = ({ data })=>{
    const chartData = {
      
        labels: data.map((item) => item.mesReferencia),
        datasets: [
            {
              label: 'Valor Total sem GD (R$)',
              data: data.map(item => (Number(item.energiaEletrica_valor) + Number(item.energiaSCEEE_valor) + Number(item.contribIlumPublicaMunicipal_valor)).toFixed(2)),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Economia GD (R$)',
              data: data.map(item => Number(item.energiaCompensada_valor).toFixed(2)),
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
          ],
    }

    const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

    return(
     <Bar className={'chartContainer'}  data={chartData} options={options}/>
    )


}

export default ValueChart;