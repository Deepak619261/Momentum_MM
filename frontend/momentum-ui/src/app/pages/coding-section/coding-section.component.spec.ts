import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingSectionComponent } from './coding-section.component';

describe('CodingSectionComponent', () => {
  let component: CodingSectionComponent;
  let fixture: ComponentFixture<CodingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodingSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
