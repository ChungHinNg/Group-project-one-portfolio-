import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/user/login.component';
import { SignupComponent } from './components/user/signup.component';
import { ProfileComponent } from './components/user/profile.component';
import { AddEditComponent } from './components/post/add_edit.component';
import { ListComponent } from './components/post/list.component';
import { DetailsComponent } from './components/post/details.component';
import { IndexComponent } from './components/index.component';

import { AuthGuard } from "./components/user/auth.guard";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: "", component: IndexComponent },
            { path: "post/list", component: ListComponent },
            { path: "post/details/:id", component: DetailsComponent},
            { path: "post/:mode", component: AddEditComponent, canActivate: [AuthGuard]},
            { path: "post/:mode/:id", component: AddEditComponent, canActivate: [AuthGuard] },
            { path: "user/login", component: LoginComponent },
            { path: "user/signup", component: SignupComponent },
            { path: "user/profile", component: ProfileComponent, canActivate: [AuthGuard] },
            { path: "**", redirectTo: "" }
        ])
    ],
    exports: [RouterModule],
})

export class AppRoutingModule {}