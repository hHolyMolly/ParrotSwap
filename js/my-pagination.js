const mains = document.querySelectorAll("[data-main]");
mains.forEach((main) => {
	function dublicateSecond(att, CONFIG) {
		const contentsLength = main.querySelectorAll("[data-content]").length;
		const min = Number(att) - 1;
		const max = Number(att) + (CONFIG - 2);

		const add = CONFIG - 2;
		const dangerZone = contentsLength - add;

		return {
			contentsLength,
			min,
			max,
			add,
			dangerZone
		};
	}

	function dublicateThird() {
		const activeContent = Number(
			main.querySelector("[data-content]._active").getAttribute("data-content")
		);
		const lastContent = main.querySelectorAll("[data-content]").length;

		if (activeContent === 1) {
			main.querySelector("[data-left]").classList.add("_disabled");
		} else {
			main.querySelector("[data-left]").classList.remove("_disabled");
		}
		if (activeContent === lastContent) {
			main.querySelector("[data-right]").classList.add("_disabled");
		} else {
			main.querySelector("[data-right]").classList.remove("_disabled");
		}
	}

	function dublicateFourth(min, max) {
		dublicateFourth(min, max);
	}

	function sorting() {
		const sorting = Number(
			main.querySelector("[data-sorting]").getAttribute("data-sorting")
		);

		let order = 1;

		const blocks = main.querySelectorAll("[data-block]");
		const zone = main.querySelector("[data-content-zone]");

		for (const block of blocks) {
			const lengthFree = main.querySelector("[data-free-content]").querySelectorAll("[data-block]").length;

			if (lengthFree === sorting) {
				order++;

				main.querySelector("[data-free-content]").removeAttribute("data-free-content");

				const copy = `
      <div class="statistics-column__content-item" data-content="${order}" data-free-content>
      </div>
      `;

				zone.insertAdjacentHTML("beforeend", copy);
			}

			const zoneFree = main.querySelector("[data-free-content]");
			zoneFree.appendChild(block);
		}
	}
	sorting();

	function pagination() {
		let CONFIG = Number(
			main.querySelector("[data-pagination]").getAttribute("data-pagination")
		);

		const contents = main.querySelectorAll("[data-content]");
		const contentsLength = main.querySelectorAll("[data-content]").length;

		contents.forEach(() => {
			const lengthBtn = main.querySelectorAll("[data-btn]").length;

			const order = lengthBtn + 1;

			const billet = main.querySelector("[data-billet]");
			const copy = billet.cloneNode();
			copy.removeAttribute("data-billet");
			copy.setAttribute("data-btn", `${order}`);
			copy.innerHTML = order;

			const zone = main.querySelector("[data-btns]");
			zone.appendChild(copy);
		});


		const firstBtn = main.querySelector("[data-btn]");
		firstBtn.classList.add("_active");
		firstBtn.setAttribute("data-arrows", "");

		//клик по кнопке
		main.addEventListener("click", (event) => {
			if (event.target.closest("[data-btn]")) {
				const att = event.target.getAttribute("data-btn");
				const modAtt = `[data-content="${att}"]`;

				main.querySelector(modAtt).classList.add("_active");
				event.target.classList.add("_active");
				//стрелки
				event.target.setAttribute("data-arrows", "");

				// контент
				const contents = main.querySelectorAll("[data-content]");
				contents.forEach((content) => {
					if (content.getAttribute("data-content") === att) {
					} else {
						content.classList.remove("_active");
					}
				});
				// кнопки
				const checkBtns = main.querySelectorAll("[data-btn]");
				checkBtns.forEach((checkBtn) => {
					if (checkBtn.getAttribute("data-btn") === att) {
					} else {
						checkBtn.classList.remove("_active");
						//стрелки
						checkBtn.removeAttribute("data-arrows");
					}
				});

				const min = dublicateSecond(att, CONFIG).min;
				const max = dublicateSecond(att, CONFIG).max;

				const dangerZone = dublicateSecond(att, CONFIG).dangerZone;

				if (Number(event.target.getAttribute("data-btn")) > dangerZone) {

					const btns = main.querySelectorAll("[data-btn]");
					btns.forEach((btn) => {
						const minLength =
							Number(main.querySelectorAll("[data-content]").length) - CONFIG;

						if (Number(btn.getAttribute("data-btn")) > minLength) {
							btn.classList.add("_visible");
						} else {
							btn.classList.remove("_visible");
						}
					});
				} else {
					if (Number(event.target.getAttribute("data-btn")) === 1) {
					} else {
						//нормальная зона, показать основные цифры на основе клика
						const btns = main.querySelectorAll("[data-btn]");
						btns.forEach((btn) => {
							if (
								Number(btn.getAttribute("data-btn")) >= min &&
								btn.getAttribute("data-btn") <= max
							) {
								btn.classList.add("_visible");
							} else {
								btn.classList.remove("_visible");
							}
						});
					}
				}

				dublicateThird();
			}

			function dublicateFirst() {
				const arrows = main.querySelector("[data-arrows]");
				arrows.classList.remove("_active");
				arrows.removeAttribute("data-arrows");
				return arrows;
			}

			if (event.target.closest("[data-right]")) {
				const checkArrows = main.querySelector("[data-arrows]");
				if (Number(checkArrows.getAttribute("data-btn")) === contentsLength) {
				} else {
					const arrows = dublicateFirst();

					arrows.nextElementSibling.classList.add("_active");
					arrows.nextElementSibling.setAttribute("data-arrows", "");

					const targetElement = arrows.nextElementSibling;

					const att = targetElement.getAttribute("data-btn");
					const modAtt = `[data-content="${att}"]`;

					main.querySelector(modAtt).classList.add("_active");

					const contents = main.querySelectorAll("[data-content]");
					contents.forEach((content) => {
						if (content.getAttribute("data-content") === att) {
						} else {
							content.classList.remove("_active");
						}
					});

					const min = dublicateSecond(att, CONFIG).min;
					const max = dublicateSecond(att, CONFIG).max;

					const dangerZone = dublicateSecond(att, CONFIG).dangerZone;
					if (Number(targetElement.getAttribute("data-btn")) > dangerZone) {
						const btns = main.querySelectorAll("[data-btn]");
						btns.forEach((btn) => {
							const minLength =
								Number(main.querySelectorAll("[data-content]").length) - CONFIG;

							if (Number(btn.getAttribute("data-btn")) > minLength) {
								btn.classList.add("_visible");
							} else {
								btn.classList.remove("_visible");
							}
						});
					} else {
						const btns = main.querySelectorAll("[data-btn]");
						btns.forEach((btn) => {
							if (
								Number(btn.getAttribute("data-btn")) >= min &&
								btn.getAttribute("data-btn") <= max
							) {
								btn.classList.add("_visible");
							} else {
								btn.classList.remove("_visible");
							}
						});
					}
				}

				dublicateThird();
			}

			if (event.target.closest("[data-left]")) {
				const checkArrows = main.querySelector("[data-arrows]");

				if (
					Number(checkArrows.getAttribute("data-btn")) === 1 ||
					Number(checkArrows.getAttribute("data-btn")) === 2
				) {
					if (Number(checkArrows.getAttribute("data-btn")) === 2) {
						const arrows = dublicateFirst();

						arrows.previousElementSibling.classList.add("_active");
						arrows.previousElementSibling.setAttribute("data-arrows", "");

						const contents = main.querySelectorAll("[data-content]");
						contents.forEach((content) => {
							if (content.getAttribute("data-content") === "1") {
								content.classList.add("_active");
							} else {
								content.classList.remove("_active");
							}
						});
					}
				} else {
					const arrows = dublicateFirst();

					arrows.previousElementSibling.classList.add("_active");
					arrows.previousElementSibling.setAttribute("data-arrows", "");

					const targetElement = arrows.previousElementSibling;
					const att = targetElement.getAttribute("data-btn");
					const modAtt = `[data-content="${att}"]`;

					main.querySelector(modAtt).classList.add("_active");

					const contents = main.querySelectorAll("[data-content]");
					contents.forEach((content) => {
						if (content.getAttribute("data-content") === att) {
						} else {
							content.classList.remove("_active");
						}
					});

					const min = dublicateSecond(att, CONFIG).min;
					const max = dublicateSecond(att, CONFIG).max;

					const dangerZone = dublicateSecond(att, CONFIG).dangerZone;

					if (Number(targetElement.getAttribute("data-btn")) > dangerZone) {
					} else {
						dublicateFourth(min, max);
					}
				}

				dublicateThird();
			}
		});

		const btns = main.querySelectorAll("[data-btn]");
		btns.forEach((btn) => {
			if (Number(btn.getAttribute("data-btn")) <= CONFIG) {
				btn.classList.add("_visible");
			}
		});
	}
	pagination();

	dublicateThird();
});
