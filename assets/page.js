KISSY.use('dom, node, event, anim', function(S, D, N, E, A){
	S.ready(function(){
		var blockList = D.query('.scroll-block');
		var length = blockList.length;
		var blockOffsetTop = S.map(blockList, function(el) {
			return D.offset(el).top;
		});
		var currentBlock = 0;

		function createNavList(){
			var navListStr = '';
			blockList.each(function(el){
				var className = D.attr(el, 'class');
				var idName = D.attr(el, 'id');
				var title = D.html(D.get('h2', el));
				var colorClass = new RegExp(/.*(block-.*)/).exec(className)[1];
				navListStr += '<li class="' + colorClass +'"><a href="#' + idName + '">' + title + '</a></li>';
			});
			S.one('.scroll-nav').one('ul').html(navListStr);
			var height = D.viewportHeight()/length;
			S.one('.scroll-nav').all('li').css('height', height);
			S.one('.scroll-nav').all('a').css('line-height', height + 'px');
		}

		function getCurrentBlock() {
			S.each(blockOffsetTop, function(el, index) {
				if (D.scrollTop('body') >= el) {
					currentBlock = index;
				}
			});
		}

		createNavList();

		E.on('body', 'mousewheel', function(e) {
			if (e.delta === -1) {
				getCurrentBlock();
				var currentPos = D.scrollTop('body') + D.viewportHeight();
				var nextBlock = blockOffsetTop[currentBlock + 1];
				if (currentPos + 100 >= nextBlock) {
					A('body', {
						'scrollTop': nextBlock
					}, 0.1).run();
				}
			}
		});
	});
});