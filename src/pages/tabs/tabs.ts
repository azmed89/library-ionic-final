import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookListPage} from "../book-list/book-list";
import {CdListPage} from "../cd-list/cd-list";
import {Book} from "../../models/Book";
import {Cd} from "../../models/Cd";
import {LenderService} from "../../services/lender.service";
import {Subscription} from "rxjs";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage implements OnInit, OnDestroy {

  bookListPage = BookListPage;
  cdListPage = CdListPage;

  bookList: Book[];
  cdList: Cd[];

  bookListSubscription: Subscription;
  cdListSubscription: Subscription;

  constructor(private lenderService: LenderService) {}

  ngOnInit(): void {
    this.bookListSubscription = this.lenderService.books$.subscribe(
      (books: Book[]) => {
        this.bookList = books;
      }
    );
    this.cdListSubscription = this.lenderService.cds$.subscribe(
      (cds: Cd[]) => {
        this.cdList = cds;
      }
    )
    //this.lenderService.saveData();
    this.lenderService.retrieveData();
  }

  ngOnDestroy(): void {
    this.bookListSubscription.unsubscribe();
    this.cdListSubscription.unsubscribe();
  }
}
