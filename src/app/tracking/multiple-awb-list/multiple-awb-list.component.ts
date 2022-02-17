import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MultipleAwbListDataSource, MultipleAwbListItem } from './multiple-awb-list-datasource';

@Component({
  selector: 'app-multiple-awb-list',
  templateUrl: './multiple-awb-list.component.html',
  styleUrls: ['./multiple-awb-list.component.scss']
})
export class MultipleAwbListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<MultipleAwbListItem>;
  dataSource: MultipleAwbListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor() {
    this.dataSource = new MultipleAwbListDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
