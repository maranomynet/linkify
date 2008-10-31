(function($){

  var url1 = /(^|"|&lt;|\s)(www\..+?\..+?)(\s|&gt;|"|$)/g,
      url2 = /(^|"|&lt;|\s)(((https?|ftp):\/\/|mailto:).+?)(\s|&gt;|"|$)/g,

      linkifyThis = function () {
        var childNodes = this.childNodes,
            i = childNodes.length;
        while(i--)
        {
          var n = childNodes[i];
          if (n.nodeType == 3) {
            var html = $.trim(n.nodeValue);
            if (html)
            {
              html = html.replace(/&/g, '&amp;')
                         .replace(/</g, '&lt;')
                         .replace(/>/g, '&gt;')
                         .replace(url1, "$1<a href='http://$2'>$2</a>$3")
                         .replace(url2, "$1<a href='$2'>$2</a>$5");
              $(n).after(html).remove();
            }
          }
          else if (n.nodeType == 1  &&  !/^(a|button|textarea)$/i.test(n.tagName)) {
            linkifyThis.call(n);
          }
        };
      };
  
  $.fn.linkify = function () {
    return this.each(linkifyThis);
  };

})(jQuery);


/* Usage:

  jQuery('.articlebody').linkify();

*/