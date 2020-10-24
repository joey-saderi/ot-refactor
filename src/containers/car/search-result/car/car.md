---
name: Search Result Car
menu: Containers
route: /components/search-result-car
---

import { Playground, Props } from 'docz'
import SearchResultCar from './index.tsx'

# Search Result Car

<Props of={SearchResultCar} />

## Screenshot

![SearchResultCar](https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/car%20cart.jpg?raw=true)

## Basic usage

<Playground>
  <SearchResultCar key={2} data={{
      id:1,
    search_id:"dsfsadf34324",
    total_discount_percent:10,
    has_system_discount:true,
    media_set:[{
        thumbnail_url:"https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/slider1.jpg?raw=true",
        thumbnail_width:300,
        thumbnail_height:300}],
    car: {
        brand:{name:{fa:"نام برند"}},
        name:{fa:"نام مدل"}
    },
    year:{name:{fa:1399}},
    avg_discounted_price_per_day_name:"1،000،000 تومان",
    avg_discounted_price_per_day: 100000,
    deliver_at_renters_place: true,
    with_driver: true
  }} />
</Playground>
