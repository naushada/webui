import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { PubsubService } from 'src/app/shared/pubsub.service';
import { Shipment, Account } from 'src/app/shared/message-struct';

@Component({
  selector: 'app-update-status-awb',
  templateUrl: './update-status-awb.component.html',
  styleUrls: ['./update-status-awb.component.scss']
})
export class UpdateStatusAwbComponent implements OnInit, OnDestroy {

  private mIsBtnDisabled: boolean;
  updateAwbForm: FormGroup;

  constructor(private fb: FormBuilder, private rest: RestApiService, private pubsub:PubsubService) { 
    this.mIsBtnDisabled = false;

    this.updateAwbForm = this.fb.group({});

  }


  ngOnInit(): void {
  }

  onStatusUpdateAwb() {
  }

  get isBtnDisabled(): boolean {
    return(this.mIsBtnDisabled);
  }

  set isBtnDisabled(st: boolean) {
    this.mIsBtnDisabled = st;
  }

  ngOnDestroy() : void {
  }
}
