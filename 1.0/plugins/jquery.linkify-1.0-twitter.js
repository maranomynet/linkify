/* encoding: utf-8

  ****  Twitter linking plugin for jQuery.fn.linkify() 1.0  ****

  Version 1.0

  Copyright (c) 2010
    Már Örlygsson  (http://mar.anomy.net/)  &
    Hugsmiðjan ehf. (http://www.hugsmidjan.is)

  Dual licensed under a MIT licence (http://en.wikipedia.org/wiki/MIT_License)
  and GPL 2.0 or above (http://www.gnu.org/licenses/old-licenses/gpl-2.0.html).

*/
jQuery.extend(jQuery.fn.linkify.plugins, {
  twitterUser: {
      re: /(?:^|["'(]|&lt;|\s)@([a-z0-9_-]+)(?:(?:[:?]|\.+)?(?:\s|$)|&gt;|[)"',])/i,
      tmpl: '<a href="http://www.twitter.com/$1">@$1</a>'
    },
  twitterHashtag: {
      re: /(?:^|["'(]|&lt;|\s)(#.+?)(?:(?:[:?]|\.+)?(?:\s|$)|&gt;|[)"',])/i,
      tmpl: function (match, hashTag) {
          return '<a href="http://www.twitter.com/search?q='+ encodeURIComponent(hashTag) +'">'+hashTag+'</a>';
        }
    }
});