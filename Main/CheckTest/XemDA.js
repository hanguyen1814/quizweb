{/* <div class="tab-pane fade" id="test-solutions" role="tabpanel">
<br>
<div class="alert alert-warning">
    <span class="fa-solid fa-exclamation-circle"></span> Đáp án và transcript sẽ được
    hiển thị sau khi bạn hoàn thành bài thi
</div>
<div>Các đáp án</div>
<ul>
</ul>
</div> */}
let XemDA = [{
    DapAn: "A",
    CauHoi: "1",
},
{
    DapAn: "B",
    CauHoi: "2",
},
{
    DapAn: "C",
    CauHoi: "3",
},
{
    DapAn: "D",
    CauHoi: "4",
}]
let ul = document.querySelector("#test-solutions ul");
ul.innerHTML = "";
XemDA.forEach(function (XemDA) {
  let li = document.createElement("li");
  li.textContent = `Câu ${XemDA.CauHoi}: ${XemDA.DapAn}`;
  ul.appendChild(li);
});