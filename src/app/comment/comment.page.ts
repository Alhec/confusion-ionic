import { Comment } from '../shared/comment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

  comment: FormGroup;
  commentAux: Comment
  constructor(private modalController: ModalController,
    public platform: Platform,
    private formBuilder: FormBuilder) {
      this.comment = this.formBuilder.group({
        rating:[5, Validators.required],
        author:['', Validators.required],
        comment:['', Validators.required]
      })
    }

  ngOnInit() {
  }

  async dismiss() {
    await this.modalController.dismiss(null);
  }

  async onSubmit() {
    this.commentAux=this.comment.value
    this.commentAux.date=(new Date).toISOString();
    await this.modalController.dismiss(this.commentAux);
  }
}
