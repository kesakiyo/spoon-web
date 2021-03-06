/* External dependencies */
import Rx from 'rxjs'
import { combineEpics } from 'redux-observable'

/* Internal dependencies */
import AT from '../../constants/ActionTypes'
import accountAPI from '../../api/accountAPI'

const signInEpic = action$ => (
  action$.ofType(AT.REQUEST_SIGN_IN)
    .switchMap(action =>
      Rx.Observable.fromPromise(accountAPI.signIn(action.payload.email, action.payload.password))
        .map(payload => ({
          type: AT.REQUEST_SIGN_IN_SUCCESS,
          payload,
        }))
        .catch(payload => Rx.Observable.of({
          type: AT.REQUEST_SIGN_IN_ERROR,
          payload,
        }))
    )
)

const signUpEpic = action$ => (
  action$.ofType(AT.REQUEST_SIGN_UP)
    .switchMap(action => {
      const { name, email, password, passwordCheck } = action.payload
      return Rx.Observable.fromPromise(accountAPI.signUp(email, name, password, passwordCheck))
          .map(payload => ({
            type: AT.REQUEST_SIGN_UP_SUCCESS,
            payload,
          }))
          .catch(payload => Rx.Observable.of({
            type: AT.REQUEST_SIGN_UP_ERROR,
            payload,
          }))
      }
    )
)

export default combineEpics(
  signInEpic,
  signUpEpic
)