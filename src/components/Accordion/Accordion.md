---
name: Accordion
menu: Components
route: /components/accordion
---

import { Playground, Props } from 'docz'
import Accordion from './index.tsx'

# Accordion

<Props of={Accordion} />

## Screenshot
![Accordion](https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/accordion.jpg?raw=true)

## Basic usage

<Playground>
  <Accordion question_set={[{title:"Sample1", content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
  {title:"Sample2", content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
  ]} />
</Playground>
