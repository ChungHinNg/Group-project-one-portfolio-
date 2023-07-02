import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { PostRepository } from "./post.repository";
import { QuestionRepository } from "./question.repository";
import { RestDataSource } from "./rest.datasource";
import { AuthService } from "./auth.service";


@NgModule({
    imports: [HttpClientModule],
    providers: [
        PostRepository,
        QuestionRepository,
        RestDataSource,
        AuthService
    ]
})

export class ModelModule { }