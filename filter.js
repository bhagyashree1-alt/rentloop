/* ===========================================================
   Lendwell — Homepage Logic
   =========================================================== */


/* =========================
   CATEGORIES
   ========================= */

const CATEGORIES = [
    "All",
    "Tools",
    "Camera",
    "Camping",
    "Sports",
    "Electronics",
    "Events"
];


/* =========================
   CATEGORY ICONS
   ========================= */

const ICONS = {
    "Tools": "🔧",
    "Camera": "📷",
    "Camping": "⛺",
    "Sports": "⚽",
    "Electronics": "💻",
    "Events": "🎉"
};


/* =========================
   SAMPLE LISTINGS
   ========================= */

const LISTINGS = [

    {
        id: 1,
        name: "Power Drill",
        category: "Tools",
        distance: 1.2,
        price: 15,
        owner: "Rahul",
        rating: 4.8,
        rentals: 12,
        desc: "Cordless power drill for home projects."
    },

    {
        id: 2,
        name: "Canon Camera",
        category: "Camera",
        distance: 2.1,
        price: 45,
        owner: "Anita",
        rating: 4.9,
        rentals: 8,
        desc: "Professional camera for events and photography."
    },

    {
        id: 3,
        name: "Camping Tent",
        category: "Camping",
        distance: 3.4,
        price: 25,
        owner: "Vikram",
        rating: 4.7,
        rentals: 15,
        desc: "Comfortable tent suitable for camping trips."
    },

    {
        id: 4,
        name: "Football Set",
        category: "Sports",
        distance: 1.8,
        price: 10,
        owner: "Arjun",
        rating: 4.6,
        rentals: 20,
        desc: "Football and sports equipment set."
    },

    {
        id: 5,
        name: "Laptop",
        category: "Electronics",
        distance: 4.2,
        price: 35,
        owner: "Priya",
        rating: 4.8,
        rentals: 6,
        desc: "Laptop available for short-term rental."
    },

    {
        id: 6,
        name: "Party Speaker",
        category: "Events",
        distance: 2.7,
        price: 30,
        owner: "Kiran",
        rating: 4.5,
        rentals: 10,
        desc: "Bluetooth speaker for parties and events."
    },

    {
        id: 7,
        name: "Drill Machine",
        category: "Tools",
        distance: 4.5,
        price: 20,
        owner: "Suresh",
        rating: 4.7,
        rentals: 9,
        desc: "Heavy duty drill machine."
    },

    {
        id: 8,
        name: "Camping Backpack",
        category: "Camping",
        distance: 5.0,
        price: 12,
        owner: "Meena",
        rating: 4.6,
        rentals: 7,
        desc: "Large backpack for hiking and camping."
    }

];


/* =========================
   STATE
   ========================= */

let activeCategory = "All";

let maxDistance = 5;

let maxPrice = 150;

let searchTerm = "";


/* =========================
   DOM ELEMENTS
   ========================= */

const grid = document.getElementById("grid");

const emptyState = document.getElementById("emptyState");

const resultsSub = document.getElementById("resultsSub");

const listingCount = document.getElementById("listingCount");

const ownerCount = document.getElementById("ownerCount");


/* =========================
   LOAD LISTINGS
   ========================= */

function loadListings() {

    return LISTINGS;

}


/* =========================
   ESCAPE HTML
   ========================= */

function escapeHtml(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================
   RENDER CATEGORY CHIPS
   ========================= */

function renderChips() {

    const wrap = document.getElementById("categoryChips");

    wrap.innerHTML = "";

    CATEGORIES.forEach(cat => {

        const el = document.createElement("div");

        el.className =
            "chip" +
            (cat === activeCategory ? " active" : "");

        el.textContent = cat;

        el.onclick = () => {

            activeCategory = cat;

            render();

        };

        wrap.appendChild(el);

    });

}


/* =========================
   FILTER LISTINGS
   ========================= */

function filtered(all) {

    return all

        .filter(l => {

            /* Category */

            if (
                activeCategory !== "All" &&
                l.category !== activeCategory
            ) {

                return false;

            }


            /* Distance */

            if (l.distance > maxDistance) {

                return false;

            }


            /* Price */

            if (l.price > maxPrice) {

                return false;

            }


            /* Search */

            if (searchTerm) {

                const name =
                    l.name.toLowerCase();

                const description =
                    l.desc.toLowerCase();

                if (
                    !name.includes(searchTerm) &&
                    !description.includes(searchTerm)
                ) {

                    return false;

                }

            }

            return true;

        })

        .sort(
            (a, b) =>
                a.distance - b.distance
        );

}


/* =========================
   RENDER LISTINGS
   ========================= */

function render() {

    renderChips();


    const all = loadListings();

    const items = filtered(all);


    grid.innerHTML = "";


    /* Empty state */

    emptyState.style.display =
        items.length ? "none" : "block";


    /* Results text */

    resultsSub.textContent =
        items.length
            ? `${items.length} item${items.length === 1 ? "" : "s"} within ${maxDistance} km`
            : "No items match your search";


    /* Create cards */

    items.forEach(l => {

        const card = document.createElement("a");

        card.className = "card-link";


        card.href = "#";


        card.innerHTML = `

            <div class="card">

                <div class="card-media">

                    ${ICONS[l.category] || "📦"}

                </div>


                <div class="card-body">

                    <h4>
                        ${escapeHtml(l.name)}
                    </h4>


                    <div class="card-meta">

                        ${l.distance.toFixed(1)}
                        km · lent by
                        ${escapeHtml(l.owner)}

                    </div>


                    <div class="card-meta stars">

                        ★ ${l.rating.toFixed(1)}
                        · ${l.rentals} rentals

                    </div>


                    <div class="card-price">

                        <span class="price-tag">

                            $${l.price}

                            <small>
                                /day
                            </small>

                        </span>

                    </div>

                </div>

            </div>

        `;


        grid.appendChild(card);

    });


    /* Statistics */

    listingCount.textContent =
        `${all.length} items listed nearby`;


    ownerCount.textContent =
        `${new Set(
            all.map(l => l.owner)
        ).size} neighbors lending`;

}


/* =========================
   DISTANCE SLIDER
   ========================= */

document
    .getElementById("distanceRange")
    .addEventListener("input", e => {

        maxDistance =
            parseFloat(e.target.value);


        document
            .getElementById("distanceVal")
            .textContent =
            maxDistance.toFixed(1);


        render();

    });


/* =========================
   PRICE SLIDER
   ========================= */

document
    .getElementById("priceRange")
    .addEventListener("input", e => {

        maxPrice =
            parseFloat(e.target.value);


        document
            .getElementById("priceVal")
            .textContent =
            maxPrice;


        render();

    });


/* =========================
   SEARCH
   ========================= */

document
    .getElementById("searchInput")
    .addEventListener("input", e => {

        searchTerm =
            e.target.value
                .toLowerCase()
                .trim();


        render();

    });


/* =========================
   INITIAL RENDER
   ========================= */

render();