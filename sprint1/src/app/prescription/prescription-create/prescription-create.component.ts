import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PrescriptionService} from '../../services/prescriptions/prescription.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-prescription-create',
  templateUrl: './prescription-create.component.html',
  styleUrls: ['./prescription-create.component.css']
})
export class PrescriptionCreateComponent implements OnInit {
  prescriptionForm: FormGroup = new FormGroup({
    prescriptionName: new FormControl('', [Validators.required, Validators.minLength(5),
      Validators.maxLength(50), Validators.pattern('^[^!@#$%^&*()]*$')]),
    prescriptionSymptom: new FormControl('', [Validators.required, Validators.minLength(5),
      Validators.maxLength(100), Validators.pattern('^[^!@#$%^&*()]*$')]),
    prescriptionTargetUser: new FormControl('', [Validators.required]),
    prescriptionNote: new FormControl('', [Validators.required, Validators.minLength(5),
      Validators.maxLength(100), Validators.pattern('^[^!@#$%^&*()]*$')]),
    prescriptionNumberOfDays: new FormControl('', [Validators.required, Validators.min(1),
      Validators.max(365)]),
  });

  constructor(private prescriptionService: PrescriptionService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.prescriptionForm.valid) {
      this.prescriptionService.createPrescription(this.prescriptionForm.value).subscribe(() => {
        this.prescriptionForm.reset();
        alert('Thêm mới thành công!');
      }, e => {
        console.log(e);
      }, () => {
        this.router.navigate(['/list']);
      });
    }
  }
}
