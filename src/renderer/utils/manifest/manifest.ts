import Vue from 'vue';
import Vuex from 'vuex';
import { Component, Prop } from 'vue-property-decorator';

Vue.use(Vuex);

export class ManifestException {
  private name: string;
  private message: string;

  constructor(message: string) {
    this.message = message;
    this.name = 'ManifestException';
  }

  toString = () => {
    return (this.name + ': ' + this.message);
  }
}

export default class Manifest extends Vue {
  name: string = 'manifest';
  private manifest: any;
  private mendatoryFields: Array<string>;
  private optionalFields: Array<string>;
  private file: string;

  constructor(file: string) {
    super();

    this.file = file;
    this.manifest = {};
    this.mendatoryFields = ['manifest_version', 'index', 'application', 'permissions', 'locales', 'components'].sort();
    this.optionalFields = ['commands', 'icon'].sort();
    this.accioManifest();
  }

  isFileAvailable(url: string) {
    let http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status === 200;
  }

  accioManifest() {
    fetch(this.file)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          try {
            throw new ManifestException('Unable to fetch the manifest. Make sure it\'s under the right name in the package root.').toString();
          } catch (e) {
            console.error(e);
            return false;
          }
        }
      })
      .then(json => {
        if (json === null) {
          return false;
        } else {
          try {
            JSON.parse(JSON.stringify(json));
          } catch (e) {
            console.error(e);
            return false;
          }
          this.manifest = json;

          this.areMendatoryFieldsHere();
          this.areMendatoryFieldsOK();
        }
      });
    return true;
  }

  checkManifestVersion() {
    let version = this.manifest.manifest_version;
    try {
      if (typeof version !== 'string') {
        throw new ManifestException('The manifest_version must be string.').toString();
      }
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

  checkIndex() {
    let index = this.manifest.index;

    if (!this.isFileAvailable(index)) {
      try {
        throw new ManifestException('Unable to fetch the index: ' + index + '.').toString();
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    return true;
  }

  checkApplication() {
    let application = this.manifest.application;
    let mendatory = ['version', 'name', 'author'];
    let keys = new Array();

    for (let i in application) {
      keys.push(i);
    }
    for (let i = 0; i < mendatory.length; i++) {
      if (keys.indexOf(mendatory[i]) === -1) {
        try {
          throw new ManifestException('Missing mendatory variable in application: ' + mendatory[i] + '.').toString();
        } catch (e) {
          console.error(e);
          return false;
        }
      }
    }
    for (let key in application) {
      if (typeof application[key] !== 'string') {
        try {
          throw new ManifestException('The application variables must be strings:' + key + '.').toString();
        } catch (e) {
          console.error(e);
          return false;
        }
      }
    }
    return true;
  }

  checkPermissions() {
    let permissions = this.manifest.permissions;
    let mendatory = ['CAMERA', 'GLOBAL_CACHE', 'MICROPHONE', 'LOCALISATION'];
    let keys = new Array();

    for (let i in permissions) {
      keys.push(i);
    }
    for (let i = 0; i < mendatory.length; i++) {
      if (keys.indexOf(mendatory[i]) === -1) {
        try {
          throw new ManifestException('Missing mendatory permission: ' + mendatory[i] + '.').toString();
        } catch (e) {
          console.error(e);
          return false;
        }
      }
    }
    for (let key in permissions) {
      if (typeof permissions[key] !== 'boolean') {
        try {
          throw new ManifestException('The permissions must be booleans: ' + key + '.').toString();
        } catch (e) {
          console.error(e);
          return false;
        }
      }
    }
    return true;
  }

  checkLocales() {
    let locales = this.manifest.locales;

    if (!locales || locales.length === 0) {
      try {
        throw new ManifestException('There is no locale.').toString();
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    for (let i = 0; i < locales.length; i++) {
      if (typeof locales[i] !== 'string') {
        try {
          throw new ManifestException('At least one of the locales is not a string: ' + locales[i] + '.').toString();
        } catch (e) {
          console.error(e);
          return false;
        }
      }
    }
    for (let i = 0; i < locales.length; i++) {
      if (!this.isFileAvailable('locales/' + locales[i])) {

      }
      fetch('locales/' + locales[i])
        .then(response => {
          if (response.status !== 200) {
            try {
              throw new ManifestException('Unable to find the folder for the locale: ' + locales[i] + '.').toString();
            } catch (e) {
              console.error(e);
              return false;
            }
          }
        });
    }
    return true;
  }

  checkComponents() {
    let components = this.manifest.components;
    let mendatory = ['version', 'name', 'css_dir'];
    let css_dirs = new Array();

    if (!components || components.length === 0) {
      try {
        throw new ManifestException('There is no appplication.').toString();
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    for (let i = 0; i < components.length; i++) {
      let keys = new Array();
      for (let j in components[i]) {
        keys.push(j);
      }
      for (let k = 0; k < mendatory.length; k++) {
        if (keys.indexOf(mendatory[k]) === -1) {
          try {
            throw new ManifestException('Missing mendatory variable: ' + mendatory[k] + ' in application: ' + i + '.').toString();
          } catch (e) {
            console.error(e);
            return false;
          }
        }
        if (mendatory[k] === 'css_dir') {
          css_dirs.push(components[i].css_dir);
        }
      }
      for (let key in components[i]) {
        if (typeof key !== 'string') {
          try {
            throw new ManifestException('The application variables must be strings: ' + key + ' in application: ' + i + '.').toString();
          } catch (e) {
            console.error(e);
            return false;
          }
        }
      }
    }
    for (let i = 0, len = css_dirs.length; i < len; i++) {
      if (!this.isFileAvailable(css_dirs[i])) {
        try {
          throw new ManifestException('Unable to find the CSS directory: ' + css_dirs[i] + '.').toString();
        } catch (e) {
          console.error(e);
          return false;
        }
      }
    }
    return true;
  }

  areMendatoryFieldsOK() {
    let ret = false;
    ret = this.checkManifestVersion();
    ret = this.checkIndex();
    ret = this.checkApplication();
    ret = this.checkPermissions();
    ret = this.checkLocales();
    ret = this.checkComponents();
    if (!ret) {
      try {
        throw new ManifestException('The manifest doesn\'t implement the mendatory fields as it should.').toString();
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    return true;
  }

  areMendatoryFieldsHere() {
    for (let i = 0; i < this.mendatoryFields.length; i++) {
      let field = this.mendatoryFields[i];
      try {
        if (typeof this.manifest[field] === 'undefined') {
          throw new ManifestException('Missing mendatory field. [' + field + ']: not found.').toString();
        }
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    return true;
  }

  checkCommands() {
    let commands = this.manifest.commands;

    if (commands.length !== 0) {
      for (let cmd in commands) {
        if (typeof commands[cmd] !== 'string') {
          try {
            throw new ManifestException('A command must be a string: ' + commands[cmd] + '.').toString();
          } catch (e) {
            console.error(e);
            return false;
          }
        }
      }
    } else {
      try {
        throw new ManifestException('The commands are empty.').toString();
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    return true;
  }

  checkIcon() {
    let icon = this.manifest.icon;

    if (typeof icon !== 'string') {
      try {
        throw new ManifestException('The package must be a string.').toString();
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    if (icon.indexOf('.png') !== icon.length - 4) {
      try {
        throw new ManifestException('The package icon must be a .png file.').toString();
      } catch (e) {
        console.error(e);
        return false;
      }
    } else {
      if (!this.isFileAvailable(icon)) {
        try {
          throw new ManifestException('Unable to access to: ' + icon + '.').toString();
        } catch (e) {
          console.error(e);
          return false;
        }
      }
    }
    return true;
  }

  areOptionalFieldsOK() {
    let ret = true;
    for (let m_key in this.manifest) {
      let index = this.optionalFields.indexOf(m_key);
      if (index !== -1) {
        switch (this.optionalFields[index]) {
          case this.optionalFields[0]: // commands
            ret = this.checkCommands();
            break;
          case this.optionalFields[1]: // icon
            ret = this.checkIcon();
            break;
          default:
            console.warn(this.optionalFields[index] + 'verification not implemented yet. Assuming it\'s OK.');
            return true;
        }
      }
    }
    if (ret === false) {
      try {
        throw new ManifestException('The manifest doesn\'t implement the optional fields as it should.').toString();
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    return ret;
  }
}
