document.addEventListener('DOMContentLoaded', function () {
	const main = new Main();
	//main.destroy(); 監視を切断させれる。
});

class Main {
	constructor() {
		this.header = document.querySelector('.header');
		this.sides = document.querySelectorAll('.side');
		this._observers = [];
		this._init();
	}

	set obserbers(val) {
		this._observers.push(val);
	}

	get obserbers() {
		return this._observers;
	}

	_init() {
		new MobileMenu();
		this.hero = new HeroSlider('.swiper-container');
		Pace.on('done',this._paceDone.bind(this));
	}

	_paceDone() {
		this._scrollInit();
	}

	_navAnimation(el, inview) {
    if(inview) {
      this.header.classList.remove('triggered');
    }else {
      this.header.classList.add('triggered');
    }
  }

	_inviewAnimation(el,inview) {
		if(inview) {
			el.classList.add('inview');
    } else {
			el.classList.remove('inview');
    }
  }

	_textAnimation(el, inview) {
    if(inview) {
    	const ta = new TweenTextAnimation(el);
      ta.animate();
    }
  }

	_toggleSlideAnimation(el, inview) {
		if(inview) {
			this.hero.start({delay: 3000});
		} else {
			this.hero.stop();
		}
	}

	_sideAnimation(el, inview) {
    if(inview) {
      this.sides.forEach(sides => {
				sides.classList.add('inview');
			});
    }else {
      this.sides.forEach(sides => {
				sides.classList.remove('inview');
			});
    }
  }

	_destroyObserbers() {
		this.obserbers.forEach(ob => {
			ob.destroy();
		});
	}

	destroy() {
		this._destroyObserbers();
	}
	
	_scrollInit() {
		this.obserbers = new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), {once: false});
		this.obserbers = new ScrollObserver('.cover-slide', this._inviewAnimation);
		this.obserbers = new ScrollObserver('.travel__title', this._inviewAnimation);
		this.obserbers = new ScrollObserver('.tween-animate-title', this._textAnimation);
		this.obserbers = new ScrollObserver('.swiper-container', this._toggleSlideAnimation.bind(this), {once: false});
		this.obserbers = new ScrollObserver('.appear', this._inviewAnimation);
		this.obserbers = new ScrollObserver('#main-content', this._sideAnimation.bind(this), {once: false, rootMargin: "-300px 0px"});
		//main-contentの下から300pxのところで検知するという意味

		/*どっちでもOK
		this._observers.push(
			new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), {once: false})
		);
		this._observers.push(
			new ScrollObserver('.cover-slide', this._inviewAnimation)
		);
		this._observers.push(
			new ScrollObserver('.travel__title', this._inviewAnimation)
		);
		this._observers.push(
			new ScrollObserver('.tween-animate-title', this._textAnimation)
		);
		this._observers.push(
			new ScrollObserver('.swiper-container', this._toggleSlideAnimation.bind(this), {once: false})
		);
		*/
	}
}
