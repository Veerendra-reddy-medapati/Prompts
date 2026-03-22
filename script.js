let data = [];

fetch('prompts.json')
  .then(res => res.json())
  .then(json => {
    data = shuffle(json);
    render(data);
  });

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function render(items) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  items.forEach((item, index) => {

    // insert ad after every 5 posts
    if (index > 0 && index % 5 === 0) {
      const ad = document.createElement("div");
      ad.className = "ad";
      ad.innerText = "Ad Space";
      gallery.appendChild(ad);
    }

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${item.image}">
    `;

    div.onclick = () => {
      window.open(`post.html?id=${item.id}`, "_blank");
    };

    gallery.appendChild(div);
  });
}

document.getElementById("search").addEventListener("input", filter);
document.getElementById("category").addEventListener("change", filter);

function filter() {
  const search = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("category").value;

  let filtered = data.filter(item => {
    return (
      item.prompt.toLowerCase().includes(search) &&
      (category === "all" || item.category === category)
    );
  });

  render(filtered);
}

