export default class GameText {

  constructor(resources = {}) {
    this.resources = resources;
    this.text = {};
  }

  addResources(resources) {
    this.resources = resources;

    this.resources.forEach((obj) => {
      if (this.text[obj.type] == null) {
        this.text[obj.type] = {};
      }
      this.text[obj.type][obj.name] = obj;
    });
  }

  getText(path) {
    if (Object.keys(this.text).length == 0) { return null; }

    const entries = path.split('.');
    let value = this.text;

    entries.forEach((k) => {
      value = value[k];
    });

    return value;
  }

  getAllText() {
    return this.text;
  }
}