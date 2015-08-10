# Modules
- [.src/components/App](#.src/components/App)

## .src/components/App

Funtions for the App component

### App.randomInt(min, max)

Generate random number between min (inclusive) and max (inclusive)

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
min | number |  |  | 
max | number |  |  | 
*Returns* | *number* | | | *random number*

### App.randomData()

Generate random data

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
*Returns* | *Object* | | | *Object with random data*


```jsx
var dataArray = randomData()
dataArray.length
// 0
dataArray[0]
// { prop1: Number, prop2: Number, prop3: Number }
```

```jsx
randomData()
// { prop1: Number, prop2: Number, prop3: Number }
```
