import { TestBed } from '@angular/core/testing';

<<<<<<< HEAD
// @ts-ignore
=======
>>>>>>> 6546df071595ce4fea3382143452b5ecb4fba55a
import { MedicineService } from './medicine.service';

describe('MedicineService', () => {
  let service: MedicineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
