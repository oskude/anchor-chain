# anchor-chain

a minimal prototype for _"what if, instead of x/y position, we glued all the pd patch items together?"_

![screencap](screencap.gif?raw=true)

> NOTE: this is not intended to replace the inlets/outlets, they would still connect with lines. _(both not implemented in this prototype)_

## usage

```
./main.qml
```

> or how ever you run qt qml apps in your system...

## features

- made in js/qml, cause im better in it than tcl/tk...
- drag item to anchor to top/right/bottom/left of another item
  - "smart" margin to align left or top (instead center)

## hmmm

- no loops...
- move between...
- add anchor point middle of item, to replace at drop?
- and the rest of _what-should-happen-when-move-here_... >.<*
- show current item links...
- change anchor margin size for (play/edit) mode? (animated? :heart_eyes:)
- file: `<x>,<y>` for `<parent>,<anchor>`?
- how easy would this be in tcl/tk?
