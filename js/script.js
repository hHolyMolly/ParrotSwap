let setTimer = 14399; // СМЕНА ТАЙМЕРА В СЕКУНДАХ
let timePreloader = 1000; // СМЕНА СКОРОСТИ ПРЕЛОУДЕРА
let animationSpollers = 300; // СМЕНА СКОРОСТИ АНИМАЦИИ СПОЙЛЕРА

/* НАСТРОЙКА СЧЕТЧИКА */
const animationCounter = 2; // ДЛИТЕЛЬНОСТЬ АНИМАЦИИ СЧЕТЧИКА (В ЛИБЕ CountUp.js МОЖНО ПОСМОТРЕТЬ ПРИМЕРНУЮ СКОРОСТЬ И КАК БУДЕТ ВЫГЛЯДЕТЬ)
const counterPrefix = "$"; // ПРЕФИКС ДЛЯ СЧЕТЧИКА, ТАК ЖЕ МОЖНО УКАЗАТЬ ЛЮБОЙ СВОЙ
const counterSeparator = ","; // РАЗДЕЛЕНИЕ МЕЖДУ СЧЕТЧИКОМ, МОЖНО УКАЗАТЬ ЛЮБОЕ ЗНАЧЕНИЕ - ПРОБЕЛ/КОММА/ТОЧКА И Т.Д.

//< " НАСТРОЙКА ЛОКАЛЬНЫХ СОХРАНЕНИЙ " >=============================================================================================================>//

function save(name, value) {
	localStorage.setItem(name, value)
}
function get(name) {
	return localStorage.getItem(name)
}
function rem(name) {
	localStorage.removeItem(name)
}
function off() {
	localStorage.clear();
}

//< " ПОДКЛЮЧЕНИЕ JS КОМПОНЕНТОВ " >=============================================================================================================>//


function dynamicAdaptive() {
	function DynamicAdapt(type) {
		this.type = type;
	}

	DynamicAdapt.prototype.init = function () {
		const _this = this;
		this.оbjects = [];
		this.daClassname = "_dynamic_adapt_";
		this.nodes = document.querySelectorAll("[data-da]");

		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.nodes[i];
			const data = node.dataset.da.trim();
			const dataArray = data.split(",");
			const оbject = {};
			оbject.element = node;
			оbject.parent = node.parentNode;
			оbject.destination = document.querySelector(dataArray[0].trim());
			оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
			оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.оbjects.push(оbject);
		}

		this.arraySort(this.оbjects);

		this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
			return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
		}, this);
		this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
			return Array.prototype.indexOf.call(self, item) === index;
		});

		for (let i = 0; i < this.mediaQueries.length; i++) {
			const media = this.mediaQueries[i];
			const mediaSplit = String.prototype.split.call(media, ',');
			const matchMedia = window.matchMedia(mediaSplit[0]);
			const mediaBreakpoint = mediaSplit[1];

			const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
				return item.breakpoint === mediaBreakpoint;
			});
			matchMedia.addListener(function () {
				_this.mediaHandler(matchMedia, оbjectsFilter);
			});
			this.mediaHandler(matchMedia, оbjectsFilter);
		}
	};

	DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
		if (matchMedia.matches) {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				оbject.index = this.indexInParent(оbject.parent, оbject.element);
				this.moveTo(оbject.place, оbject.element, оbject.destination);
			}
		} else {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				if (оbject.element.classList.contains(this.daClassname)) {
					this.moveBack(оbject.parent, оbject.element, оbject.index);
				}
			}
		}
	};

	DynamicAdapt.prototype.moveTo = function (place, element, destination) {
		element.classList.add(this.daClassname);
		if (place === 'last' || place >= destination.children.length) {
			destination.insertAdjacentElement('beforeend', element);
			return;
		}
		if (place === 'first') {
			destination.insertAdjacentElement('afterbegin', element);
			return;
		}
		destination.children[place].insertAdjacentElement('beforebegin', element);
	}

	DynamicAdapt.prototype.moveBack = function (parent, element, index) {
		element.classList.remove(this.daClassname);
		if (parent.children[index] !== undefined) {
			parent.children[index].insertAdjacentElement('beforebegin', element);
		} else {
			parent.insertAdjacentElement('beforeend', element);
		}
	}

	DynamicAdapt.prototype.indexInParent = function (parent, element) {
		const array = Array.prototype.slice.call(parent.children);
		return Array.prototype.indexOf.call(array, element);
	};

	DynamicAdapt.prototype.arraySort = function (arr) {
		if (this.type === "min") {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return -1;
					}

					if (a.place === "last" || b.place === "first") {
						return 1;
					}

					return a.place - b.place;
				}

				return a.breakpoint - b.breakpoint;
			});
		} else {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return 1;
					}

					if (a.place === "last" || b.place === "first") {
						return -1;
					}

					return b.place - a.place;
				}

				return b.breakpoint - a.breakpoint;
			});
			return;
		}
	};

	const da = new DynamicAdapt("max");
	da.init();

}
dynamicAdaptive();; // ДИНАМИЧЕСКИЙ АДАПТИВ

