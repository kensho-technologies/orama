/* eslint-disable */

// adapted from https://github.com/tinker10/D3-Labeler by Evan Wang (MIT license)
const Labeler = function Labeler() {
  let lab = [],
    anc = [],
    movable = [],
    startX = 0,
    startY = 0,
    endX = 1, // box width
    endY = 1, // box width
    w = 1, // box width
    h = 1, // box width
    past_state = {},
    labeler = {}

  let max_move = 5.0,
    max_angle = 0.5,
    acc = 0,
    rej = 0

  // weights
  let w_len = 0.2, // leader line length
    w_inter = 1.0, // leader line intersection
    w_lab2 = 30.0, // label-label overlap
    w_lab_anc = 30.0, // label-anchor overlap
    w_orient = 3.0 // orientation bias

  // booleans for user defined functions
  let user_energy = false,
    user_schedule = false

  let user_defined_energy, user_defined_schedule

  function energy(index) {
    // energy function, tailored for label placement
    let m = lab.length,
      ener = 0,
      dx = lab[index].x - anc[index].x,
      dy = anc[index].y - lab[index].y,
      dist = Math.sqrt(dx * dx + dy * dy),
      overlap = true,
      amount = 0,
      theta = 0

    // penalty for length of leader line
    if (dist > 0) ener += dist * w_len

    // label orientation bias
    dx /= dist
    dy /= dist
    if (dx > 0 && dy > 0) {
      ener += 0 * w_orient
    } else if (dx < 0 && dy > 0) {
      ener += 1 * w_orient
    } else if (dx < 0 && dy < 0) {
      ener += 2 * w_orient
    } else {
      ener += 3 * w_orient
    }

    let x21 = lab[index].x,
      y21 = lab[index].y - lab[index].height + 2.0,
      x22 = lab[index].x + lab[index].width,
      y22 = lab[index].y + 2.0
    let x11, x12, y11, y12, x_overlap, y_overlap, overlap_area

    for (let i = 0; i < m; i++) {
      if (i != index) {
        // penalty for intersection of leader lines
        overlap = intersect(
          anc[index].x,
          lab[index].x,
          anc[i].x,
          lab[i].x,
          anc[index].y,
          lab[index].y,
          anc[i].y,
          lab[i].y
        )
        if (overlap) ener += w_inter

        // penalty for label-label overlap
        x11 = lab[i].x
        y11 = lab[i].y - lab[i].height + 2.0
        x12 = lab[i].x + lab[i].width
        y12 = lab[i].y + 2.0
        x_overlap = Math.max(0, Math.min(x12, x22) - Math.max(x11, x21))
        y_overlap = Math.max(0, Math.min(y12, y22) - Math.max(y11, y21))
        overlap_area = x_overlap * y_overlap
        ener += overlap_area * w_lab2
      }

      // penalty for label-anchor overlap
      x11 = anc[i].x - anc[i].r
      y11 = anc[i].y - anc[i].r
      x12 = anc[i].x + anc[i].r
      y12 = anc[i].y + anc[i].r
      x_overlap = Math.max(0, Math.min(x12, x22) - Math.max(x11, x21))
      y_overlap = Math.max(0, Math.min(y12, y22) - Math.max(y11, y21))
      overlap_area = x_overlap * y_overlap
      ener += overlap_area * w_lab_anc
    }
    return ener
  }

  function mcmove(currT) {
    // Monte Carlo translation move

    // select a random label if once hasn't been passed in
    const i = select_label_index()

    // save old coordinates
    const x_old = lab[i].x
    const y_old = lab[i].y

    // old energy
    let old_energy
    if (user_energy) {
      old_energy = user_defined_energy(i, lab, anc)
    } else {
      old_energy = energy(i)
    }

    // random translation
    lab[i].x += (Math.random() - 0.5) * max_move
    lab[i].y += (Math.random() - 0.5) * max_move

    // hard wall boundaries
    if (lab[i].x >= endX) lab[i].x = x_old
    if (lab[i].x <= startX) lab[i].x = x_old
    if (lab[i].y >= endY) lab[i].y = y_old
    if (lab[i].y <= startY) lab[i].y = y_old

    // new energy
    let new_energy
    if (user_energy) {
      new_energy = user_defined_energy(i, lab, anc)
    } else {
      new_energy = energy(i)
    }

    // delta E
    const delta_energy = new_energy - old_energy

    if (move_to_new_pos(delta_energy, currT, i)) {
      acc += 1
    } else {
      // move back to old coordinates
      lab[i].x = x_old
      lab[i].y = y_old
      rej += 1
    }
  }

  function mcrotate(currT) {
    // Monte Carlo rotation move

    // select a random label if once hasn't been passed in
    const i = select_label_index()

    // save old coordinates
    const x_old = lab[i].x
    const y_old = lab[i].y

    // old energy
    let old_energy
    if (user_energy) {
      old_energy = user_defined_energy(i, lab, anc)
    } else {
      old_energy = energy(i)
    }

    // random angle
    const angle = (Math.random() - 0.5) * max_angle

    const s = Math.sin(angle)
    const c = Math.cos(angle)

    // translate label (relative to anchor at origin):
    lab[i].x -= anc[i].x
    lab[i].y -= anc[i].y

    // rotate label
    let x_new = lab[i].x * c - lab[i].y * s,
      y_new = lab[i].x * s + lab[i].y * c

    // translate label back
    lab[i].x = x_new + anc[i].x
    lab[i].y = y_new + anc[i].y

    // hard wall boundaries
    if (lab[i].x > w) lab[i].x = x_old
    if (lab[i].x < 0) lab[i].x = x_old
    if (lab[i].y > h) lab[i].y = y_old
    if (lab[i].y < 0) lab[i].y = y_old

    // new energy
    let new_energy
    if (user_energy) {
      new_energy = user_defined_energy(i, lab, anc)
    } else {
      new_energy = energy(i)
    }

    // delta E
    const delta_energy = new_energy - old_energy

    if (move_to_new_pos(delta_energy, currT, i)) {
      acc += 1
    } else {
      // move back to old coordinates
      lab[i].x = x_old
      lab[i].y = y_old
      rej += 1
    }
  }

  var intersect = (x1, x2, x3, x4, y1, y2, y3, y4) => {
    // returns true if two lines intersect, else false
    // from http://paulbourke.net/geometry/lineline2d/

    let mua, mub
    let denom, numera, numerb

    denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1)
    numera = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)
    numerb = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)

    /* Is the intersection along the the segments */
    mua = numera / denom
    mub = numerb / denom
    if (!(mua < 0 || mua > 1 || mub < 0 || mub > 1)) {
      return true
    }
    return false
  }

  // linear cooling
  const cooling_schedule = (currT, initialT, nsweeps) => currT - initialT / nsweeps

  // if false keep old position otherwise take new one
  var move_to_new_pos = (delta_energy, currT, i) => Math.random() < Math.exp(-delta_energy / currT)

  // chose a random label from the ones that are movable
  var select_label_index = () => movable[Math.floor(Math.random() * movable.length)]

  function set_movable_labels() {
    // determine which labels can move after a label selection change

    function unchanged_from_last_selection(label_index) {
      const _id = lab[label_index]._id
      return (
        _id in past_state &&
        past_state[_id].anchor.x === anc[label_index].x &&
        past_state[_id].anchor.y === anc[label_index].y
      )
    }

    function not_in_current_label_set(_id) {
      for (const i in lab) {
        if (_id === lab[i]._id) return false
      }
      return true
    }

    // indices of labels present before the selection change
    const old_labels = lab.map((d, i) => i).filter(unchanged_from_last_selection)

    // indices of labels added with the selection change
    const new_labels = lab
      .map((d, i) => i)
      .filter(label_index => !unchanged_from_last_selection(label_index))

    // labels removed by the section change
    const removed_labels = Object.keys(past_state)
      .filter(not_in_current_label_set)
      .map(_id => past_state[_id].label)

    const linear_distance = (x1, y1, x2, y2) =>
      Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))

    const rerun_near = new_labels.map(i => lab[i]).concat(removed_labels)

    function near_new_label(label_index) {
      const label = lab[label_index]
      const threshold = 10 * label.name.length
      for (let i = 0; i < rerun_near.length; i++) {
        if (linear_distance(label.x, label.y, rerun_near[i].x, rerun_near[i].y) <= threshold)
          return true
      }
      return false
    }

    // labels that can change position in this run of the annealing algorithm
    movable = new_labels.concat(old_labels.filter(near_new_label))
  }

  function initialize_labels() {
    lab.forEach((label, i) => {
      if (label._id in past_state) {
        lab[i].x = past_state[lab[i]._id].label.x
        lab[i].y = past_state[lab[i]._id].label.y
      }
    })

    movable.forEach(i => {
      lab[i].x = anc[i].x + 10
      lab[i].y = anc[i].y + 10
    })
  }

  labeler.start = nsweeps => {
    // main simulated annealing function
    let m = lab.length,
      currT = 1.0,
      initialT = 1.0

    set_movable_labels()
    initialize_labels()
    if (movable.length) {
      for (var i = 0; i < nsweeps; i++) {
        for (let j = 0; j < m; j++) {
          if (Math.random() < 0.5) {
            mcmove(currT)
          } else {
            mcrotate(currT)
          }
        }
        currT = cooling_schedule(currT, initialT, nsweeps)
      }
    }

    past_state = {}
    for (i = 0; i < m; i++) {
      past_state[lab[i]._id] = {label: lab[i], anchor: anc[i]}
    }

    return labeler
  }

  labeler.plotRect = plotRect => {
    // users insert graph plotRect {x1, x2, y1, y2}
    startX = plotRect.x
    startY = plotRect.y
    endX = plotRect.x + plotRect.width
    endY = plotRect.y + plotRect.height
    w = plotRect.width
    h = plotRect.height
    return labeler
  }

  labeler.width = (...args) => {
    // users insert graph width
    if (!args.length) return w
    w = args[0]
    return labeler
  }

  labeler.height = (...args) => {
    // users insert graph height
    if (!args.length) return h
    h = args[0]
    return labeler
  }

  labeler.label = (...args) => {
    // users insert label positions
    if (!args.length) return lab
    lab = args[0]
    return labeler
  }

  labeler.anchor = (...args) => {
    // users insert anchor positions
    if (!args.length) return anc
    anc = args[0]
    return labeler
  }

  labeler.alt_energy = (...args) => {
    // user defined energy
    if (!args.length) return energy
    user_defined_energy = args[0]
    user_energy = true
    return labeler
  }

  labeler.alt_schedule = (...args) => {
    // user defined cooling_schedule
    if (!args.length) return cooling_schedule
    user_defined_schedule = args[0]
    user_schedule = true
    return labeler
  }

  return labeler
}

export default Labeler
