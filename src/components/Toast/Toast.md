---
name: Toast
menu: Components
route: /components/toast
---

import { Playground, Props } from 'docz'
import Toast from './index.tsx'

# Toast

<Props of={Toast} />

## Screenshot

![Toast](https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/Toast.png?raw=true)

## Basic usage

<Playground>
  <Toast
    message="متن پیام"
    closeHandler={() => {}}
    time={3}
    autoClose={true}
    />
</Playground>