function myPopups() {
	const links = document.querySelectorAll("[data-popup-open]");
	const lockPadding = document.querySelectorAll("._lock-padding");
	const body = document.body;

	let unlock = true;

	const parentContainer = document.getElementById("modal-wrapper");
	const time = parentContainer.dataset.popupSpeed ? Number(parentContainer.dataset.popupSpeed) : 500;

	if (links) {
		links.forEach(link => {
			link.addEventListener("click", function (e) {
				const popupName = this.getAttribute("data-popup");
				const currentPopup = document.getElementById(popupName);
				popupOpen(currentPopup);
			});
		});

		const close = document.querySelectorAll("[data-popup-close]");

		close.forEach(item => {
			item.addEventListener("click", function (e) {
				popupClose(item.closest(".popup"));
			});
		});

		function popupOpen(currentPopup) {
			if (currentPopup && unlock) {
				const popupActive = document.querySelector(".popup._active");

				if (popupActive) {
					popupClose(popupActive, false);
				} else {
					bodyLock();
				}

				currentPopup.classList.add("_active");

				currentPopup.addEventListener("click", function (e) {
					if (!e.target.closest(".popup__body")) {
						popupClose(e.target.closest(".popup"));
					}
				});
			}
		}

		function popupClose(popupActive, doUnlock = true) {
			if (unlock) {
				popupActive.classList.remove("_active");
				if (doUnlock) {
					bodyUnLock();
				}
			}
		}

		function bodyLock() {
			const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

			if (lockPadding) {
				lockPadding.forEach(elem => {
					elem.style.paddingRight = lockPaddingValue;
				});
			}
			body.style.paddingRight = lockPaddingValue;
			body.classList.add("_lock-scroll");

			unlock = false;
			setTimeout(() => {
				unlock = true;
			}, time);
		}

		function bodyUnLock() {
			setTimeout(() => {
				if (lockPadding) {
					lockPadding.forEach(elem => {
						elem.style.paddingRight = "0px";
					});
				}
				body.style.paddingRight = "0px";
				body.classList.remove("_lock-scroll");
			}, time);

			unlock = false;
			setTimeout(() => {
				unlock = true;
			}, time);
		}

		document.addEventListener("keydown", function (e) {
			if (e.code === "Escape") {
				const popupActive = document.querySelector(".popup._active");
				popupClose(popupActive);
			}
		});

		(function () {
			if (!Element.prototype.closest) {
				Element.prototype.closest = function (css) {
					var node = this;
					while (node) {
						if (node.matches(css)) return node;
						else node = node.parentElement;
					}
					return null;
				};
			}
		})();
		(function () {
			if (!Element.prototype.matches) {
				Element.prototype.mathes = Element.prototype.matchesSelector ||
					Element.prototype.webkitMatchesSelector ||
					Element.prototype.mozMatchesSelector ||
					Element.prototype.msMatchesSelector;
			}
		})();
	}
}; // ПОПАПЫ

