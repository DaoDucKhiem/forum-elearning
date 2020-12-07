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
        // token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJudmtoYWkyMDMiLCJ1c2VyX2lkIjoiMDhkODhhNTMtN2IyMC00ZGFjLTg2YTAtMmRkYjdlNjhiYjI4IiwiZW1haWwiOiJudmtoYWkyMDNAZ21haWwuY29tIiwibGlzdF9yb2xlcyI6InxTWVNfQURNSU4vxq_MgW5nIGR1zKNuZyBuaG_MgW0gMTJ8IiwibmJmIjoxNjA2Njc0MDE4LCJleHAiOjE2MDcyNzg4MTgsImlhdCI6MTYwNjY3NDAxOH0.CxoyZ8IKv80ffpNucDZVEHIqzt4_AuToOlxr3KmzLOA";
        // Clone the request to add the new header
        if (!req.headers.get("X-STRINGEE-AUTH")) {
            const clonedRequest = req.clone({ headers: req.headers.append('Authorization', token) });
            return next.handle(clonedRequest);
        }

        // Pass the cloned request instead of the original request to the next handle
        return next.handle(req);
    }
}