import { Component, OnInit,ChangeDetectorRef, ViewContainerRef} from '@angular/core';
import {DrawerPage} from '../shared/drawer/drawer.page'
import {TextField} from 'ui/text-field';
import {Switch} from 'ui/switch';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ModalDialogService, ModalDialogOptions} from 'nativescript-angular/modal-dialog';
import {ReservationModalComponent} from '../reservationmodal/reservationmodal.component';

import { Animation,AnimationDefinition } from 'ui/animation';
import {Page} from 'ui/page';
import * as enums from 'ui/enums';
import {View} from 'ui/core/view';



@Component({
    selector:'app-reservation',
    moduleId:module.id,
    templateUrl:'./reservation.component.html'

})

export class ReservationComponent extends DrawerPage implements OnInit{

    reservation: FormGroup; // used to store reactive form
    formReserve:View;
    userData:View;
    formSubmit:boolean = false;
    
    constructor(private changeDetectorReg:ChangeDetectorRef,
        private modalService:ModalDialogService,
        private vcRef: ViewContainerRef,
        private page:Page,
        private formBuilder:FormBuilder){
            super(changeDetectorReg);
            
            this.reservation = this.formBuilder.group({
                guests:3,
                smoking:false,
                dateTime:['',Validators.required]
            });
    }

    ngOnInit(){
        this.userData = this.page.getViewById<View>("userData");
        this.userData.visibility = "hidden";
    }


    onSmokingChecked(args){
        let smokingSwitch = <Switch>args.object;
        if(smokingSwitch.checked){
            this.reservation.patchValue({smoking:true});
        }else{
            this.reservation.patchValue({smoking:false});
        }
    }


    onGuestChange(args){
        let textField = <TextField>args.object;
        this.reservation.patchValue({ guests: textField.text});
    }

    onDateTimeChange(args){
        let textField = <TextField>args.object;
        this.reservation.patchValue({ dateTime: textField.text});
    }

    createModalView(args){
        let options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: args,
            fullscreen:false
        };


        this.modalService.showModal(ReservationModalComponent, options)
            .then((result: any) => {
                if(args === "guest"){
                    this.reservation.patchValue({guests:result});
                }
                else if(args === "date-time"){
                    this.reservation.patchValue({dateTime: result});
                }
            });
    }

    onSubmit(){
        
        this.formSubmit = true;
        this.formReserve = this.page.getViewById<View>("formReserve");
        this.formReserve.animate({
         
            translate:{x:0, y:+200 },
            opacity:0,
            duration:700,
            curve:enums.AnimationCurve.easeOut
        }); 

        this.userData = this.page.getViewById<View>("userData");      
        
        this.userData.visibility ="visible";
        this.userData.animate({
            translate:{x:0, y:+200 },
            opacity:1,
            duration:500,
            curve:enums.AnimationCurve.easeIn
        });

        console.log(JSON.stringify(this.reservation.value));
        
    }

    // showView(){
    //     this.formSubmit = true;
        
    // }


  
}