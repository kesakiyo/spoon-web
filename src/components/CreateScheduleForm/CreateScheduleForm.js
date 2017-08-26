/* External dependencies */
import React from 'react'
import { reduxForm, Field } from 'redux-form'
import autobind from 'core-decorators/lib/autobind'

/* Internal dependencies */
import styles from './CreateScheduleForm.scss'
import Input from '../../elements/Input'
import Button from '../../elements/Button'

@reduxForm({
  form: 'CreateScheduleForm',
  initialValues: {
    title: '',
    url: '',
  }
})
class CreateScheduleForm extends React.Component {

  @autobind
  handleSubmit(schedule) {
    this.props.onCreate(schedule)
      .promise
      .then(() => {
        this.props.onCancel()
      }, () => {
        console.log('스케줄 생설 실패')
      })
  }

  @autobind
  renderTitleField(field) {
    const { input, meta } = field
    return (
      <div className={styles.row}>
        <div className={styles.label}>
          일정명
        </div>
        <Input
          autoFocus
          className={styles.input}
          placeholder="일정을 소개해주세요."
          onChange={input.onChange} />
      </div>
    )
  }

  @autobind
  renderURLField(field) {
    const { input, meta } = field
    return (
      <div className={styles.row}>
        <div className={styles.label}>
          URL
        </div>
        <Input
          className={styles.input}
          placeholder="행사 정보 페이지를 입력해주세요."
          onChange={input.onChange} />
      </div>
    )
  }

  render() {
    const { submitting, pristine, handleSubmit } = this.props
    return (
      <form className={styles.wrapper} onSubmit={handleSubmit(this.handleSubmit)}>
        <div className={styles.header}>
          <div className={styles.title}>내 일정 등록</div>
        </div>
        <Field name="title" component={this.renderTitleField} />
        <Field name="url" component={this.renderURLField} />
        <div className={styles.footer}>
          <Button
            type="button"
            onClick={this.props.onCancel}
            buttonType={Button.ButtonTypes.BORDER}
            className={styles.button}>
            취소
          </Button>
          <Button type="submit" className={styles.button}>
            등록
          </Button>
        </div>
      </form>
    )
  }
}

export default CreateScheduleForm