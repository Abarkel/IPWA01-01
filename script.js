// JavaScript zur Steuerung der Adressanzeige
document.addEventListener("DOMContentLoaded", function () {
  const radios = document.querySelectorAll('input[name="uebergabe"]');
  const adressfeld = document.getElementById("adresse-feld");
  const adressInputs = adressfeld.querySelectorAll("input");

  // Standardmäßig ausblenden
  adressfeld.style.display = "none";

  radios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.value === "Abholung") {
        adressfeld.style.display = "block";
        adressInputs.forEach((input) => (input.required = true));
      } else {
        adressfeld.style.display = "none";
        adressInputs.forEach((input) => (input.required = false));
      }
    });
  });
  // Kleidung alphabetisch sortieren
  const kleidungSelect = document.getElementById("kleidung");
  const kleidungOptions = Array.from(kleidungSelect.options)
    .slice(1) // erste Option ("Bitte wählen") überspringen
    .sort((a, b) => a.text.localeCompare(b.text));

  kleidungOptions.forEach((option) => kleidungSelect.appendChild(option));

  // Krisengebiet alphabetisch sortieren
  const krisengebietSelect = document.getElementById("krisengebiet");
  const krisenOptions = Array.from(krisengebietSelect.options)
    .slice(1)
    .sort((a, b) => a.text.localeCompare(b.text));

  krisenOptions.forEach((option) => krisengebietSelect.appendChild(option));

// PLZ-Prüfung beim Formular-Absenden
  const form = document.querySelector("form");
  const plzInput = document.getElementById("plz");
  const geschaeftsstellePLZ = "73";

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const plz = plzInput.value;
    const kleidung = document.getElementById("kleidung").value;
    const krisengebiet = document.getElementById("krisengebiet").value;
    const uebergabe =
      document.querySelector('input[name="uebergabe"]:checked')?.value ||
      "Keine Auswahl";

    const ort = document.getElementById("ort").value;

    if (
      plz &&
      plz.substring(0, 2) !== geschaeftsstellePLZ &&
      uebergabe === "Abholung"
    ) {
      alert(
        "Abholung nicht möglich: Die Adresse liegt außerhalb des Geschäftsstellenbereichs."
      );
      return;
    }

    const jetzt = new Date().toLocaleString("de-DE");

    const bestaetigung = `
  <h3>🎉 Vielen Dank für Ihre Spende!</h3>
  <p><strong>Übergabeart:</strong> ${uebergabe}</p>
  <p><strong>Kleidung:</strong> ${kleidung}</p>
  <p><strong>Krisengebiet:</strong> ${krisengebiet}</p>
  <p><strong>Datum & Uhrzeit:</strong> ${jetzt}</p>
   <p><strong>PLZ:</strong> ${plz || 73079}</p>
  <p><strong>Ort:</strong> ${ort || "Geschäftsstelle"}</p>  
`;
    document.querySelector("main").innerHTML = bestaetigung;
  });
});
