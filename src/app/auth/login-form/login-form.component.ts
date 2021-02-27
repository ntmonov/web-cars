import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  public loginForm: FormGroup;

  public errorMessage = '';

  constructor(private auth: AngularFireAuth) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login(): void {
    this.auth.signInWithEmailAndPassword(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
      .then(res => console.log(res))
      .catch(err => {
        this.errorMessage = err.message;
        this.loginForm.reset()
      })
  }
}
