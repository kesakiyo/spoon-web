/* External dependencies */
import React from 'react'
import autobind from 'core-decorators/lib/autobind'
import classNames from 'classnames'
import c from 'calendar'

/* Internal dependencies */
import styles from './Calendar.scss'
import CalendarDate from '../../models/CalendarDate'

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const calUtil = new c.Calendar()

class Calendar extends React.Component {

  @autobind
  handleClickDate(date) {
    this.props.onClickDate(new CalendarDate({
      year: this.props.calendarDate.year,
      month: this.props.calendarDate.month,
      date,
    }))
  }

  isToday(date) {
    return (new CalendarDate({
      year: this.props.calendarDate.year,
      month: this.props.calendarDate.month,
      date,
    })).equal(this.props.todayDate)
  }

  isSelected(date) {
    return (new CalendarDate({
      year: this.props.calendarDate.year,
      month: this.props.calendarDate.month,
      date,
    })).equal(this.props.selectedDate)
  }

  hasSchedule(date) {
    const calDate = new CalendarDate({
      year: this.props.calendarDate.year,
      month: this.props.calendarDate.month,
      date,
    })
    return date && this.props.monthlySchedules.findIndex(schedule => schedule.includeDate(calDate)) !== -1
  }


  renderHeader() {
    return (
      <div className={styles.row}>
        {days.map((val, idx) => (<div key={idx} className={styles.cell}>{val}</div>))}
      </div>
    )
  }

  getCellStyles(date) {
    return classNames(
      styles.cell,
      {
        [styles.clickable]: date,
        [styles.today]: this.isToday(date),
        [styles.selected]: date && this.isSelected(date),
        [styles.schedule]: this.hasSchedule(date),
      }
    )
  }

  renderBody() {
    const weeks = calUtil.monthDays(this.props.calendarDate.year, this.props.calendarDate.month)
    return (
      weeks.map((week, idx) => (
        <div key={idx} className={styles.row}>
          {week.map((date, idx) => (
            <div
              onClick={() => (date ? this.handleClickDate(date) : null)}
              key={idx}
              className={this.getCellStyles(date)}>
              {date ? date : ''}
            </div>
          ))}
        </div>
      ))
    )
  }

  render() {
    return (
      <div className={classNames(styles.wrapper, this.props.className)}>
        {this.renderHeader()}
        {this.renderBody()}
      </div>
    )
  }
}

export default Calendar