import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import {NativeScriptUISideDrawerModule} from 'nativescript-pro-ui/sidedrawer/angular'
import {TNSFontIconModule} from 'nativescript-ngx-fonticon';
import { NativeScriptUIListViewModule } from 'nativescript-pro-ui/listview/angular';
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import { HomeComponent } from "./home/home.component";
import { MenuComponent } from "./menu/menu.component";
import { ContactComponent } from "./contact/contact.component";
import { AboutComponent } from "./about/about.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import {ReservationComponent} from "./reservation/reservation.component";
import {ReservationModalComponent} from "./reservationmodal/reservationmodal.component";
import { DishdetailComponent } from "./dishdetail/dishdetail.component";
import {DrawerComponent} from './shared/drawer/drawer.component';
import {CommentComponent} from './comment/comment.component';


import { DishService } from "./services/dish.service";
import { PromotionService } from "./services/promotion.service";
import { LeaderService } from "./services/leader.service";
import {FavoriteService} from "./services/favorite.service";
import { CouchbaseService } from './services/couchbase.service';

import { ProcessHTTPMsgService } from "./services/process-httpmsg.service";

import {baseURL} from "./shared/baseurl";
// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpModule,
        NativeScriptUISideDrawerModule,
        TNSFontIconModule.forRoot({
            'fa': './fonts/font-awesome.min.css'
        }),
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        ReactiveFormsModule  
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        MenuComponent,
        AboutComponent,
        ContactComponent,
        FavoritesComponent,
        DishdetailComponent,
        CommentComponent,
        DrawerComponent,
        ReservationComponent,
        ReservationModalComponent
        
    ],
    entryComponents: [ReservationModalComponent,CommentComponent],
    providers: [
        { provide: 'BaseURL',useValue:baseURL},
        DishService,
        LeaderService,
        PromotionService,
        FavoriteService,
        CouchbaseService,
        ProcessHTTPMsgService,
        
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
