		$(function(){
			$("#list li").bind("mouseenter mouseleave",function(e) {
					// 方向检测
				var w = $(this).width();
				var h = $(this).height();
				var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
				var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
				//var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4; //direction的值为“0,1,2,3”分别对应着“上，右，下，左”
				var direction = Math.round(( Math.atan2(y, x) * (180 / Math.PI) / 90) + 5) % 4;
				var eventType = e.type;
					// console.log(direction);
				var oDiv = $(this).children('div');
			
				var oTarget = {};		// 目标值
				if(eventType === 'mouseenter') {
					switch(direction) {
						case 0:
							oDiv.css({left:0, top: -380});
							break;
						case 1:
							oDiv.css({left:350, top: 0});
							break;
						case 2:
							oDiv.css({left:0, top: 380});
							break;
						case 3:
							oDiv.css({left:-350, top: 0});
							break;
					}

					oDiv.stop(true).animate({left:0,top: 0},1000,function(){oDiv.hide()})
		
				} else {
					switch(direction) {
						case 0:
							 oTarget = {left:0, top: -380};
							break;
						case 1:
							 oTarget = {left:350, top: 0};
							break;
						case 2:
							 oTarget = {left:0, top: 380};
							break;
						case 3:
							 oTarget = {left:-350, top: 0};
							break;
					}
					oDiv.show();
					oDiv.stop(true).animate(oTarget, 500);
				}
				
				
			});	
		});