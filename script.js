const gridContainer = document.getElementById("grid-container");
const resetButton = document.getElementById("reset-button");
const resizeButton = document.getElementById("resize-button");

let gridSize = 16;
const maxSize = 100;

function createGrid(size) {
  gridContainer.innerHTML = "";

  const cellSize = 80 / size + "vmin";

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    cell.style.width = cellSize;
    cell.style.height = cellSize;
    cell.dataset.opacity = "0";

    cell.addEventListener("mouseover", () => {
      let currentOpacity = parseFloat(cell.dataset.opacity);
      if (currentOpacity < 1) {
        currentOpacity += 0.1;
        cell.dataset.opacity = currentOpacity;
      }

      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      cell.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`;
    });
    gridContainer.appendChild(cell);
  }
}
resetButton.addEventListener("click", () => {
  const cells = document.querySelectorAll(".grid-cell");
  cells.forEach((cell) => {
    cell.style.backgroundColor = "rgba(0, 0, 0, 0)";
    cell.dataset.opacity = "0";
  });
});

resizeButton.addEventListener("click", () => {
  let newSize = prompt(`Enter new grid size (1-${maxSize}):`);
  if (newSize && !isNaN(newSize)) {
    newSize = parseInt(newSize);
    switch (true) {
      case newSize > 0 && newSize <= maxSize:
        gridSize = newSize;
        createGrid(gridSize);
        break;
      case newSize <= 0:
        alert("Size must be a positive number.");
        break;
      case newSize > maxSize:
        alert(`Size must be a number between 1 and ${maxSize}.`);
        break;
      default:
        alert("Please enter a valid number.");
    }
  } else {
    alert("Please enter a valid number.");
  }
});

createGrid(gridSize);
