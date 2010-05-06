/* encoding: utf-8

  ****  linkify plugin for jQuery - automatically finds and changes URLs in text content into proper hyperlinks  ****

  Version: 1.0

  Copyright (c) 2009
    Már Örlygsson  (http://mar.anomy.net/) &
    Hugsmiðjan ehf. (http://www.hugsmidjan.is)

  Dual licensed under a MIT licence (http://en.wikipedia.org/wiki/MIT_License)
  and GPL 2.0 or above (http://www.gnu.org/licenses/old-licenses/gpl-2.0.html).

-----------------------------------------------------------------------------

  Demo and Qunit-tests:
    * <./jquery.linkify-1.0-demo.html>
    * <./jquery.linkify-1.0-test.html>

  Documentation:
    * ...

  Get updates from:
    * <http://github.com/maranomynet/linkify/>
    * <git://github.com/maranomynet/linkify.git>

-----------------------------------------------------------------------------

  Requires:
    * jQuery (1.2.6 or later)

  Usage:

      jQuery('.articlebody').linkify();


*/

(function($){

  var url1 = /(^|"|&lt;|\s)(www\..+?\..+?)(\s|&gt;|"|$)/g,
      url2 = /(^|"|&lt;|\s)(((https?|ftp):\/\/|mailto:).+?)(\s|&gt;|"|$)/g;

  $.fn.linkify = function () {
    return this.each(function () {
      var childNodes = this.childNodes,
          i = childNodes.length;
      while(i--)
      {
        var n = childNodes[i];
        if (n.nodeType == 3) {
          var html = n.nodeValue;
          if (/\S/.test(html))
          {
            html = html.replace(/&/g, '&amp;')
                       .replace(/</g, '&lt;')
                       .replace(/>/g, '&gt;')
                       .replace(url1, '$1<a href="<``>://$2">$2</a>$3')
                       .replace(url2, '$1<a href="$2">$2</a>$5')
                       .replace(/"<``>/g, '"http');
            $(n).after(html).remove();
          }
        }
        else if (n.nodeType == 1  &&  !/^(a|button|textarea)$/i.test(n.tagName)) {
          arguments.callee.call(n);
        }
      };
    });
  };

})(jQuery);
