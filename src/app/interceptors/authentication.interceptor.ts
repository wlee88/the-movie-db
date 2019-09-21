import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ConfigurationService } from '../services/configuration/configuration.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
	constructor(private readonly configurationService: ConfigurationService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const apiKey = this.configurationService.apiKey();
		// Append query '?' if not included in url
		const url = request.url.includes('?') ? request.url : `${request.url}?`;
		const authenticatedRequest = request.clone({
			url: `${url}&api_key=${apiKey}`
		});

		return next.handle(authenticatedRequest);
	}
}
