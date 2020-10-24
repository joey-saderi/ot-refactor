---
name: Discount panel
menu: Containers
route: /components/DiscountPanel
---

import { Playground, Props } from 'docz'
import DiscountBox from './index.tsx'

# Discount panel

<Props of={DiscountBox} />

## Screenshot

![DiscountBox](https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/Discount%20cart.jpg?raw=true)

## Basic usage

<Playground>
  <DiscountBox
            initialDiscountList={[]}
            addDiscount={()=>{}}
            removeDiscountList={()=>{}}
            showDiscount={false}
            setShowBox={(v) => {}}
            discountCheck={false}
            error={false}
          />
</Playground>
