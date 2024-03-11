import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['../login/login.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm = this.formBuilder.group({
    email: [''],
    password: ['']
  });

  constructor(
    public formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public router: Router
  ) { }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  ngOnInit() {
  }

  async signUp(){
    try {
      if(this.email && this.password && this.email.value && this.password.value) {
        const res = await this.afAuth.createUserWithEmailAndPassword(this.email.value, this.password.value);
      }
      
      this.alertCtrl.create({
         header: 'Success',
         message: 'Your registration is successfull',
         cssClass: 'alertError',
         buttons: [{text: 'OK', handler: () => {console.log('OK');}}]
      }).then(response => response.present());

      this.router.navigateByUrl('/sign-in');
    } catch (error: any) {
       await this.alertCtrl.create({
        header: 'Fail',
        message: 'error.message',
        cssClass: 'alertError',
        buttons: [{text: 'OK', handler: () => {console.log('OK');}}]
       }).then(response => response.present());
    }
  
  

  }

}
