---
name: Checkbox
menu: Components
route: /components/checkbox
---

import { Playground, Props } from 'docz'
import Checkbox from './index.tsx'

# Checkbox

<Props of={Checkbox} />

## Screenshot
![Checkbox](https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/Checkbox.jpg?raw=true)

## Basic usage

<Playground>
  <Checkbox initialValue={[0]} data={[{ text : 'Test',  value: 1}]} name="Example" clearField={()=>{}} Select={()=>{}}></Checkbox>
</Playground>
