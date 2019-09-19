import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'header-overlay',
	templateUrl: './header-overlay.component.html',
	styleUrls: ['./header-overlay.component.scss']
})
export class HeaderOverlayComponent {
	@Input() shouldShowBackButton = false;
	@Input() overrideBackgroundImageUrlWith: string;
	@Output() backButtonSelected = new EventEmitter<boolean>();
	faArrowLeft = faArrowLeft;

	emitBackButtonSelected() {
		this.backButtonSelected.emit(true);
	}

	/**
	 * I feel terrible about this inline style hack...
	 * If fed a background image url it will override the header background image url.
	 */
	get backgroundImageInlineStyle(): string | null {
		return this.overrideBackgroundImageUrlWith ? `url('${this.overrideBackgroundImageUrlWith}')` : null;
	}
}
