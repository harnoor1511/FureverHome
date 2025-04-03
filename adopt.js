document.addEventListener("DOMContentLoaded", function () {
    const stateFilter = document.getElementById("stateFilter");
    const petFilter = document.getElementById("petFilter");
    const animalCards = document.querySelectorAll(".animal-card");
    const clearFilterBtn = document.querySelector(".clear-filter");
    const animalsContainer = document.querySelector(".animals");

    function filterPets() {
        const selectedState = stateFilter.value;
        const selectedType = petFilter.value;
        let visibleCards = 0;

        animalCards.forEach(card => {
            const petState = card.getAttribute("data-state");
            const petType = card.getAttribute("data-type");

            if ((selectedState === "All" || petState === selectedState) &&
                (selectedType === "All" || petType === selectedType)) {
                card.style.display = "block";
                visibleCards++;
            } else {
                card.style.display = "none";
            }
        });

        if (visibleCards === 0) {
            const noAnimalsMessage = document.createElement("p");
            noAnimalsMessage.textContent = "No animal found!";
            noAnimalsMessage.className = "no-animals-message";
            animalsContainer.appendChild(noAnimalsMessage);
        } else {
            const existingMessage = animalsContainer.querySelector(".no-animals-message");
            if (existingMessage) {
                existingMessage.remove();
            }
        }
    }

    function clearFilters() {
        stateFilter.value = "All";
        petFilter.value = "All";
        animalCards.forEach(card => {
            card.style.display = "block";
        });
        const existingMessage = animalsContainer.querySelector(".no-animals-message");
        if (existingMessage) {
            existingMessage.remove();
        }
    }

    stateFilter.addEventListener("change", filterPets);
    petFilter.addEventListener("change", filterPets);
    clearFilterBtn.addEventListener("click", clearFilters);

    filterPets();
});

    function redirect(){
        location.href="adoptPet.html"
    }
