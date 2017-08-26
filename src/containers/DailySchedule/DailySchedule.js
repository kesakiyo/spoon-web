/* External dependencies */
import React from 'react'
import classNames from 'classnames'
import autobind from 'core-decorators/lib/autobind'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

/* Internal dependencies */
import styles from './DailySchedule.scss'
import accountActions from '../../redux/actions/accountActions'
import scheduleActions from '../../redux/actions/scheduleActions'
import userSelector from '../../redux/selectors/userSelector'
import scheduleSelector from '../../redux/selectors/scheduleSelector'
import UserInfo from '../../components/UserInfo'
import CreateScheduleForm from '../../components/CreateScheduleForm'
import ScheduleItem from '../../components/ScheduleItem'

const mapStateToProps = (state) => ({
  user: userSelector.getUser(state),
  selectedDate: scheduleSelector.getSelectedDate(state),
  dailySchedules: scheduleSelector.getDailySchedules(state),
})

@connect(mapStateToProps)
class DailySchedule extends React.Component {

  constructor() {
    super()
    this.state = {
      showCreator: false,
    }
  }

  @autobind
  handleSignOut() {
    this.props.dispatch(accountActions.signOut())
    this.props.dispatch(replace('/signin'))
  }

  @autobind
  handleCreateSchedule(schedule) {
    const payload = {
      schedule: {
        ...schedule,
        startDate: this.props.selectedDate.toFormat('YYYY-MM-DD'),
        endDate: this.props.selectedDate.toFormat('YYYY-MM-DD'),
        calendarId: 0,
        isPublic: false,
      }
    }
    return this.props.dispatch(scheduleActions.createSchedule(payload))
  }

  @autobind
  handleShowCreator() {
    this.setState({
      showCreator: true,
    })
  }

  @autobind
  handleHideCreator() {
    this.setState({
      showCreator: false,
    })
  }

  renderBody() {
    if (this.state.showCreator) {
      return (
        <div className={styles.body}>
          <CreateScheduleForm
            onCreate={this.handleCreateSchedule}
            onCancel={this.handleHideCreator} />
        </div>
      )
    }
    return (
      <div className={styles.body}>
        <div onClick={this.handleShowCreator} className={styles.creator}>
          <FontAwesome name="plus" />
          새로운 일정 등록하기
        </div>
        <div className={styles.list}>
          {this.props.dailySchedules.map(schedule => (
            <ScheduleItem
              key={schedule.id}
              className={styles.item}
              schedule={schedule} />
          ))}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={classNames(styles.wrapper, this.props.className)}>
        <div className={styles.info}>
          <UserInfo onSignOut={this.handleSignOut} user={this.props.user} />
        </div>
        <div className={styles.date}>{this.props.selectedDate.date}</div>
        <div className={styles.day}>{this.props.selectedDate.getStringDate()}</div>
        {this.renderBody()}
      </div>
    )
  }
}

export default DailySchedule