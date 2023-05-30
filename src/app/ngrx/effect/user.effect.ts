import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { LoadUserDataSuccess, UserActionTypes } from '../action/user.action';
import { AppService } from 'src/app/app.service';

@Injectable()
export class UserEffect {

    constructor(private actions: Actions, private appService: AppService) { }

    loadUserData = createEffect(() => {
        return this.actions.pipe(
            ofType(UserActionTypes.LoadUserData),
            switchMap(() => this.appService.getData()),
            map((data: any[]) => new LoadUserDataSuccess({ data }))
        );
    });
}