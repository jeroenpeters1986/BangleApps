(function(back) {
  function settings() {
    let settings = require('Storage').readJSON("messages.settings.json", true) || {};
    if (settings.vibrate===undefined) settings.vibrate=".";
    if (settings.repeat===undefined) settings.repeat=4;
    if (settings.unreadTimeout===undefined) settings.unreadTimeout=60;
    settings.openMusic=!!settings.openMusic;
    settings.maxUnreadTimeout=240;
    return settings;
  }
  function updateSetting(setting, value) {
    let settings = require('Storage').readJSON("messages.settings.json", true) || {};
    settings[setting] = value;
    require('Storage').writeJSON("messages.settings.json", settings);
  }

  var vibPatterns = [/*LANG*/"Off", ".", "-", "--", "-.-", "---"];
  var mainmenu = {
    "" : { "title" : /*LANG*/"Messages" },
    "< Back" : back,
    /*LANG*/'Vibrate': {
      value: Math.max(0,vibPatterns.indexOf(settings().vibrate)),
      min: 0, max: vibPatterns.length,
      format: v => vibPatterns[v]||"Off",
      onchange: v => {
        updateSetting("vibrate", vibPatterns[v]);
      }
    },
    /*LANG*/'Repeat': {
      value: settings().repeat,
      min: 0, max: 15,
      format: v => v?v+"s":/*LANG*/"Off",
      onchange: v => updateSetting("repeat", v)
    },
    /*LANG*/'Unread timer': {
      value: settings().unreadTimeout,
      min: 0, max: settings().maxUnreadTimeout, step : 10,
      format: v => v?v+"s":/*LANG*/"Off",
      onchange: v => updateSetting("unreadTimeout", v)
    },
    /*LANG*/'Min Font': {
      value: 0|settings().fontSize,
      min: 0, max: 1,
      format: v => [/*LANG*/"Small",/*LANG*/"Medium"][v],
      onchange: v => updateSetting("fontSize", v)
    },
    /*LANG*/'Auto-Open Music': {
      value: !!settings().openMusic,
      format: v => v?/*LANG*/'Yes':/*LANG*/'No',
      onchange: v => updateSetting("openMusic", v)
    },
  };
  E.showMenu(mainmenu);
})
