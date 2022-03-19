import { invalid } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Subscription, Subject } from 'rxjs';
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

  /** This will be used to publish shipment Info to subscriber */
  public emit_shipments(sh: Array<Shipment>) {
    this.shipmentbs$.next(sh);
    this.shipmentInst = sh;
  }

  /** Shipment */
  private shipment: Shipment = new Shipment();
  private shipments$ = new  BehaviorSubject<Shipment>(this.shipment);
  
  /** onAccount will be used to subscribe for AccountInfo of logged in user */
  public onSingleShipment = this.shipments$.asObservable();
  
  /** This will be used to publish shipment Info to subscriber */
  public emit_shipment(sh: Shipment) {
    this.shipments$.next(sh);
    this.shipment = sh;
  }

  public getSelectedShipment(action: any): Subscription {
    return(this.onSingleShipment.subscribe(action));
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

