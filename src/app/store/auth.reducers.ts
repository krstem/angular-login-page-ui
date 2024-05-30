import {createReducer, on} from "@ngrx/store";
import {AppState} from "../model/app.state.model";
import {loginErrorAction, loginResponseAction, resetLoginAction} from "./app.actions";

export const authKey = "auth";
export const initialState: AppState = {
  token: null,
  user: null,
  isAuth: false
}

const _authReducer = createReducer(
  initialState,
  on(loginResponseAction, (state, {payload}) => {
    console.log(payload, 'Updating the store - Payload')
    console.log(state, 'Updating the store - State')
    return {
      ...state,
      isAuth: true,
      token: payload.data.token,
      user: payload.data.user,
    }
  }),
  on(loginErrorAction, (state, {error}) => {
    return {
      ...state,
      error: error,
      token: null,
      user: null,
      isAuth: false
    }
  }),
  on(resetLoginAction, (state) => {
    return {
      ...initialState
    }
  })
)

export function authReducer(state: AppState, action: any) {
  return _authReducer(state, action)
}
