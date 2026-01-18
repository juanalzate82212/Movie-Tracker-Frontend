import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //console.log('INTERCEPTOR EJECUTADO');
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    //console.log('TOKEN ENCONTRADO');
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  //console.log('SIN TOKEN');
  return next(req);
};
