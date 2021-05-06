window.onload = function () {
    let a = 1, b = 2, c = new Set()
    c.add('a')
    c.add(1)
    c.add(a)
    c.add(b)
    console.log(a, b, c);
}