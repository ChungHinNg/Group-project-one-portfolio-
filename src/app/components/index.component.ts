import { Component  } from "@angular/core";
import { Router } from "@angular/router";
import { Post } from "../models/post.model";
import { PostRepository } from "../models/post.repository";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html'
})

export class IndexComponent{

    title = 'Home';    



    // deleteMethod(id: string) {
    //     if(confirm("Are you sure do you want to delete?")) {
    //         this.router.navigateByUrl("post/delete/"+id);
    //     }
    // }
    
}
