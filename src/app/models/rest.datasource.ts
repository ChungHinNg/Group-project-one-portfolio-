import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of  } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpHeaders } from '@angular/common/http';
import { Post } from "./post.model";
import { Question } from "./question.model";
import { ResponseModel } from "./response.model";
import { User } from './user.model';
import { environment } from "src/environments/environment";


@Injectable()
export class RestDataSource {

    baseUrl : string;
    auth_token : string;

    constructor(private http: HttpClient) {        
        this.baseUrl = environment.apiURL;
    }

    // Post
    getPostList(): Observable<Post[]> {
        return this.http.get<Post[]>(
            this.baseUrl + "post/list"
        );
    }

    insertPost(item: Post): Observable<Post> {
        return this.http.post<Post>(
                this.baseUrl + "post/add",
                item,
                this.provideToken()
            ).pipe(map(response => {
                return response;
            }),
            catchError(error => {
                console.log(error.error);
                return of(error.error);
            }));
    }

    updatePost(item: Post): Observable<ResponseModel> {
        return this.http.put<ResponseModel>(
                this.baseUrl+ "post/edit/" + item._id,
                item,
                this.provideToken()
            )
            .pipe(map(response => {
                return response;
            }),
            catchError(error => {
                return of(error.error)
            }));
    }

    deletePost(id: string): Observable<ResponseModel> {
        return this.http.delete<ResponseModel>(
            this.baseUrl+ "post/delete/" + id,
            this.provideToken()
            ).pipe(map(response => {
                return response;
            }),
            catchError(error => {return of(error.error)}));
    }

    // showPost(item: Post): Observable<Post> {
    //     return this.http.get<Post>(
    //             this.baseUrl+ "post/details/" + item._id
    //         );
    // }

    getQuestionList(item: Post): Observable<Question[]> {
        return this.http.get<Question[]>(
            this.baseUrl+ "post/details/" + item._id
        );
    }

    insertQuestion(question: Question): Observable<Question> {
        return this.http.post<Question>(
            this.baseUrl + "question/add",
            question
        ).pipe(map(response => {
            return response;
        }),
        catchError(error => {
            console.log(error.error);
            return of(error.error);
        }));
    }

    updateQuestion(question: Question): Observable<Question> {
        return this.http.put<ResponseModel>(
                this.baseUrl+ "question/edit/" + question._id,
                question,
                this.provideToken()
            )
            .pipe(map(response => {
                return response;
            }),
            catchError(error => {
                return of(error.error)
            }));
    }

    // User endpoint of the API
    authenticate(user: string, pass: string): Observable<ResponseModel> {
        return this.http.post<any>(this.baseUrl + "user/login", 
        {
            username: user, 
            password: pass
        }).pipe(
            map(response => {
                // console.log(response);
                this.auth_token = response.success ? response.token : null;
                return response;
            }),
            catchError(error => {return of(error.error)})
        );
    }

    signupUser(user: User): Observable<ResponseModel> {
        return this.http.post<ResponseModel>(
                this.baseUrl + "user/signup", 
                user
            )
            .pipe(map(response => {
                return response;
            }),
            catchError(error => {return of(error.error)}));
    }

    getUserList(): Observable<User> {
        return this.http.get<User>(
            this.baseUrl + "user/profile",
            this.provideToken()
        ).pipe(map(response => {
            return response;
        }),
        catchError(error => {return of(error.error)}));
    }

    updateUser(item: User): Observable<ResponseModel> {
        return this.http.post<ResponseModel>(
                this.baseUrl+ "user/profile",
                item,
                this.provideToken()
            )
            .pipe(map(response => {
                return response;
            }),
            catchError(error => {
                return of(error.error)
            }));
    }


    // Previously called getOptions()
    private provideToken() {
        return {
            headers: new HttpHeaders(
                {
                    "Authorization": `Bearer ${this.auth_token}`
                }
            )
        }
    }

}