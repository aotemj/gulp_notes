window.onload = function () {
    let a = 1, b = 2, c = new Set()
    c.add('a')
    c.add(1)
    c.add(a)
    c?.add(b)
    console.log(a, b, c);

    const xhr = new XMLHttpRequest()
    xhr.open('get', '/gx?include_fields=top_comments%2Cis_root%2Csource_link%2Citem%2Cbuyable%2Croot_id%2Cstatus%2Clike_count%2Csender%2Calbum%2Creply_count&filter_id=%E6%A4%8D%E7%89%A9%E5%A4%9A%E8%82%89&start=24&_=1620359741375')
    xhr.send();
    xhr.onload = function (res) {
        console.log('onload');
        console.log(JSON.parse(res.currentTarget.responseText));
    }
}