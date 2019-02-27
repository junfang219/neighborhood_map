This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## React Neighborhood Map

This is a map of <strong>Syracuse University</strong> of selected buildings. The map data is fetched via [Google Map API](https://cloud.google.com/maps-platform/) , and the pictures are from [Flickr API](https://www.flickr.com/services/api/).

The page is responsive, you can find a hamburger menu on the top left. A list of selected building will display if you click on it. You can filter the list by typing in letters in the search box. The corresponding map markers will appear on the map. Additionaly, if you mouse over the a building on the list or the marker, the corresponding marker on the map will bounce. If you click on the list or marker, an infowindow will show up with a picture of the event happened in that building, which is supported by Flickr.



## How to test

1. run `npm start`
2. open a browser and head for `localhost:3000`

## How to build and deploy

1. run `npm run build` and you are ready to deploy the app
2. Several method can be used for deploying. For a simple static server deployment, run

```
npm install -g serve
serve -s build
```

for more information, see [React deployment](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment)

3. open a browser and head for `localhost:5000`

## Note:

service worker is only working under production mode, which means you have to deploy the app to show its powerfulness.



## Resource:

<ul>
    <li>Udacity React classes</li>
    <li>Google Map API</li>
    <li>Flickr Img API</li>
    <li><a src=https://negomi.github.io/react-burger-menu/>React Burger menu</a> </li>
</ul>




