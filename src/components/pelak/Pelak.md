---
name: Pelak
menu: Components
route: /components/pelak
---

import { Playground, Props } from 'docz'
import PelakView from './index.tsx'

# Pelak View

<Props of={PelakView} />

## Screenshot

![PelakView](https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/pelak.jpg?raw=true)

## Basic usage

<Playground>
   <PelakView
    registration_plate_first_part={77}
    registration_plate_second_part="ت"
    registration_plate_third_part={345}
    registration_plate_forth_part={48}
    />
</Playground>
