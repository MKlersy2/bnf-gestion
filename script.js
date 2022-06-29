function findCollections() {
    var settings = {
        "url": "./list.json",
        "method": "GET",
        "timeout": 0
    };
    
    $.ajax(settings).done(function (response) {
        const cred = response.slice(-1)[0];
        response = response.slice(0, -1);
        response.forEach((element, key) => {
            const listeSons = element.sons;
            var sonElement = '';
            listeSons.forEach((son, index) => {
                sonElement += `
                <div class="subGlobalElement" index="${index}">
                    <input placeholder="name" name="name" value="${son.name}" idCollection="${index}"/>
                    <input placeholder="desc" name="desc" value="${son.desc}" idCollection="${index}"/>
                    <input placeholder="subDesc" name="subDesc" value="${son.subDesc}" idCollection="${index}"/>
                    <input placeholder="cote" name="cote" value="${son.cote}" idCollection="${index}"/>
                    <input placeholder="provenance" name="provenance" value="${son.provenance}" idCollection="${index}"/>
                    <input placeholder="url" name="url" value="${son.url}" idCollection="${index}"/>
                    <input placeholder="img" name="img" value="${son.img}" idCollection="${index}"/>
                    <div class="buttonDelete" onclick="deleteElement(${key}, ${index})">Supprimer</div>
                </div>
                `
            })
            $('.subGlobal').append(`
                <div class="generalElement">
                    <div class="globalElement nameElement">
                        <input placeholder="name" value="${element.name}" name="name"/>
                        <input placeholder="img" value="${element.img}" name="img"/>
                    </div>
                    <div style="display:flex;">
                        <div class="button" style="width: 75%;margin-right:10px;" onclick="openCollection(${key})">Ouvrir la collection</div>
                        <div class="button addElementButton" onclick="addElement(${key})">Ajouter un extrait</div>
                    </div>
                    <div id="collection${key}" class="globalElement detailElement">
                        ${sonElement}
                    </div>
                </div>
            `)
        }); 
        $('.subGlobal').append(`
            <div class="generalElement">
                <label for="credits">Boutton pour crédits</label>
                <input placeholder="Crédits" value="${cred.credits}" name="credits"/>
            </div>
        `);

        cred.details.forEach((elem, index) => {
            console.log(elem, index)
            $('.subGlobal').append('<div class="topGeneralElementCredit" id="'+index+'" style="width:100%"><div class="creditTopGlobal"></div></div>');
            console.log($('.topGeneralElementCredit'))
            $('.topGeneralElementCredit#' + index + ' .creditTopGlobal').append(`
                <div class="subGeneralElement titleCred">
                    <label for="titleCred">Titre</label>
                    <input placeholder="Crédits" value="${elem.title}" name="titleCred"/>
                </div>
            `);
            elem.content.forEach((subElem, subIndex) => {
                $('.topGeneralElementCredit#' + index + ' .creditTopGlobal').append(`
                    <div class="generalElementCredit">
                        <div class="deleteElementCredit">
                            Supprimer
                        </div>
                        <div class="subGeneralElement">
                            <label for="subTitleCred">Titre paragraphe</label>
                            <input placeholder="Direction du département des éditions" value="${subElem.title}" name="subTitleCred"/>
                        </div>
                        <div class="subGeneralElement">
                            <label for="subDescCred">Description paragraphe</label>
                            <input placeholder="Benjamin Arranger" value="${subElem.desc}" name="subDescCred"/>
                        </div>
                    </div>
                `);
                if(elem.content.length - 1 == subIndex) {
                    $('.topGeneralElementCredit#' + index).append(`
                        <div class="button" onclick="addParagraphe(${index})">
                            Ajouter une ligne
                        </div>
                    `);
                }
            });
            // if(elem.logo.length !== 0) {
                $('.topGeneralElementCredit#' + index).append(`
                    <h3>Logo</h3>
                    <div class="logoTopGlobal" style="width:100%"></div>
                `)
            // }
            elem.logo.forEach((subElem, subIndex) => {
                $('.topGeneralElementCredit#' + index + " .logoTopGlobal").append(`
                    <div class="generalElementCredit">
                        <div class="deleteElementCredit">
                            Supprimer
                        </div>
                        <div class="subGeneralElement">
                            <label for="urlLogo">Nom du logo</label>
                            <input placeholder="bnfLogo.png" value="${subElem.url}" name="urlLogo"/>
                        </div>
                        <div class="subGeneralElement">
                            <label for="widthLogo">Largeur du logo</label>
                            <input placeholder="130" value="${subElem.width}" name="widthLogo"/>
                        </div>
                        <div class="subGeneralElement">
                            <label for="heightLogo">Hauteur du logo</label>
                            <input placeholder="48" value="${subElem.height}" name="heightLogo"/>
                        </div>
                    </div>
                `);
                if(elem.logo.length - 1 == subIndex) {
                    $('.topGeneralElementCredit#' + index).append(`
                        <div class="button" onclick="addLogo(${index})">
                            Ajouter un logo
                        </div>
                    `);
                }
            })
            if(elem.logo.length == 0) {
                $('.topGeneralElementCredit#' + index + ' .logoTopGlobal').append(`
                    <div class="button" onclick="addLogo(${index})">
                        Ajouter un logo
                    </div>
                `);
            }
        })
        const deleteButton = document.querySelectorAll('.deleteElementCredit');
        deleteButton.forEach((elem, i) => {
            elem.addEventListener('click', function(e) {
                console.log(e)
                e.target.removeEventListener('click', function() {})
                const element = e.target.parentElement;
                element.parentElement.removeChild(element)
            }, false)
        })
    });
}

