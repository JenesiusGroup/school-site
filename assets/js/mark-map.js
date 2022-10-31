
const MAP = document.querySelector("#map-wrap");
const config = [
    {
        x: 54,
        y: 45,
        label: "22 июня 1941 г.",
        text: "Белостокско-Минское сражение — приграничное сражение на центральном участке советско-германского фронта во время Великой Отечественной войны 22 июня — 9 июля 1941 года. В результате сражения основные силы советского Западного фронта оказались в окружении и были разгромлены, большей частью попали в плен. 28 июня немецкие войска взяли Минск.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/The_Battle_of_Bialystok_%28in_Russian_and_German%29_Updated.jpg/413px-The_Battle_of_Bialystok_%28in_Russian_and_German%29_Updated.jpg"
    },
    {
        x: 74,
        y: 54,
        label: "Могилёвская оборона",
        text: "Западный фронт попал под удар наиболее крупной немецкой ГА Центр — его разгромили за неделю. В дыру во фронте хлынули дивизии 1-й и 2-й ТГ Гота и Гудериана. 3 июля начштаба вермахта Гальдер записал: «Не будет преувеличением сказать, что кампания против России выиграна в течение 14 дней». После взятия Минска и разгрома советских сил в Белостокском и Минском котлах немецкие моторизованные корпуса начали продвижение к рубежу рек Западная Двина и Днепр с тем, чтобы оттуда начать новое наступление на Московском направлении. Ключевой точкой на Днепре был Могилев: переправа через реку, автотрасса и ветки железных дорог. Уже 3 июля на дальние подступы к Могилеву вышли передовые и разведывательные отряды немцев.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/%D0%92%D1%8B%D0%B3%D0%BB%D1%8F%D0%B4_%D0%BA%D0%B0%D0%BF%D0%BB%D1%96%D1%86%D1%8B_%D0%B7_%D0%BF%D0%BB%D1%8F%D1%86%D0%BE%D1%9E%D0%BA%D1%96_%D0%B2%D0%B0%D0%B9%D1%81%D0%BA%D0%BE%D0%B2%D0%B0%D0%B9_%D1%82%D1%8D%D1%85%D0%BD%D1%96%D0%BA%D1%96.jpg/1280px-%D0%92%D1%8B%D0%B3%D0%BB%D1%8F%D0%B4_%D0%BA%D0%B0%D0%BF%D0%BB%D1%96%D1%86%D1%8B_%D0%B7_%D0%BF%D0%BB%D1%8F%D1%86%D0%BE%D1%9E%D0%BA%D1%96_%D0%B2%D0%B0%D0%B9%D1%81%D0%BA%D0%BE%D0%B2%D0%B0%D0%B9_%D1%82%D1%8D%D1%85%D0%BD%D1%96%D0%BA%D1%96.jpg"
    },
    {
        x: 47,
        y: 37,
        label: "Хатынь",
        text: "Хаты́нь (возможно, от белор. хата — дом) — деревня в Белоруссии, уничтоженная 22 марта 1943 года карательным отрядом в качестве мести за убийство нескольких немецких военнослужащих[1]. В соответствии с принципом коллективного наказания 149 жителей Хатыни (в том числе 75 детей) были сожжены заживо или расстреляны немецкой армией и вспомогательным полицейским батальоном[2] за возможное оказание жителями деревни помощи партизанам[3]. В карательной операции участвовали 118-й батальон шуцманшафта и особый батальон СС «Дирлевангер»[4]. В 1969 году на месте, где находилась деревня, был открыт мемориальный комплекс. Хатынь стала символом массового уничтожения мирного населения, осуществлявшегося нацистами и коллаборационистами на оккупированной территории СССР.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Khatyn_Memorial%2C_Belarus.jpg/274px-Khatyn_Memorial%2C_Belarus.jpg"
    },
    {
        x: 4,
        y: 82,
        label: "Оборона Брестской крепости",
        text: "Оборона Брестской крепости в ию́не 1941 го́да — оборонительные боевые действия подразделений Рабоче-крестьянской Красной армии (РККА) против наступающих войск нацистской Германии, проходившие в районе Брестской крепости и в черте города Бреста. Является одним из первых сражений Великой Отечественной войны",
        image: "https://upload.wikimedia.org/wikipedia/ru/1/17/Brest-krepost.jpg"
    }

]

function getCircleNode(position) {
    const node = document.createElement('div');

    const args = {
        top: position.top,
        left: position.left,
    }
    Object.assign(node.style, args)
    node.classList.add('map-circle')

    return node;
}

function main(map, config) {
    map.style.position = 'relative';

    const {height, width} = map.getBoundingClientRect();

    config.forEach(item => {

        const circle = getCircleNode({top: height * (item.y / 100), left: width * (item.x / 100)});
        circle.addEventListener('click', () => {
            console.log(item.text, item.image)
            openModal(item)
        })
        map.insertBefore(circle, null)

    })

    initModal()
}

function initModal() {
    const body = document.body;

    const modalWrap = document.createElement('div');
    modalWrap.classList.add('modal-window-wrap');
    modalWrap.id = 'modal-window-wrap'
    modalWrap.addEventListener('click', () => {
        closeModal()
    })


    const modal = (() => {
        let html =
            `
        <div class = "modal-window">
            <h3 class = "modal-window-label" id = "modal-label"></h3>
            <p class = "modal-window-text" id = "modal-text"></p>
            <img class = "modal-window-image" id = "modal-image" src = "" alt = ""/>        
        </div>
            `
        html = html.trim();
        const template = document.createElement('template');
        template.innerHTML = html;
        return template.content.firstChild;

    })()

    modalWrap.appendChild(modal)

    body.insertBefore(modalWrap, null);
    closeModal()

}
function openModal({text, image, label}) {
    document.getElementById('modal-label').textContent = label;
    document.getElementById('modal-text').textContent = text;
    document.getElementById('modal-image').src = image;
    document.getElementById('modal-window-wrap').classList.remove('modal-hidden');
}
function closeModal() {
    document.getElementById('modal-window-wrap').classList.add('modal-hidden');
}


main(MAP, config);