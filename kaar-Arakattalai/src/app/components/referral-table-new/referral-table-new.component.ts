// import { Component, OnInit, ViewEncapsulation, Input, OnChanges, SimpleChanges } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AgGridModule } from 'ag-grid-angular';
// import {
//   ModuleRegistry,
//   ClientSideRowModelModule,
//   TextFilterModule,
//   NumberFilterModule,
//   DateFilterModule,
//   CustomFilterModule,
//   CellStyleModule,
//   ValidationModule,
//   ColDef,
//   ICellRendererParams,
//   GridOptions
// } from 'ag-grid-community';
// import { AdminTableService } from '../../services/admintable.service';
// import { TreasuryActionComponent } from '../treasuryaction/treasuryaction.component';
// import { TreasuryViewDetailsComponent } from '../treasuryviewdetails/treasuryviewdetails.component';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

// // Register AG Grid modules
// ModuleRegistry.registerModules([
//   ClientSideRowModelModule,
//   TextFilterModule,
//   NumberFilterModule,
//   DateFilterModule,
//   CustomFilterModule,
//   CellStyleModule,
//   ValidationModule
// ]);

// @Component({
//   selector: 'app-referral-table-new',
//   standalone: true,
//   imports: [CommonModule, AgGridModule, TreasuryActionComponent, TreasuryViewDetailsComponent],
//   encapsulation: ViewEncapsulation.None,
//   templateUrl: './referral-table-new.component.html',
//   styleUrls: ['./referral-table-new.component.scss']
// })
// export class ReferralTableNewComponent implements OnInit, OnChanges {
//   @Input() searchTerm: string = '';

//   rowData: any[] = [];
//   filteredData: any[] = [];

//   // Selected items for modals
//   selectedAdmin: any = null;
//   selectedAction: any = null;

//   columnDefs: ColDef[] = [
//     { headerName: 'S. No.', field: 'sno', width: 80, sortable: true, cellClass: 'grey-cell' },
//     { headerName: 'Employee Name', field: 'employeeName', flex: 2, cellClass: 'grey-cell', sortable: true, filter: 'agTextColumnFilter' },
//     { headerName: 'Employee AID', field: 'employeeAID', flex: 1, sortable: true, filter: 'agNumberColumnFilter' },
//     { headerName: 'Referral Type', field: 'referralType', flex: 1.5, sortable: true },
//     { headerName: 'Annual Contribution', field: 'annualContribution', flex: 1, sortable: true, valueFormatter: params => this.currencyFormatter(params.value) },
//     { headerName: 'Amount Requested', field: 'amountRequested', flex: 1, sortable: true, valueFormatter: params => this.currencyFormatter(params.value) },
//     {
//       headerName: 'Actions',
//       field: 'actions',
//       width: 90,
//       cellRenderer: (params: ICellRendererParams) => {
//         return `<button class="action-btn" data-action="edit" data-id="${params.data?.id || ''}" title="Edit">&#9998;</button>`;
//       },
//       cellRendererParams: { suppressSanitizeHtml: true }
//     }
//   ];

//   defaultColDef: ColDef = { sortable: true, filter: false, resizable: true };

//   gridOptions: GridOptions = {
//     suppressMovableColumns: true,
//     onCellClicked: event => this.onCellClicked(event)
//   };

//   gridApi: any;
//   gridColumnApi: any;

//   constructor(private adminTableService: AdminTableService) {}

//   ngOnInit(): void {
//     this.adminTableService.getEmployees().subscribe({
//       next: (data: any[]) => {
//         this.rowData = data.map((row, index) => ({ ...row, sno: index + 1 }));
//         this.filteredData = this.rowData;
//         this.setGridHeight();
//       },
//       error: (err: any) => {
//         console.error('Error fetching employees:', err);
//         this.rowData = [];
//         this.filteredData = [];
//       }
//     });
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['searchTerm']) {
//       this.applyFilter();
//     }
//   }

//   onGridReady(params: any) {
//     this.gridApi = params.api;
//     this.gridColumnApi = params.columnApi;
//     this.setGridHeight();
//   }

//   applyFilter(): void {
//     if (!this.searchTerm) {
//       this.filteredData = this.rowData;
//     } else {
//       const term = this.searchTerm.toLowerCase();
//       this.filteredData = this.rowData.filter(item =>
//         Object.values(item).some(val => val && val.toString().toLowerCase().includes(term))
//       );
//     }
//     this.setGridHeight();
//   }

//   setGridHeight() {
//     const rowCount = this.filteredData.length;
//     const headerHeight = 40;
//     const rowHeight = 45;
//     const maxHeight = 800;
//     const height = Math.min(headerHeight + rowCount * rowHeight + 10, maxHeight);
//     const gridDiv = document.querySelector('.custom-ag-grid') as HTMLElement;
//     if (gridDiv) {
//       gridDiv.style.height = height + 'px';
//     }
//   }

//   currencyFormatter(value: any): string {
//     return value == null ? '' : Number(value).toLocaleString('en-IN');
//   }

//   onCellClicked(event: any): void {
//     const target = event.event?.target as HTMLElement;
//     const action = target?.getAttribute('data-action');

//     if (action === 'edit') {
//       this.selectedAction = event.data; // pass full row to TreasuryAction
//       this.selectedAdmin = null;
//     } else if (event.colDef.field !== 'actions') {
//       this.selectedAdmin = event.data; // pass full row to TreasuryViewDetails
//       this.selectedAction = null;
//     }
//   }

//   closeDetails() {
//     this.selectedAdmin = null;
//   }

//   closeAction() {
//     this.selectedAction = null;
//   }
// }
import { Component, OnInit, ViewEncapsulation, Input, OnChanges, SimpleChanges } from '@angular/core'; 
import { CommonModule } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  CustomFilterModule,
  CellStyleModule,
  ValidationModule,
  ColDef,
  ICellRendererParams,
  GridOptions
} from 'ag-grid-community';
import { AdminTableService } from '../../services/admintable.service';
import { TreasuryActionComponent } from '../treasuryaction/treasuryaction.component';
import { TreasuryViewDetailsComponent } from '../treasuryviewdetails/treasuryviewdetails.component';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Register AG Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  CustomFilterModule,
  CellStyleModule,
  ValidationModule,
  RowSelectionModule
]);

