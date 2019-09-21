import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ConfigurationService {
	apiKey(): string {
		return environment.API_KEY;
	}

	apiUrl(): string {
		return environment.API_URL;
	}
}
