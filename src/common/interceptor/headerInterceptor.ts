import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class HeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request to add the new header
        const clonedRequest = req.clone({ headers: req.headers.append('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InN0cmluZ2VlLWFwaTt2PTEifQ.eyJqdGkiOiJTS0d6Qm5xRWJzb0RFT3FzTEpxZWZ0d2k1Y0Y2RXEwUUVpLTE2MDQ1ODU1MTMiLCJpc3MiOiJTS0d6Qm5xRWJzb0RFT3FzTEpxZWZ0d2k1Y0Y2RXEwUUVpIiwiZXhwIjoxNjA1MTkwMzEzLCJ1c2VySWQiOiI2NGE1OWEyNS0yNDg4LTU0YjAtZjZiNC1jOGFmMDhhNTBjYmYiLCJmdWxsTmFtZSI6Ilh1w6JuIETFqW5nIiwiZW1haWwiOiJkdW5nMUB2bnUuZWR1LnZuIiwicGhvbmUiOiIwOTc1MjU1NjUwIiwicGFzc3dvcmRVcGRhdGVUaW1lIjoiMjAyMC0xMC0yNVQwOToxMTo1OC4wMTlaIiwiaWF0IjoxNjA0NTg1NTEzfQ.7AyBMDYDMDv95YkmGSYVP6cVrn61eRSWESzPjDz1_D0') });

        // Pass the cloned request instead of the original request to the next handle
        return next.handle(clonedRequest);
    }
}