interface Referral {
  id: number;
  employeeName: string;
  employeeAID: string;
  referralType: string;
  annualContribution: number;
  amountRequested: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'In Progress';
  submissionDate: string;
  beneficiaryName?: string;
}
 

@Component({
  selector: 'app-referral-table-new',
  standalone: true,
  imports: [CommonModule, AgGridModule, TreasuryActionComponent, TreasuryViewDetailsComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './referral-table-new.component.html',
  styleUrls: ['./referral-table-new.component.scss']
})
export class ReferralTableNewComponent implements OnInit, OnChanges {
  @Input() searchTerm: string = '';

  rowData: any[] = [];
  filteredData: any[] = [];

  selectedAdmin: any = null;
  selectedAction: any = null;

  columnDefs: ColDef[] = [
    { headerName: 'S. No.', field: 'sno', width: 80, sortable: true, cellClass: 'grey-cell' },
    { headerName: 'Employee Name', field: 'employeeName', flex: 2, cellClass: 'grey-cell', sortable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Employee AID', field: 'employeeAID', flex: 1, sortable: true, filter: 'agNumberColumnFilter' },
    { headerName: 'Referral Type', field: 'referralType', flex: 1.5, sortable: true },
    { headerName: 'Annual Contribution', field: 'annualContribution', flex: 1, sortable: true, valueFormatter: params => this.currencyFormatter(params.value) },
    { headerName: 'Amount Requested', field: 'amountRequested', flex: 1, sortable: true, valueFormatter: params => this.currencyFormatter(params.value) },
    {
      headerName: 'Actions',
      field: 'actions',
      width: 90,
      cellRenderer: (params: ICellRendererParams) => {
        return `<button class="action-btn" data-action="edit" data-id="${params.data?.id || ''}" title="Edit">&#9998;</button>`;
      },
      cellRendererParams: { suppressSanitizeHtml: true }
    }
  ];

  defaultColDef: ColDef = { sortable: true, filter: false, resizable: true };

  gridOptions: GridOptions = {
    suppressMovableColumns: true,
    onCellClicked: event => this.onCellClicked(event)
  };

  gridApi: any;
  gridColumnApi: any;

  constructor(private adminTableService: AdminTableService) {}

  ngOnInit(): void {
    this.adminTableService.getEmployees().subscribe({
      next: (data: any[]) => {
        this.rowData = data.map((row, index) => ({ ...row, sno: index + 1 }));
        this.filteredData = this.rowData;
        this.setGridHeight();
      },
      error: (err: any) => {
        console.error('Error fetching employees:', err);
        this.rowData = [];
        this.filteredData = [];
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.applyFilter();
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.setGridHeight();
  }

  applyFilter(): void {
    if (!this.searchTerm) {
      this.filteredData = this.rowData;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredData = this.rowData.filter(item =>
        Object.values(item).some(val => val && val.toString().toLowerCase().includes(term))
      );
    }
    this.setGridHeight();
  }

  setGridHeight() {
    const rowCount = this.filteredData.length;
    const headerHeight = 40;
    const rowHeight = 45;
    const maxHeight = 800;
    const height = Math.min(headerHeight + rowCount * rowHeight + 10, maxHeight);
    const gridDiv = document.querySelector('.custom-ag-grid') as HTMLElement;
    if (gridDiv) {
      gridDiv.style.height = height + 'px';
    }
  }

  currencyFormatter(value: any): string {
    return value == null ? '' : Number(value).toLocaleString('en-IN');
  }

  onCellClicked(event: any): void {
    const target = event.event?.target as HTMLElement;
    const action = target?.getAttribute('data-action');

    if (action === 'edit') {
      this.selectedAction = event.data;
      this.selectedAdmin = null;
    } else if (event.colDef.field !== 'actions') {
      this.selectedAdmin = event.data;
      this.selectedAction = null;
    }
  }

  closeDetails() {
    this.selectedAdmin = null;
  }

  closeAction() {
    this.selectedAction = null;
  }
}
