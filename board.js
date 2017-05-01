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


class GameBoard {
  constructor(holder, data) {
    try {
      if (!holder || !data || !(data instanceof Array)) {
        throw new Error('Holder and Data are necessary.');
      }
      this.board = this._boardCreate(holder, data);
      this.steps = this._stepsCreate(holder, data);
    }
    catch (error) {
      console.error(error);
      return;
    }
  }

  // Private:
  _boardCreate(holder, data) {
    let rows, cols, cells = data.length;
    let sizes = [10, 12, 16, 20, 24, 30, 36, 40];

    if (!~sizes.indexOf(cells)) {
      throw new Error(`Not enough data(${cells}) to build the board. Allowed sizes: ${sizes.join(', ')}.`);
    }

    // Count rows and columns:
    if      (cells <= 10) { rows = 2; cols = 5; cells = 10; }
    else if (cells <= 16) { rows = 4; cols = 4; cells = 16; }
    else if (cells <= 20) { rows = 5; cols = 4; cells = 20; }
    else if (cells <= 24) { rows = 4; cols = 6; cells = 24; }
    else if (cells <= 30) { rows = 5; cols = 6; cells = 30; }
    else if (cells <= 36) { rows = 6; cols = 6; cells = 36; }
    else                  { rows = 5; cols = 8; cells = 40; }

    // Add special class that means size:
    let classes = ['board'];
    classes.push(`board-${cells <= 16 ? 'sm' : cells <= 30 ? 'md' : 'lg'}`);
    classes.push(`rows-${rows}`, `cols-${cols}`);
    holder.classList.add(...classes);

    return {
      element: holder,
      size: { rows, cols, cells }
    };
  }
  _stepsCreate(holder, data) {
    return data.map((item, index, list) => {
      // Serve step order:
      let id = index + 1;
      let element = this._cellCreate(item, index, holder);
      let box = this._cellCountPosition(element.block, index, this.board.size);

      return { id, index, element, box };
    });
  }
  _cellCreate(item, index, holder) {

    // Create a wrapper element:
    let block = this._elemCreate('div', 'board-step', null, holder);
    // Create a step path:
    let path = this._elemCreate('div', 'board-step-path', null, block);
    // Create an inner element:
    let inner = this._elemCreate('div', 'board-step-inner', null, block);
    // Create a step label:
    let label = this._elemCreate('span', 'board-step-label', index + 1, inner);
    // Create an arrow element:
    let arrow = this._elemCreate('div', 'board-step-arrow', null, block);

    // Create operation components:
    let o_1 = this._elemCreate('span', 'board-step-unit unit-operand', item.operation.o1, inner); // operand #1
    let s_a = this._elemCreate('span', 'board-step-unit unit-action', item.operation.type, inner); // operator
    let o_2 = this._elemCreate('span', 'board-step-unit unit-operand', item.operation.o2, inner); // operand #2
    let s_e = this._elemCreate('span', 'board-step-unit unit-equal', '=', inner);
    let o_r = this._elemCreate('span', 'board-step-unit unit-result', item.operation.r, inner); // result

    return { block, path, inner, label, arrow, operation: { o_1, s_a, o_2, s_e, o_r } };
  }
  _cellCountPosition(element, index, board_size) {
    let top = 0, left = 0, 
        classes = [],
        order = index + 1;
    let width = 100/board_size.cols,
        height = 100/board_size.rows;

    // Main path, back bottom, left bottom:
    let main_s = 1,
        main_f = board_size.cells - board_size.rows - board_size.cols + 1;

    let bottom_s = board_size.cells - board_size.rows - board_size.cols + 2,
        bottom_f = board_size.cells - board_size.rows;

    let left_s = board_size.cells - board_size.rows + 1,
        left_f = board_size.cells - 1;

    let finish = board_size.cells;

    if      (order <= main_f) {
      let range_v = board_size.rows - 1, // bottom line is a back path
          range_h = board_size.cols - 1; // left line is a back path
      let row = (order - 1) % range_v,
          column = Math.ceil(order / range_v); // column order in the path
      let round = +!(column % 2); // odd or even, 0 or 1
      // console.log(order, row, column, round);

      top = height * (!round ? row : (range_v - row - 1));
      left = width * column;
      classes.push(!(order % range_v) && order !== main_f ? 'to-right' : (!round || order === main_f) ? 'to-bottom' : 'to-top');
    }
    else if (order <= bottom_f) {
      top = height * (board_size.rows - 1);
      left = width * (board_size.cols - (order - bottom_s) - 1);
      classes.push('to-left');
    }
    else if (order <= left_f) {
      let group_index = (board_size.rows - (order - left_s) - 1); // 0, 1, 2, ...
      top = height * group_index;
      left = 0;
      classes.push('to-top');
    }
    else if (order === finish) {
      top = left = 0;
      classes.push('to-right', 'root');
    }

    element.style.top = top + '%';
    element.style.left = left + '%';
    element.style.width = width + '%';
    element.style.height = height + '%';

    element.classList.add(...classes);
    return { top, left, width, height };
  }
  _elemCreate(tag, classes, text, holder) {
    let element = document.createElement(tag);
    if (classes) { element.className = classes; }
    if (text)    { element.textContent = text; }
    if (holder)  { holder.appendChild(element); }

    return element;
  }

