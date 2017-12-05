$('document').ready(function() {
	drawCanvas();
	$('#sections').scroll(function() {
		var sectionHomeHeight = $('#section-home').height();
		
		if($('#sections').scrollTop() > sectionHomeHeight) {
			$('#nav-left').fadeIn("slow");
			$('#nav-down').hide();
		} else {
			$('#nav-left').fadeOut();
			$('#nav-down').fadeIn("slow");
		}
	});
	
	$("#nav-down").click(function() {
	    $('#sections').animate({
	        scrollTop: $("#section-skills").offset().top
	    }, 2000);
	});
});
