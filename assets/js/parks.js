const parkData = {

    "yosemite": {
        name: "Yosemite",
        subtitle: "National Park",

        collection:
            "Granite and Light. A collection created throughout Yosemite Valley, Glacier Point, Tunnel View, and the High Sierra, capturing changing seasons, dramatic weather, and timeless granite landscapes.",

        story:
            "Yosemite is one of North America's most iconic wilderness landscapes. These photographs were created over multiple visits through winter storms, autumn color, spring runoff, and quiet evenings beneath the granite walls of the valley.",

        hero:
            "../assets/images/national-parks/yosemite/yosemite-half-dome-fall-color.jpg"
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
    },

    "joshua-tree": {
        name: "Joshua Tree",
        subtitle: "National Park",

        collection:
            "Desert Sculptures. A collection exploring the surreal landscapes where the Mojave and Colorado deserts meet.",

        story:
            "Twisted Joshua Trees, sculpted granite formations, and expansive desert skies create one of the most distinctive landscapes in the American Southwest.",

        hero:
            "../assets/images/national-parks/joshua/joshua-tree-horizontal-rocks.jpg"
    }

};

async function loadPark() {

    const currentPark =
        new URLSearchParams(window.location.search)
            .get("park");

    const park = parkData[currentPark];

    if (!park) {

        document.body.innerHTML = `
            <div style="padding:4rem;text-align:center;">
                Park not found
            </div>
        `;

        return;
    }

    document.title =
        `${park.name} | Mountain & Desert Photography`;

    document.getElementById("parkTitle").innerHTML =
        `${park.name}<br>${park.subtitle}`;

    document.getElementById("collectionText").textContent =
        park.collection || "";

    document.getElementById("storyText").textContent =
        park.story || "";

    document.getElementById("hero").style.backgroundImage =
        `url('${park.hero}')`;

    const response =
        await fetch("../data/photos.json");

    const photos =
        await response.json();

    const gallery =
        document.getElementById("gallery");

    const parkPhotos =
        photos.filter(
            photo => photo.park === currentPark
        );

    parkPhotos.forEach(photo => {

        gallery.insertAdjacentHTML(
            "beforeend",
            `
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
            `
        );

    });

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImg =
        document.getElementById("lightbox-img");

    const counter =
        document.getElementById("lightbox-count");
    
    const title =
        document.getElementById("lightbox-title");

    let currentIndex = 0;

    function showImage(index){

        if(index < 0)
            index = parkPhotos.length - 1;

        if(index >= parkPhotos.length)
            index = 0;

        currentIndex = index;

        lightboxImg.src =
            parkPhotos[index].image;
        
        title.textContent =
            parkPhotos[index].title || "";

        if(counter){
            counter.textContent =
                `${index + 1} / ${parkPhotos.length}`;
        }
    }

    document.addEventListener("click", e => {

        if(
            e.target.classList.contains(
                "gallery-image"
            )
        ){

            const images =
                [...document.querySelectorAll(".gallery-image")];

            currentIndex =
                images.indexOf(e.target);

            showImage(currentIndex);

            lightbox.style.display =
                "flex";
        }

        if(
            e.target.classList.contains(
                "lightbox-next"
            )
        ){
            showImage(currentIndex + 1);
        }

        if(
            e.target.classList.contains(
                "lightbox-prev"
            )
        ){
            showImage(currentIndex - 1);
        }

        if(
            e.target.id === "lightbox" ||
            e.target.classList.contains(
                "lightbox-close"
            )
        ){
            lightbox.style.display =
                "none";
        }

    });

    document.addEventListener(
        "keydown",
        e => {

            if(
                lightbox.style.display !==
                "flex"
            ) return;

            if(e.key === "ArrowRight")
                showImage(currentIndex + 1);

            if(e.key === "ArrowLeft")
                showImage(currentIndex - 1);

            if(e.key === "Escape")
                lightbox.style.display =
                    "none";
        }
    );

}

loadPark();