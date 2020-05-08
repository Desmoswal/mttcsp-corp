import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('intercept')
    const authToken = this.authService.getToken();
    if(!authToken){
      return next.handle(req);
    }
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', authToken),
    });
    console.log(authRequest)
    return next.handle(authRequest);
  }
}
