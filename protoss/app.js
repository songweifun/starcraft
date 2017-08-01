import { Token } from 'utils/Token.js';

App({
  onLaunch: function () {
    var token = new Token();
    token.verify();
  },

  onShow: function () {

  },
})