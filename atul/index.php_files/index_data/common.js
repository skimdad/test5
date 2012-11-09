var token = getUrlVars()["token"];



var rand_no =  Math.floor(Math.random() * 100000);	



var item_arr = new Array();



/**



		 * jQuery.fn.sort



		 * --------------



		 * @author James Padolsey (http://james.padolsey.com)



		 * @version 0.1



		 * @updated 18-MAR-2010



		 * --------------



		 * @param Function comparator:



		 *   Exactly the same behaviour as [1,2,3].sort(comparator)



		 *   



		 * @param Function getSortable



		 *   A function that should return the element that is



		 *   to be sorted. The comparator will run on the



		 *   current collection, but you may want the actual



		 *   resulting sort to occur on a parent or another



		 *   associated element.



		 *   



		 *   E.g. $('td').sort(comparator, function(){



		 *      return this.parentNode; 



		 *   })



		 *   



		 *   The <td>'s parent (<tr>) will be sorted instead



		 *   of the <td> itself.



		 */







		jQuery.fn.sortElements = (function(){



			var sort = [].sort;



			return function(comparator, getSortable) {



				getSortable = getSortable || function(){return this;};



				var placements = this.map(function(){



				var sortElement = getSortable.call(this),



						parentNode = sortElement.parentNode,



						// Since the element itself will change position, we have



						// to have some way of storing its original position in



						// the DOM. The easiest way is to have a 'flag' node:



						nextSibling = parentNode.insertBefore(



							document.createTextNode(''),



							sortElement.nextSibling



						);



					return function() {



						if (parentNode === this) {



							throw new Error(



								"You can't sort elements if any one is a descendant of another."



							);



						}



						// Insert before flag:



						parentNode.insertBefore(this, nextSibling);



						// Remove flag:



						parentNode.removeChild(nextSibling);



					};



				});



					return sort.call(this, comparator).each(function(i){



					placements[i].call(getSortable.call(this));



				});



			};



		})();		


		$.fn.textWidth = function(){



		  var html_org = $(this).html();



		  var html_calc = '<span>' + html_org + '</span>'



		  $(this).html(html_calc);



		  var width = $(this).find('span:first').width();



		  $(this).html(html_org);



		  return width;



		};



		/////////// START for scrolling the table rows///////



		$('div[id^="my_scroll_div-"]').live('hover', function() {



			var el = $(this);



			if (!el.data("has-scroll")) {



				el.data("has-scroll", true);



				$('div[id^="my_scroll_div-"]').scroll(function() {



					//$(this).append('<div>Handler for .scroll() called.'+$(this).css('width')+'</div>');



					if ($(this).scrollTop() > $(".my_special").offset().top) {



						var x = 0;


						var current_obj = $(this);


						$(this).find(".my_special").addClass('fixed');


						current_obj.find("table").find("tr:eq(0)").find('td').each(function(){


							var another_obj = $(this);


							if(another_obj.find("span").hasClass('row-content-dropdown')){


								another_obj.find("span").hide();


							}



							current_obj.find("table").find("tr:eq(1)").find("th:eq("+x+")").css('width',$(this).css('width'));


							x++;


						});



					} else {				



						$(this).find(".my_special").removeClass('fixed');


						$(this).find("table").find("tr:eq(0)").find('td').each(function(){


							if($(this).find("span").css('display')=='none'){



								$(this).find("span").css('margin-top',-21);



								$(this).find("span").show();



							}



						});



					}			  



				});



			}



		});



