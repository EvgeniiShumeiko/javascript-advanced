"use strict";

class Component {
  constructor (mountedElement = null) {
    if (mountedElement) {
      this.mountedElement = mountedElement;
    }
  }

  pushComponent(placeToRender = null) {

    let render = this.render();
    let element = placeToRender || this.mountedElement;

    element.append(render);

  }

  mountComponent(placeToRender = null) {

    let render = this.render();
    let element = placeToRender || this.mountedElement;
    element.innerText = null;
    element.append(render);
  }


  render() {
    let baseComponent = document.createElement('div');
    baseComponent.innerText = 'Base Component';
    return baseComponent;
  }

}
