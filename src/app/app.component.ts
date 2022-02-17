import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Account } from './shared/message-struct';
import { PubsubService } from './shared/pubsub.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'webui';

  private mIsLoggedIn: boolean;
  private sub: Subscription;

  constructor(private pubsub: PubsubService) {
    this.mIsLoggedIn = false;
    this.sub = this.pubsub.onAccount.subscribe(
      (acc: Account) => {
        if(acc.name.length > 0) { this.isUserLoggedIn = true;
        } else {
          this.isUserLoggedIn = false;
        }
      });
    
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();    
  }

  get isUserLoggedIn() : boolean {
    return(this.mIsLoggedIn);
  }

  set isUserLoggedIn(elm: boolean) {
    this.mIsLoggedIn = elm;
  }
}
