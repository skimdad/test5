/**
 * jQuery.ScrollableTab - Scrolling multiple tabs.
 * @copyright (c) 2010 Astun Technology Ltd - http://www.astuntechnology.com
 * Dual licensed under MIT and GPL.
 * Date: 28/04/2010
 * @author Aamir Afridi - aamirafridi(at)gmail(dot)com | http://www.aamirafridi.com
 * @version 1.0
 */
 
;(function($){
	var customId = '';

	var id_count_new = 0; 

	

	//Global plugin settings
	var settings = {
		'animationSpeed' : 100, //The speed in which the tabs will animate/scroll
		'closable' : false, //Make tabs closable
		'resizable' : false, //Alow resizing the tabs container
		'resizeHandles' : 'e,s,se', //Resizable in North, East and NorthEast directions
		'loadLastTab':false, //When tabs loaded, scroll to the last tab - default is the first tab
		'easing':'swing' //The easing equation
	}
	
	$.fn.scrollabletab = function(options){
		//Check if scrollto plugin is available - (pasted the plugin at the end of this plugin)
		//if(!$.fn.scrollTo) return alert('Error:\nScrollTo plugin not available.');

		return this.each(function(){
			var	o = $.extend({}, settings, options), //Extend the options if any provided
			$tabs = $(this),
			$tabsNav = $tabs.find('.ui-tabs-nav'),
			$nav;//will save the refrence for the wrapper having next and previous buttons
			/*var userAgent = navigator.userAgent.toString().toLowerCase();		
		    if (userAgent.indexOf('msie') != -1) {
            $tabsNav.css('width','95%');
			}
			else
			{
				$tabsNav.css('width','95.5%');
			}*/			
			//Adjust the css class
			//$tabsNav.removeClass('ui-corner-all').addClass('ui-corner-top');
			$tabs.css({'padding':2, 'position':'relative'});
			//$tabsNav.css('position','inherit');
						
			//Wrap inner items
			$tabs.wrap('<div id="stTabswrapper" class="stTabsMainWrapper" style="position:relative"/>').find('.ui-tabs-nav').css('overflow','hidden').wrapInner('<div class="stTabsInnerWrapper" style="width:30000px"><span class="stWidthChecker"/></div>');
			
			var $widthChecker = $tabs.find('.stWidthChecker'),
				$itemContainer = $tabs.find('.stTabsInnerWrapper'),
				$tabsWrapper = $tabs.parents('#stTabswrapper').width($tabs.outerWidth(true));
				//Fixing safari bug
				if($.browser.safari)
				{
					$tabsWrapper.width($tabs.width()+6);
				}
				//alert($tabsWrapper.width());
			if(o.resizable)
			{
				if(!!$.fn.resizable)
				{
					$tabsWrapper.resizable({
						minWidth : $tabsWrapper.width(),
						maxWidth : $tabsWrapper.width()*2,
						minHeight : $tabsWrapper.height(),
						maxHeight : $tabsWrapper.height()*2,
						handles : o.resizeHandles,
						alsoResize: $tabs,
						//start : function(){  },
						resize: function(){
							$tabs.trigger('resized');
						}
						//stop: function(){ $tabs.trigger('scrollToTab',$tabsNav.find('li.ui-tabs-selected')); }
					});
				}
				else
				{
					alert('Error:\nCannot be resizable because "jQuery.resizable" plugin is not available.');
				}
			}
			

			//Add navigation icons
				//Total height of nav/2 - total height of arrow/2
			var arrowsTopMargin = (parseInt(parseInt($tabsNav.innerHeight(true/2))-8)),
				arrowsCommonCss={'cursor':'pointer','z-index':1000,'position':'absolute','top':12,'height':28};
			$tabsWrapper.prepend(
			  $nav = $('<div/>')
			  		.disableSelection()
					.css({'position':'relative','z-index':3000,'display':'none'})
					.append(
						$('<span/>')
							.disableSelection()
							.attr('title','Previous tab')
							.css(arrowsCommonCss)
							.addClass('ui-state-active stPrev stNav')
							.css('right',37)
							.append($('<span/>').disableSelection().addClass('ui-icon ui-icon-carat-1-w').html('Previous tab').css('margin-top',arrowsTopMargin))
							.click(function(){
								//Check if disabled
								if($(this).hasClass('ui-state-disabled')) return;
								//Just select the previous tab and trigger scrollToTab event
								prevIndex = $tabsNav.find('li.ui-tabs-selected').prevAll().length-1
								//Now select the tab
								$tabsNav.find('li').eq(prevIndex).find('a').trigger('click');
								return false;
							}),
						$('<span/>') 
							.disableSelection()
							.attr('title','Next tab')
							.css(arrowsCommonCss)
							.addClass('ui-state-active stNext stNav')
							.css({'right':18})
							.append($('<span/>').addClass('ui-icon ui-icon-carat-1-e').html('Next tab').css('margin-top',arrowsTopMargin))
							.click(function(){
								//Just select the previous tab and trigger scrollToTab event
								nextIndex = $tabsNav.find('li.ui-tabs-selected').prevAll().length+1
								//Now select the tab
								$tabsNav.find('li').eq(nextIndex).find('a').trigger('click');
								return false;
							}),
						$('<span style="margin-right:256px;width:20px;" />').attr('id','dropdown_icon')
							.disableSelection()
							.attr('title','Dropdown tab')
							.css(arrowsCommonCss)
							.addClass('ui-state-active')
							.css({'right':-1})
							.append($('<span style="margin-left:255px;width:20px;" />').addClass('ui-icon ui-icon-carat-1-dr').html('Dropdown tab').css('margin-top',arrowsTopMargin))
							//.click(function(){
								/*$(this).append($('<select/>')).attr('id','tabs_dropdown');								
								$.each(tabsarray, function(val, text) {
									$('#tabs_dropdown').append(
										$('<option></option>').val(val).html(text)
									);
									
								});
								*/
							//})
					)
					
			);
			
			//Bind events to the $tabs
			$tabs
			.bind('tabsremove', function(){ 
  				$tabs.trigger('scrollToTab').trigger('navHandler').trigger('navEnabler');
			})
			.bind('addCloseButton',function(){
				//Add close button if require
				if(!o.closable) return;

				

				$(this).find('.ui-tabs-nav li').each(function(){

					//alert($(this).find('span.tooltip').text());

					if($(this).find('a').attr('id')!='tabs-0')

					{

						var z = '';

						z = $(this).find('span.tooltip').length;

						if(z == 0){

							$(this).append($('<span style="display:none;" />').attr('class','tooltip'));

						}

						if($(this).find('.ui-tabs-close').length>0) return; //Already has close button

						var closeTopMargin = parseInt(parseInt($tabsNav.find('li:first').innerHeight()/2,10)-8);

						$(this).disableSelection().append(
							$('<span style="float:left;cursor:pointer;margin:'+closeTopMargin+'px 12px 0 -4px" class="ui-tabs-close ui-icon ui-icon-close" title="Close this tab"></span>')
								.click(function()
								{

									var temp = jQuery.trim($(this).parent().find('a').text());	
									var temp_new = temp.split(' :');
									for(var s=0;s<temp.length;s++)
									{
										if(temp[s]==':')
										temp = temp_new[0];
									}
									for(var i=0;i<tabsarray.length;i++)

									{

										if(temp == tabsarray[i])

										{

											tabsarray.splice( i, 1 );	

										}

									}
									
									$tabs.tabs('remove',$(this).parents('li').prevAll().length);
									//If one tab remaining than hide the close button
									if($tabs.tabs('length')==1)
									{
										$tabsNav.find('.ui-icon-close').hide();
									}
									else
									{
										$tabsNav.find('.ui-icon-close').show();
									}
									//Call the method when tab is closed (if any)
									if($.isFunction(o.onTabClose))
									{
										o.onTabClose();
									}
									return false;
								})
						);
						//Show all close buttons if any hidden
						$tabsNav.find('.ui-icon-close').show();
					}
				});
			})
			.bind('tabsadd',function(event){
				//Select it on Add
				
				$tabs.tabs('select',$tabs.tabs('length')-1);
				//alert($tabs.tabs('length'));
				//Now remove the extra span added to the tab (not needed)
				$lastTab = $tabsNav.find('li:last');
				//alert($tabsNav.find('li#temp_li').attr('id'));
				//$lastTab = $tabsNav.find('li:nth-child('+($tabs.tabs('length'))+')');
				//$tab_count = $tabsNav.find('li').length
				//$lastTab = $tabsNav.find('li:nth-child('+($tab_count-1)+')');
				if($lastTab.find('a span').length>0) $lastTab.find('a').html($lastTab.find('a span').html());

				//\alert($lastTab.find('a').html($lastTab.find('a span').html()));

				//Move the li to the innerwrapper
                $("#temp_li").remove();
				
                
				$lastTab.appendTo($widthChecker);
                
				//Scroll the navigation to the newly added tab and also add close button to it

				id_count_new = Math.floor(Math.random()*1000);

				var idtab = 'addTab-1'+'-'+id_count_new+'-'+$lastTab.find('a').text().split(' ').join('-');				

				$lastTab.attr('id',idtab);			
				$tabs
					.trigger('addCloseButton')
					.trigger('bindTabClick')
					.trigger('navHandler')
					.trigger('scrollToTab');
			$tabsNav.find('span:first').append('<li id="temp_li" style="height:34px; width:80px;">&nbsp;&nbsp;</li>');
			$("#temp_li").trigger('navHandler').trigger('scrollToTab');
			})//End tabsadd
			.bind('addTab',function(event,label,content){
				//Generate a random id
				var tabid = 'stTab-'+(Math.floor(Math.random()*10000));
				//Append the content to the body
				$('body').append($('<div id="'+tabid+'"/>').append(content));
				//Add the tab
				
				$tabs.tabs('add','#'+tabid,label);
				
			})//End addTab
			.bind('bindTabClick',function(){
				//Handle scroll when user manually click on a tab
				$tabsNav.find('a').click(function(){
					var $liClicked = $(this).parents('li');
					
					var navWidth = $nav.find('.stPrev').outerWidth(true);
					//debug('left='+($liClicked.offset().left)+' and tabs width = '+ ($tabs.width()-navWidth));
					if(($liClicked.position().left-navWidth)<0)
					{
						$tabs.trigger('scrollToTab',[$liClicked,'tabClicked','left'])
					}
					else if(($liClicked.outerWidth()+$liClicked.position().left)>($tabs.width()-navWidth))
					{
						$tabs.trigger('scrollToTab',[$liClicked,'tabClicked','right'])
					}
					//Enable or disable next and prev arrows
					$tabs.trigger('navEnabler');
					return false;
				});
			})
			//Bind the event to act when tab is added
			.bind('scrollToTab',function(event,$tabToScrollTo,clickedFrom,hiddenOnSide){
				//If tab not provided than scroll to the last tab
				$tabToScrollTo = (typeof $tabToScrollTo!='undefined') ? $($tabToScrollTo) : $tabsNav.find('li.ui-tabs-selected');
				//Scroll the pane to the last tab
				var navWidth = $nav.is(':visible') ? $nav.find('.stPrev').outerWidth(true) : 0;
				
				//debug($tabToScrollTo.prevAll().length)
				
				offsetLeft = -($tabs.width()-($tabToScrollTo.outerWidth(true)+navWidth+32+parseInt($tabsNav.find('li:last').css('margin-right'),10)));

               
				offsetLeft = (clickedFrom=='tabClicked' && hiddenOnSide=='left') ? -navWidth+20 : offsetLeft;
				offsetLeft = (clickedFrom=='tabClicked' && hiddenOnSide=='right') ? offsetLeft : offsetLeft;
                				//debug(offsetLeft);

                
                
				var scrollSettings = { 'axis':'x', 'margin':true, 'offset': {'left':offsetLeft}, 'easing':o.easing||'' }
               
                 //alert(scrollSettings.offset.left);
				//debug(-($tabs.width()-(116+navWidth)));

				//alert(navWidth+'  '+$tabs.width());
                
				$tabsNav.scrollTo($tabToScrollTo,o.animationSpeed,scrollSettings);
			})
			.bind('navEnabler',function(){
				setTimeout(function(){
					//Check if last or first tab is selected than disable the navigation arrows
					//var isLast = $tabsNav.find('.ui-tabs-selected').is(':last-child'),
						//isFirst = $tabsNav.find('.ui-tabs-selected').is(':first-child'),
						//$ntNav = $tabsWrapper.find('.stNext'),
						//$pvNav = $tabsWrapper.find('.stPrev');
					//debug('isLast = '+isLast+' - isFirst = '+isFirst);
					/*if(isLast)
					{
						$pvNav.removeClass('ui-state-disabled');
						$ntNav.addClass('ui-state-disabled');
					}
					else if(isFirst)
					{
						$ntNav.removeClass('ui-state-disabled');
						$pvNav.addClass('ui-state-disabled');
					}
					else
					{
						$ntNav.removeClass('ui-state-disabled');
						$pvNav.removeClass('ui-state-disabled');
					}*/
				},o.animationSpeed);
			})
			//Now check if tabs need navigation (many tabs out of sight)
			.bind('navHandler',function(){
				//Check the width of $widthChecker against the $tabsNav. If widthChecker has bigger width than show the $nav else hide it

                //alert($widthChecker.width());
				if($widthChecker.width()>$tabsNav.width())
				{
					$nav.show();
					//Put some margin to the first tab to make it visible if selected
					//$tabsNav.find('li:first').css('margin-left',$nav.find('.stPrev').outerWidth(true));
					$tabsNav.find('li:first').css('margin-left','0px');
					
				}
				else
				{
					$nav.hide();
					//Remove the margin from the first element
					$tabsNav.find('li:first').css('margin-left',0);
				}
			})
			.bind('tabsselect', function() {
				//$tabs.trigger('navEnabler');
			})
			.bind('resized', function() {
				$tabs.trigger('navHandler');
				$tabs.trigger('scrollToTab',$tabsNav.find('li.ui-tabs-selected'));
			})
			//To add close buttons to the already existing tabs
			.trigger('addCloseButton')
			.trigger('bindTabClick')
			//For the tabs that already exists
			.trigger('navHandler')
			.trigger('navEnabler');
			
			//Select last tab if option is true
			if(o.loadLastTab)
			{
				setTimeout(function(){$tabsNav.find('li:last a').trigger('click')},o.animationSpeed);
			}
			
			$('#dropdown_icon').append($('<div class="dropdown_div" id="tabs_dropdown" style="position:relative;z-index:2000;width:238px;margin-left:36px;" />'));			
			var path = '';
			var temp_var = '';
			var temp_forid = '';
			$('#dropdown_icon').click(function(){
				var dropdown_content = '<table class="dropdown_tab" cellpadding="4" cellspacing="0" width="238" style="background:#fff;border:1px solid #93A9C0;">';	var host = window.location.hostname;		
				pathArray = window.location.pathname.split( '/' );
				path = 'http://'+host+'/'+pathArray[1]+'/'+pathArray[2]+'/view/stylesheet/ui-lightness/images/';

				$(this).parent().parent().find("div[id='data_container']").find("ul[id='grid_ul']").find('li.ui-state-default a').each(function(){

				temp_var = $(this).text();					

				for(var s=0;s<temp_var.length;s++)	

				{

					var x = '';

					if(temp_var[s]==':'){

						x = true;		

					}else{

						x = false;

					}

					if(x){

													

						var new_temp_forid = temp_forid.split(' :');

						temp_forid = new_temp_forid[0];

						if(s+1==temp_var.length)

							break;

						if(temp_var[s]==':')

							break;

					}else{

						temp_forid = temp_var;

						if(s+1==temp_var.length)

						break;

					}

				}

				var checked_img = '';

				//$('#grid_ul').find('li.ui-tabs-selected').each(function(){

																		

					//if($(this).attr('id')=='addTab-1'+temp_forid.split(' ').join('-')){

				$('#grid_ul').find('li.ui-tabs-selected a').each(function(){

					if($(this).text()==temp_var){						

						checked_img = '<img src="'+path+'check.png'+'" />';

					}
				});			
				dropdown_content += '<tr id="dropdown-tr-'+temp_forid.split(' ').join('-')+'"  >';
				dropdown_content += '<td width="23" class="dropdown_tab_temp dropdown_tab_td">'+checked_img+'</td><td style="color: #000000;font-family:arial,verdana,Bitstream Vera Sans,sans-serif;font-size: 11px;font-weight: normal;"><nobr>'+temp_var+'</nobr></td>';								
				dropdown_content += '</tr>';					

				

			});			
			dropdown_content += '</table>';
			$("#tabs_dropdown").html(dropdown_content);								
			$("tr[id*='dropdown-tr-']").live('mouseover mouseout', function(event) {
			  if (event.type == 'mouseover') {
				  $(this).find('td.dropdown_tab_td').removeClass('dropdown_tab_td');					  
			  } else {
				  $(this).find('td.dropdown_tab_temp').addClass('dropdown_tab_td');
			  }
			});	
			
			
			
			$("tr[id*='dropdown-tr-']").click(function(){

				var last_text1 = 0 ;										

				var current = $(this).text();

				var a = $(this).attr('id').split('dropdown-tr-');	
               
				var a1 = $(this).children('td:').siblings(":first").text();
				
                
				$("li[id*='addTab-1-']").each(function(){

					if($(this).hasClass('ui-tabs-selected_fullgreen'))
					{
						$(this).removeClass('ui-tabs-selected_fullgreen')
					}
					
					if($(this).find('a').text()!=a1){

						$(this).removeClass('ui-tabs-selected');	
						$(this).removeClass('ui-state-active');
					}

					else if(current == a1){

						$(this).addClass('ui-tabs-selected');	

						$(this).addClass('ui-state-active');

						

					}

				});					

				

				

					$("#addTab-1-"+a[1]).each(function(){

						if($(this).hasClass('ui-tabs-selected_fullgreen'))
						{
							$(this).removeClass('ui-tabs-selected_fullgreen')
						}		

						if($(this).find('a').text()==a1){

														

							$(this).addClass('ui-tabs-selected');	

							$(this).addClass('ui-state-active');	

							//alert('secnd');

							

						}

	

					});

				if(a[1]=='Dashboard'){
					
					//alert($(this).parents().find("div[id='stTabswrapper']").find("ul[id='grid_ul']").find('span.stWidthChecker').find('li').first().attr('id'));

					$(this).parents().find("div[id='stTabswrapper']").find("ul[id='grid_ul']").find('span.stWidthChecker').find('li').first().addClass('ui-tabs-selected');

					$(this).parents().find("div[id='stTabswrapper']").find("ul[id='grid_ul']").find('span.stWidthChecker').find('li').first().addClass('ui-state-active');	

				}

				/*$("li[id*='addTab-1']").each(function(){
					$(this).removeClass('ui-tabs-selected');		
					$(this).removeClass('ui-state-active');	
				});				
				$("#addTab-1"+a[1]).each(function(){		
					$(this).addClass('ui-tabs-selected');				
					$(this).addClass('ui-state-active');		
				});*/					
				$('li[id*="Tab-Content"]').each(function(){				
					$(this).addClass('ui-tabs-hide');					
				});	

				//last_text1 = $("ul[id='grid_ul']").find('span.stWidthChecker').find('li.ui-tabs-selected a').attr('href').split('_')[1];

				
                
				if(a[1]!='Dashboard'){
                    
					last_text1 =$("ul[id='grid_ul']").find('span.stWidthChecker').find('li.ui-tabs-selected a').attr('href');
					
                    $("div[id='tabs-0-1']").addClass('ui-tabs-hide'); 
					$(last_text1).each(function(){					

	                  $(this).removeClass('ui-tabs-hide');		

	                

					});

				}else{                    
					$("div[id='tabs-0-1']").removeClass('ui-tabs-hide');

				}

				
				

				if($tabsNav.find('li.ui-tabs-selected').find('a').text()==current)

				{					

					var navWidth = $nav.is(':visible') ? $nav.find('.stPrev').outerWidth(true) : 0;

					

					var $tabToScrollTo_for_dropdown = $tabsNav.find('li.ui-tabs-selected');

					

					offsetLeft = -($tabs.width()-($tabToScrollTo_for_dropdown.outerWidth(true)+navWidth+32+parseInt($tabsNav.find('li:last').css('margin-right'),10)));

					

					var Settings_of_scroll = { 'axis':'x', 'offset': {'left':offsetLeft},  'easing':o.easing||'' }

						

					$tabsNav.scrollTo($tabToScrollTo_for_dropdown,o.animationSpeed,Settings_of_scroll);

									

				}												
			});											
		});		
		$(document).click(function (event) {		
			if ($(event.target).hasClass('ui-icon-carat-1-dr')) {			
				$("#tabs_dropdown").show();								
			} 			

			else{										   
				$("#tabs_dropdown").hide();				
			}		
		});

		

		$("li[id*='addTab-1-']").live('mouseover mouseout', function(event) {

		//$("a[href*='#Tab-Content']").live('mouseover mouseout', function(event) {

				if (event.type == 'mouseover') {

					var x = '';								   

					var y = '';

					y = $(this).find('span.tooltip').text();

					

					if(y!=''){

						$tabs.disableSelection().attr('title',$(this).find('span.tooltip').text());

						//alert(y+'   first');

					}else{			

						x = $(this).find("a[href*='#Tab-Content']").text();			

						$tabs.disableSelection().attr('title',x);

						//alert(x+'   second');

					}

				}

				

		 });
		
		//$("li[id*='addTab-1-']").live('click',function(){
		  
		  /*$(this).parent('span.stWidthChecker').find('li.ui-tabs-selected_fullgreen').addClass('ui-state-default');
		  $(this).parent('span.stWidthChecker').find('li.ui-tabs-selected_fullgreen').removeClass('ui-tabs-selected_fullgreen');
		  $(this).addClass('ui-tabs-selected');*/
		  //alert( $(this).attr('id'));
		//});
		
		
		

		

	});
		
	//Just for debuging
	function debug(obj)
	{console.log(obj)}	
}
})(jQuery);
/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);