import { products } from "./products.js";
let data = [...products];
const p = document.getElementById("products");
const s = document.getElementById("search"),
  c = document.getElementById("category"),
  o = document.getElementById("sort");
const stats = document.getElementById("stats");
[...new Set(products.map((x) => x.category))].forEach(
  (v) => (c.innerHTML += `<option>${v}</option>`),
);
function render(arr = data) {
  p.innerHTML = arr
    .map(
      (x) =>
        `<div class='border p-3'><img src='${x.image}'><h3>${x.title}</h3><p>$${x.price}</p><p>${x.rating}</p>${x.stock ? `<button onclick="buy(${x.id})">Buy</button>` : `<button disabled>Out of Stock</button>`}</div>`,
    )
    .join("");
  const avg = (
    products.reduce((a, b) => a + b.price, 0) / products.length
  ).toFixed(2);
  const exp = [...products].sort((a, b) => b.price - a.price)[0];
  const rate = [...products].sort((a, b) => b.rating - a.rating)[0];
  stats.innerHTML = `Total:${products.length}<br>Avg:${avg}<br>Stock:${products.reduce((a, b) => a + b.stock, 0)}<br>Exp:${exp.title}<br>Best:${rate.title}`;
  document.getElementById("top").innerHTML = products
    .filter((x) => x.rating > 4.5)
    .map((x) => x.title)
    .join(", ");
}
window.buy = (id) => alert("Bought " + products.find((x) => x.id === id).title);
function apply() {
  data = products.filter(
    (x) =>
      (!s.value || x.title.toLowerCase().includes(s.value.toLowerCase())) &&
      (c.value === "All" || x.category === c.value),
  );
  if (o.value === "price") data.sort((a, b) => a.price - b.price);
  if (o.value === "rating") data.sort((a, b) => b.rating - a.rating);
  if (o.value === "alpha") data.sort((a, b) => a.title.localeCompare(b.title));
  render(data);
}
s.oninput = apply;
c.onchange = apply;
o.onchange = apply;
document.getElementById("avail").onclick = () =>
  render(products.filter((x) => x.stock > 0));
render();
console.log(
  products.some((x) => x.stock === 0),
  products.every((x) => x.price > 0),
);
