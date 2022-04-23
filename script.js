function findCollections() {
    var settings = {
        "url": "./list.json",
        "method": "GET",
        "timeout": 0
    };
    
    $.ajax(settings).done(function (response) {
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
                        <div class="button" style="width: calc(100% - 10px)" onclick="openCollection(${key})">Ouvrir la collection</div>
                        <div class="button" onclick="addElement(${key})">Ajouter</div>
                    </div>
                    <div id="collection${key}" class="globalElement detailElement">
                        ${sonElement}
                    </div>
                </div>
            `)
        }); 
    });
}

findCollections()

function openCollection(key) {
    $(`#collection${key}`).css('display', 'flex');
}

function generate() {
    const general = $('.generalElement');
    const myJson = [];
    for (let index = 0; index < general.length; index++) {
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
    $('.result').text(JSON.stringify(myJson))
}

function addElement(key) {
    const totalElement = $(`#collection${key}`).children('.subGlobalElement');
    const countElement = totalElement.length + 1;
    $(`#collection${key}`).append(`
        <div class="subGlobalElement" index="${countElement}">
            <input placeholder="name" name="name" value="" idCollection="${countElement}"/>
            <input placeholder="desc" name="desc" idCollection="${countElement}"/>
            <input placeholder="subDesc" name="subDesc" idCollection="${countElement}"/>
            <input placeholder="cote" name="cote" idCollection="${countElement}"/>
            <input placeholder="provenance" name="provenance" idCollection="${countElement}"/>
            <input placeholder="url" name="url" idCollection="${countElement}"/>
            <input placeholder="img" name="img" idCollection="${countElement}"/>
            <div class="buttonDelete" onclick="deleteElement(${key}, ${countElement})">Supprimer</div>
        </div>
    `)
}

function deleteElement(key, index) {
    const newIndex = index;
    $(`#collection${key} .subGlobalElement[index="${newIndex}"]`).remove();
}