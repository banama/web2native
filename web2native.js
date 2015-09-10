var Web2native = function(setting){
    var self = this;

    self.setting = {
        platform: self.ua(),
        sChrome: window.navigator.userAgent.match(/Chrome\/(\d+)/),
        iOSredirect: "taobao.com",
        AndroidRedirect: "taobao.com",
        iOSnativeUrl: "taobao://",
        AndriodNativeUrl: "taobao://",
        iOSopenTime: 800,
        AndroidOpenTime: 800,
        package: 'com.taobao.taobao',
    }

    for(property in setting){
      if(self.setting.hasOwnProperty[property]){
        self.setting[property] = setting[property];
      }
    }

    self.init();
}

Web2native.prototype = {

    init: function() {
        var self = this;

        if(!self.setting.platform) return;
        if (self.setting.platform == 'ios') {
          self.url = self.setting.redirect;
          self.nativeUrl = self.setting.iOSnativeUrl;
          self.openTime = self.setting.iOSopenTime;
          self.redirect = self.setting.iOSredirect;
        } else {
          self.url = self.setting.redirect;
          self.nativeUrl = self.setting.AndriodNativeUrl;
          self.openTime = self.setting.AndroidOpenTime;
          self.redirect = self.setting.AndroidRedirect;
          self.package = self.setting.package;
        }

        if (self.platform != 'ios' && 25 <= (self && self[1])) {
            self.forChrome();
        } else {
            self.gotoNative();
        }
    },

    forChrome: function() {
      var self = this;

      var startTime = Date.now();
      var paramUrlarr = self.nativeUrl.split('://'),
          scheme = paramUrlarr[0],
          schemeUrl = paramUrlarr[1];

      var resultScheme = 'intent://' + schemeUrl + '#Intent;scheme=' + scheme + ';package=' + self.package + ';end';
      console.log(resultScheme);
      window.location = resultScheme;
      setTimeout(function() {
          self.startUrl(startTime);
      }, self.openTime);
    },
  
    gotoNative: function() {
        var self = this;
        var startTime = Date.now(),
            doc = window.document,
            body = doc.body,
            iframe = doc.createElement('frame');
            iframe.id = 'web2native';
            iframe.style.display = 'block';
            iframe.location = self.nativeUrl;

        alert(!body)
        if(!body) {
            setTimeout(function(){
                doc.body.appendChild(iframe);
            }, 0);
        } else {
            body.appendChild(iframe);
        }
        
        setTimeout(function() {
            self.startUrl(startTime);
        }, self.openTime);
    },

    startUrl: function(startTime){
      var self = this;
        var endTime = Date.now();
        if (endTime - startTime < self.openTime) {
            window.location.href = self.redirect;
        }
    },

    ua: function() {
        var ua = navigator.userAgent;
        if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            return 'ios';
        } else if (!!ua.match(/Android/i)) {
            return 'android';
        } else {
            return '';
        }
    }
}