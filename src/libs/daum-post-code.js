import Vue from 'vue'

function loadScript (url, charset) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = url
        script.setAttribute('charset', charset)
        script.onload = resolve
        script.onerror = reject
        document.body.appendChild(script)
    })
}

function removeScript (url) {
    const scripts = document.getElementsByTagName('script')
    for (let i = scripts.length - 1; i >= 0; i--) {
        if (scripts[i].src === url) {
            scripts[i].parentNode.removeChild(scripts[i])
        }
    }
}

const daumPostCode = {
    install () {
        Vue.prototype.$_loadDaumPostCode = () => {
            loadScript('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js', 'uft-8')
                .then(() => {
                    console.log('loaded postcode.v2.js')
                    Vue.prototype.$_daum = window.daum
                })
                .catch(err => {
                    console.error(err.message)
                })
        }

        Vue.prototype.$_unloadDaumPostCode = () => {
            removeScript('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js')
            console.log('unloaded postcode.v2.js')
        }
    }
}

export default daumPostCode
