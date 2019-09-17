/*eslint-disable*/

export const displayMap = (locations) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmFja3VyZGkiLCJhIjoiY2swZG0wYms2MDhwZTNjbjRkZ2I5bXprYSJ9.2zY5VTZ0IS1qlUsbyJ0weQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/backurdi/ck0dmg2r30xcl1csz0thwpowf',
        scrollZoom: false

    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
        //Create marker
        const el = document.createElement('div');
        el.className = 'marker';

        //Add marker
        new mapboxgl.Marker({
                element: el,
                anchor: 'bottom'
            })
            .setLngLat(loc.coordinates)
            .addTo(map);

        //Add popup
        new mapboxgl.Popup({
            offset: 30
        }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`).addTo(map);

        //Make bound to include marker location
        bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
}