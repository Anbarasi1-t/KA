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
  selector: 'app-education-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss'],
})
export class EducationFormComponent {
  @Output() formClosed = new EventEmitter<void>();
  @Output() formChanged = new EventEmitter<string>();
  @Output() formSubmitted = new EventEmitter<void>();

  scholarshipForm: FormGroup;
  charCount = 0;
  showErrorPopup = false;
  errorMessage = '';
  showDropdown = false;
  currentForm = 'Scholarship Form';

  formOptions = [
    { id: 'scholarship', name: 'Scholarship Form' },
    { id: 'ngo', name: 'NGO Form' },
    { id: 'medical', name: 'Medical Assistance Form' },
    { id: 'laptop', name: 'Laptop Form' },
    { id: 'csr', name: 'CSR Claims Form' }
  ];

  constructor(private fb: FormBuilder, private eRef: ElementRef) {
    this.scholarshipForm = this.fb.group({
      beneficiaryName: ['', Validators.required],
      whatsappNumber: ['', Validators.required],
      institutionName: ['', Validators.required],
      institutionLocation: ['', Validators.required],
      tuitionFees: ['', Validators.required],
      otherFees: ['', Validators.required],
      semester: ['', Validators.required],
      justification: ['', Validators.required],
      bankAccountName: ['', Validators.required],
      requestLetter: [null, Validators.required],
      idCard: [null, Validators.required],
      aadharCard: [null, Validators.required],
      rationCard: [null, Validators.required],
      bonafideCertificate: [null, Validators.required],
      deathCertificate: [null],
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
      this.scholarshipForm.patchValue({ [field]: file });
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
    if (this.scholarshipForm.valid) {
      const requiredFields = [
        'beneficiaryName', 'whatsappNumber', 'institutionName', 
        'institutionLocation', 'tuitionFees', 'otherFees', 'semester',
        'justification', 'bankAccountName', 'requestLetter', 'idCard',
        'aadharCard', 'rationCard', 'bonafideCertificate', 'declaration'
      ];

      const missingFields = requiredFields.filter(field => {
        const control = this.scholarshipForm.get(field);
        return !control?.value || (control.value === '' && control.hasError('required'));
      });

      if (missingFields.length > 0) {
        this.showError('Please fill all required fields and upload all required documents.');
        return;
      }

      if (!this.scholarshipForm.get('declaration')?.value) {
        this.showError('Please accept the declaration to proceed.');
        return;
      }

      alert('Scholarship form submitted successfully!');
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
