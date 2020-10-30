import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule, routesList} from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { MyinterceptorService } from './services/myinterceptor.service';
import { RegistrationService } from './services/registration.service';
import { RouterguardService } from './services/routerguard.service';
import { BiddingComponent } from './main/bidding/bidding.component';
import { PaymentComponent } from './main/payment/payment.component';
import { PaymentSuccessComponent } from './main/payment-success/payment-success.component';
import { PurchasedDetailsComponent } from './main/purchased-details/purchased-details.component';
import { SoldDetailsComponent } from './main/sold-details/sold-details.component';
import { ProfileComponent } from './main/profile/profile.component';
import {FilterPipe} from './pipes/filter.pipe';
import {OrderFilter} from './pipes/order.pipe'
@NgModule({
  declarations: [
    AppComponent,
    routesList,
    BiddingComponent,
    PaymentComponent,
    PaymentSuccessComponent,
    PurchasedDetailsComponent,
    SoldDetailsComponent,
    ProfileComponent,
    FilterPipe,
    OrderFilter
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [
    AuthenticationService,
    RegistrationService,
    RouterguardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyinterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
