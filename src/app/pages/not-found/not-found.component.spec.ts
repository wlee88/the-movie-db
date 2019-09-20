import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('NotFoundComponent', () => {
	let component: NotFoundComponent;
	let fixture: ComponentFixture<NotFoundComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [NotFoundComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NotFoundComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should display the right text', () => {
		const TEXT_CSS_SELECTOR = '.text';
		const textElement: HTMLElement = fixture.debugElement.query(By.css(TEXT_CSS_SELECTOR)).nativeElement;
		expect(textElement.textContent).toContain('404 - Oops, please go back to the');
		expect(textElement.textContent).toContain('homepage');
	});
});
