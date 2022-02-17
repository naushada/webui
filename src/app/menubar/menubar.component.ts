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
  private subs: Subscription;
  private mMenuItem: string;
  private mShowMenubar: boolean;
  private mShowNavbar: boolean;

  constructor(private rt: Router, private pubsub: PubsubService) { 

    this.mMenuSelected = "dashboard";
    this.mUserName = "";
    this.mMenuItem = "";
    this.mShowMenubar = true;
    this.mShowNavbar = false;

    this.subs = this.pubsub.onAccount.subscribe((acct: Account) => {if(acct.name.length > 0) {this.userName = acct.name;}});

  }

  get showNavbar() : boolean {
    return(this.mShowNavbar);
  }

  set showNavbar(item: boolean) {
    this.mShowNavbar = item;
  }

  get showMenubar() : boolean {
    return(this.mShowMenubar);
  }

  set showMenubar(item: boolean) {
    this.mShowMenubar = item;
  }

  /**
   * pubic method
   */
  ngOnInit(): void {
    //this.onMenuSelect('dashboard');
    this.showMenubar = true;
    this.showNavbar = false;
  }

  public onMenuSelect(item: string) : void {
    this.menuSelected = item;
        
    if(item == 'dashboard') {
      this.showNavbar = false;
      this.showMenubar = true;

      //this.rt.navigate(['/dashboard'])
    } else {
      this.showNavbar = true;
      //this.rt.navigate(['/webui'])
    }
  }

  public onProfile() : void {

  }

  public onLogout() : void {
    this.showMenubar = false;
    this.showNavbar = false;
    //this.rt.navigate(['/login']);
    let acc: Account = new Account();
    acc.name = "";
    this.pubsub.emit_accountInfo(acc);
  }

  public canItBeDisplayed(menuItem: string) : boolean {
    let result:boolean = false;
    
    if(menuItem == this.mMenuSelected) {
      result = true;
    }

    return(result);
  }

  public onDashboard(menuItem: string): boolean {
    if(menuItem == 'dashboard') {
      this.showMenubar = true;
      this.showNavbar = false;
      return(false);
    }

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
