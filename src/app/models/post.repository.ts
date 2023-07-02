import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { RestDataSource } from "./rest.datasource";
import { ResponseModel } from "./response.model";

@Injectable()
export class PostRepository {

    private tempPostList: Post[] = [];
    public listReady: boolean = false;
    public currentDate: Date = new Date();

    constructor(private dataSource: RestDataSource) {}

    getPostList(): Post[] {
        return this.tempPostList.filter( item => item.status == 'Active').filter( item => new Date(item.startDate) <= this.currentDate).filter( item => new Date(item.expireDate) >= this.currentDate);
    }

    setPostList(){
        this.listReady = false;
        // Use subscribe to get data when it is ready
        this.dataSource.getPostList().subscribe(data => {
            this.tempPostList = data;
            this.listReady = true;
        });
    }

    getItem(id: string): Post {
        return Object.assign({}, this.tempPostList.find(i => i._id === id)!);        
    }

    async savePost(item: Post) {

        // If it does not have id, then create a new item.
        if (item._id == null || item._id == "") {
            this.dataSource.insertPost(item)
                .subscribe(response => {
                    if(response._id) // If API created
                    {
                        this.tempPostList.push(response);
                    }
                    else{ // If API send error.
                        // Convert into ResponseModel to get the error message.
                        let error = response as ResponseModel;  
                        alert(`Error: ${error.message}`);
                    }
                });
        } else {
            // If it has id, then update a existing item.
            this.dataSource.updatePost(item).subscribe(resp => {

                // Convert into ResponseModel to get the error message.
                let response = resp as ResponseModel;
                if (response.success == true) {
                    console.log(`Sucess: ${response.success}`);
                    this.tempPostList.splice(this.tempPostList.
                        findIndex(i => i._id == item._id), 1, item);
                }
                else{
                    // If API send error.
                    alert(`Error: ${response.message}`);
                }        
            });
        }
    }

    deletePost(id: string) {
        this.dataSource.deletePost(id).subscribe(response => {
            if (response.success) {
                this.tempPostList.splice(this.tempPostList.
                    findIndex(item => item._id == id), 1);                                
            }
            else{
                alert(`Error: ${response.message}`);
            }
        })
    }

   

}