// admin-table.component.ts
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
import { AdminService } from '../../services/admin.service';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Register AG Grid modules used
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  CustomFilterModule,
  CellStyleModule,
  ValidationModule
]);

@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './admintable.component.html',
  styleUrls: ['./admintable.component.scss']
})
export class AdminTableComponent implements OnInit, OnChanges {
  @Input() searchTerm: string = '';

  rowData: any[] = [];
  filteredData: any[] = [];

  columnDefs: ColDef[] = [
    { headerName: 'S. No.', field: 'sno', width: 80, sortable: true, cellClass: 'grey-cell' },
    {
      headerName: 'Employee Name',
      field: 'employeeName',
      flex: 2,
      cellClass: 'grey-cell',
      sortable: true,
      filter: 'agTextColumnFilter'
    },
    { headerName: 'Employee AID', field: 'employeeAID', flex: 1, sortable: true, filter: 'agNumberColumnFilter' },
    { headerName: 'Referral Type', field: 'referralType', flex: 1.5, sortable: true },
    {
      headerName: 'Annual Contribution',
      field: 'annualContribution',
      flex: 1,
      sortable: true,
      valueFormatter: (params) => this.currencyFormatter(params.value)
    },
    {
      headerName: 'Amount Requested',
      field: 'amountRequested',
      flex: 1,
      sortable: true,
      valueFormatter: (params) => this.currencyFormatter(params.value)
    },
    {
      headerName: 'Actions',
      field: 'actions',
      width: 90,
      cellRenderer: (params: ICellRendererParams) => {
        // Render a simple pencil icon button; you can replace with SVG markup
        return `<button class="action-btn" data-action="edit" data-id="${params.data?.id || ''}" title="Edit">&#9998;</button>`;
      },
      cellRendererParams: {
        suppressSanitizeHtml: true
      },
      pinned: 'right'
    }
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: false,
    resizable: true
  };

  gridOptions: GridOptions = {
    suppressMovableColumns: true,
    onCellClicked: (event) => this.onCellClicked(event)
  };

  gridApi: any;
  gridColumnApi: any;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getEmployees().subscribe({
      next: (data: any[]) => {
        // Add S. No field
        this.rowData = data.map((row, index) => ({ ...row, sno: index + 1 }));
        this.filteredData = this.rowData;
        this.setGridHeight();
      },
      error: (err) => {
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
    // set grid height depending on number of rows (like your example)
    const rowCount = this.filteredData.length;
    const headerHeight = 40; // header approx
    const rowHeight = 45; // as set in template
    const maxHeight = 800;
    const height = Math.min(headerHeight + rowCount * rowHeight + 10, maxHeight);
    const gridDiv = document.querySelector('.custom-ag-grid') as HTMLElement;
    if (gridDiv) {
      gridDiv.style.height = height + 'px';
    }
  }

  currencyFormatter(value: any): string {
    if (value == null) {
      return '';
    }
    // Format as plain number (no currency symbol) to match your screenshot
    return Number(value).toLocaleString('en-IN');
  }

  onCellClicked(event: any): void {
    // Handle click on the action button
    if (event.event && event.event.target) {
      const target = event.event.target as HTMLElement;
      const action = target.getAttribute('data-action');
      const id = target.getAttribute('data-id');
      if (action === 'edit' && id) {
        this.onEdit(id);
      }
    }
  }

  onEdit(id: string): void {
    // Replace with navigation or modal open in your real app
    console.log('Edit clicked for ID:', id);
    // e.g., this.router.navigate(['/admin/edit', id]);
  }
}
