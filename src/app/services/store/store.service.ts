import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * The purpose of this service is to store a value. It will only last until the app the closed
 * or reloaded.
 */
@Injectable({
	providedIn: 'root'
})
export class StoreService {
	private subject: BehaviorSubject<string> = new BehaviorSubject<string>('');

	constructor() {}

	setValue(value: string) {
		this.subject.next(value);
	}

	getValue(): string {
		return this.subject.getValue();
	}

	getObservable(): Observable<string> {
		return this.subject.asObservable();
	}
}
