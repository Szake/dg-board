var data = [
  { id: 1,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 2,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 3,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 4,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },

  { id: 1,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 2,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 3,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 4,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },

  { id: 1,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 2,  operation: { type: '+', o1: 1, o2: 4, r: 5 } }, // 10
  { id: 3,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 4,  operation: { type: '+', o1: 1, o2: 4, r: 5 } }, // 12

  { id: 1,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 2,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 3,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 4,  operation: { type: '+', o1: 1, o2: 4, r: 5 } }, // 16

  { id: 1,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 2,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 3,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 4,  operation: { type: '+', o1: 1, o2: 4, r: 5 } }, // 20

  { id: 1,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 2,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 3,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 4,  operation: { type: '+', o1: 1, o2: 4, r: 5 } }, // 24

  { id: 1,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 2,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 3,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 4,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },

  { id: 1,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 2,  operation: { type: '+', o1: 1, o2: 4, r: 5 } }, // 30
  { id: 3,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 4,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },

  { id: 1,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 2,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 3,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 4,  operation: { type: '+', o1: 1, o2: 4, r: 5 } }, // 36

  { id: 1,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 2,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 3,  operation: { type: '+', o1: 1, o2: 4, r: 5 } },
  { id: 4,  operation: { type: '+', o1: 1, o2: 4, r: 5 } }, // 40
];

let countStepSize = (cell_el, board_size) => {
  let width = 100/board_size.cols;
  let height = 100/board_size.rows;

  cell_el.style.width = width + '%';
  cell_el.style.height = height + '%';

  return { width, height };
};

let countStepPosition = (cell_el, cell_index, cell_size, board_size) => {
  let pos_top = 0, pos_left = 0, pos_index = 0, pos_class = [];
  let order = cell_index + 1;

  // Main path, back bottom, left bottom:
  let main_s = 1,
      main_f = board_size.cells - board_size.rows - board_size.cols + 1;

  let bottom_s = board_size.cells - board_size.rows - board_size.cols + 2,
      bottom_f = board_size.cells - board_size.rows;

  let left_s = board_size.cells - board_size.rows + 1,
      left_f = board_size.cells - 1;
  let finish = board_size.cells;

  // console.log(main_s, '-', main_f);
  // console.log(bottom_s, '-', bottom_f);
  // console.log(left_s, '-', left_f);

  if      (order <= main_f) {
    let range_v = board_size.rows - 1, // bottom line is a back path
        range_h = board_size.cols - 1; // left line is a back path
    let row = (order - 1) % range_v,
        column = Math.ceil(order / range_v); // column order in the path
    let round = +!(column % 2); // odd or even, 0 or 1
    // console.log(order, row, column, round);

    pos_top = cell_size.height * (!round ? row : (range_v - row - 1));
    pos_left = cell_size.width * column;
    pos_class.push(!(order % range_v) && order !== main_f ? 'to-right' : (!round || order === main_f) ? 'to-bottom' : 'to-top');
  }
  else if (order <= bottom_f) {
    pos_top = cell_size.height * (board_size.rows - 1);
    pos_left = cell_size.width * (board_size.cols - (order - bottom_s) - 1);
    pos_class.push('to-left');
  }
  else if (order <= left_f) {
    let group_index = (board_size.rows - (order - left_s) - 1); // 0, 1, 2, ...
    pos_top = cell_size.height * group_index;
    pos_left = 0;
    pos_class.push('to-top');
  }
  else if (order === finish) {
    pos_top = pos_left = 0;
    pos_class.push('to-right', 'root');
  }

  cell_el.style.top = pos_top + '%';
  cell_el.style.left = pos_left + '%';
  cell_el.classList.add(...pos_class);
  return { pos_top, pos_left };
};

let createStep = (step_data, step_index, board_holder, board_size) => {

  // Create element Func:
  let create = (tagName, className, text, board_holder) => {
    let element = document.createElement(tagName);
        element.className = className;

        if (text) { element.textContent = text; }
        if (board_holder) { board_holder.appendChild(element); }

    return element;
  };

  // Serve step order:
  let id = step_index + 1;
  let index = step_index;

  // Create a wrapper element:
  let step_b = create('div', 'board-step', null, board_holder);

  // Create a step path:
  let step_p = create('div', 'board-step-path', null, step_b);

  // Create an inner element:
  let step_i = create('div', 'board-step-inner', step_data.text, step_b);

  // Create a step label:
  let step_l = create('span', 'board-step-label', id, step_i);

  // Create operation components:
  let o_1 = create('span', 'board-step-unit unit-operand', step_data.operation.o1, step_i); // operand #1
  let s_a = create('span', 'board-step-unit unit-action', step_data.operation.type, step_i); // operator
  let o_2 = create('span', 'board-step-unit unit-operand', step_data.operation.o2, step_i); // operand #2
  let s_e = create('span', 'board-step-unit unit-equal', '=', step_i);
  let o_r = create('span', 'board-step-unit unit-result', step_data.operation.r, step_i); // result

  // Create an arrow element:
  let step_a = create('div', 'board-step-arrow', null, step_b);

  // Count step position and block size:
  let size = countStepSize(step_b, board_size);
  let position = countStepPosition(step_b, step_index, size, board_size);

  // Return Object:
  return step = {
    id,
    index,
    elements: {
      block: step_b,
      arrow: step_a,
      inner: step_i,
      label: step_l,
      operation: {
        operand_1: o_1,
        action: s_a,
        operand_2: o_2,
        equal: s_e,
        result: o_r
      }
    },
    size,
    position
  };
};

let countBoardSize = (board_holder, board_data) => {
  let rows, cols, cells = board_data.length;
  let sizes = [10, 12, 16, 20, 24, 30, 36, 40];

  if (!~sizes.indexOf(cells)) {
    throw new Error(`Not enough data(${cells}) to build the board. Allowed sizes: ${sizes.join(', ')}.`);
  }

  // Count rows and columns:
  if      (cells <= 10) { rows = 2; cols = 5; cells = 10; }
  else if (cells <= 12) { rows = 3; cols = 4; cells = 12; } // remove
  else if (cells <= 16) { rows = 4; cols = 4; cells = 16; }
  else if (cells <= 20) { rows = 5; cols = 4; cells = 20; }
  else if (cells <= 24) { rows = 4; cols = 6; cells = 24; }
  else if (cells <= 30) { rows = 5; cols = 6; cells = 30; }
  else if (cells <= 36) { rows = 6; cols = 6; cells = 36; }
  else                  { rows = 5; cols = 8; cells = 40; }

  // Add special class that means size:
  let board_class = cells <= 16 ? 'board_sm' : cells <= 30 ? 'board_md' : 'board_lg';
  board_holder.classList.add(board_class);

  return { rows, cols, cells };
};

let createBoard = (board_holder, board_data) => {
  try {
    // Check holder and data:
    if (!board_holder || !board_data || !(board_data instanceof Array)) {
      throw new Error('Holder and Data are necessary.');
    }

    // Add special class:
    board_holder.classList.add('board');

    // Create an Object with VIEW info:
    let size = countBoardSize(board_holder, board_data);

    // Create an array of STEPS:
    let steps = board_data.map((item, index, list) => {
      let step = createStep(item, index, board_holder, size);
      board_holder.appendChild(step.elements.block);
      return step;
    });

    // Create a board Object:
    let board = { holder: board_holder, steps, size };

    // Return the Object:
    return board;
  }
  catch (error) {
    console.error(error);
    return;
  }  
};

// Sizes: 10, 12, 16, 20, 24, 30, 36, 40
let board = createBoard(document.getElementById('board'), data.slice(0, 12));
console.log(board);