DAGallery
===

Dagallery or DeviantArt Gallery plugin is a **simple** straight forward and **easy-to-integrate** script driven by js.  
The script will pull a set amount of images from a DeviantArt gallery with a maximum of **60** images.  

This project is not possible without the giant help from [Tschrock!](https://github.com/Tschrock)

Usage
---
1 - Insert onboard stylesheet into the `<head>`
```html
<head>
  ...
  <link rel="stylesheet" type="text/css" href="dagallery.css" />
</head>
```  
_note: Mostly for demonstration purposes, this will just make things looks basic and tidy. For this case it's just a simple `display: grid` box. You can use any other methods you want!_  

2 - Put the script link at the bottom of the html **before** the `</body>` closing
```html
<body>
  
  ...

    <script src="dagallery.js"></script>
</body>
```  
  
  
  
	
3 - Add the following element to a place where you want the gallery to be
```html
<div class="gridbox" data-da-gallery="daUsername/daGalleryId"></div>
```  
  
    
      
      
4 - Fill in your username and the desired gallery id on the `data-da-gallery`
To find your gallery id, visit your page and open up "Gallery"
![image](https://user-images.githubusercontent.com/39096741/169669799-7b64dd21-e78f-4f73-9853-84565dcdd337.png)  
Open up one of your gallery and look over to the URL in the address bar  
![image](https://user-images.githubusercontent.com/39096741/169669826-65971f52-0f04-469a-bdee-972bbb6d1c83.png)
![image](https://user-images.githubusercontent.com/39096741/169669972-6ec67b0d-87f0-427b-a9ea-975adefe880f.png)  
  
How it should look:
```html
<div class="gridbox" data-da-gallery="imasuser/12345678"></div>
```  
  
    
    
Additional note
---
You can customize how many images to pull by directly editing `&limit= ...` in the `window.daGallery` url constant.  
By default it is set to 10.
```js
    window.daGallery = function (element, username, galleryId) {
        //CHANGE THE AMOUNT OF IMAGES TO DISPLAY BY CHANGING $limit=<num>
        //IMAGE LIMIT IS 60
        const url = `https://backend.deviantart.com/rss.xml?q=gallery:${username}/${galleryId}&limit=10`
        getFeedImages(url).then(images => {
            const fragment = document.createDocumentFragment()
            for (const image of images) {
                const img = new Image()
                //You can change the template of what the script will inject into DOM here. Feel free to customize!
                img.setAttribute('style', 'position: relative; max-width:100%; overflow: hidden;')
                img.src = image.imageUrl
                img.alt = image.title
                fragment.append(img)
            }
            element.replaceChildren(fragment)
        })
    }
```
