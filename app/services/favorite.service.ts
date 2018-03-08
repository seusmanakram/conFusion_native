import {Injectable} from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as LocalNotifications from 'nativescript-local-notifications';


@Injectable()

export class FavoriteService {
    favorites: Array<number>;
    //docId: string = "favorites";

    constructor( private dishservice:DishService){
        this.favorites =[];
    }

    isFavorite(id:number): boolean{
        return this.favorites.some(el => el === id);
    }

    addFavorite(id:number): boolean{

        if(!this.isFavorite(id)){
            this.favorites.push(id);
            LocalNotifications.schedule([{
                id: id,
                title: 'Confusion Favorites',
                body: 'Dish ' + id + ' added successfully'
            }])
                .then(
                    () => console.log('Notificiation scheduled'),
                    (error) => console.log('Error showing notification' + error)
                );
               
        }
        
        return true;
    }

    getFavorites(): Observable<Dish[]>{
        return this.dishservice.getDishes()
            .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
    }

    deleteFavorite(id: number): Observable<Dish[]> {
        let index = this.favorites.indexOf(id);
        if(index >= 0){
            this.favorites.splice(index,1);
            return this.getFavorites();
        }
        else{
            return Observable.throw('Deleting non-existant favorite');
        }
    }   


}