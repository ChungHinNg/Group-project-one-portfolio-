import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ModelModule } from "../../models/model.module";
import { PartialsModule } from '../partials/partials.module';
import { ProfileComponent } from "./profile.component";
import { SignupComponent } from "./signup.component";
import { LoginComponent } from"./login.component";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [ModelModule, BrowserModule, FormsModule, PartialsModule,RouterModule],
    declarations: [ProfileComponent, SignupComponent, LoginComponent ],
    exports : [ProfileComponent, SignupComponent, LoginComponent]
})

export class UserModule {}