import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppBootstrapModule} from './app-bootstrap/app-bootstrap.module';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {LoginFormComponent} from './users/login-form/login-form.component';
import {HomeComponent} from './home/home.component';
import {AuthenticationService} from './authentication.service';
import {StorageServiceModule} from 'angular-webstorage-service';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatProgressSpinnerModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {ProgressComponent} from './core/progress/progress.component';
import {SharedModule} from './core/shared/shared.module';
import {Platform} from '@angular/cdk/platform';
import {OrderDetailsComponent} from './core/order-details/order-details.component';
import {ModalModule, PaginationModule} from 'ngx-bootstrap';
import {CustomersComponent} from './customers/customers.component';
import {AgmCoreModule} from '@agm/core';
import {LocationsComponent} from './locations/locations.component';
import {HttpClientModule} from '@angular/common/http';
import {ConcatPipe} from './core/concat.pipe';
import {DeliveryBoysComponent} from './delivery-boys/delivery-boys.component';
import {DboyDetailsComponent} from './core/dboy-details/dboy-details.component';
import {OrderConfirmComponent} from './core/order-confirm/order-confirm.component';
import {ProductsComponent} from './products/products.component';
import {ProductFormComponent} from './core/product-form/product-form.component';
import {UploadService} from './core/upload.service';
import {AngularFireStorageModule} from 'angularfire2/storage';
import { ReportsComponent } from './reports/reports.component';
import {SettingService} from './core/setting.service';
import { SettingsComponent } from './settings/settings.component';
import { YearSelectorComponent } from './core/year-selector/year-selector.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { InfiniteScrollerDirective } from './core/infinite-scroller.directive';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'home', component: HomeComponent},
      {path: 'orders/:uid', component: MyOrdersComponent},
      {path: 'orders', component: MyOrdersComponent},
      {path: 'customers', component: CustomersComponent},
      {path: 'locations', component: LocationsComponent},
      {path: 'deliveryBoys', component: DeliveryBoysComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'reports', component: ReportsComponent},
      {path: 'settings', component: SettingsComponent},
    ]
  },
  {path: 'login', component: LoginFormComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MyOrdersComponent,
    LoginFormComponent,
    HomeComponent,
    ProgressComponent,
    OrderDetailsComponent,
    CustomersComponent,
    LocationsComponent,
    ConcatPipe,
    DeliveryBoysComponent,
    DboyDetailsComponent,
    OrderConfirmComponent,
    ProductsComponent,
    ProductFormComponent,
    ReportsComponent,
    SettingsComponent,
    YearSelectorComponent,
    InfiniteScrollerDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppBootstrapModule,
    AppRoutingModule,
    StorageServiceModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase, 'watersupply'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    SharedModule,
    MatProgressSpinnerModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBXmT959AoUO7A1RGrXO0m8wRYXqMX0QxM'
    }),
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthenticationService,
    Platform,
    UploadService,
    SettingService
  ],
  entryComponents: [
    OrderDetailsComponent,
    DboyDetailsComponent,
    OrderConfirmComponent,
    ProductFormComponent,
    YearSelectorComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
