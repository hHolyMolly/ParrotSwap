let setTimer = 14399; // СМЕНА ТАЙМЕРА В СЕКУНДАХ
let timePreloader = 1000; // СМЕНА СКОРОСТИ ПРЕЛОУДЕРА
let durationCounter = 800; // СМЕНА СКОРОСТИ СЧЕТЧИКА В МИЛЛИСЕКУНДАХ (1 СЕКУНДА = 1000 МИЛЕСЕКУНД)

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
window.addEventListener("load", myPopups);; // ПОПАПЫ

function myBurger() {
	const burgerOpen = document.getElementById("menu-open");
	const burgerContent = document.getElementById("menu-content");
	const burgerWrap = document.getElementById("menu-wrapper");

	let unlock = true;
	const time = 600;

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
}
myBurger(); // МЕНЮ БУРГЕР

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
	const promptButtons = document.querySelectorAll("[data-prompt-button]");
	if (promptButtons.length > 0) {
		promptButtons.forEach(button => {
			document.addEventListener("click", function (e) {
				const elementTarget = e.target;

				function addClassPrompt() {
					elementTarget.classList.add("_active");
					button.nextElementSibling.classList.add("_active");
				}
				function removeClassPrompt() {
					button.classList.remove("_active");
					button.nextElementSibling.classList.remove("_active");
				}

				if (isMobile.any()) {
					if (!button.nextElementSibling.classList.contains("_active")) {
						if (elementTarget === button) {
							addClassPrompt()
						}
					} else {
						const promptLinks = button.nextElementSibling.querySelectorAll("a");
						promptLinks.forEach(link => {
							if (elementTarget === button.nextElementSibling || elementTarget === link) {
							} else {
								removeClassPrompt()
							}
							if (elementTarget === button) {
								removeClassPrompt()
							}
						});
					}
				}
			});
		});
	}
}
prompts();

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
setTimeout(timer, timePreloader);

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
setTimeout(loadsDigits, timePreloader);