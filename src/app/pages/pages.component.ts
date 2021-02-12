import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	ElementRef,
	ViewChild
} from '@angular/core';
import { AnimationBuilder, AnimationPlayer } from '@angular/animations';


@Component({
	selector: 'm-pages',
	templateUrl: './pages.component.html',
	changeDetection: ChangeDetectionStrategy.Default
})
export class PagesComponent implements OnInit {


	public player: AnimationPlayer;
	
	// @ViewChild('mContentWrapper') contenWrapper: ElementRef;
	// @ViewChild('mContent') mContent: ElementRef;
	
	constructor(
		private el: ElementRef,
		private router: Router,
		private animationBuilder: AnimationBuilder,

	) {
		

		// animate page load
		this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				// if (this.contenWrapper) {
				// 	// hide content
				// 	this.contenWrapper.nativeElement.style.display = 'none';
				// }
			}
			if (event instanceof NavigationEnd) {
				// if (this.contenWrapper) {
				// 	// show content back
				// 	this.contenWrapper.nativeElement.style.display = '';
				// 	// animate the content
				// 	this.animate(this.contenWrapper.nativeElement);
				// }
			}
		});
	}

	ngOnInit(): void {
		

	 }

	//  animate(element) {
	// 	this.player = this.animationBuilder
	// 		.build([
	// 			style({ opacity: 0, transform: 'translateY(15px)' }),
	// 			animate('500ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
	// 			style({ transform: 'none' }),
	// 		])
	// 		.create(element);
	// 	this.player.play();
	// }

}
