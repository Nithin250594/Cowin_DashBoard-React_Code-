// Write your code here
import {PieChart, Pie, Cell, Legend} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGenderList} = props

  return (
    <div className="vaccination-coverage-bg">
      <h1 className="vaccination-title"> Vaccination By Gender</h1>
      <PieChart width={1000} height={500}>
        <Pie
          cx="50%"
          cy="50%"
          data={vaccinationByGenderList}
          startAngle={180}
          endAngle={0}
          innerRadius="30%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="middle"
          align="center"
          wrapperStyle={{paddingTop: 220}}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
