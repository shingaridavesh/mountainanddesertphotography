const parkData = {

    "joshua-tree":{
        name:"JOSHUA TREE",
        location:"CALIFORNIA",
        hero:"../assets/images/national-parks/joshua/joshua-tree-horizontal-rocks.jpg",
        description:"A surreal desert landscape filled with twisted Joshua Trees, granite formations and dramatic skies."
    },

    "arches":{
        name:"ARCHES",
        location:"UTAH",
        hero:"../assets/images/national-parks/arches/hero.jpg",
        description:"Home to more than 2,000 natural sandstone arches and iconic red-rock scenery."
    },

    "canyonlands":{
        name:"CANYONLANDS",
        location:"UTAH",
        hero:"../assets/images/national-parks/canyonlands/hero.jpg",
        description:"A vast wilderness of canyons, mesas, buttes and endless desert horizons."
    },

    "zion":{
        name:"ZION",
        location:"UTAH",
        hero:"../assets/images/national-parks/zion/hero.jpg",
        description:"Towering sandstone cliffs illuminated by warm desert light."
    },

    "bryce-canyon":{
        name:"BRYCE CANYON",
        location:"UTAH",
        hero:"../assets/images/national-parks/bryce-canyon/hero.jpg",
        description:"A landscape of colorful hoodoos and extraordinary geological formations."
    },

    "grand-canyon":{
        name:"GRAND CANYON",
        location:"ARIZONA",
        hero:"../assets/images/national-parks/grand-canyon/grand-canyon-moran-point.jpg",
        description:"One of the world's most spectacular landscapes carved by the Colorado River."
    },

    "yosemite":{
        name:"YOSEMITE",
        location:"CALIFORNIA",
        hero:"../assets/images/national-parks/yosemite/yosemite-half-dome-fall-color.jpg",
        description:"Granite monoliths, waterfalls and timeless wilderness."
    }

};

async function loadPark() {

    const params = new URLSearchParams(window.location.search);
    const currentPark = params.get("park");

    const park = parkData[currentPark];

    if (!park) {
        document.getElementById("gallery").innerHTML =
            "<p>Park not found.</p>";
        return;
    }

    document.title =
        `${park.name} | Mountain & Desert Photography`;

    document.getElementById("parkName").textContent =
        park.name;

    document.getElementById("parkLocation").textContent =
        park.location;

    document.getElementById("parkDescription").textContent =
        park.description;

    document.getElementById("hero").style.backgroundImage =
        `url('${park.hero}')`;

    const response = await fetch("../data/photos.json");
    const photos = await response.json();

    const gallery = document.getElementById("gallery");

    const parkPhotos = photos.filter(
        photo => photo.park === currentPark
    );

    if (parkPhotos.length === 0) {

        gallery.innerHTML = `
            <p style="text-align:center;">
                No photographs available yet.
            </p>
        `;

        return;
    }

    parkPhotos.forEach(photo => {

        gallery.insertAdjacentHTML("beforeend", `

            <div class="photo">

                <img
                    src="${photo.image}"
                    alt="${photo.title}"
                    loading="lazy">

                <div class="caption">

                    <h3>${photo.title}</h3>

                    <p>${photo.location || ""}</p>

                </div>

            </div>

        `);

    });

}

loadPark();