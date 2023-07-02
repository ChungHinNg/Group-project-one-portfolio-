import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';

import { IndexModule } from './components/index.module';
import { PostModule } from "./components/post/post.module";
import { UserModule } from "./components/user/user.module";

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './components/user/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    IndexModule,
    PostModule,
    UserModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
