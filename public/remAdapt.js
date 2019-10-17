
    let dpr = window.devicePixelRatio
    let meta = document.querySelector('meta[name=viewport]')
    meta.setAttribute('content', `width=device-width,inital-scale=${1/dpr},user-scalable=no`)
    //document.documentElement.style.fontSize = window.innerWidth / 1080 * 100 + 'px'
    document.documentElement.style.fontSize = window.innerWidth / 750 * 100 + 'px'