import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent implements OnInit {

  generateReportForm!: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.generateReportForm = this.fb.group({
      sku:'',
      accCode:''
    });
  }

  
  ngOnInit(): void {
  }

  onInventoryReport() {

  }

  onExportToExcel() {

  }
}
