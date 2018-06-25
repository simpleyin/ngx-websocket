import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxWebsocketComponent } from './ngx-websocket.component';

describe('NgxWebsocketComponent', () => {
  let component: NgxWebsocketComponent;
  let fixture: ComponentFixture<NgxWebsocketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxWebsocketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxWebsocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
