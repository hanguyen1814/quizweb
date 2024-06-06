{
  /* <div class="test-user-results">
  <p>
    <strong>Kết quả làm bài của bạn:</strong>
  </p>
  <div class="table-wrapper">
    <table class="table table-sm table-bordered table-striped">
      <thead>
        <tr>
          <th style="min-width:150px">Ngày làm</th>
          <th style="min-width:100px">Kết quả</th>
          <th style="min-width:150px;">Thời gian làm bài</th>
          <th style="min-width:150px;"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>31/03/2024</td>
          <td>5/10</td>
          <td>0:08:50</td>
          <td>
            <a href="/tests/2010/results/13212310/">Xem chi tiết</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div> */
}
let XemKQs = [{
  Ngay: "31/03/2024",
  KetQua: "5/10",
  ThoiGian: "0:08:52",
  Link: "/tests/2010/results/13212310/",
},
{
    Ngay: "30/03/2024",
    KetQua: "6/10",
    ThoiGian: "0:08:50",
    Link: "/tests/2010/results/13212311/",
}]
let tableBody = document.querySelector(".test-user-results tbody");
tableBody.innerHTML = "";
XemKQs.forEach(function (XemKQ) {
  let row = document.createElement("tr");

  let dateCell = document.createElement("td");
  dateCell.textContent = XemKQ.Ngay;
  row.appendChild(dateCell);

  let scoreCell = document.createElement("td");
  scoreCell.textContent = XemKQ.KetQua;
  row.appendChild(scoreCell);

  let timeCell = document.createElement("td");
  timeCell.textContent = XemKQ.ThoiGian;
  row.appendChild(timeCell);

  let linkCell = document.createElement("td");
  let linkElement = document.createElement("a");
  linkElement.href = XemKQ.Link;
  linkElement.textContent = "Xem chi tiết";
  linkCell.appendChild(linkElement);
  row.appendChild(linkCell);

  tableBody.appendChild(row);
});
