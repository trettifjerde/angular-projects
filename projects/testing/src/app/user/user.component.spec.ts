import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DataService } from '../data.service';
import { UserService } from '../user.service';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show username', () => {
    expect((fixture.nativeElement as HTMLElement).querySelector('p').textContent).not.toContain('Not authenticated');
  });

  it('should have the same username as the user service ', () => {
    const userService = fixture.debugElement.injector.get(UserService);
    expect(userService.user.name).toEqual(component.user.name);
  })

  it('should display userservice username on page', () => {
    const userService = fixture.debugElement.injector.get(UserService);
    expect((fixture.debugElement.nativeElement as HTMLElement).querySelector('p').textContent).toContain(userService.user.name);
  })

  it('should not load data', waitForAsync(() => {
    const dataService = fixture.debugElement.injector.get(DataService);
    const spy = spyOn(dataService, 'getDetails')
    .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.data).toBe('Data');
    })
  }));

});
