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
  selector: 'app-laptop-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './laptop-form.component.html',
  styleUrls: ['./laptop-form.component.scss'],
})
export class LaptopFormComponent {
  @Output() formClosed = new EventEmitter<void>();
  @Output() formChanged = new EventEmitter<string>();
  @Output() formSubmitted = new EventEmitter<void>();

  laptopForm: FormGroup;
  charCount = 0;
  showErrorPopup = false;
  errorMessage = '';
  showDropdown = false;
  currentForm = 'Laptop Form';

  formOptions = [
    { id: 'scholarship', name: 'Scholarship Form' },
    { id: 'ngo', name: 'NGO Form' },
    { id: 'medical', name: 'Medical Assistance Form' },
    { id: 'laptop', name: 'Laptop Form' },
    { id: 'csr', name: 'CSR Claims Form' }
  ];

  constructor(private fb: FormBuilder, private eRef: ElementRef) {
    this.laptopForm = this.fb.group({
      beneficiaryName: ['', Validators.required],
      beneficiaryMobileNumber: ['', Validators.required],
      accountNameForDD: ['', Validators.required],
      justification: ['', Validators.required],
      requestLetter: [null, Validators.required],
      schoolIdCard: [null, Validators.required],
      parentsAadharCard: [null, Validators.required],
      otherDocuments: [null],
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
      this.laptopForm.patchValue({ [field]: file });
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
    if (this.laptopForm.valid) {
      const requiredFields = [
        'beneficiaryName', 'beneficiaryMobileNumber', 'accountNameForDD',
        'justification', 'requestLetter', 'schoolIdCard', 'parentsAadharCard',
        'declaration'
      ];

      const missingFields = requiredFields.filter(field => {
        const control = this.laptopForm.get(field);
        return !control?.value || (control.value === '' && control.hasError('required'));
      });

      if (missingFields.length > 0) {
        this.showError('Please fill all required fields and upload all required documents.');
        return;
      }

      if (!this.laptopForm.get('declaration')?.value) {
        this.showError('Please accept the declaration to proceed.');
        return;
      }

      alert('Laptop request form submitted successfully!');
      this.formSubmitted.emit();
      this.formClosed.emit();
    } else {
      this.showError('Please fill all required fields and upload all required documents.');
    }
  }

  onCancel() {
    this.formClosed.emit();
  }
} 