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
  selector: 'app-csr-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './csr-form.component.html',
  styleUrls: ['./csr-form.component.scss'],
})
export class CsrFormComponent {
  @Output() formClosed = new EventEmitter<void>();
  @Output() formChanged = new EventEmitter<string>();
  @Output() formSubmitted = new EventEmitter<void>();

  csrForm: FormGroup;
  charCount = 0;
  showErrorPopup = false;
  errorMessage = '';
  showDropdown = false;
  currentForm = 'CSR Claims Form';

  formOptions = [
    { id: 'scholarship', name: 'Scholarship Form' },
    { id: 'ngo', name: 'NGO Form' },
    { id: 'medical', name: 'Medical Assistance Form' },
    { id: 'laptop', name: 'Laptop Form' },
    { id: 'csr', name: 'CSR Claims Form' }
  ];

  constructor(private fb: FormBuilder, private eRef: ElementRef) {
    this.csrForm = this.fb.group({
      eventName: ['', Validators.required],
      claimAmount: ['', Validators.required],
      accountNameForDD: ['', Validators.required],
      justification: ['', Validators.required],
      billsAndInvoices: [null],
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
      this.csrForm.patchValue({ [field]: file });
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
    if (this.csrForm.valid) {
      const requiredFields = [
        'eventName', 'claimAmount', 'accountNameForDD', 'justification', 'declaration'
      ];

      const missingFields = requiredFields.filter(field => {
        const control = this.csrForm.get(field);
        return !control?.value || (control.value === '' && control.hasError('required'));
      });

      if (missingFields.length > 0) {
        this.showError('Please fill all required fields.');
        return;
      }

      if (!this.csrForm.get('declaration')?.value) {
        this.showError('Please accept the declaration to proceed.');
        return;
      }

      alert('CSR Claims form submitted successfully!');
      this.formSubmitted.emit();
      this.formClosed.emit();
    } else {
      this.showError('Please fill all required fields.');
    }
  }

  onCancel() {
    this.formClosed.emit();
  }
} 