/////////// END  for scrolling the table rows///////


		function updateTips( t ) {



					$( ".validateTips" )



						.text( t )



						.addClass( "ui-state-highlight" );				



						setTimeout(function() {



						$( ".validateTips" ).removeClass( "ui-state-highlight", 1500 );



					}, 500 );



		}



		function getUrlVars()



				{



					var vars = [], hash;



					var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');



					for(var i = 0; i < hashes.length; i++)



					{



						hash = hashes[i].split('=');



						if($.inArray(hash[0], vars)>-1)



						{



							vars[hash[0]]+=","+hash[1];



						}



						else



						{



							vars.push(hash[0]);



							vars[hash[0]] = hash[1];



						}



					}



					return vars;



				}







		$.fn.textWidth = function(){



		  var html_org = $(this).html();



		  var html_calc = '<span>' + html_org + '</span>'



		  $(this).html(html_calc);



		  var width = $(this).find('span:first').width();



		  $(this).html(html_org);



		  return width;



		};







		function refreshIframe(){



			arrFrames = parent.document.getElementsByTagName("IFRAME");



			  for (var i = 0; i < arrFrames.length; i++) {



				   if (arrFrames[i].contentWindow === window){



					   arrFrames[i].contentDocument.location.reload(true);



				   }



			  }



		}







		$.fn.textWidth = function(){



			var html_org = $(this).html();



			var html_calc = '<span>' + html_org + '</span>'



			$(this).html(html_calc);



			var width = $(this).find('span:first').width();		



			$(this).html(html_org);



			return width;



  };







		function getIframeIDAndSrc(){



			arrFrames = parent.document.getElementsByTagName("IFRAME");



			  for (var i = 0; i < arrFrames.length; i++) {



				   if (arrFrames[i].contentWindow === window){



					   var ifrm_src = $(arrFrames[i]).attr('src');



					   var ifrm_id = $(arrFrames[i]).attr('id');



					   var temp = Array(ifrm_id,ifrm_src);



				   }



			  }



			  return temp;



		}







		function edit_form_generator(value){







			 var token = getUrlVars()["token"];	 







			 var page_id = parseInt($('#page_id').val());







//var part_no = $("table#sort-table-1").find('tr.row_click ').find('td.part_number').text();







			 var id = $(value).attr('id');







			 var id_arr = id.split('-');







			 var id_last_text = (id.split('-')[3]);//alert(id_last_text);







			 if(id_arr[0] == 'bin'){







				 var class_identifier = $('#bin-row-'+id_arr[2]);	







			 }





			 else if(id_arr[0] == 'grid'){







				 var class_identifier = $(value).parent().parent();







			 }







 //alert(class_identifier);







				switch(page_id){					







				case 1:







				break;







				case 2:







						$("input#freight_id_edit").val(' ');







						var audit_notes_ids = class_identifier.find('input.audit_notes_ids').val();







						$("input#audit_notes_id").val(audit_notes_ids);







						var restore_id = class_identifier.find('input.freight_id').val();







						//alert('audit notes id    '+audit_notes_ids+'restore_id     '+restore_id);







						if(class_identifier.find('input.deleted').val() == 1){







							$('#restore_deleted_entry').find('td.OBToolbarIconButton_icon_restoreButton').removeClass('OBToolbarIconButtonDisabled');	







						}







						$("input#restore_id").val(restore_id);







						$("input#edit_form_location_id").val();







						$("input#edit_form").val('edit');







						$("input#insert_form").val(' ');						







						var class_check = class_identifier.hasClass('row_click'); 	//used to detect which row of table is selected							







						if(id_arr[0] == 'bin' && class_check){







							var warehouse_name = class_identifier.find('td.mytab').text();







							var freight_company_name = class_identifier.find('td.freight_name').text();







							}						







						else{







							var warehouse_name = class_identifier.find('td.mytab').text();







							var freight_company_name = class_identifier.find('td.freight_name').text();







						}







						$.ajax({







								url: 'index.php?route=common/common_ajax/getFreightRowEntries&token='+token,								







								type: 'post',







								data: 'warehouse_name='+warehouse_name+'&freight_company_name='+freight_company_name,







								dataType: 'json',







								success: function(response) {







									var res_var = eval(response);				  		







									for(i=0; i<res_var.length; i++)







									{					







										$("input#create_serviced_name").val(res_var[i]['warehouse_serviced']);







										$("input#create_search_key").val(res_var[i]['search_key']);







										$("input#create_freight_company").val(res_var[i]['freight_company']);







										$("input#create_location_add").val(res_var[i]['location_add']);







										if(res_var[i]['active'] == 1){







											$("input#create_active").attr('checked' ,true);







										}					







										$("input#freight_id_edit").val(res_var[i]['freight_id']);







										$("input#edit_form_location_id").val(res_var[i]['location_id']);







									}







								}







						});







							if(id_arr[0] == 'grid'){







								var no_id = $(value).attr('id').split('-')[3];







								if($(value).attr('id') == 'grid-button-form-'+no_id){			







									//$('#sort-table-1').hide(1);







									$('div[id^="my_scroll_div-"]').hide(1);	







									$('#freight_create').css('display','');







									$('#freight_create').appendTo($('#form_freight_company'));







									$('#form_freight_company').show(1);	







								}							







								}







							else if(id_arr[0] == 'bin')	{







								//$('#sort-table-1').hide(1);	







								$('div[id^="my_scroll_div-"]').hide(1);







								$('#freight_create').css('display','');







								$('#freight_create').appendTo($('#form_freight_company'));







								$('#form_freight_company').show(1);						







									}					







					break;					







					case 6:						







					    var orange_div = $('#incoming_consignment').parent().parent().css('backgroundColor');







			            var lower_orange_color = $('#row-content-bar').find('form').parent().parent().css('backgroundColor');







						if(orange_div == 'rgb(250, 150, 47)'){







						$("input#incoming_consignment_id").val(' ');







						$("input#edit_form").val('edit');







						$("input#insert_form").val(' ');						







						var class_check = class_identifier.hasClass('row_click'); 	//used to detect which row of table is selected							







						var po_id = class_identifier.find('input.po_id').val();







						var audit_notes_ids = class_identifier.find('input.audit_notes_ids').val();	







						//alert('audit notes id    '+audit_notes_ids);







						$("#audit_notes_field").val(audit_notes_ids);







						var restore_id = class_identifier.find('input.incoming_id').val();







						//alert('audit notes id    '+audit_notes_ids+'restore_id     '+restore_id);







						if(class_identifier.find('input.deleted').val() == 1){







							$('#restore_deleted_entry').find('td.OBToolbarIconButton_icon_restoreButton').removeClass('OBToolbarIconButtonDisabled');	







						}







						$("input#restore_id").val(restore_id);







						$.ajax({







								url: 'index.php?route=common/common_ajax/getIncominConsignmentRowEnteries&token='+token,







								type: 'post',







								data: 'po_id='+po_id,







								dataType: 'json',







								success: function(response) {







									var res_var = eval(response);				  			







									for(i=0; i<res_var.length; i++)







									{					







										$("input#create_document_no").val(res_var[i]['document_no']);







										$("input#create_document_type").val(res_var[i]['document_type']);







										$("input#create_description").val(res_var[i]['description']);







										$("input#create_movement_date").val(res_var[i]['movement_date']);







										$("input#create_source_address").val(res_var[i]['source_address']);







										$("input#create_warehouse").val(res_var[i]['warehouse_id']);







										$("input#create_document_status").val(res_var[i]['document_status']);







										$("input#create_vendor").val(res_var[i]['vendor']);







										$("input#create_delivery_location").val(res_var[i]['delivery_location']);







   										$("input#incoming_consignment_id").val(res_var[i]['po_id']);







									}	







								}







						});







							if(id_arr[0] == 'grid'){







								var no_id = $(value).attr('id').split('-')[3];







								if($(value).attr('id') == 'grid-button-form-'+no_id){	







									//$('#sort-table-1').hide(1);	







									$('div[id^="my_scroll_div-"]').hide(1);									







									$('#incoming_consignment_create').css('display','');								







									$('#incoming_consignment_create').appendTo($('#incoming_consignment'));									







									$('#incoming_consignment').show(1);	







								}







							}							







							else if(id_arr[0] == 'bin')	{							







								//$('#sort-table-1').hide(1);	







								$('div[id^="my_scroll_div-"]').hide(1);







								$('#incoming_consignment_create').css('display','');







								$('#incoming_consignment_create').appendTo($('#incoming_consignment'));







								$('#incoming_consignment').show(1);







							}







						}						







						if(lower_orange_color == 'rgb(250, 150, 47)'){







						$("input#incoming_consignment_id").val(' ');					







						var class_check = class_identifier.hasClass('row_click'); 	//used to detect which row of table is selected							







						var po_product_id = class_identifier.find('input.po_product_id').val();







						var vendor_id = class_identifier.find('input.vendor_id').val();







						//alert(vendor_id+'test'+po_product_id);







						var audit_notes_ids = class_identifier.find('input.audit_notes_ids').val();						







						$.ajax({







							url: 'index.php?route=common/common_ajax/getIncominConsignmentRowEnteriesBottomTable&token='+token,	







							type: 'post',







							data: 'po_product_id='+po_product_id+'&vendor_id='+vendor_id,	







							dataType: 'html',	







							success: function(response) {	



								//alert(response);



								var res_var = eval(response);	







								for(i=0; i<res_var.length; i++)	







								{		







									$("input#create_quantity").val(res_var[i]['quantity_received']);	







									$("input#create_unit").val(res_var[i]['unit']);	







									$("input#create_product").val(res_var[i]['product_name']);	







									$("input#create_storage_bin").val(res_var[i]['storage_bin']);	



									$("input#create_serial_number").val(res_var[i]['serial_numbers']);



									$("input#create_model").val(res_var[i]['model']);	







									$("input#incoming_consignment_id_bottom").val(res_var[i]['po_product_id']);







								}	







							}	







						});







						$('#audit_notes_field').val(audit_notes_ids);







							if(id_arr[0] == 'grid'){







								var no_id = $(value).attr('id').split('-')[5];







								if($(value).attr('id') == 'grid-button-form-lower-table-'+no_id){







									$.ajax({







									url: 'index.php?route=common/common_ajax/getIncominConsignmentRowEnteriesBottomTable&token='+token,	







									type: 'post',







									data: 'po_product_id='+po_product_id+'&vendor_id='+vendor_id,	







									dataType: 'json',	







									success: function(response) {	







										var res_var = eval(response);	







										for(i=0; i<res_var.length; i++)	







										{		







											$("input#create_quantity").val(res_var[i]['quantity_received']);	





											$("input#create_unit").val(res_var[i]['unit']);	





											$("input#create_product").val(res_var[i]['product_name']);	











											$("input#create_storage_bin").val(res_var[i]['storage_bin']);												

											$("input#create_serial_number").val(res_var[i]['serial_numbers']);















											$("input#create_model").val(res_var[i]['model']);	











											$("input#incoming_consignment_id_bottom").val(res_var[i]['po_product_id']);







											







											$("table[id*='sort-table-bin-row-']").parents().find('div[id^="my_scroll_div-2"]').hide(1);







											$('div#incoming_consignment_create_bottom').css('display','none');







											var x = $('div#incoming_consignment_create_bottom').html();







											$('form[id="row-content"]').append(x);







											







											$('form[id="row-content"]').find("input#create_quantity").val(res_var[i]['quantity_received']);







											$('form[id="row-content"]').find("input#create_unit").val(res_var[i]['unit']);	







											$('form[id="row-content"]').find("input#create_product").val(res_var[i]['product_name']);							$('form[id="row-content"]').find("input#create_storage_bin").val(res_var[i]['storage_bin']);							







											$('form[id="row-content"]').find("input#create_serial_number").val(res_var[i]['serial_numbers']);											$('form[id="row-content"]').find("input#create_model").val(res_var[i]['model']);







											$('form[id="row-content"]').find("input#incoming_consignment_id_bottom").val(res_var[i]['po_product_id']);







											$('form#row-content').show(1);		







					







										}	







									}	







								});







							}







						}







						else if(id_arr[0] == 'bin')	{











							$('#incoming_consignment_create_bottom').css('display','');



							$('#incoming_consignment_create_bottom').appendTo($('#row-content'));



							$("table[id^='sort-table-bin-row-']").parents().find("div[id^='my_scroll_div-']").hide(1);



							$('#incoming_consignment_create_bottom').show(1);











						}																				







					}



					break;



					case 7:



						var orange_div = $('#outgoing_consignment').parent().parent().css('backgroundColor');



			            var lower_orange_color = $('#row-content-bar').find('form').parent().parent().css('backgroundColor');



						if(orange_div == 'rgb(250, 150, 47)'){



						var class_check = class_identifier.hasClass('row_click'); 	//used to detect which row of table is selected							



						var order_id  =  class_identifier.find('input.order_id').val();



						var audit_notes_ids = class_identifier.find('input.audit_notes_ids').val();







						$('#audit_notes_field').val(audit_notes_ids);



						var restore_id = class_identifier.find('input.outgoing_id').val();



						if(class_identifier.find('input.deleted').val() == 1){							



							$('#restore_deleted_entry').find('td.OBToolbarIconButton_icon_restoreButton').removeClass('OBToolbarIconButtonDisabled');	



						}



						$("input#restore_id").val(restore_id);



						$.ajax({



								url: 'index.php?route=common/common_ajax/getOutgoingEditClickEntry&token='+token,



								type: 'post',



								data: 'order_id='+order_id,



								dataType: 'json',



								success: function(response) {







									//alert(response);



									var res_var = eval(response);				  			



									for(i=0; i<res_var.length; i++)



									{					



										$("#create_document_no").val(res_var[i]['document_number']);



										$("#create_document_type").val(res_var[i]['document_type']);				



										$('#create_warehouse').val(res_var[i]['warehouse']);



										$('#create_customer').val(res_var[i]['customer']);

										

										$("#create_satchel").val(res_var[i]['satchel']);



										$('#create_destination_address').val(res_var[i]['destination_address']);



										$('#create_document_status').val(res_var[i]['document_status']);						



										$("#create_movement_date").val(res_var[i]['movement_date']);



										$("#create_description").val(res_var[i]['description']);									



									}									























								}						























							});



						if(id_arr[0] == 'grid'){						



							var no_id = $(value).attr('id').split('-')[3];



							if($(value).attr('id') == 'grid-button-form-'+no_id){			



								/*$('#sort-table-1').hide(1);	*/



								$("div[id^='my_scroll_div-']").hide(1);



								$('#outgoing_consignment_create').css('display','');



								$('#outgoing_consignment_create').appendTo($('#outgoing_consignment'));



								$('#outgoing_consignment').show(1);	



							}else if($(value).attr('id') == 'grid-button-form-lower-table-'+no_id){				



									$('#outgoing_consignment_create_bottom').css('display','');



									$('#outgoing_consignment_create_bottom').appendTo($('#row-content'));



									$("table[id^='sort-table-bin-row-']").parents().find("div[id^='my_scroll_div-']").hide(1);



									$('#outgoing_consignment_create_bottom').show(1);



							}



						}



						else if(id_arr[0] == 'bin')	{



								//$('#sort-table-1').hide(1);	



								$("div[id^='my_scroll_div-']").hide(1);



								$('#outgoing_consignment_create').css('display','');



								$('#outgoing_consignment_create').appendTo($('#outgoing_consignment'));



								$('#outgoing_consignment').show(1);



							}



						}



						break;



					case 8:







						$("input#goods_transaction_id_edit").val(' ');







						$("input#edit_form").val('edit');







						$("input#insert_form").val(' ');







						var audit_notes_ids = class_identifier.find('input.audit_notes_ids').val();







						$("#audit_notes_field").val(audit_notes_ids);	







						var restore_id = class_identifier.find('input.transaction_id').val();







						if(class_identifier.find('input.deleted').val() == 1){						











							$('#restore_deleted_entry').find('td.OBToolbarIconButton_icon_restoreButton').removeClass('OBToolbarIconButtonDisabled');











						}















						$("input#restore_id").val(restore_id);				







						var class_check = class_identifier.hasClass('row_click'); 	//used to detect which row of table is selected							







						if(id_arr[0] == 'bin' && class_check){











						var transaction_id = class_identifier.find('input.transaction_id').val();







						}						











						else{











						var transaction_id = class_identifier.find('input.transaction_id').val();











						}







						$.ajax({



							



								url: 'index.php?route=common/common_ajax/getGoodsTransactionRowEnteries&token='+token,







                            	type: 'post',







								data: 'transaction_id='+transaction_id,







								dataType: 'json',







								success: function(response) {







									var res_var = eval(response);				  			







									for(i=0; i<res_var.length; i++)







									{					







										$("input#create_product_name").val(res_var[i]['product_name']);







										$("input#create_product_code").val(res_var[i]['product_code']);







										$("input#create_movement_type").val(res_var[i]['movement_type']);







										$("input#create_movement_date").val(res_var[i]['movement_date']);







										$("input#create_movement_date").datepicker({dateFormat: 'yy-mm-dd'});







										$("input#create_movement_qty").val(res_var[i]['quantity']);







										$("input#create_storage_bin").val(res_var[i]['storage_bin']);







										$("input#create_unit").val(res_var[i]['sku']);



										



										$("input#create_warehouse_ids").val(res_var[i]['destination_storage_bin']);







										$("input#goods_transaction_id_edit").val(res_var[i]['transaction_id']);



										



									}	







								}







						});











							if(id_arr[0] == 'grid'){







							var no_id = $(value).attr('id').split('-')[3];







							if($(value).attr('id') == 'grid-button-form-'+no_id){			







								//$('#sort-table-1').hide(1);									







								$("div[id^='my_scroll_div-']").hide(1);







								$('#goods_transaction_create').css('display','');







								$('#qty_text').hide(1);







								$('#goods_transaction_create').appendTo($('#goods_transaction'));







								$('#goods_transaction').show(1);







							}







							}







							else if(id_arr[0] == 'bin')	{







							//$('#sort-table-1').hide(1);







							$("div[id^='my_scroll_div-']").hide(1);	







							$('#goods_transaction_create').css('display','');







							$('#goods_transaction_create').appendTo($('#goods_transaction'));







							$('#goods_transaction').show(1);	







							}







							$('#create_movement_date').datepicker({dateFormat: 'yy-mm-dd'});				







							break;



						case 11:

						

						var customer_group = '';

						

						var account_manager_text = '';

						

						var status_text = '';

						

						$('select#create_customer_group option').each(function(i, option){ $(option).remove(); });

						

						$('select#create_account_manager option').each(function(i, option){ $(option).remove(); });

						

						$('select#create_status option').each(function(i, option){ $(option).remove(); });

						

						$("input#customer_id_edit").val('');



						$("input#edit_form").val('edit');



						$("input#insert_form").val(' ');



						var audit_notes_ids = class_identifier.find('input.audit_notes_ids').val();



						$("#audit_notes_field").val(audit_notes_ids);	



						var restore_id = class_identifier.find('input.customer_id').val();



						if(class_identifier.find('input.deleted').val() == 1){						



							$('#restore_deleted_entry').find('td.OBToolbarIconButton_icon_restoreButton').removeClass('OBToolbarIconButtonDisabled');



						}



						$("input#restore_id").val(restore_id);		

						

						var class_check = class_identifier.hasClass('row_click'); 	//used to detect which row of table is selected							



						if(id_arr[0] == 'bin' && class_check){



						var customer_id = class_identifier.find('input.customer_id').val();



						}						



						else{

							

						var customer_id = class_identifier.find('input.customer_id').val();



						}



						$.ajax({



								url: 'index.php?route=common/customer_ajax/getCustomerEntry&token='+token,



                            	type: 'post',



								data: 'customer_id='+customer_id,



								dataType: 'json',



								success: function(response) {

									

									//alert(response)



									var res_var = (response);	

									

									//alert(res_var['account_manager'].length)			  			



									$("input#create_company").val(res_var['customer_detail'].company);

									

									$("input#temp_company_name").val(res_var['customer_detail'].company);



										$("input#create_customer_number").val(res_var['customer_detail'].customer_number);



										$("input#create_email").val(res_var['customer_detail'].email);

										

										for(x=0; x<res_var['customer_groups'].length; x++){

											

											if(res_var['customer_groups'][x]['customer_group_id'] == res_var['customer_detail'].customer_group){

												

												customer_group += '<option value="'+res_var['customer_groups'][x]['customer_group_id']+'" selected="selected">'+res_var['customer_groups'][x]['name']+'</option>';

												

											}else{

												

												customer_group += '<option value="'+res_var['customer_groups'][x]['customer_group_id']+'">'+res_var['customer_groups'][x]['name']+'</option>';

											

											}

											

										}

										

										$("select#create_customer_group").append(customer_group);

										

										for(a=0; a<res_var['account_manager'].length; a++){

											

											if(res_var['account_manager'][a]['salesrep_id'] == res_var['customer_detail'].account_manager){

												

												account_manager_text += '<option value="'+res_var['account_manager'][a]['salesrep_id']+'" selected="selected">'+res_var['account_manager'][a]['name']+'</option>';

												

											}else{

												

												account_manager_text += '<option value="'+res_var['account_manager'][a]['salesrep_id']+'">'+res_var['account_manager'][a]['name']+'</option>';

											

											}

											

										}

										

										$("select#create_account_manager").append(account_manager_text);



										if(res_var['customer_detail'].status == 'Enabled'){

											

											status_text += '<option value="1" selected="selected">Enabled</option>';

											

											status_text += '<option value="0">Disabled</option>';

										

										}else{

											

											status_text += '<option value="1">Enabled</option>';

											

											status_text += '<option value="0" selected="selected">Disabled</option>';

										

										}

										

										$("select#create_status").append(status_text);



										$("input#create_approved").val(res_var['customer_detail'].approved);



										$("input#create_ip").val(res_var['customer_detail'].ip);

										

										$("input#create_first_name").val(res_var['customer_detail'].first_name);

										

										$("input#create_last_name").val(res_var['customer_detail'].last_name);

										

										$("input#create_date_added").val(res_var['customer_detail'].date_added);



										$("input#customer_id_edit").val(res_var['customer_detail'].customer_id);									



								}



						});



							if(id_arr[0] == 'grid'){



							var no_id = $(value).attr('id').split('-')[3];



							if($(value).attr('id') == 'grid-button-form-'+no_id){			



								//$('#sort-table-1').hide(1);									



								$("div[id^='my_scroll_div-']").hide(1);



								$('#customer_create').css('display','');

								

								$('#customer_create').appendTo($('#form_customer'));



								$('#form_customer').show(1);



							}



							}



							else if(id_arr[0] == 'bin')	{



							//$('#sort-table-1').hide(1);



								$("div[id^='my_scroll_div-']").hide(1);	



								$('#customer_create').css('display','');



								$('#customer_create').appendTo($('#form_customer'));



								$('#form_customer').show(1);	



							}						

							

						break;

						

				}

				

		}







		////Code for toggling statusbar image under personalize icon/////







		function toggle_image_status(value){







		/******Code to disable selection of text*****/







			var img_id = $(value).find('span > img').attr('id');







			$(value).attr('unselectable', 'on')







               .css({







                   '-ms-user-select':'none',







                   '-moz-user-select':'none',







                   '-webkit-user-select':'none',







                   'user-select':'none',







               })







			/*****End of disable selection code******/







			var src = $('#'+img_id).attr('src');







			if(src=='view/image/iconFolder_closed.png')







			{







				$('#'+img_id).attr('src','view/image/iconFolder_open.png');







			}







			else if(src=='view/image/iconFolder_open.png'){







				$('#'+img_id).attr('src','view/image/iconFolder_closed.png');







		    }







		}		////Code for toggling form image in personalize icon////







		function toggle_image_form(value){























			/******Code to disable selection of text*****/















			var img_id = $(value).find('span > img').attr('id');







			var form_list = $(value).parent().find('span.form_list').attr('id');







			$(value).attr('unselectable', 'on')







               .css({







                   '-ms-user-select':'none',







                   '-moz-user-select':'none',







                   '-webkit-user-select':'none',







                   'user-select':'none',







               })







			   /*****End of disable selection code******/







			var src = $('#'+img_id).attr('src');







			if(src=='view/image/iconFolder_closed.png')







			{







				$('#'+img_id).attr('src','view/image/iconFolder_open.png');







				$('#'+form_list).slideDown(100);







			}







			else if(src=='view/image/iconFolder_open.png'){







				$('#'+img_id).attr('src','view/image/iconFolder_closed.png');







				$('#'+form_list).slideUp(100);







		    }







		}







		function toggle_image_audit(value,parent){



		   var page_id = parseInt($('#page_id').val());



		   /******Code to disable selection of text*****/



		   var img_id = $(value).children().find('span > img').attr('id');



		   $(value).attr('unselectable', 'on')



					   .css({



						   '-ms-user-select':'none',



						   '-moz-user-select':'none',



						   '-webkit-user-select':'none',



						   'user-select':'none',



					   })



		   /*****End of disable selection code******/



		   var src = $('#'+img_id).attr('src');



		   if(src=='view/image/iconFolder_closed.png')



		   {



			$('#'+img_id).attr('src','view/image/iconFolder_open.png');



		   }



		   else if(src=='view/image/iconFolder_open.png'){



		   $('#'+img_id).attr('src','view/image/iconFolder_closed.png');



		  }



		   if(src=='view/image/iconFolder_open.png')



		   {



			$('#audit_row').hide(1);



			$('#bottom-audit_row_lower-prod-transaction').hide(1);



			$('#bottom-audit_row_lower-bin-conts').hide(1);   



		   }



		   else if(src=='view/image/iconFolder_closed.png'){



			$(value).parent().find('tr.audit_row').remove();



			$(value).parent().find('tr.audit_entry').remove();



			var data_str = '';



			switch(page_id){



			case 1:				

			

			data_str = $('#audit_notes_field').val();



		    break;



		    case 2:



				data_str = $('#audit_notes_id').val();



		    break;



			case 3:



				data_str = $('#audit_notes_id').val();			



			break;			



		   case 6:				



		   		data_str = $('#audit_notes_field').val();



		   break;



		   case 7:



				data_str = $('#audit_notes_field').val();



			break;



			case 8:



				data_str = $('#audit_notes_field').val();



			break;

			

			case 11:

				

				data_str = $('#audit_notes_field').val();



			break;



			}







			$.ajax({







			 url: 'index.php?route=common/common_ajax/auditNotesResultFreight&token='+token,







			 type: 'post',







			 data: 'data_str='+data_str+'&page_id='+page_id+'&parent='+parent,







			 dataType: 'json',







			 success: function(response) {







			//alert(response);







			 var res_var = eval(response);







			  //alert(res_var[0]['created']);







			  var content = '<tr id="audit_row" class="audit_row">';



			  content += '<td style="padding-top:10px;" colspan="4"><div style="height:60px; overflow-x: hidden;"><table width="100%" cellpadding="0" cellspacing="0"  border="0">';



			  content += '<tr>';



			  content += '<td class="text-font" width="15%">Creation Date</td>';



			  content += '<td class="text-font" width="15%">Created By</td>';



			  content += '<td class="text-font" width="15%">Updated</td>';



			  content += '<td class="text-font" width="15%">Updated By</td>';



			  content += '<td class="text-font" width="40%">Notes</td>';



			  content += '</tr>';



			  content += '</tr>';



			  content += '<tr>';



			  content += '<td class="text-font" width="15%"></td>';



			  content += '<td class="text-font" width="15%"></td>';



			  content += '<td class="text-font" width="15%"></td>';



			  content += '<td class="text-font" width="15%"></td>';



			  content += '<td class="text-font" width="40%"><textarea name="notes_field" class="enabled_notes" id="notes_field" style="width:90%; max-height:23px; max-width:100%;"></textarea></td></td>';



			  content += '</tr>';



			  for(var x = 0; x < res_var.length; x++){



			  if(x==(res_var.length-1)){



              content += '<tr height="23" class="audit_entry">';



			  content += '<td width="15%">'+res_var[x]['created']+'</td>';



			  content += '<td width="15%">'+res_var[x]['created_by']+'</td>';



			  content += '<td width="15%">'+res_var[x]['updated']+'</td>';



			  content += '<td width="15%">'+res_var[x]['updated_by']+'</td>';



			  /*if(res_var[x]['notes_field'] == ''){



			   content += '<td width="40%"><textarea name="notes_field" id="notes_field" style="width:90%; max-height:23px; max-width:100%;"></textarea></td>';



			  }



			  else if(res_var[x]['notes_field'] != ''){*/



			   content += '<td width="40%"><textarea name="notes_field'+x+'" class="disabled_notes" id="notes_field'+x+'" style="width:90%; max-height:23px; max-width:100%;" disabled="disabled" >'+res_var[x]['notes_field']+'</textarea></td>';



			 // }



			  }



			  else{



			  content += '<tr height="23" class="audit_entry">';



			  content += '<td width="15%"></td>';



			  content += '<td width="15%"></td>';



			  content += '<td width="15%">'+res_var[x]['updated']+'</td>';



			  content += '<td width="15%">'+res_var[x]['updated_by']+'</td>';



			  content += '<td width="40%"><textarea name="notes_field'+x+'" class="disabled_notes" id="notes_field'+x+'" style="width:90%; max-height:23px; max-width:100%;" disabled="disabled" >'+res_var[x]['notes_field']+'</textarea></td>';



			  }



			  }



			  content += '</table></div></td>';



			  content += '</tr>'; 



			  $(value).after(content);



			 }



			}); 



			$('#audit_row').show(1);



			$('#bottom-audit_row_lower-prod-transaction').show(1);



			$('#bottom-audit_row_lower-bin-conts').show(1);     



		   }



		}



		



		function save_sort_order(parent_page,updated_str,frame_refresh){







			var page_id = $('#page_id').val();







			//alert(page_id);







			var parent = parseInt(parent_page); //this is used if subtable is present on the page







			//alert('page_id='+page_id+updated_str+'&parent='+parent);







			$.ajax({







				url: 'index.php?route=common/common_ajax/updateSortOrder&token='+token,







				type: 'post',







				data: 'page_id='+page_id+updated_str+'&parent='+parent,				







				dataType: 'html',







				success: function(response) {







					//alert(response);







					//DO NOTHING







					if(frame_refresh == 1){







						refreshIframe();







					}







					}







				});







		}







