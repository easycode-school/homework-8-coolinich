import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from './../../../../helpers/errorStateMatcher';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { OnSignupAnswer } from '../../interfaces/OnSignupAnswer';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'email': new FormControl('', [Validators.email, Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
      'nickname': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]),
      'first_name': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z\- ]*')]),
      'last_name': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z\- ]*')]),
      'phone': new FormControl('', [Validators.required, Validators.minLength(7), Validators.pattern('[0-9]{7,11}')]),
      'gender_orientation': new FormControl('', [Validators.required, Validators.pattern('[mM][aA][lL][eE]|[fF][eE][mM][aA][lL][eE]')]),
      'city': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z\- ]*')]),
      'country': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z\- ]*')]),
      'date_of_birth_day': new FormControl('', [Validators.required, Validators.max(31), Validators.min(1),Validators.pattern('[0-9]{1,2}')]),
      'date_of_birth_month': new FormControl('', [Validators.required, Validators.max(12), Validators.min(1), Validators.pattern('[0-9]{1,2}')]),
      'date_of_birth_year': new FormControl('', [Validators.required, Validators.max(2003), Validators.min(1900), Validators.pattern('[0-9]{4}')])
    });
  }

  // Handler for submit event on Signup form
  onSignup() {
    const newUserData: User = {
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
      nickname: this.signupForm.get('nickname').value,
      first_name: this.signupForm.get('first_name').value,
      last_name: this.signupForm.get('last_name').value,
      phone: this.signupForm.get('phone').value,
      gender_orientation: this.signupForm.get('gender_orientation').value,
      city: this.signupForm.get('city').value,
      country: this.signupForm.get('country').value,
      date_of_birth_day: this.signupForm.get('date_of_birth_day').value,
      date_of_birth_month: this.signupForm.get('date_of_birth_month').value,
      date_of_birth_year: this.signupForm.get('date_of_birth_year').value
    };
    this.authService.signup(newUserData).subscribe((data: OnSignupAnswer) => {
      if (data.error) {
        this.messageService.add({severity: 'error', summary: 'Server error', detail: data.message});
      } else {
        this.messageService.add({severity: 'success', summary: 'Congratulations!', detail: data.message});
        setTimeout(() => this.router.navigate(['/auth/login']), 3000);
      }
    });
  }

}
