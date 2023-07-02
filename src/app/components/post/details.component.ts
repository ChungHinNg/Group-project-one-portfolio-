import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Post, Status } from "../../models/post.model";
import { Question } from "../../models/question.model";
import { PostRepository } from "../../models/post.repository";
import { QuestionRepository } from "../../models/question.repository";
import { AuthService } from "src/app/models/auth.service";
import { User } from "../../models/user.model";

@Component({
    selector: "post-details",
    templateUrl: "details.component.html"
})

export class DetailsComponent {
    
    title:string = 'Product Details';
    item: Post = new Post();
    question: Question = new Question();
    user: User = new User();
    public message: string;


    constructor(private postRepository: PostRepository,
                private questionRepository: QuestionRepository,
                private router: Router,
                public auth: AuthService,
                activeRoute: ActivatedRoute) 
    { 
        this.item = this.postRepository.getItem(activeRoute.snapshot.params["id"]);
        questionRepository.setQuestionList(this.item);

        this.auth.getUser()
        .subscribe(response => {
            console.log(response);
            this.user = response;
        });
    }

    get questionList(): Question[] {
        return this.questionRepository.getQuestionList(this.item);        
    }

    postQuestion(event: any) {
        if (event.valid){
            this.question.post = this.item._id;

            // Check if user is logged in
            if (this.user._id){
                this.question.questioner = this.user.firstName + " " + this.user.lastName;
            }else{
                this.question.questioner = "Anonymous User";
            }
    
            this.questionRepository.addQuestion(this.question);
            this.router.navigateByUrl("post/details/" + this.item._id);   
            event.target.question.value = "";
        }else{
            alert("Please fill in a question");
        }
    }

    postResponse(event: any) {
        this.question._id = event.target.questionid.value;
        this.question.post = this.item._id;
        this.question.questioner = event.target.questioner.value;
        this.question.question = event.target.questioncontent.value;
        this.question.response = event.target.response.value;
        console.log(this.question);
        this.questionRepository.addResponse(this.question);
        this.router.navigateByUrl("post/details/" + this.item._id);             
    }
}