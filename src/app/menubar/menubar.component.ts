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
  private mLogin: boolean;
  private subs: Subscription;
  private mMenuItem: string;
  constructor(private rt: Router, private pubsub: PubsubService) { 

    this.mMenuSelected = "";
    this.mUserName = "";
    this.mIsDashboard = true;
    this.mLogin = false;
    this.mMenuItem = "";

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
    this.mLogin = false;
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

  public get isLogin(): boolean {
    return this.mLogin;
  }

  public set isLogin(item: boolean) {
    this.mLogin = item;
  }

  get menuSelected(): string {
    return(this.mMenuSelected);
  }

  set menuSelected(item: string) {
    this.mMenuSelected = item;
  }

  set menuItem(item: string) {
    this.mMenuItem = item;
  }

  get menuItem(): string {
    return(this.mMenuItem);
  }

  ngOnDestroy(): void {
      this.subs.unsubscribe();
  }
}
