import {
  Component,
  EventEmitter,
  Output,
  ElementRef,
  HostListener,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medical-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './medical-form.component.html',
  styleUrls: ['./medical-form.component.scss'],
})
export class MedicalFormComponent {
  @Output() formClosed = new EventEmitter<void>();
  @Output() formChanged = new EventEmitter<string>();

  medicalForm: FormGroup;
  charCount = 0;
  showErrorPopup = false;
  errorMessage = '';
  showDropdown = false;
  currentForm = 'Medical Assistance Form';

  formOptions = [
    { id: 'scholarship', name: 'Scholarship Form' },
    { id: 'ngo', name: 'NGO Form' },
    { id: 'medical', name: 'Medical Assistance Form' },
    { id: 'laptop', name: 'Laptop Form' },
    { id: 'csr', name: 'CSR Claims Form' }
  ];

  constructor(private fb: FormBuilder, private eRef: ElementRef) {
    this.medicalForm = this.fb.group({
      beneficiaryName: ['', Validators.required],
      whatsappNumber: ['', Validators.required],
      purposeOfMedicalAssistance: ['', Validators.required],
      amountRequested: ['', Validators.required],
      bankAccountName: ['', Validators.required],
      justification: ['', Validators.required],
      requestLetter: [null, Validators.required],
      aadharCard: [null, Validators.required],
      rationCard: [null, Validators.required],
      medicalBills: [null, Validators.required],
      declaration: [false, Validators.requiredTrue]
    });
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.formClosed.emit();
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  selectForm(formId: string, event: Event) {
    event.stopPropagation();
    this.showDropdown = false;
    this.formChanged.emit(formId);
  }

  onTextChange(event: Event) {
    const input = (event.target as HTMLTextAreaElement).value;
    this.charCount = input.length;
  }

  onFileChange(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      this.medicalForm.patchValue({ [field]: file });
      const fileNameSpan = event.target.parentElement.querySelector('.file-name');
      if (fileNameSpan) {
        fileNameSpan.textContent = file.name;
      }
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    this.showErrorPopup = true;
    setTimeout(() => {
      this.showErrorPopup = false;
    }, 3000);
  }

  onSubmit() {
    if (this.medicalForm.valid) {
      const requiredFields = [
        'beneficiaryName', 'whatsappNumber', 'purposeOfMedicalAssistance',
        'amountRequested', 'bankAccountName', 'justification', 'requestLetter',
        'aadharCard', 'rationCard', 'medicalBills', 'declaration'
      ];

      const missingFields = requiredFields.filter(field => {
        const control = this.medicalForm.get(field);
        return !control?.value || (control.value === '' && control.hasError('required'));
      });

      if (missingFields.length > 0) {
        this.showError('Please fill all required fields and upload all required documents.');
        return;
      }

      if (!this.medicalForm.get('declaration')?.value) {
        this.showError('Please accept the declaration to proceed.');
        return;
      }

      alert('Medical Assistance form submitted successfully!');
      this.formClosed.emit();
    } else {
      this.showError('Please fill all required fields and upload all required documents.');
    }
  }

  onCancel() {
    this.formClosed.emit();
  }
} 