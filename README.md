# Lib to manipulate the canvas

This is a simple JS library that manipulate the pixels of the canvas and apply filters to it. The lib is very light and use pure JS, so you can use in the browser without nodeJS only calling `<script src="src/ManImageCan.js"></script>`.

## How to use

### Manipulate pixels

```javascript

var manCanvas = new ManipulateCanvas(canvas);

// get pixel with the coordinate (x, y)

manCanvas.getPixel(x, y);

//change pixel with coordinate (x, y) to the white pixel

manCanvas.setPixel(x, y, [255, 255, 255, 255]);

```

### Filters


```javascript

var manCanvas = new ManipulateCanvas(canvas);

// change to grayscale

manCanvas.grayscale()

// change brigthness and contrast

manCanvas.brigthness(intensity)

manCanvas.contrast(intensity)

```


## TODO

- Add more filters
