import { Component, OnInit, Inject } from '@angular/core';
import {Dish} from '../shared/dish';
import {Comment} from '../shared/comment';
import {DishService} from '../services/dish.service';
import {FavoriteService} from '../services/favorite.service';
import {TNSFontIconService} from 'nativescript-ngx-fonticon';
import * as dialogs from "ui/dialogs";

import {ActivatedRoute,Params} from '@angular/router';
import {RouterExtensions} from 'nativescript-angular/router';
import 'rxjs/add/operator/switchMap';
import {Toasty} from 'nativescript-toasty';


@Component({
    selector:'app-dishdetail',
    moduleId:module.id,
    templateUrl:'./dishdetail.component.html'

})

export class DishdetailComponent implements OnInit{

    dish:Dish;
    comment:Comment;
    errMess:string;
    avgstars:string;
    numcomments:number;
    favorite:boolean = false;

    constructor(private dishservice:DishService,
        private favoriteservice:FavoriteService,
        private fonticon:TNSFontIconService,
        private route:ActivatedRoute,
        private routerExtensions: RouterExtensions,
        @Inject('BaseURL') private BaseURL ){ }


    ngOnInit(){
        this.route.params
            .switchMap((params:Params) => this.dishservice.getDish(+params['id']))
            .subscribe(dish => { 
                this.dish = dish;
                this.favorite = this.favoriteservice.isFavorite(this.dish.id);
                this.numcomments = this.dish.comments.length;

                let total = 0;
                this.dish.comments.forEach(comment => total += comment.rating);
                this.avgstars = (total/this.numcomments).toFixed(2);

            } ,
                errmess => {this.dish = null; this.errMess = <any>errmess });
    }


    addToFavorites(){
        if(!this.favorite){
            this.favorite = this.favoriteservice.addFavorite(this.dish.id);
            const toast = new Toasty('Added dish '+ this.dish.id, 'short', 'bottom');
            toast.show();
        
        }
    }



    goBack(): void {
        this.routerExtensions.back();

    }


    more(){
        dialogs.action({
            message: "Actions",
            cancelButtonText: "CANCEL",
            actions: ["Add to Favorites", "Add Comment"]
        }).then(result => {
            console.log("Dialog result: " + result);
            if(result == "Add to Favorites"){
               this.addToFavorites();
            }else if(result == "Add Comment"){
                // Will be handled in Task2
            
            }
        });
    }


    }


