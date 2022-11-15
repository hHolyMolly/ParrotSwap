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
dynamicAdaptive(); // ДИНАМИЧЕСКИЙ АДАПТИВ

/* function scrollHeader() {
	const header = document.querySelector('.header');

	const callback = function (entries, observer) {
		if (entries[0].isIntersecting) {
			header.classList.remove('_scroll');
		} else {
			header.classList.add('_scroll');
		}
	};

	const headerObserver = new IntersectionObserver(callback);
	headerObserver.observe(header);
}
scrollHeader(); // ДОБАВЛЕНИЕ ХЕДЕРУ КЛАСС ПРИ СКРОЛЛЕ */

/* if (document.querySelector(".swiper")) {
	new Swiper(".swiper", {
		slidesPerView: 1,
		spaceBetween: 15,
		grabCursor: true,
		loop: true,
		speed: 800,

		autoplay: {
			delay: 3500,
		},

		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},

		breakpoints: {
			767.8: {},
		}
	});
}

; // НАСТРОЙКИ СЛАЙДЕРА */

/* function quantity() {
	if (document.querySelectorAll('[data-quantity]')) {
		let minValue = 1; // Минимальное значение
		let maxValue = 20; // Максимальное значение

		const counters = document.querySelectorAll('[data-quantity]');

		counters.forEach(counter => {
			counter.addEventListener("click", function (e) {
				const elementTarget = e.target;
				let value = parseInt(elementTarget.closest(".counter").querySelector('.counter__input').value);

				if (elementTarget.closest('.counter__btn')) {
					if (elementTarget.classList.contains("counter__btn_plus")) {
						value++;
					} else {
						--value;
					}

					if (value <= minValue) {
						value = minValue;
						elementTarget.closest(".counter").querySelector(".counter__btn_minus").classList.add("counter__btn_disabled");
					} else {
						elementTarget.closest(".counter").querySelector(".counter__btn_minus").classList.remove("counter__btn_disabled");
					}

					if (value >= maxValue) {
						value = maxValue;
						elementTarget.closest(".counter").querySelector(".counter__btn_plus").classList.add("counter__btn_disabled");
					} else {
						elementTarget.closest(".counter").querySelector(".counter__btn_plus").classList.remove("counter__btn_disabled");
					}
				}

				elementTarget.closest(".counter").querySelector(".counter__input").value = value;
				elementTarget.closest(".counter").querySelector(".counter__input").setAttribute("value", value)
			});

			counter.addEventListener("input", function (e) {
				const elementTarget = e.target;
				let value = parseInt(elementTarget.closest(".counter").querySelector('.counter__input').value);

				if (value >= maxValue) {
					value = maxValue;
					elementTarget.closest(".counter").querySelector(".counter__btn_plus").classList.add("counter__btn_disabled");
				} else {
					elementTarget.closest(".counter").querySelector(".counter__btn_plus").classList.remove("counter__btn_disabled");
				}

				if (value <= minValue) {
					value = minValue;
					elementTarget.closest(".counter").querySelector(".counter__btn_minus").classList.add("counter__btn_disabled");
				} else {
					elementTarget.closest(".counter").querySelector(".counter__btn_minus").classList.remove("counter__btn_disabled");
				}

				elementTarget.closest(".counter").querySelector(".counter__input").value = value;
				elementTarget.closest(".counter").querySelector(".counter__input").setAttribute("value", value)
			});
		});
	}
};
quantity(); // СЧЁТЧИКИ */

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
					_slideToggle(spollerTitle.nextElementSibling, 500);
				}
				e.preventDefault();
			}
		}
		function hideSpollersBody(spollersBlock) {
			const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
			if (spollerActiveTitle) {
				spollerActiveTitle.classList.remove('_active');
				_slideUp(spollerActiveTitle.nextElementSibling, 500);
			}
		}
	}

	let _slideUp = (target, duration = 500) => {
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
	let _slideDown = (target, duration = 500) => {
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
	let _slideToggle = (target, duration = 500) => {
		if (target.hidden) {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
mySpollers(); // СПОЙЛЕРЫ

function myPopups() {
	const links = document.querySelectorAll("[data-popup-open]");
	const lockPadding = document.querySelectorAll(".lock-padding");
	const body = document.body;

	let unlock = true;

	const time = 500;

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
}
myPopups(); // ПОПАПЫ

function myBurger() {
	if (document.getElementById("header-menu")) {
		const burgerOpen = document.getElementById("menu-open");
		const burgerContent = document.getElementById("menu-content");
		const burgerWrap = document.getElementById("menu-wrapper");
		const body = document.querySelector("body");

		if (burgerOpen && burgerContent && burgerWrap) {
			burgerOpen.addEventListener("click", function () {
				burgerContent.classList.add("_active");
				burgerWrap.classList.add("_active");
				body.classList.add("_lock-scroll");
			});

			const burgerClose = document.getElementById("menu-close");

			document.addEventListener("click", function (e) {
				const elementTarget = e.target;

				if (elementTarget === burgerClose || elementTarget === burgerWrap) {
					burgerContent.classList.remove("_active");
					burgerWrap.classList.remove("_active");
					body.classList.remove("_lock-scroll");
				}
			});

			if (document.querySelector("[data-popup-open]")) {
				function popupTarget() {
					const buttons = document.querySelectorAll("[data-popup-open]")

					buttons.forEach(button => {
						button.addEventListener("click", function () {
							burgerContent.classList.remove("_active");
							burgerWrap.classList.remove("_active");
						});
					});
				}
				popupTarget()
			}
		}
	}
}
myBurger(); // МЕНЮ БУРГЕР

/* function myTabs() {
	document.addEventListener("click", (e) => {
		const elementTarget = e.target;

		if (elementTarget.closest("[data-tab-btn]")) {
			const att = elementTarget.getAttribute("data-tab-btn");
			const modernAtt = `[data-tab="${att}"]`;

			const itemTab = elementTarget.closest("[data-tabs]").querySelector(`${modernAtt}`);

			itemTab.style.display = "block";
			const buttons = elementTarget.closest("[data-tabs]").querySelectorAll("[data-tab-btn]");

			console.log(elementTarget.closest("[data-tabs]").querySelector(`${modernAtt}`).getBoundingClientRect())

			buttons.forEach(button => {
				button.classList.remove("_active");
			});
			elementTarget.classList.add("_active");

			const tabs = elementTarget.closest("[data-tabs]").querySelectorAll("[data-tab]");

			tabs.forEach((tab) => {
				if (tab.getAttribute("data-tab") === att) {
				} else {
					tab.style.display = "none";
				}
			});
		}
	});
}
myTabs();; // ТАБЫ */

/* function myRatingStars() {
	const ratings = document.querySelectorAll(".rating-stars");

	if (ratings.length > 0) {
		let ratingActive, ratingValue;

		for (let index = 0; index < ratings.length; index++) {
			const rating = ratings[index];

			function initRating() {
				ratingVars(rating)
				setRating()

				if (rating.classList.contains("rating-stars_set")) {
					const items = rating.querySelectorAll(".rating-stars__item");
					for (let index = 0; index < items.length; index++) {
						const item = items[index];

						item.style.cursor = "pointer";

						item.addEventListener("mouseenter", function () {
							ratingVars(rating)
							setRating(item.value)
						});
						item.addEventListener("mouseleave", function () {
							setRating()
						});
						item.addEventListener("click", function () {
							ratingVars(rating)

							if (this.getAttribute("data-rating-text")) {
								ratingValue.innerHTML = this.getAttribute("data-rating-text");
							} else {
								ratingValue.innerHTML = index + 1;
							}

							setRating()
						});
					}
				}
			}
			initRating();

			function ratingVars() {
				ratingActive = rating.querySelector(".rating-stars__active");
				ratingValue = rating.querySelector(".rating-stars__value");
			}

			function setRating(index = ratingValue.innerHTML) {
				const ratingActiveWidth = index / 0.05;
				ratingActive.style.width = `${ratingActiveWidth}%`;
			}
		}
	}
}
myRatingStars(); // ЗВЕЗДНЫЙ РЕЙТИНГ */

/* function myForms() {
	const forms = document.querySelectorAll("form");

	if (forms.length > 0) {
		let error = 0;

		let textError;
		let ErrorNullValue = "This is a required field";

		forms.forEach(form => {
			const inputs = form.querySelectorAll("input");
			const textareas = form.querySelectorAll("textarea");
			const checkboxs = form.querySelectorAll('input[type="checkbox"]');
			const phones = form.querySelectorAll('input[type="tel"]');

			if (form.classList.contains("_required")) {
				form.addEventListener("submit", formValid);
				inputs.forEach(input => {
					input.addEventListener("focus", formFocus);
				});
				textareas.forEach(textarea => {
					textarea.addEventListener("focus", formFocus);
				});
				inputs.forEach(input => {
					input.addEventListener("blur", function (e) {
						const elementTarget = e.target;

						if (!elementTarget.classList.contains("_invalid")) {
							elementTarget.classList.add("_invalid");

							textError = this.getAttribute("data-form-prompt");
							if (textError === null || textError === "") {
								textError = `${ErrorNullValue}`;
							}

							if (input.value.match(/^[ ]+$/)) {
								input.classList.add("_invalid");
								error++;
								input.value = '';
							}

							if (!elementTarget.classList.contains("_email") && !elementTarget.classList.contains("_password") && !elementTarget.classList.contains("_phone")) {
								if (input.value.length < 2) {
									input.classList.add("_invalid");
									let textInfo = `${textError}`;
									formBlur(textInfo, e)
								} else {
									input.classList.remove("_invalid");
								}
							}
							if (elementTarget.classList.contains("_email")) {
								const emailValid = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

								function validateEmail(value) {
									return emailValid.test(value);
								}

								if (!validateEmail(input.value)) {
									input.classList.add("_invalid");
									let textInfo = `${textError}`;
									formBlur(textInfo, e)
								} else {
									input.classList.remove("_invalid");
								}
							}
							if (elementTarget.classList.contains("_password")) {
								const minimum8Chars = /^.{8,}$/;
								const beginWithoutDigit = /^\D.*$/;
								const withoutSpecialChars = /^[^-() /]*$/;
								const containsLetters = /^.*[a-zA-Z]+.*$/;
								if (minimum8Chars.test(input.value) && beginWithoutDigit.test(input.value) && withoutSpecialChars.test(input.value) && containsLetters.test(input.value)) {
									input.classList.remove("_invalid");
								} else {
									input.classList.add("_invalid");
									let textInfo = `${textError}`;
									formBlur(textInfo, e)
								}
							}
							if (elementTarget.classList.contains("_phone")) {
								phones.forEach(phone => {
									const requiredPhone = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
									const valid = requiredPhone.test(phone.value);

									if (!valid) {
										input.classList.add("_invalid");
									} else {
										input.classList.remove("_invalid");
									}
								});

								let textInfo = `${textError}`;
								formBlur(textInfo, e)
							}
						}
					});
				});
				textareas.forEach(textarea => {
					textarea.addEventListener("blur", function (e) {
						const elementTarget = e.target;

						if (!elementTarget.classList.contains("_invalid")) {
							textError = this.getAttribute("data-form-prompt");
							if (textError === null || textError === "") {
								textError = `${ErrorNullValue}`;
							}

							if (textarea.value.match(/^[ ]+$/)) {
								textarea.classList.add("_invalid");
								error++;
								textarea.value = '';
							}

							if (textarea.value.length < 2) {
								textarea.classList.add("_invalid");
								let textInfo = `${textError}`;

								if (textarea.classList.contains("_invalid")) {
									if (textarea.parentElement.querySelectorAll(".field__error").length < 1) {
										const template = `
											<div class="field__error field-error">
												<span class="field-error__icon">!</span>
												<div class="field-error__dropdown">
													${textInfo}
												</div>
											</div>
											`;

										textarea.parentElement.insertAdjacentHTML("beforeEnd", template);
									}
								} else {
									textarea.parentElement.querySelectorAll(".field__error").forEach(error => {
										error.remove()
									});
								}
							}
						}
					});
				});
				checkboxs.forEach(checkbox => {
					checkbox.addEventListener("change", function () {
						validCheckbox(checkbox)
					});
				});

				document.addEventListener("click", function (e) {
					const elementTarget = e.target;

					if (isMobile.any()) {
						const iconErrors = document.querySelectorAll(".field-error__icon");
						if (iconErrors.length > 0) {
							iconErrors.forEach(iconError => {
								if (!iconError.nextElementSibling.classList.contains("_active")) {
									if (elementTarget === iconError) {
										iconError.nextElementSibling.classList.add("_active");
									}
								} else {
									iconError.nextElementSibling.classList.remove("_active");

									if (elementTarget != iconError) {
										iconError.nextElementSibling.classList.remove("_active");
									}
								}
							});
						}
					}
				});
			}

			function formBlur(textInfo, e) {
				const elementTarget = e.target;

				if (elementTarget.classList.contains("_invalid")) {
					if (elementTarget.parentElement.querySelectorAll(".field__error").length < 1) {
						const template = `
							<div class="field__error field-error">
								<span class="field-error__icon">!</span>
								<div class="field-error__dropdown">
									${textInfo}
								</div>
							</div>
							`;

						elementTarget.parentElement.insertAdjacentHTML("beforeEnd", template);
					}
				} else {
					elementTarget.parentElement.querySelectorAll(".field__error").forEach(error => {
						error.remove()
					});
				}
			}

			function formFocus(e) {
				const elementTarget = e.target;
				if (elementTarget.classList.contains("_invalid")) {
					elementTarget.classList.remove("_invalid");
					elementTarget.parentElement.querySelectorAll(".field__error").forEach(error => {
						error.remove()
					});
				}
			}

			function validCheckbox(checkbox) {
				if (checkbox.classList.contains("_required")) {
					textError = checkbox.getAttribute("data-form-prompt");
					if (textError === null || textError === "") {
						textError = `${ErrorNullValue}`;
					}

					if (checkbox.checked === true) {
						checkbox.classList.remove("_invalid");
						checkbox.parentElement.querySelectorAll(".field__error").forEach(error => {
							error.remove()
						});
					} else {
						checkbox.classList.add("_invalid");
						error++;
						let textInfo = `${textError}`;

						if (checkbox.parentElement.querySelectorAll(".field__error").length < 1) {
							const template = `
										<div class="field__error field-error">
											<span class="field-error__icon">!</span>
											<div class="field-error__dropdown">
												${textInfo}
											</div>
										</div>
										`;

							checkbox.parentElement.insertAdjacentHTML("beforeEnd", template);
						}
					}
				}
			}

			function formValid(e) {
				inputs.forEach(input => {
					if (input.classList.contains("_required")) {
						textError = input.getAttribute("data-form-prompt");
						if (textError === null || textError === "") {
							textError = `${ErrorNullValue}`;
						}

						validAllInputs()

						if (!input.classList.contains("_email") && !input.classList.contains("_password") && !input.classList.contains("_phone") && !input.classList.contains("_name")) {
							let textInfo = `${textError}`;
							addError(textInfo)
						}

						if (input.classList.contains("_email")) {
							validEmail()
						}
						if (input.classList.contains("_password")) {
							validPassword()
						}
						if (input.classList.contains("_phone")) {
							validPhone()
						}

						function validEmail() {
							const emailValid = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

							function validateEmail(value) {
								return emailValid.test(value);
							}

							if (!validateEmail(input.value)) {
								input.classList.add("_invalid");
								error++;
							} else {
								input.classList.remove("_invalid");
							}

							let textInfo = `${textError}`;
							addError(textInfo)
						}

						function validPassword() {
							const minimum8Chars = /^.{8,}$/;
							const beginWithoutDigit = /^\D.*$/;
							const withoutSpecialChars = /^[^-() /]*$/;
							const containsLetters = /^.*[a-zA-Z]+.*$/;

							if (minimum8Chars.test(input.value) &&
								beginWithoutDigit.test(input.value) &&
								withoutSpecialChars.test(input.value) &&
								containsLetters.test(input.value)) {
								input.classList.remove("_invalid");
							} else {
								input.classList.add("_invalid");
								error++;
							}

							let textInfo = `${textError}`;
							addError(textInfo)
						}

						function validPhone() {
							phones.forEach(phone => {
								const requiredPhone = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
								const valid = requiredPhone.test(phone.value);

								if (!valid) {
									input.classList.add("_invalid");
									error++;
								} else {
									input.classList.remove("_invalid");
								}
							});

							let textInfo = `${textError}`;
							addError(textInfo)
						}

						function validAllInputs() {
							if (input.value.length < 2) {
								input.classList.add("_invalid");
								error++;
							} else {
								input.classList.remove("_invalid");
							}

							if (input.value.match(/^[ ]+$/)) {
								input.classList.add("_invalid");
								error++;
								input.value = '';
							}
						}

						function addError(textInfo) {
							if (input.classList.contains("_invalid")) {
								if (input.parentElement.querySelectorAll(".field__error").length < 1) {
									const template = `
										<div class="field__error field-error">
											<span class="field-error__icon">!</span>
											<div class="field-error__dropdown">
												${textInfo}
											</div>
										</div>
										`;

									input.parentElement.insertAdjacentHTML("beforeEnd", template);
								}
							} else {
								input.parentElement.querySelectorAll(".field__error").forEach(error => {
									error.remove()
								});
							}
						}
					}
				});
				textareas.forEach(textarea => {
					if (textarea.classList.contains("_required")) {
						textError = textarea.getAttribute("data-form-prompt");
						if (textError === null || textError === "") {
							textError = `${ErrorNullValue}`;
						}

						if (textarea.value.match(/^[ ]+$/)) {
							textarea.classList.add("_invalid");
							error++;
							textarea.value = '';
						}

						if (textarea.value.length < 2) {
							textarea.classList.add("_invalid");

							let textInfo = `${textError}`;

							if (textarea.classList.contains("_invalid")) {
								if (textarea.parentElement.querySelectorAll(".field__error").length < 1) {
									const template = `
										<div class="field__error field-error">
											<span class="field-error__icon">!</span>
											<div class="field-error__dropdown">
												${textInfo}
											</div>
										</div>
										`;

									textarea.parentElement.insertAdjacentHTML("beforeEnd", template);
								}
							} else {
								textarea.parentElement.querySelectorAll(".field__error").forEach(error => {
									error.remove()
								});
							}
						} else {
							textarea.classList.remove("_invalid");
						}
					}
				});
				checkboxs.forEach(checkbox => {
					validCheckbox(checkbox)
				});

				const invalids = form.querySelectorAll("._invalid");
				if (invalids.length < 1) {
					error = 0;
				}

				if (error > 0) {
					e.preventDefault();
				}
			}
		});
	}
}
myForms(); // ВАЛИДАЦИЯ ФОРМЫ */

function theme() {
	const htmlBlock = document.documentElement;
	const saveUserTheme = localStorage.getItem("user-theme");

	let userTheme;
	if (window.matchMedia) {
		userTheme = window.matchMedia('prefers-color-scheme: dark').matches ? 'dark' : 'light';
	}
	window.matchMedia('prefers-color-scheme: dark').addEventListener("change", function () {
		!saveUserTheme ? changeTheme() : null;
	});

	const themeButton = document.getElementById("theme-website");
	if (themeButton) {
		themeButton.addEventListener("click", function () {
			changeTheme(true);
		});
	}

	function setThemeClass() {
		if (saveUserTheme) {
			htmlBlock.classList.add(saveUserTheme);
		} else {
			htmlBlock.classList.add(userTheme);
		}
	}
	setThemeClass()

	function changeTheme(saveTheme = false) {
		let currentTheme = htmlBlock.classList.contains("light") ? 'light' : 'dark';
		let newTheme;

		if (currentTheme === 'light') {
			newTheme = 'dark';
		} else if (currentTheme === 'dark') {
			newTheme = 'light';
		}

		htmlBlock.classList.remove(currentTheme);
		htmlBlock.classList.add(newTheme);
		saveTheme ? localStorage.setItem("user-theme", newTheme) : null;
	}
}
theme(); // СМЕНА ТЕМЫ САЙТА

const checkGet = get("lang");

if (checkGet === null) {
} else {
	document.querySelector("[data-select-button]").innerHTML = get("lang");
}

const selects = document.querySelectorAll("[data-select]");

selects.forEach((select) => {
	select.addEventListener("click", function (e) {
		const elementTarget = e.target;

		if (isMobile.any() && elementTarget.closest("[data-select-button]")) {
			select.querySelector("[data-select-button]").classList.toggle("_active");
			select.querySelector("[data-select-dropdown]").classList.toggle("_active");
		}

		if (elementTarget.closest("[data-select-item]")) {
			const innerText = elementTarget.closest("[data-select-item]").innerHTML;

			save("lang", innerText);

			select.querySelector("[data-select-button]").innerHTML = innerText;
			select.querySelector("[data-select-button]").classList.remove("_active");
			select.querySelector("[data-select-dropdown]").classList.remove("_active");
		}
	});
	select.addEventListener("mouseenter", function (e) {
		const elementTarget = e.target;

		if (!isMobile.any() && elementTarget === select) {
			select.querySelector("[data-select-dropdown]").classList.add("_active");
		}
	});
	select.addEventListener("mouseleave", function (e) {
		const elementTarget = e.target;

		if (!isMobile.any() && elementTarget === select) {
			select.querySelector("[data-select-dropdown]").classList.remove("_active");
		}
	});
	document.addEventListener("click", function (e) {
		const elementTarget = e.target;

		if (isMobile.any() && !elementTarget.closest("[data-select-button]") && !elementTarget.closest("[data-select-dropdown]")) {
			const selects = document.querySelectorAll("[data-select]");

			selects.forEach((select) => {
				select.querySelector("[data-select-dropdown]").classList.remove("_active");
			});
		}
	});
});; // КАСТОМНЫЙ СЕЛЕКТ

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

const promptButtons = document.querySelectorAll("[data-prompt-button]");
promptButtons.forEach(button => {
	document.addEventListener("click", function (e) {
		const elementTarget = e.target;

		if (isMobile.any()) {
			if (!button.nextElementSibling.classList.contains("_active")) {
				if (elementTarget == button) {
					elementTarget.classList.add("_active");
					button.nextElementSibling.classList.add("_active");
				}
			} else {
				button.classList.remove("_active");
				button.nextElementSibling.classList.remove("_active");

				if (elementTarget != button) {
					button.classList.remove("_active");
					button.nextElementSibling.classList.remove("_active");
				}
			}
		}
	});
});

function timer() {
	let time = 14400 - 1; // ЗНАЧЕНИЕ ТАЙМЕРА В СЕКУНДАХ
	setInterval(counterTimer, 1000);

	const hoursItem = document.getElementById("hours");
	const minutesItem = document.getElementById("minutes");
	const secondsItem = document.getElementById("seconds");

	function counterTimer() {
		if (time === 0) {
			time = 14400 - 1;
		}

		let hours = Math.floor(time / 60 / 60);
		let minutes = Math.floor(time / 60) - (hours * 60);
		let seconds = Math.floor(time % 60);

		hours = hours < 10 ? "0" + hours : hours;
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		hoursItem.innerHTML = `${hours}`;
		minutesItem.innerHTML = `${minutes}`;
		secondsItem.innerHTML = `${seconds}`;

		time--;
	}
}
timer()