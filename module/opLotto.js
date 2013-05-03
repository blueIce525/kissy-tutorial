KISSY.add(function(S, N, E, A, IO){
	var $ = S.all;

	var opLotto = {
		init: function(){
			this.imgList = $('.img-list').all('li');
			this.length = this.imgList.length;
			this.startIndex = 0;
		},
		_run: function(index){
			var next = index + 1 === this.length ? 0 : index + 1;
			this.imgList.removeClass('active');
			$(this.imgList[next]).addClass('active');
			this.startIndex = next;
		},
		start: function(){
			var self = this;
			self.timer = setInterval(function(){
				self._run(self.startIndex);
			}, 50);
		},
		pause: function(){
			this.timer && clearInterval(this.timer);
			this._animate(this.startIndex);
		},
		_animate: function(index) {
			var self = this;
			var selectdeItem = $(self.imgList[index]);
			var offsetTop = selectdeItem.css('top');
			var offsetLeft = selectdeItem.css('left');
			var cloneItem = selectdeItem.one('img').clone().appendTo('.content');
			cloneItem.css({
				'width': '100px',
				'height': '100px',
				'position': 'absolute',
				'top': offsetTop,
				'left': offsetLeft,
				'border-radius': '50px'
			}).animate({
				'top': parseInt(offsetTop, 10) - 50
			}, 0.2, 'easeOut').animate({
				'top': 200,
				'left': 200,
				'opacity': 0
			}, 1, 'bounceOut', function() {
				cloneItem.remove();
				self._print(index);
			});
		},
		_print: function(index){
			IO.get('./server.php', {'index': index}, function(data){
				$('.detail').html('<img src="' + data.url + '" />').fadeIn(0.5);
			}, 'json');
		}
	};

	return opLotto;

}, {requires: ['node', 'event', 'anim', 'ajax']});