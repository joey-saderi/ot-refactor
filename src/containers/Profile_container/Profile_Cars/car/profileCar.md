---
name: Profile Car
menu: Containers
route: /components/profileCar
---

import { Playground, Props } from 'docz'
import Profilecar from './index.tsx'

# Profile Car

<Props of={Profilecar} />

## Screenshot

![Profilecar](https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/profile%20car%20cart.jpg?raw=true)

## Basic usage

<Playground>
    <Profilecar
        key={1}
        data={{
            id:1,
            setIs_out_of_service:true, 
            media_set:[{
                thumbnail_url:"https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/slider1.jpg?raw=true",
                thumbnail_width:300,
                thumbnail_height:300
            }],
            car: {
                brand:{name:{fa:"نام برند"}},
                name:{fa:"نام مدل"}
            },
            year:{
                name:{
                    fa:1399
                }
            }, 
        }}
        is_mine={true}
        getListAgain={() => {}}
    /> 
</Playground>
