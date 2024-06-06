$(document).ready(function () {
  // Xử lý sự kiện khi trỏ chuột vào span product-color
  $(".product-color").mouseenter(function () {
    var color = $(this).css("background-color");
    var image = $(this).closest(".product-card").find("img");
    var colorHex = rgbToGray(color);
    var productNameElement = $(this).closest(".product-card").find(".product-name")[0];

    // Lấy nội dung của phần tử đó
    var productName = productNameElement.textContent;
    productName=productName.replace(/\s/g, '').toLowerCase();
    var newSrc = "./img/" + productName + "_" + colorHex + ".png";
    console.log(newSrc);
    image.attr("src", newSrc);
  });
});
function rgbToGray(rgb) {
  var hex = rgb
    .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    .slice(1)
    .map(function (x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    })
    .join("");
  return hex;
}
