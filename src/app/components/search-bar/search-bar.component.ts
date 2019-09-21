import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { SearchBarForm } from '../../contracts/search-bar-form';

const DEFAULT_DELAY_EMIT_IN_MS = 500;

@Component({
	selector: 'search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements AfterViewInit, OnDestroy {
	@Input() text = '';
	@Input() placeholder = 'Search';
	@Input() delayEmitInMs = DEFAULT_DELAY_EMIT_IN_MS;
	@Output() formChange = new EventEmitter<SearchBarForm>();
	@ViewChild('searchInput', { static: false }) searchInput: NgModel;

	faSearch = faSearch;
	formSubscription: Subscription;
	form: FormGroup;
	constructor(private formBuilder: FormBuilder) {
		this.form = this.formBuilder.group({
			searchText: ['']
		});
	}

	ngAfterViewInit() {
		this.formSubscription = this.form.valueChanges
			.pipe(
				debounceTime(this.delayEmitInMs),
				distinctUntilChanged()
			)
			.subscribe(formValue => {
				this.formChange.emit(formValue);
			});
	}

	ngOnDestroy() {
		this.formSubscription.unsubscribe();
	}
}
