import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "../../models/user.model";
import { AuthService } from "../../models/auth.service";
import { RestDataSource } from "src/app/models/rest.datasource";
import { ResponseModel } from "src/app/models/response.model";


@Component({
    selector: "profile",
    templateUrl: "profile.component.html"
})

export class ProfileComponent {
    
    title:string = 'My Profile';
    editing: boolean = false;
    user: User = new User();
    public message: string;

    constructor(private router: Router,
        public auth: AuthService,
        public dataSource: RestDataSource) 
    {
        this.auth.getUser()
        .subscribe(response => {
            console.log(response);
            this.user = response;
        });
    }


    save(form: NgForm) {
        if (form.valid) {
            this.dataSource.updateUser(this.user).subscribe(resp => {

                // Convert into ResponseModel to get the error message.
                let response = resp as ResponseModel;
                if (response.success == true) {
                    console.log(`Sucess: ${response.success}`);
                    alert(response.message);
                }
                else{
                    // If API send error.
                    alert(`Error: ${response.message}`);
                }        
            });
            this.router.navigateByUrl("user/profile");  
        } else {
            this.message = "All the fields are required";
        }  
    }
}