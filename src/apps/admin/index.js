function component() {
  var element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = ['Hello', 'admin!!'].join(' ');

  return element;
}

document.body.appendChild(component());