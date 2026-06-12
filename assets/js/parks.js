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

    "grand-canyon": {
        name: "Grand Canyon",
        subtitle: "National Park",

        collection:
            "Time Written in Stone. A collection created throughout the South Rim, North Rim, Desert View, Moran Point, and Point Imperial, capturing dramatic storms, canyon light, and moments of stillness across one of the world's most extraordinary landscapes.",

        story:
            "The Grand Canyon is a landscape measured not only in miles, but in time. These photographs were created over multiple visits through changing seasons, monsoon storms, sunrise light, and quiet evenings along the canyon rim. Each image represents a unique encounter with one of North America's most iconic natural wonders.",

        hero:
            "../assets/images/national-parks/grand-canyon/grand-canyon-storm-rainbow.jpg"
    }

   "yosemite":{
        name:"YOSEMITE",
        subtitle:"National Park",

        collectionTitle:"Granite and Light",

        collectionSummary:
            "A collection created throughout Yosemite Valley, Glacier Point, Tunnel View, and the High Sierra, capturing changing seasons, dramatic weather, and timeless granite landscapes.",

        story:
            "Yosemite is one of North America's most iconic wilderness landscapes. These photographs were created over multiple visits through winter storms, autumn color, spring runoff, and quiet evenings beneath the granite walls of the valley.",

        hero:"../assets/images/national-parks/yosemite/yosemite-half-dome-fall-color.jpg"
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

    document.getElementById("parkTitle").innerHTML =
        `${park.name}<br>${park.subtitle}`;

    document.getElementById("collectionText").textContent =
        park.collection;

    document.getElementById("storyText").textContent =
        park.story;
        document.getElementById("storyText").textContent =
            park.story || "";

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
                    loading="lazy"
                    class="gallery-image">

                <div class="caption">

                    <h3>${photo.title}</h3>

                    <p>${photo.location || ""}</p>

                </div>

            </div>

        `);

    });

}

loadPark();

document.addEventListener("click", function(e){

    if(e.target.classList.contains("gallery-image")){

        document.getElementById("lightbox-img").src =
            e.target.src;

        document.getElementById("lightbox").style.display =
            "flex";
    }

});

document.addEventListener("click", function(e){

    if(
        e.target.id === "lightbox" ||
        e.target.classList.contains("lightbox-close")
    ){

        document.getElementById("lightbox").style.display =
            "none";
    }

});