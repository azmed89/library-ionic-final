import { Component } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {Cd} from "../../models/Cd";
import {LenderService} from "../../services/lender.service";
import {NgForm} from "@angular/forms";

/**
 * Generated class for the LendCdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage {

  index: number;
  cd: Cd;

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
              public lenderService: LenderService) {
  }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.cd = this.lenderService.cdsList[this.index];
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onSubmitForm(form: NgForm) {
    console.log(form.value);
    const namePerson = form.value['namePerson'];
    console.log(namePerson);
    this.lenderService.lendItem(this.index, 'cd', namePerson);
    this.dismissModal();
  }

  onToggleCd() {
    this.lenderService.lendItem(this.index, 'cd', '');
    this.dismissModal();
  }

}
