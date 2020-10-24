---
name: TextInput
menu: Components
route: /components/textinput
---

import { Playground, Props } from 'docz'
import TextInput from './index.tsx'

# Radio

<Props of={TextInput} />

## Screenshot
![TextInput](https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/Textinput.jpg?raw=true)
## Basic usage

<Playground>
  <TextInput
            name="sample"
            number={true}
            min={4}
            max={4}
            clearField={() =>{}}
            onChangeHandler={() => {}}
            value={100000}
            placeholder="Placeholder"
            autoFocus={true}
            localeString={true}
            error={{
              status: false,
              message: null,
            }}
          />
</Playground>
