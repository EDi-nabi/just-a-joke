import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class JokeInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.search(/amount=1$/) === -1) {
      return next.handle(req);
    } else {
      return next.handle(req).pipe(
        map(event => {
          if (event instanceof HttpResponse) {
            event = event.clone({ body: { error: event.body.error, amount: 1, jokes: [event.body] }});
          }
          return event;
        }),
      );
    }
  }
}

