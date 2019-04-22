# react-virtual-list

## Demo:
https://twisttrl.github.io/react-virtual-list/

## Usage:
Simple supply a list of nodes, which must be key-ed! VirtualList wraps them around with a div to provide fixed height and to determine when to mount.

Once mounted, the items will not be unmounted, to prevent repeated mounting and unmounting. This will hurt performance in some circumstances. 

## Example:
```
  <VirtualList width={200} height={200} rowHeight={40} scrollbarColor="green">
    <p key='p1'>a p</p>
    <p key='p2'>a p</p>
    <div key='div1'>a div</div>
    <span key='span1'>a span</span>
    <p key='p3'>a p</p>
    <span key='span2'>a span</span>
    <div key='div2'>a div</div>
    <div key='div3'>a div</div>
    <p key='p4'>a p</p>
    <div key='div4'>a div</div>
    <span key='span3'>a span</span>
    <span key='span4'>a span</span>
  </VirtualList>
```

## Features:
* Simple
* Fast (on list that grows)

## Pitfalls:
* Do not use on list that is going to rearrange very often (this includes sorting).
