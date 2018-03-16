import { Component, OnInit, Inject ,ChangeDetectorRef} from '@angular/core';
import {TNSFontIconService} from 'nativescript-ngx-fonticon';
import * as Email from 'nativescript-email';
import * as phone from 'nativescript-phone';
import {DrawerPage} from '../shared/drawer/drawer.page'

@Component({
    selector:'app-contact',
    moduleId:module.id,
    templateUrl:'./contact.component.html'

})

export class ContactComponent extends DrawerPage implements OnInit{

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private fonticon: TNSFontIconService,
        @Inject('BaseURL') private BaseURL) {
            super(changeDetectorRef)
         }

    ngOnInit(){
        
    }


    sendEmail(){
        Email.available()
            .then((avail: boolean) => {
                if(avail){
                    Email.compose({
                        to: ['confusion@food.net'],
                        subject: '[ConFusion]: Query',
                        body: 'Dear Sir/Madam:',
                    });
                }
                else{
                    console.log('No email Configured');
                }
            })
    }

    callRestaurant(){
        let telnum = "+852 1234 5678";
        phone.dial(telnum,true);
    }

}