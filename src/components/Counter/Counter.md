---
name: Counter
menu: Components
route: /components/counter
---

import { Playground, Props } from 'docz'
import Counter from './index.tsx'

# Counter

<Props of={Counter} />

## Screenshot
![Counter](https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/Count.jpg?raw=true)
## Basic usage

<Playground>
<Counter
    max={31}
    min={1}
    AddTo={() => {}}
    reduceTo={() => {}}
    label="زمان اطلاع از اجاره"
    text="روز قبل"
    value={20}
    /> 
</Playground>
