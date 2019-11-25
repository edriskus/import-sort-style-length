# import-sort-style-length

Line-length focused style for [import-sort](https://github.com/renke/import-sort). 

Sorts imports in the following order, each group is sorted by line length, ascending:

```
import "foo";
import "../../foobar";

import Foo from "./bar";
import Bar from "foobar";

import { Foo } from "bar";
import { Foo, Bar } from "baz";

import * as Foo from "bar";
```