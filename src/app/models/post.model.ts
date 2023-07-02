
export class Post {
    
    constructor(
        public _id?: string,
        public title?: string,
        public picture?: String,
        public price?: number,
        public description?: string,
        public startDate?: Date,
        public expireDate?: Date,
        public status?: Status[0],
        public owner?: {
            _id: string
        }
    ){}

}

export enum Status {
    Active = 'Active',
    Disable = 'Disable',
}



