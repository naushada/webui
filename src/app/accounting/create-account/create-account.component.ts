import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account, CountryName, Currency, Role } from 'src/app/shared/message-struct';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  createAccountForm!: FormGroup;
  Countries = CountryName;
  Currencies = Currency;
  Roles = Role;
  
  constructor(private fb: FormBuilder, private rest: RestApiService) { 
    this.createAccountForm = this.fb.group({
      accountCode:'',
      autogenerate:false,
      accountPassword:'',
      companyName:'',
      role:Role[0],
      name:'',
      address:'',
      city:'',
      state:'',
      postalCode:'',
      country:CountryName[1],
      contact:'',
      email:'',
      quotedAmount:'',
      currency:Currency[1],
      vat:'',
      tradingLicense:'',
      bankAccountNo:'',
      ibnNo:''
    });
  }

  
  ngOnInit(): void {
  }

  onCreateAccount() {
    let newAccount = new Account(this.createAccountForm.value);
    this.rest.createAccount(newAccount).subscribe((data) => {console.log(data);},
       (error: any) => {}, 
       () => {alert("Account is created successfully");}
    );

  }

  onCheckboxSelect() {
    let status: boolean = false;
    status = this.createAccountForm.value.autogenerate;
    if(true == status) {
      this.createAccountForm.controls['accountCode'].setValue("");
    } else {
      this.createAccountForm.controls['accountCode'].setValue("[System Generated]");
    }
  }
}
