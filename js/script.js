let setTimer = 14399; // СМЕНА ТАЙМЕРА В СЕКУНДАХ
let timePreloader = 1000; // СМЕНА СКОРОСТИ ПРЕЛОУДЕРА
let durationCounter = 800; // СМЕНА СКОРОСТИ СЧЕТЧИКА В МИЛЛИСЕКУНДАХ (1 СЕКУНДА = 1000 МИЛЕСЕКУНД)
let animationSpollers = 300; // СМЕНА СКОРОСТИ АНИМАЦИИ СПОЙЛЕРА

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
		const digitsLoad = document.querySelectorAll(".info-row-balance__load");
		digitsLoad.forEach(load => {
			load.style.display = "none";
		});
		const digits = document.querySelectorAll(".info-row-balance__price-item");
		digits.forEach(digit => {
			digit.style.display = "inline";
		});

		function digitsCounterInit(digitsCountersItems) {
			let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
			if (digitsCounters) {
				digitsCounters.forEach(digitsCounter => {
					digitsCounterAnimate(digitsCounter)
				});
			}
		}

		function digitsCounterAnimate(digitsCounter) {
			let startTimestamp = null;
			let duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : durationCounter;
			const startValue = parseInt(digitsCounter.innerHTML);
			const startPosition = 0;
			const step = (timestamp) => {
				if (!startTimestamp) startTimestamp = timestamp;
				let progress = Math.min((timestamp - startTimestamp) / duration, 1);
				const counterInner = Math.floor(progress * (startPosition + startValue));
				let newDuration;

				if (progress < 0.30) {
					newDuration = duration + 14.5;
					duration = newDuration;
				}

				if (progress > 0.95) {
					newDuration = duration + 12.5;
					duration = newDuration;
				}

				digitsCounter.innerHTML = counterInner;
				if (progress < 1) {
					window.requestAnimationFrame(step);
				}
			}
			window.requestAnimationFrame(step);
		}

		digitsCounterInit()
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