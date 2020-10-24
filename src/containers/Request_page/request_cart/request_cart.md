---
name: Request Cart
menu: Containers
route: /components/request-cart
---

import { Playground, Props } from 'docz'
import Request_cart from './index.tsx'

# Request Cart

<Props of={Request_cart} />

## Screenshot

![Request_cart](https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/Request%20cart.jpg?raw=true)

## Basic usage

<Playground>
<Request_cart 
    data={{
        id:1,
        role:"renter",
        status:{id:"new", name:"در انتظار تایید"},
        renter:{name:"Mr sample", cell:"09000000000"},
        rent_search_dump:{
            car: {
                brand:{name:{fa:"نام برند"}},
                name:{fa:"نام مدل"}
            },
            start_date:"1399/01/01",
            end_date:"1399/01/02",
            no_of_days:1,
            discounted_total_price:10,
            owner:{name:"Mrs Sample"},
            registration_plate_first_part: 12,
            registration_plate_second_part: "س",
            registration_plate_third_part: 456,
            registration_plate_forth_part: 11,
            media_set:[{
                    thumbnail_url:"https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/smallImage.jpg?raw=true"
                }]
        }
    }}    
/> 
</Playground>
