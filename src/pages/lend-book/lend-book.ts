import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Book} from "../../models/Book";
import {LenderService} from "../../services/lender.service";
import {Subject} from "rxjs/Rx";
import {NgForm} from "@angular/forms";

/**
 * Generated class for the LendBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})
export class LendBookPage {

  index: number;
  book: Book;

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
              public lenderService: LenderService) {
  }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.book = this.lenderService.booksList[this.index];
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onSubmitForm(form: NgForm) {
    console.log(form.value);
    const namePerson = form.value['namePerson'];
    console.log(namePerson);
    this.lenderService.lendItem(this.index, 'book', namePerson);
    this.dismissModal();
  }

  onToggleBook() {
    this.lenderService.lendItem(this.index, 'book', '');
    this.dismissModal();
  }

}
