import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  userForm: FormGroup;
  errorMessage: string;
  hasError: boolean;
  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'pattern': 'Only Admin Email can access',
      'required': 'Email is required.',
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    }
  };

  constructor(private fb: FormBuilder, private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  login(): void {
    this.auth.login(this.userForm.get('email').value, this.userForm.get('password').value).catch((err) => {
      this.errorMessage = err.toString();
      this.hasError = true;
    });
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.pattern(/^admin.*/),
        Validators.required,
      ]
      ],
      'password': ['', [
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }


}
