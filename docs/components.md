# Components 

- [App](#App)
- [CanvasRender](#CanvasRender)
- [Chart](#Chart)
- [Chart2](#Chart2)
- [DataList](#DataList)
- [DropCard](#DropCard)
- [DropUI](#DropUI)
- [PropCard](#PropCard)
- [Vis](#Vis)

### App
[src/components/App.js](../src/components/App.js)

*App component*

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
children | func | false |  | 


### CanvasRender
[src/components/CanvasRender.js](../src/components/CanvasRender.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
plotRect | object | false |  | 
size | object | false |  | 


### Chart
[src/components/Chart.js](../src/components/Chart.js)

*Component description*

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
data | array | true | [] | 
dimensions | object | true |  | 
margin | object | true | {  left: 80, right: 20,  top: 20, bottom: 50,} | 
size | object | true | {  width: 600,  height: 400,} | 


### Chart2
[src/components/Chart2.js](../src/components/Chart2.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
data | array | false | [] | 
margin |  | false | {  left: 80, right: 30,  top: 15, bottom: 50,} | undefined
size | shape | false | {width: 700, height: 500} | 
xProp | string | false |  | 
yProp | string | false |  | 


### DataList
[src/components/DataList.js](../src/components/DataList.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
data | array | false | [] | 


### DropCard
[src/components/DropCard.js](../src/components/DropCard.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
canDrop | bool | false |  | 
connectDropTarget | func | false |  | 
isOver | bool | false |  | 


### DropUI
[src/components/DropUI.js](../src/components/DropUI.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------


### PropCard
[src/components/PropCard.js](../src/components/PropCard.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
connectDragSource | func | false |  | 
isDragging | bool | false |  | 
text | string | false |  | 


### Vis
[src/components/Vis.js](../src/components/Vis.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
data | array | false | [] | 

