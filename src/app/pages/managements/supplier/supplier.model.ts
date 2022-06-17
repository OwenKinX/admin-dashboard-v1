export interface Supplier {
    _id:string,
    sup_id:string,
    name:string,
    phone:number,
    email:string,
    address:{
        province:string,
        district:string,
        village:string
    }
}