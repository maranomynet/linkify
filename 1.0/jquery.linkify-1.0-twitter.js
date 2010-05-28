// Twitter plugin for jQuery.fn.linkify() 1.0
jQuery.extend(jQuery.fn.linkify.plugins, {
  twitterUser: {
      re: /(^|["'(]|&lt;|\s)@([a-z0-9_-]+)(([:?]|\.+)?(\s|$)|&gt;|[)"',])/i,
      tmpl: '$1<a href="http://www.twitter.com/$2">@$2</a>$3'
    },
  twitterHashtag: {
      re: /(^|["'(]|&lt;|\s)(#.+?)(([:?]|\.+)?(\s|$)|&gt;|[)"',])/i,
      tmpl: function (match, before, hashTag, after) {
          return before+'<a href="http://www.twitter.com/search?q='+ encodeURIComponent(hashTag) +'">'+hashTag+'</a>'+after;
        }
    }
});