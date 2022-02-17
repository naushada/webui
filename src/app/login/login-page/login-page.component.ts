import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/shared/message-struct';
import { PubsubService } from 'src/app/shared/pubsub.service';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  private mBtnStatus: boolean;

  loginForm = this.fb.group({
    id: [null, Validators.required],
    password: [null, Validators.required],

  });

  constructor(private fb: FormBuilder, private on: PubsubService, private rest: RestApiService, private rt: Router) {
    this.mBtnStatus = false;
  }

  onLogin(): void {

    this.isBtnDisabled = true;
    let id:string = this.loginForm.value.id;
    let pwd:string = this.loginForm.value.password;
    
    this.rest.getAccountInfo(id, pwd).subscribe(
      /** onResponse */
      (acc: Account) => {
          /** publish account to subscribers */
          this.on.emit_accountInfo(acc);
          this.rt.navigate(['/webui']);
      },
      /** onError */
      (error: any) => {this.isBtnDisabled = false;},
      /** onCompletion */
      () => {this.isBtnDisabled = false;});
  }

  get isBtnDisabled(): boolean {
    return(this.mBtnStatus);
  }

  set isBtnDisabled(st: boolean) {
    this.mBtnStatus = st;
  }
}
