import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  public registerForm: FormGroup;

  public errorMessage = '';

  constructor(private auth: AngularFireAuth) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
  }

  register(): void {
    this.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
      .then(res => console.log(res))
      .catch(err => {
        this.errorMessage = err.message;
        this.registerForm.reset();
      });
  }

  get email(): AbstractControl {
    return this.registerForm.get('email') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.registerForm.get('password') as AbstractControl;
  }
}
