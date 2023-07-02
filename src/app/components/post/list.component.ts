import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Post } from "../../models/post.model";
import { PostRepository } from "../../models/post.repository";

@Component({
    selector: "list-post",
    templateUrl: "list.component.html"
})

export class ListComponent{

    title = 'Explore Products';    

    constructor(public repository: PostRepository,
        private router: Router) 
    {
        repository.setPostList();
    }

    get postList(): Post[] {
        return this.repository.getPostList();        
    }

    deleteMethod(id: string) {
        if(confirm("Are you sure to disable the post?")) {
            this.router.navigateByUrl("post/delete/"+id);
        }
    }
    
}