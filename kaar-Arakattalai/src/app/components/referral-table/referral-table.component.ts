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

import { RequestService } from '../../services/requests.service';

import 'ag-grid-community/styles/ag-theme-alpine.css';

// Register all needed modules including SidebarModule
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
  selector: 'app-referral-table',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './referral-table.component.html',
  styleUrls: ['./referral-table.component.scss']
})
export class ReferralTableComponent implements OnInit, OnChanges {
  @Input() searchTerm: string = '';
  
  rowData: any[] = [];
  filteredData: any[] = [];
  
  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, cellClass: 'grey-cell' },
    { field: 'beneficiaryName', headerName: 'Beneficiary Name', flex: 2, cellClass: 'grey-cell' },
    { field: 'referralType', headerName: 'Referral Type', flex: 2, cellClass: 'grey-cell' },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      cellClass: 'grey-cell',
      cellRenderer: (params: ICellRendererParams) => {
        const status = params.value as string;
        const statusClass = {
          Approved: 'approved',
          Rejected: 'rejected',
          Pending: 'pending'
        }[status] || 'unknown';
        return `<span class="status-pill ${statusClass}">${status}</span>`;
      },
      cellRendererParams: {
        suppressSanitizeHtml: true
      }
    }
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: false,
    resizable: true
  };

  gridOptions: GridOptions = {
    suppressMovableColumns: true
  };

  // Sidebar config to enable filter and columns tool panels
  public sidebar = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
      }
    ],
    defaultToolPanel: 'filters'
  };

  gridApi: any;
  gridColumnApi: any;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.requestService.getRequests().subscribe(data => {
      console.log('Received data:', data);
      this.rowData = data;
      this.filteredData = data;
      this.setGridHeight();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.applyFilter();
    }
  }

  applyFilter(): void {
    if (!this.searchTerm) {
      this.filteredData = this.rowData;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredData = this.rowData.filter(item => {
        return Object.values(item).some(val =>
          val && val.toString().toLowerCase().includes(term)
        );
      });
    }
    this.setGridHeight();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.setGridHeight();
  }

  setGridHeight() {
    if (!this.gridApi) return;

    const rowCount = this.filteredData.length;
    const headerHeight = 25; // approx header height in px
    const rowHeight = 35;
    const height = headerHeight + rowCount * rowHeight;

    const gridDiv = document.querySelector('.custom-ag-grid') as HTMLElement;
    if (gridDiv) {
      gridDiv.style.height = height + 'px';
    }
  }
}