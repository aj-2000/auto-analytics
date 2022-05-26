export function random_bg_color(opacity) {
  let x = Math.floor(Math.random() * 256);
  let y = 100 + Math.floor(Math.random() * 256);
  let z = 50 + Math.floor(Math.random() * 256);
  let bgColor = "rgba(" + x + "," + y + "," + z + "," + opacity + ")";
  return bgColor;
}

export function random_colour_array(size, opacity) {
  let arrayOfColours = [];
  for (let i = 0; i < size; i++) {
    arrayOfColours.push(random_bg_color(opacity));
  }
}
