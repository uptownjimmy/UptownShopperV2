import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTypeDropdownComponent } from './item-type-dropdown.component';

describe('ItemTypeDropdownComponent', () => {
  let component: ItemTypeDropdownComponent;
  let fixture: ComponentFixture<ItemTypeDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemTypeDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTypeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