function myBurger() {
	const burgerOpen = document.getElementById("menu-open");
	const burgerContent = document.getElementById("menu-content");
	const burgerWrap = document.getElementById("menu-wrapper");

	let unlock = true;
	const time = 500;

	const lockPadding = document.querySelectorAll("._lock-padding");
	const body = document.body;

	function addActive() {
		if (unlock) {
			burgerContent.classList.add("_active");
			burgerWrap.classList.add("_active");
			bodyLock();
		}
	}

	function removeActive() {
		burgerContent.classList.remove("_active");
		burgerWrap.classList.remove("_active");
	}

	if (burgerOpen && burgerContent && burgerWrap) {
		burgerOpen.addEventListener("click", addActive);

		const burgerClose = document.getElementById("menu-close");
		document.addEventListener("click", function (e) {
			const elementTarget = e.target;

			if (elementTarget === burgerClose || elementTarget === burgerWrap && unlock) {
				removeActive();
				bodyUnLock();
			}
		});

		document.addEventListener("click", function (e) {
			const elementTarget = e.target;
			if (elementTarget.closest("[data-popup-open]") && unlock) {
				removeActive();
			}
		});

		document.addEventListener("keydown", function (e) {
			if (e.code === "Escape" && unlock) {
				removeActive();
				bodyUnLock();
			}
		});
	}

	function bodyLock() {
		const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

		if (lockPadding) {
			lockPadding.forEach(elem => {
				elem.style.paddingRight = lockPaddingValue;
			});
		}
		body.style.paddingRight = lockPaddingValue;
		body.classList.add("_lock-scroll");

		unlock = false;
		setTimeout(() => {
			unlock = true;
		}, time);
	}

	function bodyUnLock() {
		setTimeout(() => {
			if (lockPadding) {
				lockPadding.forEach(elem => {
					elem.style.paddingRight = "0px";
				});
			}
			body.style.paddingRight = "0px";
			body.classList.remove("_lock-scroll");
		}, time);

		unlock = false;
		setTimeout(() => {
			unlock = true;
		}, time);
	}
}; // МЕНЮ БУРГЕР

