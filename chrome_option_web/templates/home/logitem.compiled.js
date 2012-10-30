;var home_logItemTemplate=function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='\n\t\t\t\t\t\t\t\t  <tr id="tr_'+
(row.id)+
'">\n\t\t\t\t\t\t\t\t    \t<td><input type="checkbox" value="'+
(row.id)+
'" name="logs" /></td>\n\t\t\t\t\t\t\t\t    \t<td><a target="_blank" href="'+
(row.url)+
'">'+
(row.content)+
'</a></td>\n\t\t\t\t\t\t\t\t    \t<td><a target="_blank" href="'+
(row.url)+
'">'+
(row.url_title)+
'</a></td>\n\t\t\t\t\t\t\t\t    \t<td>'+
(row.cdate)+
'</td>\n\t\t\t\t\t\t\t\t  </tr>\n\n';
}
return __p;
};