// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const resultView = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    outputView: resultView.initial,
    vaccinationCoverageList: [],
    vaccinationByAgeList: [],
    vaccinationByGenderList: [],
  }

  componentDidMount() {
    this.getVaccinationDetails()
  }

  getVaccinationDetails = async () => {
    this.setState({outputView: resultView.loading})

    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(vaccinationDataApiUrl)

    console.log(response)

    if (response.ok === true) {
      const data = await response.json()

      console.log(data)

      const modifiedData = {
        vaccinationCoverage: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      const modifiedVaccinationCoverage = modifiedData.vaccinationCoverage.map(
        eachData => ({
          vaccineDate: eachData.vaccine_date,
          dose1: eachData.dose_1,
          dose2: eachData.dose_2,
        }),
      )

      console.log(modifiedVaccinationCoverage)

      this.setState({
        vaccinationCoverageList: modifiedVaccinationCoverage,
        vaccinationByAgeList: modifiedData.vaccinationByAge,
        vaccinationByGenderList: modifiedData.vaccinationByGender,
        outputView: resultView.success,
      })
    } else {
      this.setState({outputView: resultView.failure})
    }
  }

  loadingRender = () => (
    <div className="cowin-dasboard-bg">
      <div className="cowin-logo-section">
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          alt="website logo"
          className="website-logo-size"
        />
        <p className="website-logo-text">Co-WIN</p>
      </div>
      <h1 className="cowin-title">CoWIN Vaccination in India</h1>
      <div data-testid="loader" className="loader">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    </div>
  )

  failureRender = () => (
    <div className="cowin-dasboard-bg">
      <div className="cowin-logo-section">
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          alt="website logo"
          className="website-logo-size"
        />
        <p className="website-logo-text">Co-WIN</p>
      </div>
      <h1 className="cowin-title">CoWIN Vaccination in India</h1>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="failure-image"
        />
        <h1 className="failure-text">Something went wrong</h1>
      </div>
    </div>
  )

  successRender = () => {
    const {
      outputView,
      vaccinationCoverageList,
      vaccinationByAgeList,
      vaccinationByGenderList,
    } = this.state

    console.log(outputView)

    return (
      <div className="cowin-dasboard-bg">
        <div className="cowin-logo-section">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-logo-size"
          />
          <p className="website-logo-text">Co-WIN</p>
        </div>
        <h1 className="cowin-title">CoWIN Vaccination in India</h1>
        <VaccinationCoverage
          vaccinationCoverageList={vaccinationCoverageList}
        />
        <VaccinationByGender
          vaccinationByGenderList={vaccinationByGenderList}
        />
        <VaccinationByAge vaccinationByAgeList={vaccinationByAgeList} />
      </div>
    )
  }

  render() {
    const {outputView} = this.state

    console.log(outputView)

    switch (outputView) {
      case resultView.success:
        return this.successRender()
      case resultView.loading:
        return this.loadingRender()
      case resultView.failure:
        return this.failureRender()
      default:
        return null
    }
  }
}

export default CowinDashboard