$(document).ready(function(){







	







	







	////////Coding Start For Columns Resize functionality/////////







		var onSampleResized = function(e){







			var columns = $(e.currentTarget).find("th");







			var msg = "columns widths: ";	







			columns.live('each',function(){		







				var id = $(this).attr('id');		







				var wid = $(this).width();







				$('#text_'+id).css('width',wid);







				msg += $(this).width() + "px; ";		







			})	







			$("#sample2Txt").html(msg);	







		};







		$("table[id^='sort-table-']").colResizable({	







			liveDrag:true, 







			gripInnerHtml:"<div class='grip'></div>", 







			draggingClass:"dragging", 







			onResize:onSampleResized







		});







		$(":input").live('click',function(){	







			$('tr > td > input.grid-text-click').removeClass('grid-text-click');







			$('tr > td > div > input.grid-text-click').removeClass('grid-text-click');		







			$(this).addClass('grid-text-click');







		});







		var check = '';







		$("th[id*='storage-bin-']").live('mouseenter mouseleave',function(event) {







			if (event.type == 'mouseenter') {







				if($(this).attr('id')!='storage-bin-1'){







					







					 //$(this).append($('<span class="grid-header-menu-button" id="grid-header-dropdown" style="position:relative; visibility: inherit; z-index: 801932;float:right; cursor: pointer;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'));







					 if($(this).hasClass('grid-sort-click'))







					 {







						 $(this).removeClass('grid-sort-click');







						 check = true;







					 }







					 $(this).removeClass('row_background');







					 $(this).addClass('grid-selected-Over');







				}else{







					$(this).removeClass('row_background');







					$(this).addClass('grid-selected-Over');







				}







			}else if (event.type == 'mouseleave') {







				if($(this).attr('id')!='storage-bin-1'){	







					/*$(this).find('span.grid-header-menu-button').each(function(){







						$(this).remove();	







					});*/







					$(this).removeClass('grid-selected-Over'); 







					if(check)







					{







						$(this).addClass('grid-sort-click');







					}					if(!check)







					{







						$(this).addClass('row_background');







						if($(this).hasClass('grid-sort-click'))







						{







							$(this).removeClass('row_background');







						}







					}







					check = '';







				}else{







					$(this).removeClass('grid-selected-Over');







					$(this).addClass('row_background');







				}







			}







		});	







		//////coding START for sort the columns./////////







		var th = jQuery('th.tab-sort'),







		inverse = false;







		th.live('click',function(){	







			$('tr > th.grid-sort-click').addClass('row_background');







			$('tr > th.grid-sort-click').removeClass('grid-sort-click');







			if($(this).hasClass('grid-selected-Over'))







			{







				$(this).removeClass('grid-selected-Over');







			}







			$(this).removeClass('row_background');	







			$(this).addClass('grid-sort-click');







			if($(this).find('span').hasClass('grid-sort-asc'))







			{		







				$(this).find('span').removeClass('grid-sort-asc');







				$(this).find('span').addClass('grid-sort-desc');







			}else if($(this).find('span').hasClass('grid-sort-desc'))







			{		







				$(this).find('span').addClass('grid-sort-asc');







				$(this).find('span').removeClass('grid-sort-desc');







			}







			var header = $(this),







				index = header.index();







			header







				.closest('table')























				.find('td.sort-td')







				.filter(function(){			







					return $(this).index() === index;







				})







				.sortElements(function(a, b){					























					a = $(a).text();







					b = $(b).text();







					//alert('test_'+a+'__'+b);







					return (







						isNaN(a) || isNaN(b) ?







							a > b : +a > +b







						) ?







							inverse ? -1 : 1 :







							inverse ? 1 : -1;				}, function(){







					return this.parentNode;







				});







			inverse = !inverse;







       });







   //////coding END for sort the columns./////////	   







		$("table[id*='sort-table-']").columnFilters({minSearchCharacters:1});







	///////Coding start for undo icon/////







		$("#undo").live('click',function(){





			var page_id = parseInt($('#page_id').val());





			//switch is used for additional div to be hidden i.e the div containin CREATE FORM





			switch(page_id){







				case 1:







				$("#storage_bin_create").hide(1);







				$('#lower_create').hide(1);







				var orange_div = $('#form_storage_bin').parent().parent().css('backgroundColor');	







				var lower_orange_color = $('#row-content-bar').find('form').parent().parent().css('backgroundColor');







				if(orange_div == 'rgb(250, 150, 47)'){



					



				$("tr#bin-row-"+rand_no).prev('tr').show(1);







				$("tr#bin-row-"+rand_no).remove();







				}else if(lower_orange_color == 'rgb(250, 150, 47)'){







				$("tr#row-subtable"+rand_no).prev('tr').show(1);







				$("tr#row-subtable"+rand_no).remove();	







				}







				break;







				case 2:







				$("#freight_create").hide(1);







				$("tr#bin-row-"+rand_no).prev('tr').show(1);







				$("tr#bin-row-"+rand_no).remove();







				break;







				case 3:







				$("#client_contract_create").hide(1);



				







				break;







				case 6:















				$('#incoming_consignment_create').hide(1);







				var orange_div = $('#incoming_consignment').parent().parent().css('backgroundColor');	







				var lower_orange_color = $('#row-content-bar').find('form').parent().parent().css('backgroundColor');







				if(orange_div == 'rgb(250, 150, 47)'){



					



				$("tr#bin-row-"+rand_no).prev('tr').show(1);







				$("tr#bin-row-"+rand_no).remove();







				}else if(lower_orange_color == 'rgb(250, 150, 47)'){



					



				$("tr#row-subtable"+rand_no).prev('tr').show(1);







				$("tr#row-subtable"+rand_no).remove();	







				}







				break;







				case 7:







				$('#outgoing_consignment_create').hide(1);







				$("tr#bin-row-"+rand_no).prev('tr').show(1);







				$("tr#bin-row-"+rand_no).remove();







				break;







				case 8:







				$("#goods_transaction_create").hide(1);







				$("tr#bin-row-"+rand_no).prev('tr').show(1);







				$("tr#bin-row-"+rand_no).remove();







				break;

				

				

				case 11:







				$('#customer_create').hide(1);







				$("tr#bin-row-"+rand_no).prev('tr').show(1);







				$("tr#bin-row-"+rand_no).remove();







				break;







			}







			//these are the common features on all pages which have same functionality







			//$('#sort-table-1').show(1);







			$("div[id^='my_scroll_div-']").show(1);







			$('#undo').find('td.OBToolbarIconButton_icon_undo').addClass('OBToolbarIconButtonDisabled');	







			$('#save').find('td.OBToolbarIconButton_icon_save').addClass('OBToolbarIconButtonDisabled');







			$('#savecloseX').find('td.OBToolbarIconButton_icon_savecloseX').addClass('OBToolbarIconButtonDisabled');







			$('#eliminate').find('td.OBToolbarIconButton_icon_eliminate').removeClass('OBToolbarIconButtonDisabled');







			$('#refresh').find('td.OBToolbarIconButton_icon_refresh').removeClass('OBToolbarIconButtonDisabled');







			$('#export').find('td.OBToolbarIconButton_icon_export').removeClass('OBToolbarIconButtonDisabled');







			$('#attach').find('td.OBToolbarIconButton_icon_attach').removeClass('OBToolbarIconButtonDisabled');	







		});



		



		///////Coding start for RESTORE icon/////



		



		$('#restore_deleted_entry').click(function(){



			var page_id = parseInt($('#page_id').val());



			switch(page_id){



				case 1:



				var restore_id = $("#restore_id").val();



				var orange_div = $('#form_storage_bin').parent().parent().css('backgroundColor');		  			   



			    var lower_orange_color = $('#row-content-bar').find('form').parent().parent().css('backgroundColor');



				if(orange_div == 'rgb(250, 150, 47)'){			



				var dataStr = 'restore_id='+restore_id+'&page_id='+page_id+'&parent=0';



				}



				else if(lower_orange_color == 'rgb(250, 150, 47)'){



				var dataStr = 'restore_id='+restore_id+'&page_id='+page_id+'&parent=1';



				}



				break;



				case 2:



				var restore_id = $('#restore_id').val();



				var dataStr = 'restore_id='+restore_id+'&page_id='+page_id;



				break;



				case 3:







				var restore_id = $('#restore_id').val();







				var dataStr = 'restore_id='+restore_id+'&page_id='+page_id;







				break;







				case 6:







				var restore_id = $('#restore_id').val();







				var dataStr = 'restore_id='+restore_id+'&page_id='+page_id;







				break;







				case 7:







				var restore_id = $('#restore_id').val();







				var dataStr = 'restore_id='+restore_id+'&page_id='+page_id;







				break;







				case 8:







				var restore_id = $('#restore_id').val();







				var dataStr = 'restore_id='+restore_id+'&page_id='+page_id;







				break;

				

				case 11:

				

				

				var restore_id = $('#restore_id').val();







				var dataStr = 'restore_id='+restore_id+'&page_id='+page_id;

				

				

				break;







			}















			$.ajax({







			url: 'index.php?route=common/common_ajax/restoreDeletedRecord&token='+token,





			type: 'post',





			data: dataStr,





			dataType: 'html',





			success: function(response) {





				//alert(response);



				refreshIframe();





				}

	   



		   });





			//$(this).find('td.OBToolbarIconButton_icon_restoreButton').addClass('OBToolbarIconButtonDisabled');





		});







		///////Coding start for delete icon/////







			$("#dialog").dialog({







				  autoOpen: false,				  







				  modal: true,







			});











			$("#eliminate").click(function(e){





				var warning = $('#warning_delete').val();







				//alert(warning);







				if(warning == 1){







				alert('This bin contains product, so cannot be deleted!!');







				$('#warning_delete').val(0);







				return;





				}





				var orange_div = $(this).parent().next('div.content').find('div#orange_id').css('backgroundColor');





				var lower_orange_color = $(this).parent().parent().find('div#row-content-bar').find('div[id^="Tab-Content-"]').find("form").parent().parent().css('backgroundColor');



				var page_id = parseInt($('#page_id').val());





				$( "#dialog" ).dialog( "destroy" );





				$("div#dialog").css('display','');





				e.preventDefault();





				$("#dialog").dialog({





				   position: 'center',			





				   buttons : {





					"Confirm" : function() {





					  //window.location.href = targetUrl;





						if(orange_div == 'rgb(250, 150, 47)')







						{







							$(this).parent().parent().find("div#orange_id").find("table#sort-table-1").find('input.countable_checkbox').each(function(){





							if($(this).is(':checked')){

								



								switch(page_id){



									case 1:





									var warehouse_id = $(this).parent().parent().find('td.mytab').text();		





									var dataStr = 'warehouse_name='+warehouse_id+'&page_id='+page_id;





									break;





									case 2:





									var freight_id = $(this).parent().parent().find('input.freight_id').val();									





									var dataStr = 'freight_id='+freight_id+'&page_id='+page_id;





									break;





									case 3:





									var id = $(this).parent().parent().find('input.id').val();





									var dataStr = 'id='+id+'&page_id='+page_id;





									break;





									case 4:



									var vendor_name = $(this).parent().parent().find('td.mytab').text();



									//var movements_date = $(this).parent().parent().find("div#orange_id").find("table#sort-table-1").find('tr.row_click').find('td.freight_name').text();





									var dataStr = 'vendor_name='+vendor_name+'&page_id='+page_id;





									break;							



									case 6:





									var po_id = $(this).parent().parent().find('td.mytab span').text();





									var dataStr = 'po_id='+po_id+'&page_id='+page_id;





									break;





									case 7:





									var order_id = $(this).parent().parent().find('td.mytab span').text();





									var order_product_id = $(this).parent().parent().find("input[id^='order_product_id_']").val();





									var dataStr = 'order_id='+order_id+'&page_id='+page_id+'&order_product_id='+order_product_id;







									break;			





									case 8:







									var transaction_id = $(this).parent().parent().find('input.transaction_id').val();



			//alert(transaction_id);



									var dataStr = 'transaction_id='+transaction_id+'&page_id='+page_id;





									break;						



									

									case 11:







									var customer_id = $(this).parent().parent().find('input.customer_id').val();



			//alert(transaction_id);



									var dataStr = 'customer_id='+customer_id+'&page_id='+page_id;

									

			



									break;



								}							





								$(this).parent().parent().removeClass('row_click');



								$(this).parent().parent().find('input.deleted').val('1');							



								$(this).parent().parent().hide();





								$.ajax({





									url: 'index.php?route=common/common_ajax/deleteEntry&token='+token,





									type: 'post',





									data: dataStr,





									dataType: 'html',





									success: function(response) {}



								});





							}





							});







						}else if(lower_orange_color == 'rgb(250, 150, 47)'){





							$(this).parent().parent().find("div#row-content-bar").find("ul").next('div').find("table").find('input.countable_checkbox1').each(function(){								





							if($(this).is(':checked')){





								switch(page_id){







									case 1:		





									var storage_bin_name = $(this).parent().parent().find('td.search_key_tab').text();





									var dataStr = 'page_id='+page_id+'&storage_bin_name='+storage_bin_name;







									break;									





								}





								$(this).parent().parent().removeClass('row_click');







								$(this).parent().parent().find('input.deleted').val('1');								







								$(this).parent().parent().hide();







								$.ajax({





									url: 'index.php?route=common/common_ajax/deleteEntry&token='+token,





									type: 'post',





									data: dataStr,





									dataType: 'html',





									success: function(response) {}











								});





							}





							});	







						}







				//$(this).parent().parent().find("table[id^='sort-table-bin-contentsrow-subtable']").find('tr.row_click').remove();







						var bValid = true;











						$(this).dialog("close");	



					},











					"Cancel" : function() {











					  $(this).dialog("close");



					}



				  }





				});







    			//$("#dialog").dialog("open");



				//switch is used for sending appropriate data for AJAX











		});















///////Coding start for refresh icon/////







		  $("div#refresh").click(function(){		  	







			refreshIframe();		







		  });







		  //////// coding start for direct link icon//////







		 $( "#link" ).click(function() {







			$("#link-form" ).css('display',' ');







			$("#link-form" ).dialog( "open" );







			$("#link_area").val(getIframeIDAndSrc()[1]);







		 });







		$( "#link-form" ).dialog({







			autoOpen: false,







			height: 212.733,







			width: 388.733,







			title:'Document-Link',







			modal: true,







			buttons: {		







				OK: function() {			







					$( this ).dialog( "close" );







				}







			}







		});			///////Coding start for csv export icon/////







		$("#export").click(function(){	







			var page_id = parseInt($('#page_id').val());







			var additional_info = '';    //used in case of number of divs present and content need to be exported separately







			var tab_name ='';







			//switch is used for sending appropriate data for AJAX







				switch(page_id){







					case 1:







						var page_name = 'storage_bin';







						var orange_div = $('#form_storage_bin').parent().parent().css('backgroundColor');







						var lower_orange_color = $('#row-content-bar').find('form').parent().parent().css('backgroundColor');







						var bottm_orange_color = $('#bar-product-transaction-and-bin').find('form').parent().parent().css('backgroundColor');







						if(orange_div == 'rgb(250, 150, 47)'){







							additional_info = '_upper';







						}







						if(lower_orange_color == 'rgb(250, 150, 47)'){	







							additional_info = '_lower';







						}







						if(bottm_orange_color == 'rgb(250, 150, 47)' && $('#bar-product-transaction-and-bin').find('ul').find('li#Tab-product-transaction').hasClass('row-content-tab') ){	







							additional_info = '_bottom';







							tab_name ='Product Transaction';







						}else if(bottm_orange_color == 'rgb(250, 150, 47)' && $('#bar-product-transaction-and-bin').find('ul').find('li#Tab-bin-contents').hasClass('row-content-tab') ){







							additional_info = '_bottom';







							tab_name ='Bin Contents'







						}







						var page_div = '#form_storage_bin';







					break;					







					case 2:







						var page_name = 'freight_company';







						var page_div = '#form_freight_company';







					break;					







					case 3:







						var page_name = 'client_contract';







					   var orange_div = $('#client_contract_report').parent().parent().css('backgroundColor');







						var lowerdiv_orange_color = $('#row-content-bar').find('form').parent().parent().css('backgroundColor');







						if(orange_div == 'rgb(250, 150, 47)'){







							







							additional_info = '_upper';







						}







						//if(lower_orange_color == 'rgb(250, 150, 47)' && $('#row-content-bar').find('ul').find('li#Tab-product-transaction').hasClass('row-content-tab') ){	







						if(lowerdiv_orange_color == 'rgb(250, 150, 47)'  ){







                 		  var lower_ids = $('#row-content-bar').find('ul > li.row-content-tab').attr('id');







			              var lower_id=lower_ids.split('_');







							if(lower_id[2]=='1')







							{







								







							additional_info = '_bottom';







							tab_name ='Product And Rates';







							}







							else if(lower_id[2]=='2')







							{







								







							additional_info = '_bottom';







							tab_name ='End Of Month Import Page Count'







							}







						}  







						var page_div = '#client_contract_report';







					break;







					case 4:







						var page_name = 'warehouse_goods_movements';







						var page_div = '#goods_movement';







					break;







					case 5:







						var page_name = 'physical_inventory';







						var page_div = '#form_phy_inventory';







					break;







					case 7:







						var page_name = 'outgoing_consignment';







						var orange_div = $('#outgoing_consignment').parent().parent().css('backgroundColor');







						var lower_orange_color = $('#row-content-bar').find('form').parent().parent().css('backgroundColor');







						if(orange_div == 'rgb(250, 150, 47)'){







							additional_info = '_upper';







						}







						if(lower_orange_color == 'rgb(250, 150, 47)'){	







							additional_info = '_lower';







						}







						var page_div = '#outgoing_consignment';







					break;					case 8:







						var page_name = 'goods_transaction';







						var page_div = '#goods_transaction';







					break;					







				}		    var part_no_key = $("input#part_no_key").val();







			var search_key_for_csv = $("input#bottom_csv_search_key").val();







			var wh_dim_id_for_csv  = $("input#bottom_csv_warehouse_dim_id").val();	







			var url = '';







			var myDate = new Date();	







			var local_time  = myDate.getTime();







			if(bottm_orange_color == 'rgb(250, 150, 47)' && $('#bar-product-transaction-and-bin').find('ul').find('li#Tab-product-transaction').hasClass('row-content-tab') )







			{







					







				url = 'index.php?route=common/common_ajax/CSVExport&token='+token+'&'+local_time+'&page_name='+page_name+additional_info+'&tab_name='+tab_name+'&search_key_for_csv='+search_key_for_csv+'&wh_dim_id_for_csv='+wh_dim_id_for_csv;







					







			}else if(bottm_orange_color == 'rgb(250, 150, 47)' && $('#bar-product-transaction-and-bin').find('ul').find('li#Tab-bin-contents').hasClass('row-content-tab') )







			{







				







				url = 'index.php?route=common/common_ajax/CSVExport&token='+token+'&'+local_time+'&page_name='+page_name+additional_info+'&tab_name='+tab_name+'&search_key_for_csv='+search_key_for_csv+'&wh_dim_id_for_csv='+wh_dim_id_for_csv;







			}else if(lowerdiv_orange_color == 'rgb(250, 150, 47)'){







				var lower_ids = $('#row-content-bar').find('ul > li.row-content-tab').attr('id');			              					var lower_id=lower_ids.split('_');							







				if(lower_id[2]=='1')







				{							







					url = 'index.php?route=common/common_ajax/CSVExport&token='+token+'&'+local_time+'&page_name='+page_name+additional_info+'&tab_name='+tab_name+'&part_no_key='+part_no_key;







				}







				else if(lower_id[2]=='2')







				{							







					url = 'index.php?route=common/common_ajax/CSVExport&token='+token+'&'+local_time+'&page_name='+page_name+additional_info+'&tab_name='+tab_name+'&part_no_key='+part_no_key;







				}			







			}else{







	







				url = 'index.php?route=common/common_ajax/CSVExport&token='+token+'&'+local_time+'&page_name='+page_name+additional_info+'&tab_name='+tab_name;







				}







			$(location).attr('href',url);







			$(page_div).attr('target', '_self');







			//NOTE : change in ajax if extra div functionality is added







	    });			  







		  //////coding START for create_icon button.///////



		  $('#create_icon').click(function(){


				var arrFrames_ = parent.document.getElementsByTagName("IFRAME");


				var page_id = parseInt($('#page_id').val());


				switch(page_id){							


				case 1:				


				//break;					


				case 2:

						$("input#insert_form").val('insert');


						$("input#edit_form").val(' ');	


						$(this).parent('div').next().find('tr').each(function(){


							if($(this).hasClass('row_click')){


								$(this).removeClass('row_click');


							}					


						});


						$("div[id^='my_scroll_div-']").hide(1);


						$('#freight_create').css('display','');


						$('#freight_create').appendTo($('#form_freight_company'));


						$('#form_freight_company').show(1);						//code to empty the fields


						$("input#create_serviced_name").val('');


						$("input#create_search_key").val('');


						$("input#create_freight_company").val('');


						$("input#create_location_add").val('');


					break;					


					case 3:


				   var now = new Date();				  


				   var current_date = $.format.date(now, "yyyy-MM-dd");


				   orange_div = $('#client_contract_report').parent().parent().css('backgroundColor');







			       lower_orange_color = $('#row-content-bar').find('form').parent().parent().css('backgroundColor');







			         if(orange_div == 'rgb(250, 150, 47)'){						







					 	$("input#create_account_code").val('');







						$("input#create_Part_no").val('');







						$("input#create_start_date").val('');







						$("input#create_start_date").val(current_date);







						$("input#create_end_date").val('');







						$("input#create_end_date").val('');		







						$("input#create_contract_term").val('');







						$("input#create_contract_number").val("MPS");







						$("input#create_dil_loc").val('');







						$("input#create_sales_person").val('');







						$("input#insert_form").val('insert');







						$("input#edit_form").val(' ');	







						//$('#sort-table-1').hide(1);	







						$("div[id^='my_scroll_div']").hide(1);







						$('#client_contract_create').css('display','');







						$('#client_contract_create').appendTo($('#client_contract_report'));







						$('#client_contract_report').show(1);







						$('#create_start_date').datepicker({dateFormat: 'yy-mm-dd'});







						$('#create_end_date').datepicker({dateFormat: 'yy-mm-dd'});







		           	}











					if(lower_orange_color == 'rgb(250, 150, 47)'){	







						var lower_ids = $('#row-content-bar').find('ul > li.row-content-tab').attr('id');







						 var lower_id=lower_ids.split('_');







						 if(lower_id[2]=='1')







						 {







						 boxHeight =  $('#lower_create_'+lower_id[2]).height(); 												 







                            $("#row-content-bar-total").css('margin-top',boxHeight+50);     







						$(arrFrames_).height(500+boxHeight);    						//$('#row-content').html('');







						$('#lower_create_'+lower_id[2]).css('display','');







						$('#lower_create_'+lower_id[2]).appendTo($('#row-content'));







						$("table[id*='sort-table-product-and-rates-']").hide(1);	







						//$('div#my_scroll_div').hide(1);







						$('#row-content').show(1);	











						 }



						 



						 else if(lower_id[2]=='2')







						 {



           



						/*boxHeight =  $('#lower_create_'+lower_id[2]).height(); 						







                     $("#row-content-bar-total").css('margin-top',boxHeight+50);   







						$(arrFrames_).height(500+boxHeight);    







						$('#lower_create_'+lower_id[2]).css('display','');







						$('#lower_create_'+lower_id[2]).appendTo($('#row-content1'));







						$("table[id*='sort-table-end-of-month-']").hide(1);







						$('#row-content1').show(1);	







*/







						 }







					}					







					break;					







					/*case 4:







						$("input#insert_form").val('insert');







						//$("input#edit_form").val(' ');	







						//$('#sort-table-1').hide(1);







						$('div#my_scroll_div').hide(1);	







						$('#goods_movement_create').css('display','');







						$('#goods_movement_create').appendTo($('#goods_movement'));







						$('#goods_movement').show(1);						//code to empty the fields







						$("input#create_vendor").val('');







						$("input#create_movements_date").val('');







						$("input#create_notes").val('');			







						//code to empty the fields					







						break;







*/







					case 6:







						var orange_div = $('#incoming_consignment').parent().parent().css('backgroundColor');







			            var lower_orange_color = $('#row-content-bar').find('form').parent().parent().css('backgroundColor');







						if(orange_div == 'rgb(250, 150, 47)'){	







						$("input#insert_form").val('insert');







						$("input#edit_form").val(' ');		











						$(this).parent('div').next().find('tr').each(function(){







							if($(this).hasClass('row_click')){







								$(this).removeClass('row_click');







							}					







						});







						$('#incoming_consignment_create').css('display','');







						$('#incoming_consignment_create').appendTo($('#incoming_consignment'));







						$('#incoming_consignment').show(1);	







						//$('#sort-table-1').hide(1);					//code to empty the fields







						$("div[id^='my_scroll_div-']").hide(1);







						$("input#create_document_no").val('');







						$("input#create_document_type").val('');







						$("input#create_vendor").val('');







						$("input#create_movement_date").val('');







						$("input#create_description").val('');







						$("input#create_source_address").val('');







						$("input#create_warehouse").val('');







						$("input#create_document_status").val('Pending');







						$("input#create_delivery_location").val('');







						}







						if(lower_orange_color == 'rgb(250, 150, 47)'){







						$("input#insert_form").val('insert');







						$("input#edit_form").val(' ');	











						$(this).parent('div').next().next().find('tr').each(function(){







							if($(this).hasClass('row_click')){







								$(this).removeClass('row_click');







							}					







						});



						$('#incoming_consignment_create_bottom').css('display','');







						$('#incoming_consignment_create_bottom').appendTo($('#row-content'));







						//$("table[id^='sort-table-bin-row-']").hide(1);







						$("div[id^='my_scroll_div-']").hide(1);







						$('#incoming_consignment_create_bottom').show(1);					//code to empty the fields







						$("input#create_quantity").val('');







						$("input#create_unit").val('');







						$("input#create_product").val('');







						$("input#create_description").val('');







						$("input#create_storage_bin").val('');







						$("input#create_model").val('');







						}







					break;







					case 7:







						var orange_div = $('#outgoing_consignment').parent().parent().css('backgroundColor');







			            var lower_orange_color = $('#row-content-bar').find('form').parent().parent().css('backgroundColor');







						if(orange_div == 'rgb(250, 150, 47)'){	







						$("input#insert_form").val('insert');







						$("input#edit_form").val(' ');		











						$(this).parent('div').next().find('tr').each(function(){







							if($(this).hasClass('row_click')){







								$(this).removeClass('row_click');







							}					







						});







						$('#outgoing_consignment_create').css('display','');







						$('#outgoing_consignment_create').appendTo($('#outgoing_consignment'));







						$('#outgoing_consignment').show(1);	







						//$('#sort-table-1').hide(1);					//code to empty the fields







						$("div[id^='my_scroll_div-']").hide(1);







						$("input#create_document_no").val('');







						$("input#create_document_type").val('');







						$("input#create_customer").val('');







						$("input#create_movement_date").val('');







						$("input#create_description").val('');

						

						$("input#create_satchel").val('');







						$("input#create_destination_address").val('');







						$("input#create_warehouse").val('');







						$("input#create_document_status").val('');







						//$("input#create_delivery_location").val('');







						}







					break;					







					case 8:











							var now = new Date();







							var current_date = $.format.date(now, "yyyy-MM-dd");							







							$("input#insert_form").val('insert');							







							$("input#edit_form").val(' ');







							$(this).parent('div').next().find('tr').each(function(){







								if($(this).hasClass('row_click')){







									$(this).removeClass('row_click');











								}					







							});								











							//$('#sort-table-1').hide(1);	







							$("div[id^='my_scroll_div-']").hide(1);							







							$('#goods_transaction_create').css('display','');							







							$('#goods_transaction_create').appendTo($('#goods_transaction'));							







							$('#goods_transaction').show(1);								







							$("input#create_product_code").val('');							







							$("input#create_product_name").val('');			







							$("#qty_text").hide(1);					







							$("input#create_movement_type").val('Internal Movement');						







							$("input#create_movement_date").val(current_date);							







							$("input#create_movement_qty").val('');					







							$("input#create_storage_bin").val('');			







							$("input#create_unit").val('');







							$("input#create_warehouse_ids").val('');







						break;



						



						case 11:

						var upper_orange = $('div#orange_id').css('backgroundColor');
					
						var bottom_orange = $('div#row-content-bar-bottom').find('div > div.create_form_orange').css('backgroundColor');		
									

					if(upper_orange == 'rgb(250, 150, 47)'){
						//alert('top');
						
					
						$("input#insert_form").val('insert');							


						$("input#edit_form").val(' ');


							$(this).parent('div').next().find('tr').each(function(){


								if($(this).hasClass('row_click')){


									$(this).removeClass('row_click');


								}					


							});								


							//$('#sort-table-1').hide(1);	


							$("div[id^='my_scroll_div-']").hide(1);							

							$('#customer_create').css('display','');							

							$('#customer_create').appendTo($('#form_customer'));							

							$('#form_customer').show(1);								

							$("input#create_company").val('');							

							$("input#create_customer_number").val('');							

							$("input#create_email").val('');						

							$("input#create_customer_group").val(current_date);							

							$("input#create_account_manager").val('');					

							$("input#create_status").val('');			

							$("input#create_approved").val('');

							$("input#create_customer_name").val('');
						}
						else if(bottom_orange == 'rgb(250, 150, 47)'){
						//alert('bottom');
						var customer_id = $('#customer_id_hidden').val();
						$('#customer_id_lower_table_address').val(customer_id);
					
						$("#dialog-form-lower-address" ).css('display',' ');
						$("#dialog-form-lower-address" ).dialog( "open" );
						
						}	

						break;


				}

				//code to disable icons

				if($('#undo').find('td.OBToolbarIconButtonDisabled').hasClass('OBToolbarIconButtonDisabled')){


					$('#undo').find('td.OBToolbarIconButtonDisabled').removeClass('OBToolbarIconButtonDisabled');	


				}

				$('#eliminate').find('td.OBToolbarIconButton_icon_eliminate').addClass('OBToolbarIconButtonDisabled');

				$('#refresh').find('td.OBToolbarIconButton_icon_refresh').addClass('OBToolbarIconButtonDisabled');

				$('#export').find('td.OBToolbarIconButton_icon_export').addClass('OBToolbarIconButtonDisabled');

		});


		//function for close button of create_icon form







		$('#create_close_button').live('click',function(){	







			var page_id = parseInt($('#page_id').val());







				switch(page_id){







					case 1:







					break;										







					case 2:







						//$('#sort-table-1').show(1);







						$("div[id^='my_scroll_div-']").show(1);







						$('#freight_create').hide(1);







						$('#form_freight_company').show(1);







                		$( [] ).add( create_serviced_name ).add( create_search_key ).add( create_freight_company ).add( create_active ).add( create_location_add ).val( "" );







					break;					







					case 3:







						var orange_div = $('#client_contract_report').parent().parent().css('backgroundColor');







						var lower_orange_color = $('#row-content-bar').find('form').parent().parent().css('backgroundColor');







						//$('#sort-table-1').show(1);







						$("div[id^='my_scroll_div']").show(1);







						$('#client_contract_create').hide(1);







						$('#client_contract_report').show(1);







						$( [] ).add( create_account_code ).add( create_Part_no ).add( create_start_date ).add( create_end_date ).add( create_contract_term ).add( create_contract_number ).add( create_dil_loc ).add( create_sales_person ).val( "" );







					break;







					/*case 4:







						//$('#sort-table-1').show(1);







						$('div#my_scroll_div').show(1);







						$('#goods_movement_create').hide(1);







						$('#goods_movement').show(1);







						$( [] ).add( create_vendor ).add( create_movements_date ).add( create_notes ).val( "" );







					break;*/					







					case 6:







					var orange_div = $('#incoming_consignment').parent().parent().css('backgroundColor');







			        var lower_orange_color = $('#row-content-bar').find('form').parent().parent().css('backgroundColor');







					if(orange_div=='rgb(250, 150, 47)'){







						//$('#sort-table-1').show(1);







						$("div[id^='my_scroll_div-']").show(1);







						$('#incoming_consignment_create').hide(1);







						$('#incoming_consignment').show(1);







						$( [] ).add( create_document_no ).add( create_document_type ).add( create_vendor ).add( create_movement_date ).add( create_description ).add( create_source_address ).add( create_warehouse ).add( create_document_status ).add( create_delivery_location ).val( "" );







					}







					else if(lower_orange_color=='rgb(250, 150, 47)'){







						$('#row-content').show(1);			







						$('#row-content > div').hide();







						$("div[id^='my_scroll_div-2']").show(1);







						$('table[id^="sort-table-"]').parents().find("div[id^='my_scroll_div-']").show(1);







						$( [] ).add( create_quantity ).add( create_unit ).add( create_product ).add( create_description ).add( create_storage_bin ).add( create_model ).val( "" );







					}







					break;







					case 7:







					var orange_div = $('#outgoing_consignment').parent().parent().css('backgroundColor');







			        var lower_orange_color = $('#row-content-bar').find('form').parent().parent().css('backgroundColor');







					if(orange_div=='rgb(250, 150, 47)'){







						$("div[id^='my_scroll_div-1']").show(1);







						$('#outgoing_consignment_create').hide(1);







						$('#outgoing_consignment').show(1);







						$( [] ).add( create_document_no ).add( create_document_type ).add( create_customer ).add( create_movement_date ).add( create_description ).add( create_satchel ).add( create_destination_address ).add( create_warehouse ).add( create_document_status ).val( "" );







					}







					break;







					case 8:







						//$('#sort-table-1').show(1);







						$("div[id^='my_scroll_div-']").show(1);







						$('#goods_transaction_create').hide(1);







						$('#goods_transaction').show(1);







						$( [] ).add( create_product_code ).add( create_product_name ).add( create_movement_date ).add( create_movement_type ).add( create_movement_qty ).add( create_storage_bin ).add( create_unit ).val( "" );







					break;



					



					case 11:
					
					$("div[id^='my_scroll_div-']").show(1);


					$('#customer_create').hide(1);


					$('#form_customer').show(1);


					$( [] ).add( create_company ).add( create_customer_number ).add( create_email ).add( create_ip ).add( create_approved ).add( create_first_name ).add( create_last_name ).add( create_date_added ).val( "" );
					

					break;







				}			







				







			$('#undo').find('td.OBToolbarIconButton_icon_undo').addClass('OBToolbarIconButtonDisabled');	







			$('#save').find('td.OBToolbarIconButton_icon_save').addClass('OBToolbarIconButtonDisabled');







			$('#savecloseX').find('td.OBToolbarIconButton_icon_savecloseX').addClass('OBToolbarIconButtonDisabled');







			$('#eliminate').find('td.OBToolbarIconButton_icon_eliminate').removeClass('OBToolbarIconButtonDisabled');







			$('#refresh').find('td.OBToolbarIconButton_icon_refresh').removeClass('OBToolbarIconButtonDisabled');







			$('#export').find('td.OBToolbarIconButton_icon_export').removeClass('OBToolbarIconButtonDisabled');	















			$('#restore_deleted_entry').find('td.OBToolbarIconButton_icon_restoreButton').addClass('OBToolbarIconButtonDisabled');







		});







		/******Code for changing the row color on hover and on click********/







		 var ids_array_row_hover = Array('bin-row-' , 'rows-bin-contents-' , 'row-subtable', 'rows-subtable')







   		 for( var  arr_1= 0 ; arr_1<ids_array_row_hover.length ; arr_1++){







		  $("tr[id*='"+ids_array_row_hover[arr_1]+"']").hover(function(){







		   		$(this).addClass("row_mouseover");







		   },







		   function(){







		   		$(this).removeClass("row_mouseover");







		  });







		 }







		//function to add color to row click		







		for( var  arr_1= 0 ; arr_1<ids_array_row_hover.length ; arr_1++){







		 $("tr[id*='"+ids_array_row_hover[arr_1]+"']").click(function(){







		 //$("tr[id*='bin-row-']").click(function(){







			   var current_obj = $(this);







			   $('tr[id*="bin-row-"]').removeClass("row_click");







			   current_obj.addClass("row_click");







			   $('#eliminate').find('td.OBToolbarIconButton_icon_eliminate').removeClass('OBToolbarIconButtonDisabled');







			   //var eliminate_id = current_obj.find('td.content_list').eq(2).text();







		  });







		 }		///coding for double click feature on row of table/////







		 $("tr[id*='bin-row-']").live('dblclick',function(){



			 edit_form_generator(this);



		});



		 



		$("tr[id*='row-subtable']").live('dblclick',function(){



			 edit_form_generator(this);



		});











		//coding for click of form button along with each row//////











			$("span[id*='grid-button-form-']").live('click',function(){







				







				if($(this).parents('form').attr('id')=='incoming_consignment' || $(this).parents('form').attr('id')=='outgoing_consignment'){







					$('#'+$(this).parents('form').attr('id')).parent().parent().css('backgroundColor','rgb(250, 150, 47)');







					







				}else if($(this).parents('form').attr('id')=='row-content'){







					$('#row-content-bar').find('form').parent().parent().css('backgroundColor','rgb(250, 150, 47)');







				}	







				edit_form_generator(this);







				



			});



		//coding for click of edit button along with each row//////	







			$("span[id*='grid-button-edit-']").live('click',function(){







				







				if($(this).parents('form').attr('id')=='incoming_consignment' || $(this).parents('form').attr('id')=='outgoing_consignment'){







					$('#'+$(this).parents('form').attr('id')).parent().parent().css('backgroundColor','rgb(250, 150, 47)');







				}else if($(this).parents('form').attr('id')=='row-content'){







					$('#row-content-bar').find('form').parent().parent().css('backgroundColor','rgb(250, 150, 47)');







				}				







				edit_form_generator(this);







		   });



		//click of statusbar div in personalize tab of freight page



	    $('#freight_form_statusbar').click(function(){



			toggle_image_status(this);



			});

			

		 $('#customer_form_statusbar').click(function(){



			toggle_image_status(this);



			});



		$('#storage_bin_statusbar').click(function(){



			toggle_image_status(this);



		});



		$('#storage_bin_statusbar_lower').click(function(){



			toggle_image_status(this);











		});











		$('#storage_bin_statusbar_lower_1').click(function(){



			toggle_image_status(this);



		});











		$('#storage_bin_statusbar_lower_2').click(function(){











			toggle_image_status(this);







		});







		$('#incoming_consignment_statusbar').click(function(){







			toggle_image_status(this);







		});







		$('#incoming_consignment_statusbar_lower').click(function(){







			toggle_image_status(this);







		});







		$('#goods_movement_statusbar').click(function(){







			toggle_image_status(this);







		});







		$('#goods_movement_statusbar_lower').click(function(){







			toggle_image_status(this);







		});







	   $('#outgoing_consignment_statusbar').click(function(){







			toggle_image_status(this);







		});







		$('#outgoing_consignment_statusbar_lower').click(function(){







			toggle_image_status(this);







		});







		$('#goods_transaction_statusbar').click(function(){







			toggle_image_status(this);







		});







	   //click of form div in personalize tab of freight page







	   $('#freight_form').click(function(){







		   toggle_image_form(this);







		});

		

		

		

		$('#customer_form').click(function(){







		   toggle_image_form(this);







		});







		$('#storage_bin_form').click(function(){







			toggle_image_form(this);







		});







		$('#storage_bin_form_lower').click(function(){







			toggle_image_form(this);







		});







		$('#storage_bin_form_lower_1').click(function(){







			toggle_image_form(this);







		});







		$('#storage_bin_form_lower_2').click(function(){







			toggle_image_form(this);







		});







		$('#incoming_consignment_form').click(function(){







			toggle_image_form(this);







		});







		$('#incoming_consignment_form_lower').click(function(){







			toggle_image_form(this);







		});







		$('#goods_movement_form').click(function(){







			toggle_image_form(this);







		});







		$('#goods_movement_form_lower').click(function(){







			toggle_image_form(this);







		});







		$('#outgoing_consignment_form').click(function(){







			toggle_image_form(this);







		});







		$('#outgoing_consignment_form_lower').click(function(){







			toggle_image_form(this);







		});







		$('#goods_transaction_form').click(function(){







			toggle_image_form(this);







		});







		///audit image toggle ofr freight page////







	    $('#create_toogle_freight').click(function(){







			toggle_image_audit(this,0);







		});







		$('#create_toogle_lower').live('click',function(){







			toggle_image_audit(this,1);







		});



		$('#create_toogle').live('click',function(){







			toggle_image_audit(this,0);







		});		$('#create_toogle_lower_1').live('click',function(){







			toggle_image_audit(this,1);







		});		$('#create_toogle_lower_2').live('click',function(){







			toggle_image_audit(this,2);







		});







		$("tr[id^='bottom-create_toogle_lower-']").click(function(){







			toggle_image_audit(this);	







		});







	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







	///////////////////					Save Sort Order Block													////////////////////	







	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







		$('#storage_bin_save_sort_order').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(0,updated_str,0);







		});







		$('#storage_bin_save_sort_order_close').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(0,updated_str,1);		







		});







		$('#storage_bin_save_sort_order_lower').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(1,updated_str,0);







		});







		$('#storage_bin_save_sort_order_close_lower').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(1,updated_str,1);		







		});







		$('#storage_bin_save_sort_order_lower_1').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(2,updated_str,0);







		});







		$('#storage_bin_save_sort_order_close_lower_1').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(2,updated_str,1);		







		});







		$('#storage_bin_save_sort_order_lower_2').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(3,updated_str,0);







		});







		$('#storage_bin_save_sort_order_close_lower_2').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(3,updated_str,1);		







		});







		$('#freight_save_sort_order').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(0,updated_str,0);







		});







		$('#freight_save_sort_order_close').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(0,updated_str,1);		







		});







		$('#client_contract_save_sort_order').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(0,updated_str,0);		







		});







		$('#client_contract_save_sort_order_lower_1').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(1,updated_str,0);		







		});







		$('#client_contract_save_sort_order_lower_2').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(2,updated_str,0);		







		});







		$('#client_contract_save_sort_order_close').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(0,updated_str,1);		







		});







		$('#client_contract_save_sort_order_close_lower_1').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(1,updated_str,1);		







		});







		$('#client_contract_save_sort_order_close_lower_2').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(2,updated_str,1);		







		});		







		$('#physical_inventory_save_sort_order').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(0,updated_str,0);







		});







		$('#physical_inventory_save_sort_order_close').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(0,updated_str,1);







		});







		$('#incoming_consignment_save_sort_order').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(0,updated_str,0);







		});







		$('#incoming_consignment_save_sort_order_lower').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(1,updated_str,0);







		});		$('#incoming_consignment_save_sort_order_close').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(0,updated_str,1);







		});







		$('#incoming_consignment_save_sort_order_close_lower').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(1,updated_str,1);







		});







		$('#goods_movement_save_sort_order').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(0,updated_str,0);







		});







		$('#goods_movement_save_sort_order_lower').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(1,updated_str,0);







		});







		$('#goods_movement_save_sort_order_close').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(0,updated_str,1);







		});







		$('#goods_movement_save_sort_order_close_lower').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(1,updated_str,1);







		});







		$('#outgoing_consignment_save_sort_order').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(0,updated_str,0);







		});







		$('#outgoing_consignment_save_sort_order_close').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(0,updated_str,1);







		});







		$('#outgoing_consignment_save_sort_order_lower').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(1,updated_str,0);







		});







		$('#outgoing_consignment_save_sort_order_close_lower').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(1,updated_str,1);







		});







		$('#goods_transaction_save_sort_order').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(0,updated_str,0);







		});







		$('#goods_transaction_save_sort_order_close').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(0,updated_str,1);







		});

		

		$('#customer_save_sort_order').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(0,updated_str,0);







		});

		

		$('#customer_save_sort_order_close').click(function(){ 







			var updated_str = '';







			for(var n=0;n<item_arr.length;n++){







			  updated_str += '&arr['+item_arr[n]+']='+n;







			}







			//save_sort_order(parent,updated_str,(1 if refresh after ajax success required, 0 if not));







			save_sort_order(0,updated_str,1);







		});







	////////////////////////////////////////////////////////////END of Save Sort Order Block////////////////////////////////////////







});







