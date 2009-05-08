(function() {
	try {
		var isTwitter = window.location.host.match(/(twitter.com)?/);
		if(isTwitter) {
			
			var d = window.document;
			if(typeof google=="undefined") {
				var s=d.createElement("script");
				s.type="text/javascript";
				s.src="http://www.google.com/jsapi";
				d.getElementsByTagName("head")[0].appendChild(s);
			}
			
			if(typeof jQuery=="undefined") { 
				google.load("jquery", "1.3.2"); 
			}
			
			var elClass= ".entry-content";
			
			var msg = "tweet tweet  さえずる";
			
			function resolveLang() {
				return jQuery("html").attr("lang");
			}
			
			var lang = resolveLang();
			
			jQuery.fn.extend({
	      linkUrl: function() {
	        var returning = [];
	        var regexp = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
	        this.each(function() {
	          returning.push(this.replace(regexp,"<a href=\"$1\">$1</a>"));
	        });
	        return jQuery(returning);
	      },
	      linkUser: function() {
	        var returning = [];
	        var regexp = /[\@]+([A-Za-z0-9-_]+)/gi;
	        this.each(function() {
	          returning.push(this.replace(regexp,"@<a href=\"http://twitter.com/$1\">$1</a>"));
	        });
	        return jQuery(returning);
	      }
	    });
	
			function flash() {
				var id="t-flash";
				var el=d.createElement("div");
				  el.style.position="fixed";
				  el.style.height="30";
				  el.style.width="250";
				 	el.style.border="3px solid #f5f5f5";
				  el.style.margin="0 auto";
				  el.id=id;
				  el.style.top="0";
				  el.style.left="40%";
				  el.style.padding="5px 10px 5px 10px";
				  el.style.backgroundColor="#8ADCFF";
				  el.innerHTML=msg;
				var b=d.getElementsByTagName("body")[0];
				b.appendChild(el);
			  jQuery("#"+id).fadeIn(2000,function() {
				  setTimeout(function() {
					  jQuery("#"+id).fadeOut(1000,function() {
				     jQuery(this).remove();
				 	  });
					},2000);
				});
			}

			function decorate(txt) {
				return jQuery([txt]).linkUrl().linkUser()[0];
			}
			
			function translate() {
				jQuery(elClass).each(function(index,el){
					var jel = jQuery(el);
					google.language.translate(jel.text(), "", lang, function(result) {
					  if (!result.error) {
						 jel.html(decorate(result.translation));
					  }
					});
				});
				flash();
		  }
		
			function loadLang() {
				google.load("language","1", { callback:translate });
			}
			
	    var interval = setTimeout(loadLang,300);
		}
	} catch(e) {
		alert(e);
	}
})();