import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ImageLoaderService} from '../image-loader.service';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {loginRequestAction} from "../store/app.actions";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    // BrowserModule,
    // BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,

  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  logoUrl: string = '';
  unsubscribe = new Subject();

  constructor(private formBuilder: FormBuilder, private imageLoader: ImageLoaderService,
              // private _store: Store<any>,
              private _route: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    // this._store.select("auth", "isAuth").pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
    //   if (data) {
    //     this._route.navigate(['/profile'])
    //   } else {
    //     this._route.navigate(['/'])
    //   }
    // })
  }

  ngOnInit(): void {
    // this.loadLogo();
  }

  loadLogo() {
    const logoUrl = 'http://www.maclocks.eu/media/wysiwyg/Tabit_2.jpg';
    this.imageLoader.loadImage(logoUrl).subscribe((blob: Blob) => {
      this.logoUrl = URL.createObjectURL(blob);
    });
  }

  onSubmit(value: any): void {
    if (this.loginForm.valid) {
      console.log('Login form submitted', value);
      // add value in to store
      // this._store.dispatch(loginRequestAction({payload: value}));
    }
  }
}