//////////////////////////////To generate short code on address page based on company name fill up by admin/////







function create_short_code(business_nameID,shortCodeID)







  {







        var temp_business_name = $("#temp_company_name").val().substr(0,5);







		var shortcode_val = $("#shortcode").val();







		var company_name = $("#"+business_nameID).val().substr(0,5);	







		var updated_shortCode = '';	







		if(temp_business_name != ''){







			var pos = shortcode_val.indexOf(temp_business_name);		







			var temp_val = shortcode_val.substr(parseInt(pos)+temp_business_name.length);		







			updated_shortCode = company_name+temp_val;			







		}







		else







		{







			updated_shortCode = company_name+shortcode_val;			







		}		







  		////Assign dynamic created value to real field and to span to display user







		$("#temp_company_name").val(company_name);







		$('#'+shortCodeID).val(updated_shortCode);		







  }







////////////////////Get Postal Address API Data Based on Address////////////////////////////////////////////////







function getPostalAddress(address_field,postal_field)







  {







  			var address_val = $('#'+address_field).val();







			$.post('index.php?route=account/address/getPostalCode',{address:address_val},function(response){







			  if(response.postcode != 'null')







			   {				







				$('#'+postal_field).val(response.postcode);







			   }







			},'json');







			//var postal_field_val = $("#"+postal_field).val('');  	

			

  }



////////////////////End here Postal Address API/////////////////////////////////////////////////////////////////







////////Customer page for order Quote functioning/////////





function create_customer_code(business_nameID,shortCodeID)



  {



        var temp_business_name = $("#temp_company_name").val().substr(0,5);



		var shortcode_val = $("#customer_code").val();



		var company_name = $("#"+business_nameID).val().substr(0,5);	



		var updated_shortCode = '';	



		if(temp_business_name != ''){



			var pos = shortcode_val.indexOf(temp_business_name);		



			var temp_val = shortcode_val.substr(parseInt(pos)+temp_business_name.length);		



			updated_shortCode = company_name+temp_val;			



		}



		else



		{



			updated_shortCode = company_name+shortcode_val;			



     	}		



  		////Assign dynamic created value to real field and to span to display user



		$("#temp_company_name").val(company_name);



		$('#'+shortCodeID).val(updated_shortCode);



  }





///end customer page functioning