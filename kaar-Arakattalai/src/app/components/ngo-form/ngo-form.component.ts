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
  selector: 'app-ngo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ngo-form.component.html',
  styleUrls: ['./ngo-form.component.scss'],
})
export class NgoFormComponent {
  @Output() formClosed = new EventEmitter<void>();
  @Output() formChanged = new EventEmitter<string>();
  @Output() formSubmitted = new EventEmitter<void>();

  ngoForm: FormGroup;
  charCount = 0;
  showErrorPopup = false;
  errorMessage = '';
  showDropdown = false;
  currentForm = 'NGO Form';

  formOptions = [
    { id: 'scholarship', name: 'Scholarship Form' },
    { id: 'ngo', name: 'NGO Form' },
    { id: 'medical', name: 'Medical Assistance Form' },
    { id: 'laptop', name: 'Laptop Form' },
    { id: 'csr', name: 'CSR Claims Form' }
  ];

  constructor(private fb: FormBuilder, private eRef: ElementRef) {
    this.ngoForm = this.fb.group({
      ngoName: ['', Validators.required],
      ngoSpocName: ['', Validators.required],
      spocWhatsappNumber: ['', Validators.required],
      ngoLocation: ['', Validators.required],
      numberOfInmates: ['', Validators.required],
      purposeOfAssistance: ['', Validators.required],
      amountRequested: ['', Validators.required],
      accountNameForDD: ['', Validators.required],
      justification: ['', Validators.required],
      ngoProfile: [null, Validators.required],
      requestLetter: [null, Validators.required],
      registrationCertificate: [null, Validators.required],
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
      this.ngoForm.patchValue({ [field]: file });
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
    if (this.ngoForm.valid) {
      const requiredFields = [
        'ngoName', 'ngoSpocName', 'spocWhatsappNumber', 'ngoLocation',
        'numberOfInmates', 'purposeOfAssistance', 'amountRequested',
        'accountNameForDD', 'justification', 'ngoProfile', 'requestLetter',
        'registrationCertificate', 'declaration'
      ];

      const missingFields = requiredFields.filter(field => {
        const control = this.ngoForm.get(field);
        return !control?.value || (control.value === '' && control.hasError('required'));
      });

      if (missingFields.length > 0) {
        this.showError('Please fill all required fields and upload all required documents.');
        return;
      }

      if (!this.ngoForm.get('declaration')?.value) {
        this.showError('Please accept the declaration to proceed.');
        return;
      }

      alert('NGO form submitted successfully!');
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