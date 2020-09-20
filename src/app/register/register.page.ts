import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx'
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  image: string = 'assets/images/logo.png';
  constructor(private modalController: ModalController,
    public platform: Platform,
    private formBuilder: FormBuilder,
    private camera: Camera) {
      this.registerForm = this.formBuilder.group({
        firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
        lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
        username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)] ],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)] ],
        telnum: ['', [Validators.required, Validators.pattern] ],
        email: ['', [Validators.required, Validators.email] ],
      });
    }

  ngOnInit() {
  }

  async dismiss() {
    await this.modalController.dismiss(null);
  }

  async onSubmit() {
    await this.modalController.dismiss();
  }

  getPicture() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 100,
      targetWidth: 100,
      correctOrientation: true,
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.FRONT
    }

    this.camera.getPicture(options).then((imageData) => {

      this.image = imageData;
      console.log(imageData);
    }, (err) => {
        console.log('Error obtaining picture')
    });
  }

}
