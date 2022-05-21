(() => {

    const getChildTags = (dom, name) => Array.from(dom.children).filter(c => c.tagName === name);
    const getChildTag = (dom, name) => Array.from(dom.children).find(c => c.tagName === name);

    async function getFeedImages(url) {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Failed to get feed: ${response.status}: ${response.statusText}`);
        const feedText = await response.text()
        const feedDocument = new DOMParser().parseFromString(feedText, 'text/xml')
        const feedItems = getChildTags(getChildTag(feedDocument.documentElement, 'channel'), 'item')
        return feedItems.map(item => ({
            title: getChildTag(item, "title").textContent,
            link: getChildTag(item, "link").textContent,
            imageUrl: getChildTag(item, "media:content").getAttribute("url"),
        }))
    }

    window.deviantARTGalleryPlugin = function (element, username, galleryId) {
        //CHANGE THE AMOUNT OF IMAGES TO DISPLAY BY CHANGING $limit=<num>
        //IMAGE LIMIT IS 60
        const url = `https://backend.deviantart.com/rss.xml?q=gallery:${username}/${galleryId}&limit=10`
        getFeedImages(url).then(images => {
            const fragment = document.createDocumentFragment()
            for (const image of images) {
                const img = new Image()
                img.setAttribute('style', 'position: relative; max-width:100%; overflow: hidden;')
                img.src = image.imageUrl
                img.alt = image.title
                fragment.append(img)
            }
            element.replaceChildren(fragment)
        })
    }

    // Convinient data-based init
    window.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-da-gallery]').forEach(e => {
            const data = e.dataset.daGallery.split("/")
            deviantARTGalleryPlugin(e, data[0], data[1])
        })
    })

})()
