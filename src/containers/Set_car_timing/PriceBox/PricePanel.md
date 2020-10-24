---
name: Price panel
menu: Containers
route: /components/pricepanel
---

import { Playground, Props } from 'docz'
import PriceBox from './index.tsx'

# Price panel

<Props of={PriceBox} />

## Screenshot

![PriceBox](https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/Price%20base%20date%20range.jpg?raw=true)

## Basic usage

<Playground>
  <PriceBox
    initialAvailabilityList={[]}
    addAvailList={()=>{}}
    removeAvailList={()=>{}}
    error={false}
    />
</Playground>
