import {
  Component,
  EventEmitter,
  Output,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-education-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss'],
})
export class EducationFormComponent implements OnInit {
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
    { id: 'ngo', name: 'NGO Form' },
    { id: 'medical', name: 'Medical Assistance Form' },
    { id: 'laptop', name: 'Request for Refurbished Laptop Form' },
    { id: 'csr', name: 'CSR - Claims & Expenses Form' }
  ];

  constructor(private fb: FormBuilder, private eRef: ElementRef, private http: HttpClient) {
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
      declaration: [false, Validators.requiredTrue]
      // file fields are skipped for now
    });
  }

  ngOnInit() {
    if (!this.isAdminRoute()) {
      this.formOptions = this.formOptions.filter(option => option.id !== 'csr');
    }
  }

  private isAdminRoute(): boolean {
    const adminComponent = document.querySelector('app-adminlandingpage');
    const isVisible = adminComponent !== null &&
                     !adminComponent.closest('[style*="display: none"]') &&
                     !adminComponent.parentElement?.hasAttribute('hidden');
    return isVisible;
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
        'justification', 'bankAccountName', 'declaration'
      ];

      const missingFields = requiredFields.filter(field => {
        const control = this.scholarshipForm.get(field);
        return !control?.value || (control.value === '' && control.hasError('required'));
      });

      if (missingFields.length > 0) {
        this.showError('Please fill all required fields.');
        return;
      }

      if (!this.scholarshipForm.get('declaration')?.value) {
        this.showError('Please accept the declaration to proceed.');
        return;
      }

      // Send only text data to backend
      this.http.post('http://localhost:3000/api/education-form', this.scholarshipForm.value)
        .subscribe({
          next: (res) => {
            console.log('Form submitted successfully:', res);
            alert('Scholarship form submitted successfully!');
            this.formSubmitted.emit();
            this.formClosed.emit();
          },
          error: (err) => {
            console.error('Error submitting form:', err);
            this.showError('Failed to submit form. Please try again later.');
          }
        });

    } else {
      this.showError('Please fill all required fields.');
    }
  }

  onCancel() {
    this.formClosed.emit();
  }
}
