---
name: Image uploading
menu: Components
route: /components/imageuploader
---

import { Playground, Props } from 'docz'
import ImageUploader from './index.tsx'

# Image Uploading

<Props of={ImageUploader} />

## Screenshot

![ImageUploader](https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/Upload%20image.jpg?raw=true)

## Basic usage

<Playground>
    <ImageUploader
          Upload_image={() => {}}
          error_status={false}
          default_image={[{img:"https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/Count.jpg?raw=true", id:1}]}
          delete_image={() => {}}
        />
</Playground>
