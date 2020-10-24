---
name: Radio
menu: Components
route: /components/radio
---

import { Playground, Props } from 'docz'
import Radio from './index.tsx'

# Radio

<Props of={Radio} />

## Screenshot
![Radio](https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/Radio.jpg?raw=true)
## Basic usage

<Playground>
  <Radio
        name="Sample"
        SelectHandler={() =>{}}
        defaultCheck={1}
        data={[
        {
            label: "Sample1",
            value: 1,
        },
        {
            label: "Sample2",
            value: 2,
        },
        ]}
    />
</Playground>
