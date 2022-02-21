import { invalid } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Subscription } from 'rxjs';
import { Account, Shipment, ShipmentList } from './message-struct';

@Injectable({
  providedIn: 'root'
})
export class PubsubService {
  
  private acctInst: Account = new Account();
  private acctbs$ = new  BehaviorSubject(this.acctInst);

  constructor() { }

  /** onAccount will be used to subscribe for AccountInfo of logged in user */
  public onAccount = this.acctbs$.asObservable();

  /** This will be used to publish account info to subscriber */
  public emit_accountInfo(acct: Account) {
    this.acctbs$.next(acct);
    this.acctInst = new Account(acct);
  }

  /** ShipmentList */
   
  private shipmentInst: Array<Shipment> = [];
  private shipmentbs$ = new  BehaviorSubject(this.shipmentInst);

  /** onAccount will be used to subscribe for AccountInfo of logged in user */
  public onshipment = this.shipmentbs$.asObservable();

  /** This will be used to publish account info to subscriber */
  public emit_shipment(sh: Array<Shipment>) {
    this.shipmentbs$.next(sh);
    this.shipmentInst = sh;
  }

    /** Selected Navbar Element */
   
    private chosenItem: string = "";
    private chosenItembs$ = new  BehaviorSubject(this.chosenItem);
  
    /** onAccount will be used to subscribe for AccountInfo of logged in user */
    public onItemSelect = this.chosenItembs$.asObservable();
  
    /** This will be used to publish account info to subscriber */
    public emit_chosenItem(sh: string) {
      this.chosenItembs$.next(sh);
      this.chosenItem = sh;
    }

}

