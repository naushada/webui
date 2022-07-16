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
  accountList: Array<any> = [];
  acctInfo!: Account;

  dataSource = new MatTableDataSource<Account>();
  tableColumn:Array<string> = ["accountCode", "accountPassword", "companyName", "role", "name", "address", "city", "state", "postalCode", "country", "contactNumber", "email", "quotedAmount", "currency", "vat", "tradingLicense", "bankAccountNo", "ibnNo"];
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
        let ent = {
          accountCode: ac.accountCode,
          accountPassword: ac.accountPassword,
          companyName: ac.companyName,
          role: ac.role,
          name: ac.name,
          address: ac.address,
          city: ac.city,
          state: ac.state,
          postalCode: ac.postalCode,
          country: ac.country,
          contactNumber: ac.contact,
          email: ac.email,
          quotedAmount: ac.quotedAmount,
          currency: ac.currency,
          vat: ac.vat,
          tradingLicense: ac.tradingLicense,
          bankAccountNo: ac.bankAccountNo,
          ibnNo: ac.ibnNo

        };
        this.accountList.push(ent);
      });
    },
    (error: any) => {},
    () => {this.dataSource.data = this.accountList;});
  }
}
