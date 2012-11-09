$.fn.creating_tabs(function(){
//To get the random tabs label with variable length for testing the calculations
	var already_tab = '';
	var temparray = Array();
	var temp = '';
	var page_url = '';
	var change_id_var = 0;	
	var $data_container = $('#data_container')
	.tabs()
	.scrollabletab({
	'closable':true, //Default false
	'animationSpeed':50, //Default 100
	'loadLastTab':true, //Default false
	'resizable':true, //Default false
	'resizeHandles':'e,s,se', //Default 'e,s,se'
	'easing':'easeInOutExpo'
	});
	//Add new tab
	var userAgent = navigator.userAgent.toString().toLowerCase();
	$("a[id*='addTab-1']").live('click',function(){	
		var label = $(this).text();	
		if(label != '' && $.inArray(label,tabsarray) < 0)
		{
			change_id_var++;
			tabsarray.push(label);		
			var tab_name = label.split(' ').join('-');
			change_id_array.push(tab_name+'_'+change_id_var);
			var rnd = 'Tab-Content'+tab_name+'_'+change_id_var;	
			var rndtest = 'Tab-Content'+tab_name;	
			var content = 'Page Not Found';	
			//rnd = Math.floor(Math.random()*10000);
			page_url = $(this).attr('rel');
			//alert(page_url);
			if(page_url != '')
			{
				//alert('helloo');
				
					
			$('body').append('<li id="'+rnd+'" style="padding:0px; margin:0px;"><iframe class="myIframe" name="iframe_'+rnd+'" id="iframe_'+rnd+'" border="0" width="100%" scrolling="no" style="border:0px; overflow:hidden;" src="'+page_url+'"></iframe></li>');
			ShowModalPopup('blockui');
				
			//displayContent(rnd,page_url);
			}
			/*else
			{
			$('body').append('<li id="'+rnd+'" style="padding:0px; margin:0px;">'+content+'</li>');
			}*/
			/*if(page_url != '' && $.inArray(page_url,temparray) < 0)
			{				
			temparray.push(page_url);
			for(var n=0;n<temparray.length;n++){
			if(page_url != '' && temparray[n] == page_url)
			{
			//alert(temparray+'       '+temparray[n]);
			$('body').append('<li id="'+rnd+'" style="padding:0px; margin:0px;"><iframe class="myIframe" name="iframe_'+rnd+'" id="iframe_'+rnd+'" border="0" width="100%" style="border:0px; overflow:hidden;" src="'+page_url+'"></iframe></li>');
			//displayContent(rnd,page_url);
			}
			}
			}*/
			/*$('body').find("div[id='container']").siblings("li[id*='Tab-Content']").each(function(){
			$(this).remove();
			});*/
			$("#iframe_"+rnd).load(function() {
				$contentHeight = $(this).contents().height();
				//alert("iframe height--->"+$contentHeight);
				if (userAgent.indexOf('chrome') != -1) {
				$contentHeight = $contentHeight+95;	
				}
				$(this).css('height',$contentHeight-140+'px');
				HideModalPopup('blockui');
			});
			temp = page_url;
			///only for dashboard tab////
			$("li > a[id='tabs-0']").removeClass('ui-tabs-selected');
			///End dashboard tab////
			$data_container.tabs('add','#'+rnd,label);	
			$("#addTab-1"+label.split(' ').join('-')).each(function(){
				if($(this).hasClass('ui-tabs-selected_fullgreen'))
				{
					$(this).removeClass('ui-tabs-selected_fullgreen')
				}
				//alert('test');
				if($(this).find('a').text()==label){
					$(this).addClass('ui-tabs-selected');				
					$(this).addClass('ui-state-active');
					//alert('Top_second');
				}
				else{
					$(this).removeClass('ui-tabs-selected');		
					$(this).removeClass('ui-state-active');	
					//alert('Top_else');
				}
			});
			$("li[id*='addTab-1']").each(function(){
				if($(this).hasClass('ui-tabs-selected_fullgreen'))
				{
				$(this).removeClass('ui-tabs-selected_fullgreen')
				}
				if($(this).find('a').text()!=label){
				$(this).removeClass('ui-tabs-selected');		
				$(this).removeClass('ui-state-active');	
				//alert('Topfirst');
				}
			});
		}
		else if(label != '')
		{			
			$("li[id*='addTab-1']").each(function(){
				if($(this).hasClass('ui-tabs-selected_fullgreen'))
				{
					$(this).removeClass('ui-tabs-selected_fullgreen')
				}
				if($(this).find('a').text()!=label){
					$(this).removeClass('ui-tabs-selected');		
					$(this).removeClass('ui-state-active');	
					//alert('first');
				}
				else{
					$(this).addClass('ui-tabs-selected');		
					$(this).addClass('ui-state-active');					
				}
			});
			$("#addTab-1"+label.split(' ').join('-')).each(function(){
				if($(this).hasClass('ui-tabs-selected_fullgreen'))
				{
					$(this).removeClass('ui-tabs-selected_fullgreen')
				}
				if($(this).find('a').text()==label){
					$(this).addClass('ui-tabs-selected');				
					$(this).addClass('ui-state-active');
					//alert($(this).find('a').text()+'  '+label);
				}
				else{
					$(this).removeClass('ui-tabs-selected');		
					$(this).removeClass('ui-state-active');	
				}
			});
			$("li > a[id='tabs-0']").removeClass('ui-tabs-selected');
			
			$('li[id*="Tab-Content"]').each(function(){				
				$(this).addClass('ui-tabs-hide');
			});
			var last_text = $("ul[id='grid_ul']").find('span.stWidthChecker').find('li.ui-tabs-selected a').attr('href');
			//alert($("ul[id='grid_ul']").find('span.stWidthChecker').find('li.ui-tabs-selected a').attr('href'));
			//for(var d=0;d<change_id_array.length;d++){
			//change_id_array[d].split('_')[1];
			//if(change_id_array[d].split('_')[0]==label){
			//alert('#Tab-Content'+label.split(' ').join('-')+'_'+last_text);
			//$('#Tab-Content'+label.split(' ').join('-')+'_'+last_text).each(function(){					
			//$(this).removeClass('ui-tabs-hide');	
			//});
			$("div[id='tabs-0-1']").addClass('ui-tabs-hide');
			$(last_text).removeClass('ui-tabs-hide');
			//}
			//}
			/*$.getScript("view/javascript/jquery/js/jquery.scrollabletab.js", function(){				
			});*/
		}	
			//alert(tabsarray);
			return false;
		});	
});

