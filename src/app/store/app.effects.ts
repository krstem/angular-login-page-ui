import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, catchError, exhaustMap, map, mergeMap, of, switchMap } from "rxjs";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import {loginErrorAction, loginRequestAction, loginResponseAction, logout, resetState} from "./app.actions";
import {AuthService} from "../service/auth.service";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private store:Store, private route:Router){}

  loginRequest$ = createEffect(
    ()=>
      this.actions$.pipe(
        ofType(
          loginRequestAction),
        mergeMap((action) => {
          return this.authService.getLoginData(action.payload).pipe(
            map((res:any)=>{
              return loginResponseAction({payload: res})
            }),
            catchError((error) => of(loginErrorAction(error)))
          )
        })
      )
  );

  logout$ = createEffect(()=>
      this.actions$.pipe(
        ofType(logout),
        mergeMap(()=>{
          this.store.dispatch(resetState());
          this.route.navigate(['/auth']);
          return EMPTY
        })
      ),
    {dispatch: false}
  );

}
