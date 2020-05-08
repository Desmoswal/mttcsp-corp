import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClient]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
