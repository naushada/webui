import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from 'src/app/shared/message-struct';
import { PubsubService } from 'src/app/shared/pubsub.service';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit, OnDestroy {

  subsink = new SubSink();
  accountList!: Array<Account>;
  acctInfo!: Account;

  dataSource = new MatTableDataSource<Account>();
  tableColumn:string[] = ["accountCode", "accountPassword", "companyName", "role", "name", "address", "city", "state", "postalCode", "country", "contactNumber", "email", "quotedAmount", "currency", "vat", "tradingLicense", "bankAccountNo", "ibnNo"];
  constructor(private pubsub: PubsubService, private rest: RestApiService) { 
    this.subsink.sink = this.pubsub.onAccount.subscribe((acct: Account) => {this.acctInfo = acct;});

  }

  ngOnInit(): void {
    if("Employee" == this.acctInfo.role) {
      this.onAccountList();
    }
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  onAccountList() {
    this.rest.getAccountInfoList().subscribe((elm: Account[]) => {
      elm.forEach((ac: Account) => {
        this.accountList.push(new Account(ac));
      });
    },
    (error: any) => {},
    () => {this.dataSource.data = this.accountList;});
  }
}
