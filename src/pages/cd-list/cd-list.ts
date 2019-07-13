import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavController, NavParams, ModalController, MenuController} from 'ionic-angular';
import {Cd} from "../../models/Cd";
import {LenderService} from "../../services/lender.service";
import {LendCdPage} from "../lend-cd/lend-cd";
import {Subscription} from "rxjs";
import {Book} from "../../models/Book";

/**
 * Generated class for the CdListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage implements OnInit, OnDestroy {

  cdsList: Cd[];
  cdsListSubscription: Subscription;

  constructor(private modalCtrl: ModalController,
              private lenderService: LenderService,
              private menuCtrl: MenuController) {
  }

  ngOnInit(): void {
    this.cdsListSubscription = this.lenderService.cds$.subscribe(
      (cds: Cd[]) => {
        this.cdsList = cds;
      }
    );
    this.lenderService.retrieveData();
    this.lenderService.emitCds();
  }

  ngOnDestroy(): void {
    this.cdsListSubscription.unsubscribe();
  }

  ionViewWillEnter() {
    this.cdsList = this.lenderService.cdsList.slice();
  }

  onLoadCd(index: number) {
    let modal = this.modalCtrl.create(LendCdPage, {index: index});
    modal.present();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }
}
