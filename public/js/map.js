
        mapboxgl.accessToken = mapToken;
        const map = new mapboxgl.Map({
        container: "map", // container ID
        style :"mapbox://styles/mapbox/streets-v12", // style URL
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });

    
    console.log(listing.geometry.coordinates);

     const marker = new mapboxgl.Marker({ color: 'red', rotation: 45 })
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({offset: 25})).setHTML(`<h4>${listing.location}</h4><p>Exact location provided after booking<p>`)
        .addTo(map);
