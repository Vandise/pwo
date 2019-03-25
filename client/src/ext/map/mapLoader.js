import * as dom from '../../util/dom';

class MapLoader {

  addToTMXList(data) {
    dom.globals.me.loader.pushTMX(data.name, data);
    dom.globals.me.levelDirector.addTMXLevel(data.name);
  }

  loadTMXFromString(name, tmx) {
    const result = (new dom.globals.DOMParser()).parseFromString(tmx, "text/xml");
    const data = me.TMXUtils.parse(result);
    data.map['name'] = name;

    this.addToTMXList(data.map);
  }

}

export default (new MapLoader());