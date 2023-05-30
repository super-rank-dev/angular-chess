import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadBoardComponent } from './dead-board.component';

describe('DeadBoardComponent', () => {
  let component: DeadBoardComponent;
  let fixture: ComponentFixture<DeadBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeadBoardComponent]
    });
    fixture = TestBed.createComponent(DeadBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
