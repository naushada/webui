import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ShipmentListItem {
  serialNo: number;
  shipmentNo: string;
  altRefNo: string;
  senderRefNo: string;
  createdBy: string;
  createdOn: Date;
  service: string;
  receipent: string;
  location: string;
  country: string;
}

let SHIPMENT_DATA: ShipmentListItem[] = [];

/**
 * Data source for the ShipmentList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ShipmentListDataSource extends DataSource<ShipmentListItem> {
  data: ShipmentListItem[] = SHIPMENT_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();

  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ShipmentListItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ShipmentListItem[]): ShipmentListItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ShipmentListItem[]): ShipmentListItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'shipmentNo': return compare(a.shipmentNo, b.shipmentNo, isAsc);
        case 'altRefNo': return compare(a.altRefNo, b.altRefNo, isAsc);
        case 'senderRefNo': return compare(a.senderRefNo, b.senderRefNo, isAsc);
        case 'createdBy': return compare(a.createdBy, b.createdBy, isAsc);
        case 'createdOn': return compare(+a.createdOn, +b.createdOn, isAsc);
        case 'service': return compare(a.service, b.service, isAsc);
        case 'receipent': return compare(a.receipent, b.receipent, isAsc);
        case 'location': return compare(a.location, b.location, isAsc);
        case 'serialNo': return compare(+a.serialNo, +b.serialNo, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
