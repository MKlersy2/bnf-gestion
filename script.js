function findCollections() {
    var settings = {
        "url": "./list.json",
        "method": "GET",
        "timeout": 0
    };
    
    $.ajax(settings).done(function (response) {
        const cred = response.slice(-1)[0];
        console.log(cred)
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
                <label for="credits">Ligne de crédits</label>
                <input placeholder="Crédits" value="${cred.credits}" name="credits"/>
            </div>
        `)
    });
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
    myJson.push({"credits": $('input[name="credits"]').val()});
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