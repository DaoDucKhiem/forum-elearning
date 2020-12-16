import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class HeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem("x-token");
        if (!token) {
            token = "";
        }
        token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJraGllbW5oaWV1dGllbiIsInVzZXJfaWQiOiIwOGQ4YTFkMi05NjFjLTQ0NzgtOGQ2YS0wZTA0ZmFjZGZhMDAiLCJlbWFpbCI6ImRka2hpZW1AZ21haWwuY29tIiwibGlzdF9yb2xlcyI6InxHUk9VUF9BRE1JTi9HUk9VUDN8IiwibmJmIjoxNjA4MTMwNTkzLCJleHAiOjE2MDg3MzUzOTMsImlhdCI6MTYwODEzMDU5M30.cfGsunBFWa5W8-7-anCLj3q8nd7qZbsU9WbK4uFzLBQ";
        // Clone the request to add the new header
        if (!req.headers.get("X-STRINGEE-AUTH")) {
            const clonedRequest = req.clone({ headers: req.headers.append('Authorization', token) });
            return next.handle(clonedRequest);
        }

        // Pass the cloned request instead of the original request to the next handle
        return next.handle(req);
    }
}