function mySpollers() {

	const spollersArray = document.querySelectorAll('[data-spollers]');

	if (spollersArray.length > 0) {
		// Получение обычных спойлеров
		const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
			return !item.dataset.spollers.split(",")[0];
		});
		// Инициализация обычных спойлеров
		if (spollersRegular.length > 0) {
			initSpollers(spollersRegular);
		}

		// Получение спойлеров с медиа запросами
		const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
			return item.dataset.spollers.split(",")[0];
		});

		// Инициализация спойлеров с медиа запросами
		if (spollersMedia.length > 0) {
			const breakpointsArray = [];
			spollersMedia.forEach(item => {
				const params = item.dataset.spollers;
				const breakpoint = {};
				const paramsArray = params.split(",");
				breakpoint.value = paramsArray[0];
				breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
				breakpoint.item = item;
				breakpointsArray.push(breakpoint);
			});

			// Получаем уникальные брейкпоинты
			let mediaQueries = breakpointsArray.map(function (item) {
				return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
			});
			mediaQueries = mediaQueries.filter(function (item, index, self) {
				return self.indexOf(item) === index;
			});

			// Работаем с каждым брейкпоинтом
			mediaQueries.forEach(breakpoint => {
				const paramsArray = breakpoint.split(",");
				const mediaBreakpoint = paramsArray[1];
				const mediaType = paramsArray[2];
				const matchMedia = window.matchMedia(paramsArray[0]);

				// Объекты с нужными условиями
				const spollersArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				// Событие
				matchMedia.addListener(function () {
					initSpollers(spollersArray, matchMedia);
				});
				initSpollers(spollersArray, matchMedia);
			});
		}
		// Инициализация
		function initSpollers(spollersArray, matchMedia = false) {
			spollersArray.forEach(spollersBlock => {
				spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
				if (matchMedia.matches || !matchMedia) {
					spollersBlock.classList.add('_init');
					initSpollerBody(spollersBlock);
					spollersBlock.addEventListener("click", setSpollerAction);
				} else {
					spollersBlock.classList.remove('_init');
					initSpollerBody(spollersBlock, false);
					spollersBlock.removeEventListener("click", setSpollerAction);
				}
			});
		}
		// Работа с контентом
		function initSpollerBody(spollersBlock, hideSpollerBody = true) {
			const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
			if (spollerTitles.length > 0) {
				spollerTitles.forEach(spollerTitle => {
					if (hideSpollerBody) {
						spollerTitle.removeAttribute('tabindex');
						if (!spollerTitle.classList.contains('_active')) {
							spollerTitle.nextElementSibling.hidden = true;
						}
					} else {
						spollerTitle.setAttribute('tabindex', '-1');
						spollerTitle.nextElementSibling.hidden = false;
					}
				});
			}
		}
		function setSpollerAction(e) {
			const el = e.target;
			if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
				const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
				const spollersBlock = spollerTitle.closest('[data-spollers]');
				const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
				if (!spollersBlock.querySelectorAll('._slide').length) {
					if (oneSpoller && !spollerTitle.classList.contains('_active')) {
						hideSpollersBody(spollersBlock);
					}
					spollerTitle.classList.toggle('_active');
					_slideToggle(spollerTitle.nextElementSibling, animationSpollers);
				}
				e.preventDefault();
			}
		}
		function hideSpollersBody(spollersBlock) {
			const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
			if (spollerActiveTitle) {
				spollerActiveTitle.classList.remove('_active');
				_slideUp(spollerActiveTitle.nextElementSibling, animationSpollers);
			}
		}
	}

	let _slideUp = (target, duration = animationSpollers) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = target.offsetHeight + 'px';
			target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout(() => {
				target.hidden = true;
				target.style.removeProperty('height');
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
			}, duration);
		}
	}
	let _slideDown = (target, duration = animationSpollers) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			if (target.hidden) {
				target.hidden = false;
			}
			let height = target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + 'ms';
			target.style.height = height + 'px';
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			window.setTimeout(() => {
				target.style.removeProperty('height');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
			}, duration);
		}
	}
	let _slideToggle = (target, duration = animationSpollers) => {
		if (target.hidden) {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
mySpollers();; // СПОЙЛЕРЫ

function theme() {
	const htmlBlock = document.documentElement;
	const saveUserTheme = localStorage.getItem("user-theme");

	let userTheme = 'light';

	const themeButton = document.getElementById("theme-website");
	if (themeButton) {
		themeButton.addEventListener("click", function () {
			changeTheme();
		});
	}

	window.addEventListener("change", function (e) {
		if (e.target === themeButton) {
			!saveUserTheme ? changeTheme() : null;
		}
	});

	function setThemeClass() {
		if (saveUserTheme) {
			htmlBlock.classList.add(saveUserTheme);
		} else {
			htmlBlock.classList.add(userTheme);
		}
	}
	setThemeClass()

	function changeTheme() {
		let currentTheme = htmlBlock.classList.contains("light") ? 'light' : 'dark';
		let newTheme;

		if (currentTheme === 'light') {
			newTheme = 'dark';
		} else if (currentTheme === 'dark') {
			newTheme = 'light';
		}

		htmlBlock.classList.remove(currentTheme);
		htmlBlock.classList.add(newTheme);
		localStorage.setItem("user-theme", newTheme);
	}
}
theme();; // СМЕНА ТЕМЫ САЙТА

//< " СКРИПТЫ " >=============================================================================================================>//

let isMobile = {
	Android: function () { return navigator.userAgent.match(/Android/i); },
	BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
	iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
	Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
	Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
	any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

if (isMobile.any()) {
	document.body.classList.add("_touch");
} else {
	document.body.classList.add("_pc");
}

//< " СКРИПТЫ " >=============================================================================================================>//

function prompts() {
	const prompts = document.querySelectorAll("[data-prompt]");
	prompts.forEach((prompt) => {
		prompt.addEventListener("click", function (e) {
			const elementTarget = e.target;

			if (isMobile.any()) {
				if (elementTarget.closest("[data-prompt-button]")) {
					if (!elementTarget.closest("[data-prompt-button]").classList.contains("_active")) {
						prompt.querySelector("[data-prompt-button]").classList.add("_active");
						prompt.querySelector(".info-row-prompt__dropdown").classList.add("_active");
					} else {
						prompt.querySelector("[data-prompt-button]").classList.remove("_active");
						prompt.querySelector(".info-row-prompt__dropdown").classList.remove("_active");
					}
				}
			}
		});

		document.addEventListener("click", function (e) {
			const elementTarget = e.target;

			if (isMobile.any()) {
				if (!elementTarget.closest("[data-prompt]")) {
					prompt.querySelector("[data-prompt-button]").classList.remove("_active");
					prompt.querySelector(".info-row-prompt__dropdown").classList.remove("_active");
				}
			}
		});
	});
}

function timer() {
	let time = setTimer;

	setInterval(() => {
		if (time < 1) {
			time = setTimer;
		}
	}, setTimer);

	setInterval(counterTimer, 1000);
	const hoursItem = document.getElementById("hours"),
		minutesItem = document.getElementById("minutes"),
		secondsItem = document.getElementById("seconds");

	function counterTimer() {
		let hours = Math.floor(time / 60 / 60),
			minutes = Math.floor(time / 60) - (hours * 60),
			seconds = Math.floor(time % 60);

		function setTime(setItem, whatItem) {
			setItem = setItem < 10 ? "0" + setItem : setItem;
			whatItem.innerHTML = `${setItem}`;
		}

		setTime(hours, hoursItem);
		setTime(minutes, minutesItem);
		setTime(seconds, secondsItem);

		time--;
	}

}

function loadsDigits() {
	setTimeout(windowLoad, 300);

	function windowLoad() {
		var __assign = (this && this.__assign) || function () {
			__assign = Object.assign || function (t) {
				for (var s, i = 1, n = arguments.length; i < n; i++) {
					s = arguments[i];
					for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
						t[p] = s[p];
				}
				return t;
			};
			return __assign.apply(this, arguments);
		};
		// playground: stackblitz.com/edit/countup-typescript
		var CountUp = /** @class */ (function () {
			function CountUp(target, endVal, options) {
				var _this = this;
				this.endVal = endVal;
				this.options = options;
				this.version = '2.3.2';
				this.defaults = {
					startVal: 0,
					decimalPlaces: 0,
					duration: 2,
					useEasing: true,
					useGrouping: true,
					smartEasingThreshold: 999,
					smartEasingAmount: 333,
					separator: ',',
					decimal: '.',
					prefix: '',
					suffix: '',
					enableScrollSpy: false,
					scrollSpyDelay: 200,
					scrollSpyOnce: false,
				};
				this.finalEndVal = null; // for smart easing
				this.useEasing = true;
				this.countDown = false;
				this.error = '';
				this.startVal = 0;
				this.paused = true;
				this.once = false;
				this.count = function (timestamp) {
					if (!_this.startTime) {
						_this.startTime = timestamp;
					}
					var progress = timestamp - _this.startTime;
					_this.remaining = _this.duration - progress;
					// to ease or not to ease
					if (_this.useEasing) {
						if (_this.countDown) {
							_this.frameVal = _this.startVal - _this.easingFn(progress, 0, _this.startVal - _this.endVal, _this.duration);
						}
						else {
							_this.frameVal = _this.easingFn(progress, _this.startVal, _this.endVal - _this.startVal, _this.duration);
						}
					}
					else {
						_this.frameVal = _this.startVal + (_this.endVal - _this.startVal) * (progress / _this.duration);
					}
					// don't go past endVal since progress can exceed duration in the last frame
					var wentPast = _this.countDown ? _this.frameVal < _this.endVal : _this.frameVal > _this.endVal;
					_this.frameVal = wentPast ? _this.endVal : _this.frameVal;
					// decimal
					_this.frameVal = Number(_this.frameVal.toFixed(_this.options.decimalPlaces));
					// format and print value
					_this.printValue(_this.frameVal);
					// whether to continue
					if (progress < _this.duration) {
						_this.rAF = requestAnimationFrame(_this.count);
					}
					else if (_this.finalEndVal !== null) {
						// smart easing
						_this.update(_this.finalEndVal);
					}
					else {
						if (_this.callback) {
							_this.callback();
						}
					}
				};
				// default format and easing functions
				this.formatNumber = function (num) {
					var neg = (num < 0) ? '-' : '';
					var result, x1, x2, x3;
					result = Math.abs(num).toFixed(_this.options.decimalPlaces);
					result += '';
					var x = result.split('.');
					x1 = x[0];
					x2 = x.length > 1 ? _this.options.decimal + x[1] : '';
					if (_this.options.useGrouping) {
						x3 = '';
						for (var i = 0, len = x1.length; i < len; ++i) {
							if (i !== 0 && (i % 3) === 0) {
								x3 = _this.options.separator + x3;
							}
							x3 = x1[len - i - 1] + x3;
						}
						x1 = x3;
					}
					// optional numeral substitution
					if (_this.options.numerals && _this.options.numerals.length) {
						x1 = x1.replace(/[0-9]/g, function (w) { return _this.options.numerals[+w]; });
						x2 = x2.replace(/[0-9]/g, function (w) { return _this.options.numerals[+w]; });
					}
					return neg + _this.options.prefix + x1 + x2 + _this.options.suffix;
				};
				// t: current time, b: beginning value, c: change in value, d: duration
				this.easeOutExpo = function (t, b, c, d) {
					return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
				};
				this.options = __assign(__assign({}, this.defaults), options);
				this.formattingFn = (this.options.formattingFn) ?
					this.options.formattingFn : this.formatNumber;
				this.easingFn = (this.options.easingFn) ?
					this.options.easingFn : this.easeOutExpo;
				this.startVal = this.validateValue(this.options.startVal);
				this.frameVal = this.startVal;
				this.endVal = this.validateValue(endVal);
				this.options.decimalPlaces = Math.max(0 || this.options.decimalPlaces);
				this.resetDuration();
				this.options.separator = String(this.options.separator);
				this.useEasing = this.options.useEasing;
				if (this.options.separator === '') {
					this.options.useGrouping = false;
				}
				this.el = (typeof target === 'string') ? document.getElementById(target) : target;
				if (this.el) {
					this.printValue(this.startVal);
				}
				else {
					this.error = '[CountUp] target is null or undefined';
				}
				// scroll spy
				if (typeof window !== 'undefined' && this.options.enableScrollSpy) {
					if (!this.error) {
						// set up global array of onscroll functions to handle multiple instances
						window['onScrollFns'] = window['onScrollFns'] || [];
						window['onScrollFns'].push(function () { return _this.handleScroll(_this); });
						window.onscroll = function () {
							window['onScrollFns'].forEach(function (fn) { return fn(); });
						};
						this.handleScroll(this);
					}
					else {
						console.error(this.error, target);
					}
				}
			}
			CountUp.prototype.handleScroll = function (self) {
				if (!self || !window || self.once)
					return;
				var bottomOfScroll = window.innerHeight + window.scrollY;
				var rect = self.el.getBoundingClientRect();
				var bottomOfEl = rect.top + rect.height + window.pageYOffset;
				if (bottomOfEl < bottomOfScroll && bottomOfEl > window.scrollY && self.paused) {
					// in view
					self.paused = false;
					setTimeout(function () { return self.start(); }, self.options.scrollSpyDelay);
					if (self.options.scrollSpyOnce)
						self.once = true;
				}
				else if (window.scrollY > bottomOfEl && !self.paused) {
					// scrolled past
					self.reset();
				}
			};
			/**
			 * Smart easing works by breaking the animation into 2 parts, the second part being the
			 * smartEasingAmount and first part being the total amount minus the smartEasingAmount. It works
			 * by disabling easing for the first part and enabling it on the second part. It is used if
			 * usingEasing is true and the total animation amount exceeds the smartEasingThreshold.
			 */
			CountUp.prototype.determineDirectionAndSmartEasing = function () {
				var end = (this.finalEndVal) ? this.finalEndVal : this.endVal;
				this.countDown = (this.startVal > end);
				var animateAmount = end - this.startVal;
				if (Math.abs(animateAmount) > this.options.smartEasingThreshold && this.options.useEasing) {
					this.finalEndVal = end;
					var up = (this.countDown) ? 1 : -1;
					this.endVal = end + (up * this.options.smartEasingAmount);
					this.duration = this.duration / 2;
				}
				else {
					this.endVal = end;
					this.finalEndVal = null;
				}
				if (this.finalEndVal !== null) {
					// setting finalEndVal indicates smart easing
					this.useEasing = false;
				}
				else {
					this.useEasing = this.options.useEasing;
				}
			};
			// start animation
			CountUp.prototype.start = function (callback) {
				if (this.error) {
					return;
				}
				this.callback = callback;
				if (this.duration > 0) {
					this.determineDirectionAndSmartEasing();
					this.paused = false;
					this.rAF = requestAnimationFrame(this.count);
				}
				else {
					this.printValue(this.endVal);
				}
			};
			// pause/resume animation
			CountUp.prototype.pauseResume = function () {
				if (!this.paused) {
					cancelAnimationFrame(this.rAF);
				}
				else {
					this.startTime = null;
					this.duration = this.remaining;
					this.startVal = this.frameVal;
					this.determineDirectionAndSmartEasing();
					this.rAF = requestAnimationFrame(this.count);
				}
				this.paused = !this.paused;
			};
			// reset to startVal so animation can be run again
			CountUp.prototype.reset = function () {
				cancelAnimationFrame(this.rAF);
				this.paused = true;
				this.resetDuration();
				this.startVal = this.validateValue(this.options.startVal);
				this.frameVal = this.startVal;
				this.printValue(this.startVal);
			};
			// pass a new endVal and start animation
			CountUp.prototype.update = function (newEndVal) {
				cancelAnimationFrame(this.rAF);
				this.startTime = null;
				this.endVal = this.validateValue(newEndVal);
				if (this.endVal === this.frameVal) {
					return;
				}
				this.startVal = this.frameVal;
				if (this.finalEndVal == null) {
					this.resetDuration();
				}
				this.finalEndVal = null;
				this.determineDirectionAndSmartEasing();
				this.rAF = requestAnimationFrame(this.count);
			};
			CountUp.prototype.printValue = function (val) {
				var result = this.formattingFn(val);
				if (this.el.tagName === 'INPUT') {
					var input = this.el;
					input.value = result;
				}
				else if (this.el.tagName === 'text' || this.el.tagName === 'tspan') {
					this.el.textContent = result;
				}
				else {
					this.el.innerHTML = result;
				}
			};
			CountUp.prototype.ensureNumber = function (n) {
				return (typeof n === 'number' && !isNaN(n));
			};
			CountUp.prototype.validateValue = function (value) {
				var newValue = Number(value);
				if (!this.ensureNumber(newValue)) {
					this.error = "[CountUp] invalid start or end value: ".concat(value);
					return null;
				}
				else {
					return newValue;
				}
			};
			CountUp.prototype.resetDuration = function () {
				this.startTime = null;
				this.duration = Number(this.options.duration) * 1000;
				this.remaining = this.duration;
			};
			return CountUp;
		}());

		function countGo(itemCounter, counterValue) {
			const options = {
				prefix: counterPrefix,
				duration: animationCounter,
				separator: counterSeparator,
			};
			let counter = new CountUp(itemCounter, counterValue, options);
			counter.start();
		}

		countGo(itemCounter = 'first', counterValue = 182426);
		countGo(itemCounter = 'second', counterValue = 42675);
	}
}

function myDepositValue() {
	const depositParent = document.querySelectorAll("[data-deposit-block]");

	let ifLengthInput = 0; // ЕСЛИ ЗНАЧЕНИЕ БОЛЬШЕ УКАЗАННОГО, ТО КНОПКА СТАНОВИТСЯ АКТИВНОЙ

	depositParent.forEach(main => {
		const depositMax = main.querySelector("[data-deposit-max]");
		const depositInput = main.querySelector("[data-deposit-input]");

		if (depositMax && depositInput) {
			const myValue = main.querySelector("[data-deposit-my-value]");
			const sendDeposit = main.querySelector("[data-deposit-send]");

			depositInput.addEventListener("input", function () {
				this.value = this.value.replace(/[^\d.,]/g, '');

				if (depositInput.value.length > ifLengthInput) {
					sendDeposit.classList.remove("_disabled");
				} else {
					sendDeposit.classList.add("_disabled");
				}
			});
			depositMax.addEventListener("click", function () {
				const item = myValue.innerHTML;
				if (depositInput.value != item) {
					depositInput.value = item;
				}

				if (depositInput.value.length > ifLengthInput) {
					sendDeposit.classList.remove("_disabled");
				} else {
					sendDeposit.classList.add("_disabled");
				}
			});
		}
	});
}

function goToFaqs() {
	const faqsTarget = document.querySelectorAll(".faqs-columns__item");

	faqsTarget.forEach(item => {
		const getHash = item.getAttribute("data-faqs-target");

		if (window.location.hash === getHash) {
			const button = item.querySelector("[data-spoller]");
			const content = button.nextElementSibling;

			button.classList.add("_active");
			content.classList.add("_active");
			content.removeAttribute("hidden")

			setTimeout(() => {
				item.scrollIntoView({
					behavior: 'smooth',
					block: 'center'
				});
			}, timePreloader + 500);
		}
	});
}
goToFaqs();