import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  constructor(private modalController: ModalController,
    public platform: Platform ) { }

  currentModal = null;
  ngOnInit() {
  }

  async dismiss() {
    await this.modalController.dismiss();
  }
}
