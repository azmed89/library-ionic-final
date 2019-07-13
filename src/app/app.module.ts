import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import { HomePage } from '../pages/home/home';
import {TabsPage} from "../pages/tabs/tabs";
import {SettingsPage} from "../pages/settings/settings";
import {CdListPage} from "../pages/cd-list/cd-list";
import {LendBookPage} from "../pages/lend-book/lend-book";
import {LendCdPage} from "../pages/lend-cd/lend-cd";
import {BookListPage} from "../pages/book-list/book-list";
import {LenderService} from "../services/lender.service";
import {AuthPage} from "../pages/auth/auth";
import {AuthService} from "../services/auth.service";
import {IonicStorageModule} from "@ionic/storage";

import * as firebase from 'firebase';

let firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "openclassroom-8ba47.firebaseapp.com",
  databaseURL: "https://openclassroom-8ba47.firebaseio.com",
  projectId: "openclassroom-8ba47",
  storageBucket: "",
  messagingSenderId: "589638686728",
  appId: "1:589638686728:web:476c5aed3f7f01a6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    SettingsPage,
    CdListPage,
    LendBookPage,
    LendCdPage,
    BookListPage,
    AuthPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    SettingsPage,
    CdListPage,
    LendBookPage,
    LendCdPage,
    BookListPage,
    AuthPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LenderService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
