
const htmlBlock = document.documentElement;
const saveUserTheme = localStorage.getItem("user-theme");

let userTheme = 'light';

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
