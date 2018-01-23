$('document').ready(function() {
	drawCanvas();
	$('#sections').scroll(function() {
		var sectionHomeHeight = $('#section-home').height();
		
		if($('#sections').scrollTop() >= sectionHomeHeight) {
			$('#containerBackground').addClass("background-align-right");
			$('#nav-left').fadeIn("slow");
			$('#nav-down').hide();
		} else {
			$('#containerBackground').removeClass("background-align-right");
			$('#nav-left').fadeOut();
			$('#nav-down').fadeIn("slow");
		}
	});
	
	$("#nav-down").click(function() {
		$('#sections').scrollTo("#section-skills", 1000);
		appendNavActiveIndicator("#nav-skills-section");
	});
	
	$("#nav-home-section").click(function() {
		$('#sections').scrollTo("#section-home", 1000);
	});
	
	$("#nav-skills-section").click(function() {
		$('#sections').scrollTo("#section-skills", 1000);
		appendNavActiveIndicator("#nav-skills-section");
	});
	
	$("#nav-countries-section").click(function() {
		$('#sections').scrollTo("#section-countries", 1000);
		appendNavActiveIndicator("#nav-countries-section");
	});
	
	$("#nav-notes-section").click(function() {
		$('#sections').scrollTo("#section-notes", 1000);
		appendNavActiveIndicator("#nav-notes-section");
	});
	
	$("#nav-experience-section").click(function() {
		$('#sections').scrollTo("#section-experience", 1000);
		appendNavActiveIndicator("#nav-experience-section");
	});
	
	$("#nav-diff-section").click(function() {
		$('#sections').scrollTo("#section-diff", 1000);
		appendNavActiveIndicator("#nav-diff-section");
	});
	
	$("#nav-misc-section").click(function() {
		$('#sections').scrollTo("#section-misc", 1000);
		appendNavActiveIndicator("#nav-misc-section");
	});
	
	function appendNavActiveIndicator(activeNavItem) {
		var activeSectionIndicator = $("<i>", {"class": "nav-active-indicator"});
		
		$("i.nav-active-indicator").remove();
		$(activeNavItem + " a").append(activeSectionIndicator);
	}
});
