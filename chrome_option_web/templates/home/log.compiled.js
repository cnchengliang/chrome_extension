;var home_logTemplate=function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='\n    \t<div class="container_12 leading">\n\t\t<section class="portlet">\n\t\t\t<header>\n\t\t\t\t<h2>日志记录</h2>\n\t\t\t</header>\n\t\t\t<section>\n\t    \t\t<div class="row-fluid">\n\t    \t\t\t<div class="well">\n\t    \t\t\t\t<input id="query_text" type="text" class="input-medium search-query" placeholder="输入关键字">\n\t\t\t\t\t\t<select id="searchtype" class="span1 btn input-small">\n\t\t\t\t\t\t  <option value="1">查询</option>\n\t\t\t\t\t\t  <option value="2">过滤</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t\t<select id="source" class="span1 btn input-small">\n\t\t\t\t\t\t  '+
(source)+
'\n\t\t\t\t\t\t</select>\n\t\t\t\t\t\t<button id="gosubmit" class="btn" type="button">提交</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t\t<form id="sc_form">\n\t\t\t\t\t\t<table id="table_result" class="table table-bordered">\n\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t\t  <tr>\n\t\t\t\t\t\t\t\t  \t<th width="10%"><input type="checkbox" id="checkall" />全选</th>\n\t\t\t\t\t\t\t\t  \t<th width="65%">内容</th>\n\t\t\t\t\t\t\t\t  \t<th width="10%">类型</th>\n\t\t\t\t\t\t\t    \t<th width="15%">时间</th>\n\t\t\t\t\t\t\t\t  </tr>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t'+
(content)+
'\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t\t<div class="well">\n\t\t\t\t\t\t\t<button id="act_del" class="btn" type="button">删除</button>\n\t\t\t\t\t\t\t<input id="cur_page" type="hidden" value="1" >\n\t\t\t\t\t\t\t<ul class="pager">\n\t\t\t\t\t\t\t  <li><a id="previous">上一页</a></li>\n\t\t\t\t\t\t\t  <li><a id="next">下一页</a></li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t</section>\n\t\t</section>\n\t</div>\n\n\n';
}
return __p;
};