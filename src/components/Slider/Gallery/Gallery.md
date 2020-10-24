---
name: Gallery
menu: Components
route: /components/gallery
---

import { Playground, Props } from 'docz'
import Gallery from './index.tsx'

# Gallery

<Props of={Gallery} />

## Screenshot

![Gallery](https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/galleryView.png?raw=true)

## Basic usage

<Playground>
    <Gallery
        Feed={[{url:"https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/slider1.jpg?raw=true"},{url:"https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/slider2.jpg?raw=true"}]}
        CloseGallery={()=>{}}
        index={1}
        alt="نام تصویر" 
        /> 
</Playground>
