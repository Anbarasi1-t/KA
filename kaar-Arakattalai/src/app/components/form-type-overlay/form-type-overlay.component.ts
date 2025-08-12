import { Component, EventEmitter, Output, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationFormComponent } from '../education-form/education-form.component';
import { MedicalFormComponent } from '../medical-form/medical-form.component';
import { NgoFormComponent } from '../ngo-form/ngo-form.component';
import { LaptopFormComponent } from '../laptop-form/laptop-form.component';
import { CsrFormComponent } from '../csr-form/csr-form.component';

@Component({
  selector: 'app-form-type-overlay',
  standalone: true,
  imports: [
    CommonModule, 
    EducationFormComponent, 
    MedicalFormComponent,
    NgoFormComponent,
    LaptopFormComponent,
    CsrFormComponent
  ],
  templateUrl: './form-type-overlay.component.html',
  styleUrls: ['./form-type-overlay.component.scss']
})
export class FormTypeOverlayComponent implements OnInit {
  @Output() closed = new EventEmitter<void>();

  private ignoreNextClick = false;

  constructor(private eRef: ElementRef) {}

  ngOnInit() {
    this.ignoreNextClick = true;
    setTimeout(() => {
      this.ignoreNextClick = false;
    }, 0);
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event) {
    if (this.ignoreNextClick) return;
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.closeOverlay();
    }
  }

  closeOverlay() {
    this.closed.emit();
  }

  // Form visibility states
  showEducationForm = false;
  showMedicalForm = false;
  showNgoForm = false;
  showLaptopForm = false;
  showCsrForm = false;

  // Current active form
  currentForm: string = '';

  // Form options for dropdown
  formOptions = [
    { id: 'scholarship', name: 'Scholarship Form', component: 'education' },
    { id: 'ngo', name: 'NGO Form', component: 'ngo' },
    { id: 'medical', name: 'Medical Assistance Form', component: 'medical' },
    { id: 'laptop', name: 'Laptop Form', component: 'laptop' },
    { id: 'csr', name: 'CSR Claims Form', component: 'csr' }
  ];

  openForm(formType: string) {
    // Close all forms first
    this.closeAllForms();
    
    // Open the selected form
    switch (formType) {
      case 'education':
        this.showEducationForm = true;
        this.currentForm = 'scholarship';
        break;
      case 'medical':
        this.showMedicalForm = true;
        this.currentForm = 'medical';
        break;
      case 'ngo':
        this.showNgoForm = true;
        this.currentForm = 'ngo';
        break;
      case 'laptop':
        this.showLaptopForm = true;
        this.currentForm = 'laptop';
        break;
      case 'csr':
        this.showCsrForm = true;
        this.currentForm = 'csr';
        break;
    }
  }

  closeAllForms() {
    this.showEducationForm = false;
    this.showMedicalForm = false;
    this.showNgoForm = false;
    this.showLaptopForm = false;
    this.showCsrForm = false;
  }

  // Individual form close methods
  closeEducationForm() {
    this.showEducationForm = false;
    this.currentForm = '';
  }

  closeMedicalForm() {
    this.showMedicalForm = false;
    this.currentForm = '';
  }

  closeNgoForm() {
    this.showNgoForm = false;
    this.currentForm = '';
  }

  closeLaptopForm() {
    this.showLaptopForm = false;
    this.currentForm = '';
  }

  closeCsrForm() {
    this.showCsrForm = false;
    this.currentForm = '';
  }

  // Handle form navigation from dropdown
  onFormChanged(formId: string) {
    const formOption = this.formOptions.find(option => option.id === formId);
    if (formOption) {
      this.openForm(formOption.component);
    }
  }

  toastMessage: string | null = null;

  showToast(message: string) {
    this.toastMessage = message;
    setTimeout(() => {
      this.toastMessage = null;
      this.closeOverlay();
    }, 2500);
  }
}


