const districts = [
  {
    id: "chitipa",
    name: "Chitipa",
    color: "#93c5fd",
    path: "M165 70 L200 85 L210 130 L190 165 L150 165 L138 120 Z",
    tas: [
      { name: "TA Mwenewenya", path: "M165 82 L195 95 L186 120 L160 115 Z" },
      { name: "TA Kameme", path: "M160 116 L186 122 L184 155 L152 158 Z" },
      { name: "TA Mwabulambya", path: "M138 122 L159 116 L151 158 L141 145 Z" }
    ]
  },
  {
    id: "mzimba",
    name: "Mzimba",
    color: "#86efac",
    path: "M150 170 L212 170 L236 240 L224 315 L165 335 L130 285 Z",
    tas: [
      { name: "TA M'Mbelwa", path: "M160 180 L210 180 L205 225 L165 228 Z" },
      { name: "TA Mzikubola", path: "M168 230 L205 228 L215 275 L170 285 Z" },
      { name: "TA Mabulabo", path: "M150 200 L165 230 L168 285 L138 275 L130 235 Z" }
    ]
  },
  {
    id: "lilongwe",
    name: "Lilongwe",
    color: "#fca5a5",
    path: "M140 340 L225 320 L240 385 L210 455 L145 450 L124 390 Z",
    tas: [
      { name: "TA Tsabango", path: "M155 345 L215 330 L210 370 L165 375 Z" },
      { name: "TA Chitukula", path: "M165 376 L210 371 L210 410 L160 420 Z" },
      { name: "TA Kalolo", path: "M150 420 L208 412 L195 445 L145 442 Z" }
    ]
  },
  {
    id: "dedza",
    name: "Dedza",
    color: "#fde68a",
    path: "M140 455 L212 458 L228 540 L206 600 L145 590 L130 520 Z",
    tas: [
      { name: "TA Kachindamoto", path: "M146 466 L204 468 L200 500 L156 510 Z" },
      { name: "TA Tambala", path: "M156 512 L201 502 L202 542 L153 555 Z" },
      { name: "TA Kaphuka", path: "M153 556 L202 544 L196 586 L148 582 Z" }
    ]
  },
  {
    id: "zomba",
    name: "Zomba",
    color: "#c4b5fd",
    path: "M150 610 L205 606 L220 675 L198 730 L150 725 L135 665 Z",
    tas: [
      { name: "TA Mwambo", path: "M155 617 L198 612 L198 646 L160 648 Z" },
      { name: "TA Chikowi", path: "M160 650 L198 648 L201 685 L158 694 Z" },
      { name: "TA Mkanda", path: "M157 696 L198 686 L192 720 L151 720 Z" }
    ]
  },
  {
    id: "blantyre",
    name: "Blantyre",
    color: "#f9a8d4",
    path: "M150 735 L198 735 L205 795 L182 835 L156 828 L145 780 Z",
    tas: [
      { name: "TA Kapeni", path: "M153 742 L193 742 L191 767 L156 768 Z" },
      { name: "TA Somba", path: "M156 770 L192 769 L191 794 L154 798 Z" },
      { name: "TA Lundu", path: "M154 800 L191 795 L184 828 L158 822 Z" }
    ]
  }
];

const districtLayer = document.getElementById("districtLayer");
const taLayer = document.getElementById("taLayer");
const infoList = document.getElementById("infoList");
const panelTitle = document.getElementById("panelTitle");
const statusText = document.getElementById("statusText");
const backBtn = document.getElementById("backBtn");

function el(name, attrs = {}) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
}

function renderDistricts() {
  districtLayer.innerHTML = "";
  districts.forEach((district) => {
    const path = el("path", {
      d: district.path,
      class: "district",
      fill: district.color,
      "data-id": district.id
    });
    path.addEventListener("click", () => openDistrict(district.id));
    districtLayer.appendChild(path);

    const labelPoint = district.path.match(/M(\d+) (\d+)/);
    if (labelPoint) {
      const text = el("text", {
        x: Number(labelPoint[1]) + 6,
        y: Number(labelPoint[2]) + 20,
        "font-size": "10",
        fill: "#0f172a"
      });
      text.textContent = district.name;
      districtLayer.appendChild(text);
    }
  });

  panelTitle.textContent = "Districts";
  statusText.textContent = "District view";
  infoList.innerHTML = districts
    .map((district) => `<li>${district.name}</li>`)
    .join("");
}

function openDistrict(districtId) {
  const district = districts.find((item) => item.id === districtId);
  if (!district) return;

  taLayer.innerHTML = "";
  district.tas.forEach((ta) => {
    const taPath = el("path", { d: ta.path, class: "ta" });
    taLayer.appendChild(taPath);
  });

  taLayer.classList.remove("hidden");
  districtLayer.style.opacity = "0.18";
  backBtn.disabled = false;

  panelTitle.textContent = `${district.name} T/As`;
  statusText.textContent = `TA view: ${district.name}`;
  infoList.innerHTML = district.tas.map((ta) => `<li>${ta.name}</li>`).join("");
}

function backToDistricts() {
  taLayer.classList.add("hidden");
  taLayer.innerHTML = "";
  districtLayer.style.opacity = "1";
  backBtn.disabled = true;
  renderDistricts();
}

backBtn.addEventListener("click", backToDistricts);
renderDistricts();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}