function addLogo(index) {
    $('.topGeneralElementCredit#' + index + " .logoTopGlobal").append(`
    <div class="generalElementCredit">
        <div class="deleteElementCredit">
            Supprimer
        </div>
        <div class="subGeneralElement">
            <label for="urlLogo">Nom du logo</label>
            <input placeholder="bnfLogo.png" name="urlLogo"/>
        </div>
        <div class="subGeneralElement">
            <label for="widthLogo">Largeur du logo</label>
            <input placeholder="130" name="widthLogo"/>
        </div>
        <div class="subGeneralElement">
            <label for="heightLogo">Hauteur du logo</label>
            <input placeholder="48" name="heightLogo"/>
        </div>
    </div>
`);
const deleteButton = document.querySelectorAll('.deleteElementCredit');
deleteButton.forEach((elem, i) => {
    elem.addEventListener('click', function(e) {
        e.target.removeEventListener('click', () => {})
        const element = e.target.parentElement;
        element.parentElement.removeChild(element)
    })
}, false)
}

function addParagraphe(index) {
    $('.topGeneralElementCredit#' + index + ' .creditTopGlobal').append(`
        <div class="generalElementCredit">
            <div class="deleteElementCredit">
                Supprimer
            </div>
            <div class="subGeneralElement">
                <label for="subTitleCred">Titre paragraphe</label>
                <input placeholder="Direction du département des éditions" name="subTitleCred"/>
            </div>
            <div class="subGeneralElement">
                <label for="subDescCred">Description paragraphe</label>
                <input placeholder="Benjamin Arranger" name="subDescCred"/>
            </div>
        </div>
    `);
    const deleteButton = document.querySelectorAll('.deleteElementCredit');
    deleteButton.forEach((elem, i) => {
        elem.addEventListener('click', function(e) {
            e.target.removeEventListener('click', () => {})
            const element = e.target.parentElement;
            element.parentElement.removeChild(element)
        })
    }, false)
}

findCollections()

let oldCollection = '';

function openCollection(key, actual) {
    if(actual == 'actual' && key == oldCollection && oldCollection !== '') {
    } else {
        $(`#collection${key}`).css('display', 'flex');
        $(`[onclick="openCollection(${key})"]`).html('Fermer la collection');
        $(`#collection${oldCollection}`).css('display', 'none');    
        $(`[onclick="openCollection(${oldCollection})"]`).html('Ouvrir la collection');
        if(oldCollection !== key) {
            oldCollection = key;
        } else {
            oldCollection = '';
        }
    }
}

