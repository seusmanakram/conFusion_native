import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { DatePicker } from 'ui/date-picker';
import { TimePicker } from 'ui/time-picker';
import {TextField} from 'ui/text-field';
import { Slider } from 'ui/slider';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ModalDialogService, ModalDialogOptions} from 'nativescript-angular/modal-dialog';


@Component({
    moduleId: module.id,
    templateUrl: './comment.component.html'
})

export class CommentComponent implements OnInit {


    comment:FormGroup;
    res:Comment;
  

    constructor(private params: ModalDialogParams,
        private formBuilder:FormBuilder,
    private vcRef:ViewContainerRef) {

        this.comment = this.formBuilder.group({
            rating:5,
            author:['',Validators.required],
            comment:['',Validators.required],
         
        });

    }

    ngOnInit() {
       
    }
  
    onSubmit(){     
        let date = new Date();
        let iso = date.toISOString();
        this.res = this.comment.value;
        this.res["date"] = iso;
        this.params.closeCallback(this.res);
    }
    

}

