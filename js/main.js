$('document').ready(function() {
	drawCanvas();
	$('#sections').scroll(function() {
		var sectionHomeHeight = $('#section-home').height();
		
		if($('#sections').scrollTop() > sectionHomeHeight) {
			$('#nav-left').fadeIn("slow");
		} else {
			$('#nav-left').fadeOut();
		}
	});
});
