import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	@Input() shouldShowBackButton = false;
	@Output() backButtonSelected = new EventEmitter<boolean>();
	faArrowLeft = faArrowLeft;

	emitBackButtonSelected() {
		this.backButtonSelected.emit(true);
	}
}