function generate() {
    const general = $('.generalElement');
    const myJson = [];
    for (let index = 0; index < general.length - 1; index++) {
        const element = general[index];
        const name = $(element).children('.nameElement').children('input[name="name"]').val();
        const img = $(element).children('.nameElement').children('input[name="img"]').val();
        myJson.push(
            {
                "name":name,
                "img":img,
                "reference":index,
                "sons": []
            }
        )
        const subGeneral = $(element).children('.detailElement').children('.subGlobalElement');
        for (let index2 = 0; index2 < subGeneral.length; index2++) {
            const element2 = subGeneral[index2]
            const name = $(element2).children('input[name="name"]').val();
            const desc = $(element2).children('input[name="desc"]').val();
            const subDesc = $(element2).children('input[name="subDesc"]').val();
            const cote = $(element2).children('input[name="cote"]').val();
            const provenance = $(element2).children('input[name="provenance"]').val();
            const url = $(element2).children('input[name="url"]').val();
            const img = $(element2).children('input[name="img"]').val();
            myJson[index]['sons'].push(
                {
                    "name": name,
                    "desc": desc,
                    "subDesc": subDesc,
                    "cote": cote,
                    "provenance": provenance,
                    "url": url,
                    "img": img
                }
            )
        }
    }
    myJson.push(
        {
            "credits": $('input[name="credits"]').val(),
            "details": []
        }
    );
    document.querySelectorAll('.topGeneralElementCredit').forEach((elem, index) => {
        const titre  = $(elem).children('.creditTopGlobal').children('.titleCred').children('input[name=titleCred]').val();
        myJson[myJson.length - 1].details.push({
            "title": titre,
            "content": [],
            "logo": []
        });
        const detailCredit = $(elem).children('.creditTopGlobal').children('.generalElementCredit');
        console.log(detailCredit)
        for(let index2 = 0; index2 < detailCredit.length; index2++) {
            const element = detailCredit[index2];
            const titre = $(element).children('.subGeneralElement').children('input[name="subTitleCred"]').val();
            const desc = $(element).children('.subGeneralElement').children('input[name="subDescCred"]').val();
            myJson[myJson.length - 1].details[index].content.push({
                "title": titre,
                "desc": desc
            });
        }
        const logoCredits = $(elem).children('.logoTopGlobal').children('.generalElementCredit');
        for(let index2 = 0; index2 < logoCredits.length; index2++) {
            const element = logoCredits[index2];
            const url = $(element).children('.subGeneralElement').children('input[name="urlLogo"]').val();
            const width = $(element).children('.subGeneralElement').children('input[name="widthLogo"]').val();
            const height = $(element).children('.subGeneralElement').children('input[name="heightLogo"]').val();
            myJson[myJson.length - 1].details[index].logo.push({
                "url": url,
                "width": width,
                "height": height
            });
        }


    })
    $('.result').text(JSON.stringify(myJson))
    const blob = new Blob([JSON.stringify(myJson)], { type: "text/plain;charset=utf-8" });
    var isIE = false || !!document.documentMode;
    if (isIE) {
        window.navigator.msSaveBlob(blob, "list.json");
    } else {
        var url = window.URL || window.webkitURL;
        link = url.createObjectURL(blob);
        var a = document.createElement("a");
        a.download = "list.json";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

}

function addElement(key) {
    openCollection(key, 'actual');
    const totalElement = $(`#collection${key}`).children('.subGlobalElement');
    const countElement = totalElement.length + 1;
    $(`#collection${key}`).append(`
    <div class="subGlobalElement" index="${countElement}">
    <input placeholder="Nom de l'ouvrage" name="name" value="" idCollection="${countElement}"/>
    <input placeholder="Description" name="desc" idCollection="${countElement}"/>
    <input placeholder="Description complémentaire" name="subDesc" idCollection="${countElement}"/>
    <input placeholder="Cote" name="cote" idCollection="${countElement}"/>
    <input placeholder="Provenance" name="provenance" idCollection="${countElement}"/>
    <input placeholder="Url" name="url" idCollection="${countElement}"/>
    <input placeholder="Image de la collection" name="img" idCollection="${countElement}"/>
    <div class="buttonDelete" onclick="deleteElement(${key}, ${countElement})">Supprimer</div>
    </div>
    `);
    const globalElement = $(`#collection${key}`);
    globalElement.scrollLeft(globalElement.width());
}

function deleteElement(key, index) {
    const newIndex = index;
    $(`#collection${key} .subGlobalElement[index="${newIndex}"]`).remove();
}