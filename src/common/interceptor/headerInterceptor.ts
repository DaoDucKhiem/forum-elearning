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
        // token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJkZGtoaWVtMTEwNCIsInVzZXJfaWQiOiIwOGQ4OWY3Yi1iYThlLTQ4NWYtODE2YS03MGNlYjllYjJjOGUiLCJlbWFpbCI6ImRhb2R1Y2toaWVtMTEwNEBnbWFpbC5jb20iLCJsaXN0X3JvbGVzIjoifEdST1VQX1VTRVIvR1JPVVAzfCIsIm5iZiI6MTYwODIxNzI1MywiZXhwIjoxNjA4ODIyMDUzLCJpYXQiOjE2MDgyMTcyNTN9.iSlZyBofzpCCzga0U9eksDunVuNFQGVW2IsHd2d4x58";
        // Clone the request to add the new header
        if (!req.headers.get("X-STRINGEE-AUTH")) {
            const clonedRequest = req.clone({ headers: req.headers.append('Authorization', token) });
            return next.handle(clonedRequest);
        }

        // Pass the cloned request instead of the original request to the next handle
        return next.handle(req);
    }
}