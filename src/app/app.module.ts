import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { store } from './ngrx';
import { router } from './router';
// import { effects } from './ngrx/effect';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { ChessGameComponent } from './components/game/chess-game/chess-game.component';
import { ChessBoardComponent } from './components/game/chess-board/chess-board.component';
import { ChessCellComponent } from './components/game/chess-cell/chess-cell.component';
import { DeadBoardComponent } from './components/game/dead-board/dead-board.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    ChessGameComponent,
    ChessBoardComponent,
    ChessCellComponent,
    DeadBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    router,
    store,
    // effects
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
