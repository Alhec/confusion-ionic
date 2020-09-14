import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  reservation: FormGroup;
  currentModal = null;

  constructor(private modalController: ModalController,
    public platform: Platform,
    private formBuilder: FormBuilder) {
      this.reservation = this.formBuilder.group({
        guests:"3",
        smoking: false,
        dateTime:['', Validators.required],
      });
    }


  ngOnInit() {
  }

  async dismiss() {
    await this.modalController.dismiss();
  }

  async onSubmit() {
    console.log(this.reservation.value);
    await this.modalController.dismiss();
  }
}
