import {Component} from '@angular/core';
import {logout} from "../store/app.actions";
import {Store} from "@ngrx/store";
import {AuthEffects} from "../store/app.effects";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private _store: Store<any>, private authEffects:AuthEffects) {
  }


  logout() {
    console.log('logout')
    this._store.dispatch(logout());
    // this.authEffects.logout$.subscribe();
  }
}
