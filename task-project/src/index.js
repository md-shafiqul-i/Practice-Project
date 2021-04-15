import "./styles/index.css";

window.onload = function () {
  const taskFild = document.querySelector("#taskFild");
  const addBtn = document.querySelector("#addBtn");
  const allTask = document.querySelector("#allTask");

  taskFild.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
      event.stopPropagation();

      if (this.value) {
        creatTask(allTask, event.target.value);
        this.value = "";
      } else {
        alert("Please Put Some Data");
      }
    }
  });

  addBtn.addEventListener("click", function () {
    let parent = allTask;
    let task = taskFild.value;

    if (taskFild.value) {
      creatTask(parent, task);

      taskFild.value = "";
    } else {
      alert("Please Put Some Data");
    }
  });
};

function creatTask(parent, task) {
  let col = create({
    class: "col-sm-3",
  });
  let singleTask = create({
    class: "single-task d-flex",
  });
  let singleTaskP = create("p");
  singleTaskP.innerHTML = task;
  let span = create("span", {
    class: "ms-auto",
  });
  span.innerHTML = `<i class="fas fa-times-circle"></i>`;
  span.addEventListener("click", function () {
    parent.removeChild(col);
  });

  let taskControl = creatControl(singleTask);
  taskControl.style.visibility = "hidden";
  singleTask.appendChild(taskControl);

  singleTask.onmouseenter = function () {
    taskControl.style.visibility = "visible";
  };

  singleTask.onmouseleave = function () {
    taskControl.style.visibility = "hidden";
  };

  singleTask.appendChild(singleTaskP);
  singleTask.appendChild(span);
  col.appendChild(singleTask);
  parent.appendChild(col);
}

function creatControl(parent) {
  let controlPanel = create({
    class: "control-panel d-flex align-items-center",
  });

  let colorPallete = creatcolorPallete(parent);
  controlPanel.appendChild(colorPallete);

  let editBtn = createditBtn(parent);
  controlPanel.appendChild(editBtn);

  return controlPanel;
}

function creatcolorPallete(parent) {
  const colors = [
    "palegreen",
    "skyblue",
    "powderblue",
    "salmon",
    "grey",
    "red",
  ];

  let colorDiv = create({
    class: "d-flex",
  });

  colors.forEach((color) => {
    let div = create({
      class: "color-circle ms-1",
    });
    div.style.background = color;
    div.addEventListener("click", function () {
      parent.style.background = color;
    });
    colorDiv.appendChild(div);
  });

  return colorDiv;
}

function createditBtn(parent) {
  let span = create("span", {
    class: "ms-auto",
  });
  span.innerHTML = `<i class="fas fa-user-edit"></i>`;

  span.addEventListener("click", function () {
    let p = parent.querySelector("p");
    let textArea = create("textarea", {
      class: "text-area",
    });
    textArea.style.width = parent.offsetWidth + "px";
    textArea.style.height = parent.offsetHeight + "px";
    textArea.innerHTML = p.innerHTML;

    textArea.addEventListener("keypress", function (event) {
      if (event.keyCode === 13) {
        event.stopPropagation();

        if (this.value) {
          p.innerHTML = this.value;
          parent.removeChild(this);
        } else {
          alert("Please Put Some Data");
        }
      }
    });

    parent.appendChild(textArea);
  });

  return span;
}

window.create = function () {
  if (arguments.length === 0) {
    return document.createElement("div");
  }

  if (arguments.length === 1 && typeof arguments[0] != "object") {
    return document.createElement(arguments[0]);
  }

  var tag = arguments[0];
  var attr = arguments[1] || arguments[0];

  if (arguments.length === 1 && typeof arguments[0] === "object") {
    tag = "div";
  }

  var element = document.createElement(tag);

  for (var i in attr) {
    element.setAttribute(i, attr[i]);
  }
  return element;
};
