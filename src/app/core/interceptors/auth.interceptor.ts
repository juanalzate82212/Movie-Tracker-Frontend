import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //console.log('INTERCEPTOR EJECUTADO');

  const token = localStorage.getItem('access_token');

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
