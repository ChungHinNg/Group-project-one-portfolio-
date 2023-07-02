import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Question } from "./question.model";
import { RestDataSource } from "./rest.datasource";
import { ResponseModel } from "./response.model";

@Injectable()
export class QuestionRepository {

    private tempQuestionList: Question[] = [];
    public listReady: boolean = false;

    constructor(private dataSource: RestDataSource) {}

    getQuestionList(item: Post): Question[] {
        return this.tempQuestionList.filter(question => question.post == item._id);
    }

    setQuestionList(item: Post){
        this.listReady = false;
        // Use subscribe to get data when it is ready
        this.dataSource.getQuestionList(item).subscribe(data => {
            this.tempQuestionList = data;
            this.listReady = true;
        });
    }

    // getItem(id: string): Post {
    //     return Object.assign({}, this.tempPostList.find(i => i._id === id)!);        
    // }

    async addQuestion(question: Question) {
        this.dataSource.insertQuestion(question)
            .subscribe(response => {
                if(response._id) // If API created
                {
                    this.tempQuestionList.push(response);
                }
                else{ // If API send error.
                    // Convert into ResponseModel to get the error message.
                    let error = response as ResponseModel;  
                    alert(`Error: ${error.message}`);
                }
        });
    }

    async addResponse(question: Question) {
        this.dataSource.updateQuestion(question)
            .subscribe(resp => {
                let response = resp as ResponseModel;
                if (response.success == true) {
                    console.log(`Sucess: ${response.success}`);
                    this.tempQuestionList.splice(this.tempQuestionList.
                        findIndex(i => i._id == question._id), 1, question);
                }
                else{
                    // If API send error.
                    alert(`Error: ${response.message}`);
                }   
        });
    }

}