import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRecipesComponent } from './top-recipes.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('TopRecipesComponent', () => {
  let component: TopRecipesComponent;
  let fixture: ComponentFixture<TopRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TopRecipesComponent,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
