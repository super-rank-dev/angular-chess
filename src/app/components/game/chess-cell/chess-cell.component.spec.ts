import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessCellComponent } from './chess-cell.component';

describe('ChessCellComponent', () => {
  let component: ChessCellComponent;
  let fixture: ComponentFixture<ChessCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChessCellComponent]
    });
    fixture = TestBed.createComponent(ChessCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
