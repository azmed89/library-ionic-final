import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  MenuController,
  ModalController,
  NavController,
  ToastController,
  LoadingController
} from 'ionic-angular';
import {LenderService} from "../../services/lender.service";
import {Book} from "../../models/Book";
import {Cd} from "../../models/Cd";
import {Subscription} from "rxjs";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  bookList: Book[];
  cdList: Cd[];

  constructor(private modalCtrl: ModalController,
              private lenderService: LenderService,
              private menuCtrl: MenuController,
              private navCtrl: NavController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) {}

  onToggleMenu() {
    this.menuCtrl.open();
  }

  onSaveAllData() {
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde en cours…'
    });
    loader.present();
    this.lenderService.saveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données sauvegardées !',
          duration: 3000,
          position: 'bottom'
        }).present();
      },
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }

  onFetchAllData() {
    let loader = this.loadingCtrl.create({
      content: 'Récuperation en cours…'
    });
    loader.present();
    this.lenderService.retrieveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données récupérées !',
          duration: 3000,
          position: 'bottom'
        }).present();
      },
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }

}
