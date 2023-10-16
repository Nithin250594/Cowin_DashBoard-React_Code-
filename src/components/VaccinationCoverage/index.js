// Write your code here

import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const dataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  const {vaccinationCoverageList} = props

  return (
    <div className="vaccination-coverage-bg">
      <h1 className="vaccination-title">Vaccination Coverage</h1>
      <BarChart
        width={1000}
        height={300}
        data={vaccinationCoverageList}
        margin={{top: 10}}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{stroke: '#94a3b8', strokeWidth: 1}}
        />
        <YAxis
          tickFormatter={dataFormatter}
          tick={{stroke: '#94a3b8', strokeWidth: 0}}
        />
        <Legend wrapperStyle={{padding: 10}} />
        <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" barSize="20%" />
        <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="20%" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
