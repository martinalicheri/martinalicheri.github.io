// FETCH DATA WITHOUT A BUTTON:
let cardAmount = 6;
let count = 1;
const totalCards = 20; // there are 20 cards to load

async function loadMiracles() {
    const response = await fetch("https://gist.githubusercontent.com/trevortomesh/7bbf97b2fbae96639ebf1a254b6a7a70/raw/miracles.json");
    if (!response.ok) {
        throw new Error("HTTP error! Status: " + response.status);
    }
    const data = await response.json();
    const dataCards = document.getElementById("cards");

    data.forEach(card => {
        const div = document.createElement("div");
        const h1 = document.createElement("h1");
        const h2 = document.createElement("h2");
        const p = document.createElement("p");
        const button = document.createElement("button");

        h1.textContent = `${card.title}`;
        h2.textContent = `${card.location}, ${card.year}`;
        p.textContent = `${card.summary}`;
        button.textContent = `More Info`;
        div.appendChild(h1);
        div.appendChild(h2);
        div.appendChild(p);
        div.appendChild(button);

        div.id = card.id;
        if (count<=cardAmount) {
            div.style.display = "grid";
            count++;
        } else {
            div.style.display = "none";
        }


        const div_info = document.createElement("div");
        div_info.id = "div_info";

        // Hide it! (default, will show when button is clicked)
        div_info.style.display = "none";

        const p1_info = document.createElement("p");
        const p2_info = document.createElement("p");
        const p3_info = document.createElement("p");
        p1_info.textContent = `Type: ${card.type}`;
        p2_info.textContent = `Category: ${card.category}`;
        p3_info.textContent = `Details: ${card.details}`;
        div_info.appendChild(p1_info);
        div_info.appendChild(p2_info);
        div_info.appendChild(p3_info);
        div.appendChild(div_info);
        dataCards.appendChild(div);

        // Show or hide information
        button.onclick = () => {
            if (div_info.style.display === "none") {
                div_info.style.display = "grid";
            } else {
                div_info.style.display = "none";
            }
        }
    })
}

const loadMoreButton = document.getElementById("load-more");

loadMoreButton.addEventListener("click", async () => {
    cardAmount += 6;
    if (cardAmount > totalCards) {
        loadMoreButton.style.display = "none";
    }
    for (; count <= cardAmount; count++) {
        let div = document.getElementById(`${count}`);
        div.style.display = "grid";
    }

})


loadMiracles();
