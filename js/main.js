const canvas = document.getElementById("canvas");
const canvasCoordenadas = document.getElementById("canvasCoordenadas");

const ctx = canvas.getContext("2d");

const window_height = "300";
const window_width = "500";

canvas.height = window_height;
canvas.width = window_width;

canvas.style.backgroundColor = "#b7f7ed";

class Circle {
  constructor(x, y, radius, color, text, backcolor, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.backcolor = backcolor;

    this.speed = speed;

    this.dx = 1 * this.speed; //direccion en x
    this.dy = 1 * this.speed; //direccion en y
  }

  draw(context) {
    //Rellena el objeto
    context.beginPath();
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.backcolor;
    context.fill();

    //Dibuja la línea del objeto
    context.lineWidth = 5;
    context.strokeStyle = this.color;
    context.stroke();

    //Dibuja el texto al centro del objeto
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "bold 20px cursive";
    context.fillStyle = "white";
    context.fillText(this.text, this.posX, this.posY);

    context.closePath();
  }

  update(context) { // metodo que pemite mover el objeto
    this.draw(context);

    //Si el circulo supera el margen derecho entonces se mueve a la izquierda
        //posicion x, radio 
    if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
      this.dx = -this.dx;
    }

    //Si el circulo supera el margen superior entonces se mueve a abajo
    if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.posX += this.dx; //posicion en x
    this.posY += this.dy;
  }
}
/*
lblX.innertHTML = this.posX.toFixed(1);
lblY.innertHTML = this.posY.toFixed(1);

let randomRadius = Math.floor(Math.random() * 60 + 20);
let randomX = Math.random() * window_width;
let randomY = Math.random() * window_height;
let randomBackcolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
let randomStrokecolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";

//se valida que la pelota siempre comience dentro del canvas en x & y
randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, "1", randomBackcolor, 2);
miCirculo.draw(ctx);

let updateCircle = function () {
  requestAnimationFrame(updateCircle); // metodo que permite estar renderizando constantemente mi diseño
  ctx.clearRect(0, 0, window_width, window_height); //elimino todo loque hay en la pantalla
  miCirculo.update(ctx);
};

updateCircle(); // se llama constantemente, limpia pantalla y dibuja 
*/
const nCircles = 10;

let circles = [];

for (let i = 0; i < nCircles; i++) {
  let randomRadius = Math.floor(Math.random() * 30 + 20);
  let randomX = Math.random() * window_width;
  let randomY = Math.random() * window_height;
  let randomBackcolor = "rgba(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ",0.4)";
  let randomStrokecolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
  let randomSpeed= Math.random()*3+1;

  randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
  randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

  let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, i+1, randomBackcolor, randomSpeed);
  circles.push(miCirculo);
}

let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);
  circles.forEach((circle) => {
    circle.update(ctx);
  });
};
updateCircle();

function createCoordinatesTable() {
  const tableContainer = document.getElementById('coordinatesTableContainer');
  tableContainer.innerHTML = ""; // Clear previous table

  const table = document.createElement('table');
  table.classList.add('table', 'table-striped', 'table-bordered');

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['ID', 'Coordenada X', 'Coordenada Y'];

  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  circles.forEach((circle, index) => {
    const row = document.createElement('tr');

    const cellID = document.createElement('td');
    cellID.textContent = circle.text;
    row.appendChild(cellID);

    const cellX = document.createElement('td');
    cellX.textContent = circle.posX.toFixed(1);
    row.appendChild(cellX);

    const cellY = document.createElement('td');
    cellY.textContent = circle.posY.toFixed(1);
    row.appendChild(cellY);

    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  tableContainer.appendChild(table);
}