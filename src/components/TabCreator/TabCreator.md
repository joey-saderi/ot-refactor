---
name: Tab Creator
menu: Components
route: /components/tabCreator
---

import { Playground, Props } from 'docz'
import TabCreator from './index.tsx'

# TabCreator

<Props of={TabCreator} />

## Screenshot

![TabCreator](https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/tabcreator.png?raw=true)

## Basic usage

<Playground>
  <TabCreator data_arr={[
      {
      title: "شهرها",
      links: [
        {
          title: "اجاره ماشین در اهواز",
          link: "/rent/ahvaz",
        },
        {
          title: "اجاره ماشین در بندر انزلی",
          link: "/rent/Bandar-Anzali",
        }
      ]
      }
  ]} />
</Playground>
