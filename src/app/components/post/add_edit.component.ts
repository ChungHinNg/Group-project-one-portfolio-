import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Post, Status } from "../../models/post.model";
import { PostRepository } from "../../models/post.repository";

@Component({
    selector: "add-edit",
    templateUrl: "add_edit.component.html"
})

export class AddEditComponent {
    
    title:string = 'Sell A Product';
    editing: boolean = false;
    item: Post = new Post();
    public message: string;

    constructor(private repository: PostRepository,
                private router: Router,
                activeRoute: ActivatedRoute) 
    { 
        // Delete
        if (activeRoute.snapshot.params["mode"] == "delete") {
            this.deleteItem(activeRoute.snapshot.params["id"]);
        }

        this.editing = activeRoute.snapshot.params["mode"] == "edit";
        
        // Edit
        if (this.editing) {
            this.title = 'Edit A Product Post';
            this.item = this.repository.getItem(activeRoute.snapshot.params["id"]);
        } 
      
    }

    save(form: NgForm) {
        if (form.valid && (this.item.status == 'Active' || this.item.status == 'Disable')) {
            this.repository.savePost(this.item);
            this.router.navigateByUrl("post/list"); 
        } else {
            this.message = "All the fields are required";
        }               
    }

    private deleteItem(id: string){
        this.repository.deletePost(id);
        this.router.navigateByUrl("post/list");
    }
    
}