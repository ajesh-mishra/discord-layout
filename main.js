const middlePane = document.querySelector('.middle-pane')

let isDragging = false,
  startPosition = 0,
  currentTranslate = 0,
  previousTranslate = 0,
  animationID = 0,
  windowWidth = window.innerWidth,
  showMiddlePane = 0,
  showLeftPane = windowWidth * 0.2,
  showRightPane = windowWidth * -0.7

middlePane.addEventListener('touchstart', touchStart)
middlePane.addEventListener('touchend', touchEnd)
middlePane.addEventListener('touchmove', touchMove)

middlePane.addEventListener('mousedown', touchStart)
middlePane.addEventListener('mouseup', touchEnd)
middlePane.addEventListener('mouseleave', touchEnd)
middlePane.addEventListener('mousemove', touchMove)

// Uncomment the below function, 
// if you want to disable the Context Menu

// window.oncontextmenu = function(event) {
//   event.preventDefault()
//   event.stopPropagation()
//   return false
// }

function touchStart(event) {
  console.log('start')
  startPosition = getPositionX(event)
  isDragging = true

  animationID = requestAnimationFrame(animation)
}

function touchEnd() {
  cancelAnimationFrame(animationID)
  console.log('end')
  isDragging = false

  const movedBy = currentTranslate - previousTranslate

  if (previousTranslate === showMiddlePane) {
    if (movedBy > 20) {
      currentTranslate = showLeftPane
    } else if (movedBy < -20) {
      currentTranslate = showRightPane
    } else {
      currentTranslate = showMiddlePane
    }
  }

  if (previousTranslate === showLeftPane) {
    if (movedBy < -20) {
      currentTranslate = showMiddlePane
    } else {
      currentTranslate = showLeftPane
    }
  }

  if (previousTranslate === showRightPane) {
    if (movedBy > 20) {
      currentTranslate = showMiddlePane
    } else {
      currentTranslate = showRightPane
    }
  }

  previousTranslate = currentTranslate
  setSliderPosition()
}

function touchMove(event) {
  if (isDragging) {
    console.log('move')
    const currentPosition = getPositionX(event)
    currentTranslate = previousTranslate + currentPosition - startPosition
  }
}

function getPositionX(event) {
  return event.type.includes('mouse') 
  ? event.pageX
  : event.touches[0].clientX
}

function animation() {
  setSliderPosition()
  if (isDragging) {
    requestAnimationFrame(animation)
  }
}

function setSliderPosition() {
  middlePane.style.transform = `translateX(${currentTranslate}px)`
}