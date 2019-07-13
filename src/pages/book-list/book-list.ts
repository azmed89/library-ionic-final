import {Component, OnDestroy, OnInit} from '@angular/core';
import { ModalController, MenuController } from 'ionic-angular';
import {LenderService} from "../../services/lender.service";
import {Book} from "../../models/Book";
import {LendBookPage} from "../lend-book/lend-book";
import {Subscription} from "rxjs";

/**
 * Generated class for the BookListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage implements OnInit, OnDestroy {

  booksList: Book[];
  booksListSubscription: Subscription;

  constructor(private modalCtrl: ModalController,
              private lenderService: LenderService,
              private menuCtrl: MenuController) {
  }

  ngOnInit(): void {
    this.booksListSubscription = this.lenderService.books$.subscribe(
      (books: Book[]) => {
        this.booksList = books;
      }
    );
    this.lenderService.retrieveData();
    this.lenderService.emitBooks();
  }

  ngOnDestroy(): void {
    this.booksListSubscription.unsubscribe();
  }

  ionViewWillEnter() {
    this.booksList = this.lenderService.booksList.slice();
  }

  onLoadBook(index: number) {
    let modal = this.modalCtrl.create(LendBookPage, {index: index});
    modal.present();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

}
