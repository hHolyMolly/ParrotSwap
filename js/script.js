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

function theme() {
	const htmlBlock = document.documentElement;
	const saveUserTheme = localStorage.getItem("user-theme");

	let userTheme;
	if (window.matchMedia) {
		userTheme = window ? 'light' : 'dark';
	}
	window.addEventListener("change", function () {
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
	const prompts = document.querySelectorAll("[data-prompt]");
	prompts.forEach((prompt) => {
		prompt.addEventListener("click", function (e) {
			const elementTarget = e.target;

			if (isMobile.any()) {
				prompts.forEach(prompt => {
					prompt.querySelector("[data-prompt-button]").classList.remove("_active");
					prompt.querySelector(".info-row-prompt__dropdown").classList.remove("_active");
				});

				if (elementTarget.closest("[data-prompt-button]")) {
					prompt.querySelector("[data-prompt-button]").classList.toggle("_active");
					prompt.querySelector(".info-row-prompt__dropdown").classList.toggle("_active");
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
myDepositValue();