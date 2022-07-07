import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderDetail } from './orderDetail.model';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderDetailService{

    public cartItemList:any = [];
    public orderBillList = new BehaviorSubject<any>([]);
    
    public orderDetailList = new Subject<any>();

    public selectSup:any = [];
    public selectSupList = new BehaviorSubject<any>([]);

    selectedOrderDetail:OrderDetail;
    detail:OrderDetail[];
    readonly api_url = 'http://localhost:8001/api';

    constructor(private http:HttpClient){}

    // Supplier list
    getSup(){
        return this.selectSupList.asObservable();
    }
    setSup(supplier:any){
        this.selectSup.push(...supplier);
        this.selectSupList.next(supplier);
    }
    addSup(supplier:any){
        this.selectSup.push(supplier);
        this.selectSupList.next(this.selectSup);
    }
    clearSup(){
        this.selectSup = [];
        this.selectSupList.next(this.selectSup);
    }
    // end

    // Product order list
    getOrderList(){
        return this.orderBillList.asObservable();
    }
    setOrder(product:any){
        this.cartItemList.push(...product);
        this.orderBillList.next(product);
    }
    addToList(product:any){
        this.cartItemList.push(product);
        this.orderBillList.next(this.cartItemList);
        this.getTotal();
        console.log(this.cartItemList);
    }
    getTotal():number{
        let grandTotal = 0;
        this.cartItemList.map((a:any) => {
            grandTotal += a.total;
        });
        return grandTotal;
    }
    removeItem(product:any){
        this.cartItemList.map((a:any, i:any) => {
            if(product.pro_id === a.pro_id){
                this.cartItemList.splice(i,1);
            }
        })
        this.orderBillList.next(this.cartItemList);
    }
    clearCart(){
        this.cartItemList = [];
        this.orderBillList.next(this.cartItemList)
    }
    // end

    AddOrderDetail(orderDetail:any){
        return this.http.post(`${this.api_url}/orderDetail/add`, orderDetail);
    }

    GetOrderDetailByOrderNo( order_no:any ){
        return this.http.get(`${this.api_url}/orderDetail/${order_no}`);
    }

    DeleteOrderDetailByOrderNo( order_no:any ){
        return this.http.delete(`${this.api_url}/orderDetail/deletes/${order_no}`);
    }

    getPurchase(order_no:string){
        return this.http.get<any>(`${this.api_url}/orders/purchase?order_no=${order_no}`)
    }

    getOrderReportList(){
        return this.http.get<any>(`${this.api_url}/orderdetail/reports`)
    }

    getReportByDate(startdate:any, lastdate:any){
        return this.http.get<any>(`${this.api_url}/orderdetail/report?startdate=${startdate}&lastdate=${lastdate}`)
    }

    getOrderDetailByOrderDate(date:any){
        return this.http.get<any>(`${this.api_url}/imports/order/product?date=${date}`);
    }
}