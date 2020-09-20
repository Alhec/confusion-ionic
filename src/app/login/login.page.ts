import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { User } from '../shared/user';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  user: User = {username: '', password: ''};
  constructor(private modalController: ModalController,
    public platform: Platform,
    private formBuilder: FormBuilder,
    private storage: Storage) {
      console.log('f');
      storage.get('user').then(user => {
        if (user) {
          console.log(user);
          this.user = user;
          this.loginForm
            .patchValue({
              'username': this.user.username,
              'password': this.user.password
            });
        }
        else
          console.log('user not defined');
      });


      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['',Validators.required],
        remember: true
      });
    }

  ngOnInit() {
  }

  async dismiss() {
    await this.modalController.dismiss(null);
  }

  async onSubmit() {
    console.log(this.loginForm.value, this.user);
    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;
    console.log(this.user);
    if(this.loginForm.get('remember').value)
      this.storage.set('user', this.user)
    else
      this.storage.remove('user');
    await this.modalController.dismiss();
  }

  async openRegister() {
    const modal = await this.modalController.create({
      component: RegisterPage,
    });
    await modal.present();
    await this.modalController.dismiss();
  }
  
}
