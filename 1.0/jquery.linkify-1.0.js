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

      // adding plugins:
      jQuery.extend( jQuery.fn.linkify.plugins, {
          name1: {
              re:   RegExp
              tmpl: String/Function
            },
          name2: function(html){ return html; }
        });

      // Uses all plugins by default:
      jQuery('.articlebody').linkify();
      // Use only certain plugins:
      jQuery('.articlebody').linkify('name1,name2');
      jQuery('.articlebody').linkify({  use: 'name1,name2'  });
      jQuery('.articlebody').linkify({  use: ['name1','name2']  });

*/

(function($){

  var noProtocolUrl = /(^|["'(]|&lt;|\s)(www\..+?\..+?)(([:?]|\.+)?(\s|$)|&gt;|[)"',])/g,
      httpOrMailtoUrl = /(^|["'(]|&lt;|\s)(((https?|ftp):\/\/|mailto:).+?)(([:?]|\.+)?(\s|$)|&gt;|[)"',])/g,

      linkify = $.fn.linkify = function ( cfg ) {
          cfg = cfg || {};
          if ( typeof cfg == 'string' )
          {
            cfg = { use:cfg };
          }
          var use = cfg.use,
              plugins = linkify.plugins||{};
          if ( use )
          {
            use = $.isArray( use ) ? use : $.trim(use).split( / *, */ );
            var pluginShortlist = {};
            for ( var i=0, l=use.length, name;  i<l;  i++ )
            {
              name = use[i];
              pluginShortlist[name] = plugins[name];
            };
            plugins = pluginShortlist;
          }

          return this.each(function () {
              var childNodes = this.childNodes,
                  i = childNodes.length;
              while ( i-- )
              {
                var n = childNodes[i];
                if ( n.nodeType == 3 )
                {
                  var html = n.nodeValue;
                  if ( /\S/.test(html) )
                  {
                    html = html
                              .replace( /&/g, '&amp;' )
                              .replace( /</g, '&lt;' )
                              .replace( />/g, '&gt;' );
                    var preHtml = html;
                    html = html
                              .replace( noProtocolUrl, '$1<a href="<``>://$2">$2</a>$3' )  // NOTE: we escape `"http` as `"<``>` to make sure `httpOrMailtoUrl` below doesn't find it as a false-positive
                              .replace( httpOrMailtoUrl, '$1<a href="$2">$2</a>$5' )
                              .replace( /"<``>/g, '"http' );  // reinsert `"http`
                    
                    for ( var name in plugins )
                    {
                      var plugin = plugins[name] || {};
                      html = $.isFunction( plugin ) ? 
                                  plugin( html ):
                                  html.replace( plugin.re, plugin.tmpl );
                    }
                    if (html != preHtml)
                    {
                      $(n).after(html).remove();
                    }
                  }
                }
                else if ( n.nodeType == 1  &&  !/^(a|button|textarea)$/i.test(n.tagName) )
                {
                  arguments.callee.call( n );
                }
              };
          });
        };

  linkify.plugins = {};

})(jQuery);
