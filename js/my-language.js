function mySelect() {
	const checkGet = get("lang");

	if (checkGet === null) {
	} else {
		function getSetLang() {
			document.querySelectorAll("[data-select-lang]").forEach(buttonLang => {
				buttonLang.innerHTML = get("lang");
			});
		}
		getSetLang()
		window.addEventListener("resize", getSetLang);
	}

	const selects = document.querySelectorAll("[data-select]");

	selects.forEach((select) => {
		const buttonToggle = select.querySelector("[data-select-button]");
		const dropdownToggle = select.querySelector("[data-select-dropdown]");

		select.addEventListener("click", function (e) {
			const elementTarget = e.target;

			if (isMobile.any() && elementTarget.closest("[data-select-button]")) {
				buttonToggle.classList.toggle("_active");
				dropdownToggle.classList.toggle("_active");
			}

			if (elementTarget.closest("[data-select-item]")) {
				const innerText = elementTarget.closest("[data-select-item]").innerHTML;

				save("lang", innerText);

				buttonToggle.classList.remove("_active");
				dropdownToggle.classList.remove("_active");
			}
		});
		select.addEventListener("mouseenter", function (e) {
			const elementTarget = e.target;

			if (!isMobile.any() && elementTarget === select) {
				dropdownToggle.classList.add("_active");
			}
		});
		select.addEventListener("mouseleave", function (e) {
			const elementTarget = e.target;

			if (!isMobile.any() && elementTarget === select) {
				dropdownToggle.classList.remove("_active");
			}
		});
		document.addEventListener("click", function (e) {
			const elementTarget = e.target;

			if (window.innerWidth > 552.2 && !elementTarget.closest("[data-select-button]") && !elementTarget.closest("[data-select-dropdown]")) {
				const selects = document.querySelectorAll("[data-select]");

				selects.forEach((select) => {
					select.querySelector("[data-select-dropdown]").classList.remove("_active");
				});
			}
		});
	});
}
mySelect();

const valueLanguageItem = document.querySelector("[data-language-change]");
const whatLang = valueLanguageItem.getAttribute("id").replace("e-lang-", "");

window.addEventListener("load", setLang.bind(null, whatLang));

function setLang(changeLang) {
	let p;
	if (!langArr.hasOwnProperty(changeLang)) return;
	if (window.hasOwnProperty('localStorage'))
		window.localStorage.setItem('changeLang', changeLang);
	for (p in langArr[changeLang]) {
		document.getElementById(p).innerText = langArr[changeLang][p];
	}
}
var changeLang = (window.hasOwnProperty('localStorage') && window.localStorage.getItem('changeLang', changeLang)) || 'en';
setLang(changeLang);

const buttonsLanguage = document.querySelectorAll("[data-select-item]");
buttonsLanguage.forEach(button => {
	button.addEventListener("click", () => {
		location.reload();
	});
});