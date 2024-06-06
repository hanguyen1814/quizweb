{/* <div class="testitem-grid row ">
              <div class="col-6 col-md-3">
                <div class="testitem-wrapper ">
                  <a class="text-dark" href="">
                    <h2 class="testitem-title" id="ielts-simulation-listening-test-1">

                      <span class="mr-1 fas fa-check-circle text-success"></span>

                      Test 1
                    </h2>
                    <div class="testitem-info-wrapper">
                      <div>
                        <span class="testitem-info">
                          <span class="far fa-clock mr-1"></span>40 phút


                          | <span class="far fa-user mr-1"></span>309612

                        </span>
                      </div>
                      <div>
                        <span class="testitem-info">
                          4 phần thi |40 câu hỏi
                        </span>
                      </div>
                    </div>

                    <div class="testitem-tags mt-2">
                      <span class="tag">IELTS Academic</span>
                      <span class="tag">Listening</span>
                    </div>
                    <br>
                  </a>
                  <div class="testitem-start-test"><a class="text-dark" href="">
                    </a><a href="CheckTest\seeresult.html" class="btn btn-block btn-outline-secondary">Xem kết quả</a>
                  </div>
                </div>
              </div>
            </div> */}
let dataBaithi = [
  {
    title: "Test 1",
    time: "40 phút",
    user: "309612",
    question: "40 câu hỏi",
    tags: ["IELTS Academic", "Listening"],
    done: true,
    link: "/Main/CheckTest/seeresult.html",
  },
  {
    title: "Test 2",
    time: "40 phút",
    user: "309612",
    question: "40 câu hỏi",
    tags: ["IELTS Academic", "Listening"],
    done: false,
    link: "/Main/CheckTest/seeresult.html",
  },
  {
    title: "Test 3",
    time: "40 phút",
    user: "309612",
    question: "40 câu hỏi",
    tags: ["IELTS Academic", "Listening"],
    done: false,
    link: "/Main/CheckTest/seeresult.html",
  },
];
let container = document.querySelector('.testitem-grid.row');

// Clear the container
container.innerHTML = '';

// Add a new div for each test
dataBaithi.forEach(function(test) {
  let div = document.createElement('div');
  div.className = 'col-6 col-md-3';
  
  let wrapper = document.createElement('div');
  wrapper.className = 'testitem-wrapper';
    
  let a = document.createElement('a');
    a.className = 'text-dark';
    a.href = test.link;
    
    let h2 = document.createElement('h2');
    h2.className = 'testitem-title';
    h2.id = test.title;
    if (test.done) {
      let span = document.createElement('span');
      span.className = 'mr-1 fas fa-check-circle text-success';
      h2.appendChild(span);
    }
    h2.appendChild(document.createTextNode(test.title));
    a.appendChild(h2);

    let infoWrapper = document.createElement('div');
    infoWrapper.className = 'testitem-info-wrapper';
    let div1 = document.createElement('div');
    let span1 = document.createElement('span');
    span1.className = 'testitem-info';
    span1.innerHTML = `<span class="far fa-clock mr-1"></span>${test.time} | <span class="far fa-user mr-1"></span>${test.user}`;
    div1.appendChild(span1);
    infoWrapper.appendChild(div1);
    let div2 = document.createElement('div');
    let span2 = document.createElement('span');
    span2.className = 'testitem-info';
    span2.innerHTML = `4 phần thi | ${test.question}`;
    div2.appendChild(span2);
    infoWrapper.appendChild(div2);
    a.appendChild(infoWrapper);

    let tags = document.createElement('div');
    tags.className = 'testitem-tags mt-2';
    test.tags.forEach(function(tag) {
      let span = document.createElement('span');
      span.className = 'tag';
      span.appendChild(document.createTextNode(tag));
      tags.appendChild(span);
    });
    a.appendChild(tags);
    a.appendChild(document.createElement('br'));
    wrapper.appendChild(a);
    let startTest = document.createElement('div');
    startTest.className = 'testitem-start-test';
    let a2 = document.createElement('a');
    a2.className = 'text-dark';
    a2.href = test.link;
    startTest.appendChild(a2);
    let a3 = document.createElement('a');
    a3.className = 'btn btn-block btn-outline-secondary';
    a3.href = test.link;
    if (test.done) {
      a3.appendChild(document.createTextNode('Xem kết quả'));
    } else {
    a3.appendChild(document.createTextNode('Chi tiết'));
    a3.style.color = "#35509a";
    a3.style.borderColor = "#35509a";
    }

    startTest.appendChild(a3);
    wrapper.appendChild(startTest);
    div.appendChild(wrapper);
    container.appendChild(div);
});