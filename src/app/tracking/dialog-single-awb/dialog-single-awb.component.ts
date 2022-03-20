import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-single-awb',
  templateUrl: './dialog-single-awb.component.html',
  styleUrls: ['./dialog-single-awb.component.scss']
})
export class DialogSingleAwbComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogSingleAwbComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
