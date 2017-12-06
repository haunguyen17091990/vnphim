(function($){$.extend(mejs.MepDefaults,{startQuality:'low',qualitiesText:'Stream Quality'});$.extend(MediaElementPlayer.prototype,{buildqualities:function(player,controls,layers,media){var t=this,i,options='';if($(".mejs-qualities-selector").length>0){$(".mejs-qualities-selector ul li").remove();}else{player.qualitiesButton=$('<div class="mejs-button mejs-qualities-button">'+'<button type="button" aria-controls="'+ t.id+'" title="'+ t.options.qualitiesText+'" aria-label="'+ t.options.qualitiesText+'"></button>'+'<div class="mejs-qualities-selector">'+'<ul></ul>'+'</div>'+'</div>').appendTo(controls);player.selectedQuality=mejs.MepDefaults.startQuality;}
player.sources=$(player.domNode).find("source");player.qualities=[];for(var i=0;i<player.sources.length;i++){if(player.sources[i].getAttribute("data-plugin-type")==player.media.pluginType){player.qualities.push(player.sources[i]);}}
if(player.qualities.length==1){player.qualitiesButton.on('click',function(){alert("Chỉ có một chất lượng");});}else{player.qualitiesButton.hover(function(){$(this).find('.mejs-qualities-selector').css('visibility','visible');},function(){$(this).find('.mejs-qualities-selector').css('visibility','hidden');}).on('click','input[type=radio]',function(){player.switchQuality($(this).siblings('label').text(),this.getAttribute("value"),this.getAttribute("data-mimetype"));});}
if(!player.options.alwaysShowControls){player.container.bind('controlsshown',function(){player.container.find('.mejs-qualities-position').addClass('mejs-qualities-position-hover');}).bind('controlshidden',function(){if(!media.paused){player.container.find('.mejs-qualities-position').removeClass('mejs-qualities-position-hover');}});}else{player.container.find('.mejs-qualities-position').addClass('mejs-qualities-position-hover');}
var selectedIndex=0;for(var i=0;i<player.qualities.length;i++){var q=player.qualities[i];if(q.getAttribute("data-quality")===player.selectedQuality){selectedIndex=i;break;}}
for(var i=0;i<player.qualities.length;i++){var q=player.qualities[i];var isSelected=selectedIndex==i;player.addQualityButton(q.getAttribute("data-quality"),q.getAttribute("src"),q.getAttribute("type"),isSelected);if(isSelected){player.switchQuality(q.getAttribute("data-quality"),q.getAttribute("src"),q.getAttribute("type"));}}},addQualityButton:function(label,url,mimetype,isSelected){var t=this;if(label===''){label="Unknown";}
var checkedAttr=isSelected?"checked":"";t.qualitiesButton.find('ul').append('<li>'+'<input type="radio" name="'+ t.id+'_qualities" id="'+ t.id+'_qualities_'+ label+'" value="'+ url+'"'+' data-mimetype="'+ mimetype+'"'+ checkedAttr+'/>'+'<label for="'+ t.id+'_qualities_'+ label+'">'+ label+'</label>'+'</li>');},switchQuality:function(quality,url,mimetype){var player=this;player.pause();player.setSrc([{src:url,type:mimetype}]);player.selectedQuality=quality;player.load();}});})(mejs.$);