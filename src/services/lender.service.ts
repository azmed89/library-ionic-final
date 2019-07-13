import {Book} from '../models/Book';
import {Cd} from '../models/Cd';
import {Subject} from "rxjs";
import * as firebase from 'firebase';
import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";

@Injectable()
export class LenderService {

  books$ = new Subject<Book[]>();
  cds$ = new Subject<Cd[]>();

  booksList: Book[] = [];
  cdsList: Cd[] = [];

  /*booksList: Book[] = [
    {
      name: 'Your money or your life',
      isLent: true,
      namePerson: "AZMED"
    },
    {
      name: 'The total money makeover',
      isLent: true,
      namePerson: "AZMED"
    },
    {
      name: "L'homme le plus riche de Babylone",
      isLent: false,
      namePerson: "AZMED"
    }
  ];

  cdsList: Cd[] = [
    {
      name: 'Your money or your life',
      isLent: true,
      namePerson: "AZMED"
    },
    {
      name: 'The total money makeover',
      isLent: true,
      namePerson: "AZMED"
    },
    {
      name: "L'homme le plus riche de Babylone",
      isLent: false,
      namePerson: "AZMED"
    }
  ];*/

  constructor(private storage: Storage) {}

  emitBooks() {
    this.books$.next(this.booksList.slice());
  }

  emitCds() {
    this.cds$.next(this.cdsList.slice());
  }

  lendItem(id: number, item: string, namePerson: string) {
    var book: Book;
    var cd: Cd;

    if(item === 'book') {
      this.booksList[id].isLent = !this.booksList[id].isLent;
      this.booksList[id].namePerson = namePerson;
      this.storage.set('books', this.booksList);
      this.emitBooks();
    } else if(item === 'cd') {
      this.cdsList[id].isLent = !this.cdsList[id].isLent;
      this.cdsList[id].namePerson = namePerson;
      this.storage.set('cds', this.cdsList);
      this.emitCds();
    }
  }

  saveListBooks() {
    this.storage.set('books', this.booksList);
  }

  saveListCds() {
    this.storage.set('cds', this.cdsList);
  }

  saveList() {
    this.saveListBooks();
    this.saveListCds();
  }

  saveData() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('books').set(this.booksList).then(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
      firebase.database().ref('cds').set(this.cdsList).then(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
      //this.booksList.push(this.book);
      //this.cdsList.push(this.cd);
      this.saveList();
      this.emitBooks();
      this.emitCds();
    });
  }

  retrieveData() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('books').once('value').then(
        (data) => {
          this.booksList = data.val();
          this.emitBooks();
          resolve('Books récupérées avec succès !');
        }, (error) => {
          reject(error);
        }
      );
      firebase.database().ref('cds').once('value').then(
        (data) => {
          this.cdsList = data.val();
          this.emitCds();
          resolve('Cds récupérées avec succès !');
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  fetchListCd() {
    this.storage.get('cds').then(
      (list) => {
        if(list && list.length) {
          this.cdsList = list.slice();
        }
        this.emitCds();
      }
    );
  }

  fetchListBook() {
    return this.storage.get('books').then(
      (list) => {
        if(list && list.length) {
          this.booksList = list.slice();
        }
        this.emitBooks();
      }
    );
  }

  fetchList() {
    this.storage.get('books').then(
      (booksList) => {
        booksList && booksList.length ? this.booksList = booksList.slice() : 0;
        this.emitBooks();
      }
    ).catch(
      (error) => {
        console.log(`Books Retrieve error : ${error}`);
      }
    );

    this.storage.get('cds').then(
      (cdsList) => {
        cdsList && cdsList.length ? this.cdsList = cdsList.slice() : 0;
        this.emitCds();
      }
    ).catch(
      (error) => {
        console.log(`Cds Retrieve error : +  ${error}`);
      }
    );
  }
}
