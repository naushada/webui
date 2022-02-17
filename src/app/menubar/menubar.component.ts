import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { Account } from '../shared/message-struct';
import { PubsubService } from '../shared/pubsub.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit, OnDestroy {

  /** 
   * private data member
   */
  private mMenuSelected: string;
  private mUserName: string;
  private mIsDashboard: boolean;
  private mLogout: boolean;
  
  private subs: Subscription;

  constructor(private rt: Router, private pubsub: PubsubService) { 

    this.mMenuSelected = "";
    this.mUserName = "";
    this.mIsDashboard = true;
    this.mLogout = false;

    this.subs = this.pubsub.onAccount.subscribe((acct: Account) => {this.userName = acct.name;});

  }

  /**
   * pubic method
   */
  ngOnInit(): void {
    this.onMenuSelect('dashboard');
  }

  public onMenuSelect(item: string) : void {
    this.mMenuSelected = item;

    if(item == 'dashboard') {
      this.isDashboard = true;
      this.rt.navigate(['/dashboard'])
    } else {
      this.isDashboard = false;
      this.rt.navigate(['/'])
    }
  }

  public onProfile() : void {

  }

  public onLogout() : void {
    this.mLogout = true;
    this.isDashboard = true;
    this.rt.navigate(['/login']);
  }

  public canItBeDisplayed(menuItem: string) : boolean {
    let result:boolean = false;
    
    if(menuItem == this.mMenuSelected) {
      result = true;
    }

    return(result);
  }

  public onDashboard(menuItem: string): boolean {
    if(menuItem == 'dashboard')
      return(false)

    return(true);
  }

  /** 
   * Getter/Setter Member Function 
   * */
  public get userName() : string {
    return(this.mUserName);
  }

  public set userName(name:string) {
    this.mUserName = name;
  }

  public get isDashboard(): boolean {
    return this.mIsDashboard;
  }

  public set isDashboard(elm:boolean) {
    this.mIsDashboard = elm;
  }

  public get isLogout(): boolean {
    return this.mLogout;
  }

  public set isLogout(item: boolean) {
    this.mLogout = item;
  }

  ngOnDestroy(): void {
      this.subs.unsubscribe();
  }
}
