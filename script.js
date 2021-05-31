(function() {
    // content switching
    "use strict";

    // functions
    const hide = (element, callback) => {
        element.classList.add("hide");
        element.addEventListener(
            "transitionend",
            () => {
                element.classList.add("none");
                callback();
            }, { once: true }
        );
    };

    const unhide = (element) => {
        element.classList.remove("none");
        setTimeout(() => {
            element.classList.remove("hide");
            // allow the element to take its full place on the page before animating the opacity
        }, 20);
    };

    const extractElementsFromArray = (elementArray, tagName) => {
        const list = [];
        elementArray
            .map((e) => e.getElementsByTagName(tagName))
            .forEach((e) => {
                Array.from(e).forEach((e) => {
                    list.push(e);
                });
            });
        return list;
    };

    const changeBgColor = (dark) => {
        const bodyClassList = document.body.classList;
        dark ? bodyClassList.add("dark") : bodyClassList.remove("dark");
    };

    const contents = Array.from(document.getElementsByClassName("content"));
    const buttons = extractElementsFromArray(contents, "button");

    buttons.forEach((button) =>
        button.addEventListener("click", (e) => {
            hide(contents[button.dataset.from], () =>
                unhide(contents[button.dataset.to])
            );

            // if content is danger, change background to dark mode
            changeBgColor(contents[button.dataset.to].classList.contains("danger"));
        })
    );
})();