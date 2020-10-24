---
name: DropDown
menu: Components
route: /components/dropdown
---

import { Playground, Props } from 'docz'
import DropdownSearch from './index.tsx'

# DropdownSearch

<Props of={DropdownSearch} />

## Screenshot
![DropDown](https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/Dropdown.jpg?raw=true)

## Basic usage

<Playground>
  <DropdownSearch
          InputDisable={true}
          label="Sample"
          data={[{text:"text1",code:1},{text:"text2",code:2},{text:"text3",code:3}]}
          clearField={() => {}} 
          Select={(i) => {}}
        />
</Playground>
