export default class Section {
    // У класса Section нет своей разметки.
    // Он получает разметку через функцию-колбэк и вставляет её в контейнер.
    constructor({items, renderer}, containerSelector) {
        this._items = items; // это массив данных, которые нужно добавить на страницу при инициализации класса
        this._renderer = renderer; // отвечает за создание и отрисовку данных на странице.
        this._containerSelector = containerSelector;
        this._container = document.querySelector(containerSelector);
    }

    setItems(items) {
        this._items = items;
    }

    renderItems() {
        // Содержит публичный метод, который отвечает за отрисовку всех элементов.
        // Отрисовка каждого отдельного элемента должна осуществляться функцией renderer
        this._items.forEach((item) => {
            const newElement = this._renderer(item); // получаем элемент
            this._container.append(newElement); // добавляем в разметку
        });
    }

    addItem(item) {
        // Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
        this._container.prepend(item);
    }
 }