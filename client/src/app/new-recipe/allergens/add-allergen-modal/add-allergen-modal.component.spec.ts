import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAllergenModalComponent } from './add-allergen-modal.component';

describe('AddAllergenModalComponent', () => {
  let component: AddAllergenModalComponent;
  let fixture: ComponentFixture<AddAllergenModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAllergenModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAllergenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