  // Public:
  setColor(params) {
    if (!params || !(params instanceof Object)) return;
    let components = Object.keys(params);
    let types = ['board', 'path', 'step', 'label', 'arrow'];
    let pattern = /^(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3})$/;

    components.forEach((component) => {
      let elements = [], 
          properties = [], 
          color = params[component];

      if (!~types.indexOf(component) || !pattern.test(color)) return;

      switch(component) {
        case 'board': 
          elements.push(this.board.element); 
          properties.push('backgroundColor');
          break;
        case 'path': 
          elements = this.steps.map((step) => { return step.element.path; }); 
          properties.push('backgroundColor');
          break;
        case 'step': 
          elements = this.steps.map((step) => { return step.element.inner; }); 
          properties.push('backgroundColor');
          break;
        case 'label': 
          elements = this.steps.map((step) => { return step.element.label; }); 
          properties.push('backgroundColor');
          break;
        case 'arrow': 
          elements = this.steps.map((step) => { return step.element.arrow; }); 
          properties.push('backgroundColor', 'color');
          break;
      }

      elements.forEach((element) => {
        properties.forEach((property) => {
          element.style[property] = color;
        });
      });
    });
  }
}


// Sizes: 10, 12, 16, 20, 24, 30, 36, 40
let cgBoard = new GameBoard(document.getElementById('board'), data.slice(0, 16));
// cgBoard.setColor({'arrow': '#000', 'board': '#eee', 'step': '#000', 'path': '#fff00f', 'label': '#000'});


// Test entity:
let walkPath = (board) => {
  if (!board || !board.steps || !board.steps.length) return;

  let setPosition = (entity, step) => {
    entity.style.top = step.box.top + step.box.height/2 + '%';
    entity.style.left = step.box.left + step.box.width/2 + '%';
  };

  // Create entity:
  let entity = document.createElement('div');
      entity.className = 'board-entity';
      setPosition(entity, board.steps[board.steps.length - 1]);

  let holder = board.board.element;
      holder.appendChild(entity);

  let rootel = board.steps[board.steps.length - 1];
      rootel.element.block.classList.add('active');

  let counter = 0;
  let walk = () => {
    let prev = board.steps[counter - 1] || board.steps[board.steps.length - 1];
    let next = board.steps[counter];

    prev && prev.element.block.classList.remove('active');
    next && next.element.block.classList.add('active');

    setPosition(entity, board.steps[counter]);
    counter = counter < board.steps.length - 1 ? counter + 1 : 0;
  };
  setInterval(walk, 500);
}
walkPath(cgBoard);

