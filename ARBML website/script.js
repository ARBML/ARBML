// example to add card
cardjson = {
  project: "websites",
  title: "مقارب الكلمات",
  desc: "مولد للكلمات المقاربة بناءا على الكلمة المدخلة",
  githubLink: "link",
  colabLink: "link",
  liveLink: "link",
  addedby: "الإدارة"
};
$(document).ready(function() {
  function addCard(cardjson) {
    cardjson.desc = cardjson.desc.replace(/(?:\r\n|\r|\n)/g, "<br>");
    newCard = `
      <div class="card text-center">
                        <div class="card-header">
                          ${cardjson.title}
                        </div>
                        <div class="card-body">
                          <p class="card-props">
                                ${cardjson.desc}
                              </p>
                          </p>
                          <div class="card-buttons">
                            <a href="${
                              cardjson.githubLink
                            }" class="btn btn-outline-dark">
                              تصفح   على GitHub <i class="fa fa-github"></i>
                            </a>
                            <a href="${
                              cardjson.colabLink
                            }" class="btn btn-outline-warning"
                              >تصفح   على Google Colab
                              <i class="fa fa-google" aria-hidden="true"></i
                            ></a>
                            <a href="${
                              cardjson.liveLink
                            }" class="btn btn-outline-primary"
                              >تجربة حية <i class="fa fab fa-chrome"></i
                            ></a>
                          </div>
                        </div>
                        <div class="card-footer text-muted">
                          أضيف بواسطة ${cardjson.addedby}
                        </div>
                      </div>
      `;
    $(`#${cardjson.project} .cards`).append(newCard);
  }
  //   addCard(cardjson);
});
