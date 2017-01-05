$(document).ready(function() {
	var teams = ["Algeria", "Argentina", "Australia", "Belgium", "Bosnia", "Brazil", "Cameroon", "Chile", "Colombia", "Costa Rica", "Croatia", "Ecuador", "England", "France", "Germany", "Ghana", "Greece", "Honduras", "Iran", "Italy", "Ivory Coast", "Japan", "Mexico", "Nigeria", "Portugal", "Russia", "South Korea", "Spain", "Switzerland", "The Netherlands", "Uruguai", "USA"];	

	$('#resetButton').click(function(){
		teamsCopy = teams.slice();	

		$('.draggable').each(function( index ) {
			//uncomment the following three lines (and comment the fourth) to list the teams randomly
			// var randomElementIndex = Math.floor( Math.random() * teamsCopy.length );
			// var removedElement = teamsCopy.splice(randomElementIndex, 1);
			// $( this ).text(removedElement);
			$( this ).text(teamsCopy[index]);

		});
		teamsRefreshList();
		alert('The teams list was resetted to defaults.');
	});
	
	$('.scoreInput').on("change paste keyup", function() {
		teamsRefreshList();
	});

});

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("src", ev.target.id);
	console.log('DRAG function: src = ' + ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	var src = document.getElementById(ev.dataTransfer.getData("src"));
	var srcParent = src.parentNode;
	var tgt = ev.currentTarget.firstElementChild;

	ev.currentTarget.replaceChild(src, tgt);
	srcParent.appendChild(tgt);
	teamsRefreshList();
}

function teamsRefreshList() {
	$('#1A').text($('#team1A').text());
	$('#1B').text($('#team1B').text());
	$('#1C').text($('#team1C').text());
	$('#1D').text($('#team1D').text());
	$('#1E').text($('#team1E').text());
	$('#1F').text($('#team1F').text());
	$('#1G').text($('#team1G').text());
	$('#1H').text($('#team1H').text());

	$('#2A').text($('#team2A').text());
	$('#2B').text($('#team2B').text());
	$('#2C').text($('#team2C').text());
	$('#2D').text($('#team2D').text());
	$('#2E').text($('#team2E').text());
	$('#2F').text($('#team2F').text());
	$('#2G').text($('#team2G').text());
	$('#2H').text($('#team2H').text());

	//Match49
	if ($('input[name=score1A]').val() != "" && $('input[name=score2B]').val() != "") {
		if (parseInt($('input[name=score1A]').val()) > parseInt($('input[name=score2B]').val())) {
			$('#2B').css("font-weight","");
			$('#1A').css("font-weight","Bold");
			$('#W49').text($('#1A').text());
		} else {
			$('#1A').css("font-weight","");
			$('#2B').css("font-weight","Bold");
			$('#W49').text($('#2B').text());
		}
	} else {
		$('#1A').css("font-weight","");
		$('#2B').css("font-weight","");
		$('#W49').text("");
	}

	//Match50
	if ($('input[name=score1C]').val() != "" && $('input[name=score2D]').val() != "") {
		if (parseInt($('input[name=score1C]').val()) > parseInt($('input[name=score2D]').val())) {
			$('#2D').css("font-weight","");
			$('#1C').css("font-weight","Bold");
			$('#W50').text($('#1C').text());
		} else {
			$('#1C').css("font-weight","");
			$('#2D').css("font-weight","Bold");
			$('#W50').text($('#2D').text());
		}
	} else {
		$('#1C').css("font-weight","");
		$('#2D').css("font-weight","");
		$('#W50').text("");
	}

	//Match51
	if ($('input[name=score1B]').val() != "" && $('input[name=score2A]').val() != "") {
		if (parseInt($('input[name=score1B]').val()) > parseInt($('input[name=score2A]').val())) {
			$('#2A').css("font-weight","");
			$('#1B').css("font-weight","Bold");
			$('#W51').text($('#1B').text());
		} else {
			$('#1B').css("font-weight","");
			$('#2A').css("font-weight","Bold");
			$('#W51').text($('#2A').text());
		}
	} else {
		$('#1B').css("font-weight","");
		$('#2A').css("font-weight","");
		$('#W51').text("");
	}

	//Match52
	if ($('input[name=score1D]').val() != "" && $('input[name=score2C]').val() != "") {
		if (parseInt($('input[name=score1D]').val()) > parseInt($('input[name=score2C]').val())) {
			$('#2C').css("font-weight","");
			$('#1D').css("font-weight","Bold");
			$('#W52').text($('#1D').text());
		} else {
			$('#1D').css("font-weight","");
			$('#2C').css("font-weight","Bold");
			$('#W52').text($('#2C').text());
		}
	} else {
		$('#1D').css("font-weight","");
		$('#2C').css("font-weight","");
		$('#W52').text("");
	}

	//Match53
	if ($('input[name=score1E]').val() != "" && $('input[name=score2F]').val() != "") {
		if (parseInt($('input[name=score1E]').val()) > parseInt($('input[name=score2F]').val())) {
			$('#2F').css("font-weight","");
			$('#1E').css("font-weight","Bold");
			$('#W53').text($('#1E').text());
		} else {
			$('#1E').css("font-weight","");
			$('#2F').css("font-weight","Bold");
			$('#W53').text($('#2F').text());
		}
	} else {
		$('#1E').css("font-weight","");
		$('#2F').css("font-weight","");
		$('#W53').text("");
	}

	//Match54
	if ($('input[name=score1G]').val() != "" && $('input[name=score2H]').val() != "") {
		if (parseInt($('input[name=score1G]').val()) > parseInt($('input[name=score2H]').val())) {
			$('#2H').css("font-weight","");
			$('#1G').css("font-weight","Bold");
			$('#W54').text($('#1G').text());
		} else {
			$('#1G').css("font-weight","");
			$('#2H').css("font-weight","Bold");
			$('#W54').text($('#2H').text());
		}
	} else {
		$('#1G').css("font-weight","");
		$('#2H').css("font-weight","");
		$('#W54').text("");
	}

	//Match55
	if ($('input[name=score1F]').val() != "" && $('input[name=score2E]').val() != "") {
		if (parseInt($('input[name=score1F]').val()) > parseInt($('input[name=score2E]').val())) {
			$('#2E').css("font-weight","");
			$('#1F').css("font-weight","Bold");
			$('#W55').text($('#1F').text());
		} else {
			$('#1F').css("font-weight","");
			$('#2E').css("font-weight","Bold");
			$('#W55').text($('#2E').text());
		}
	} else {
		$('#1F').css("font-weight","");
		$('#2E').css("font-weight","");
		$('#W55').text("");
	}

	//Match56
	if ($('input[name=score1H]').val() != "" && $('input[name=score2G]').val() != "") {
		if (parseInt($('input[name=score1H]').val()) > parseInt($('input[name=score2G]').val())) {
			$('#2G').css("font-weight","");
			$('#1H').css("font-weight","Bold");
			$('#W56').text($('#1H').text());
		} else {
			$('#1H').css("font-weight","");
			$('#2G').css("font-weight","Bold");
			$('#W56').text($('#2G').text());
		}
	} else {
		$('#1H').css("font-weight","");
		$('#2G').css("font-weight","");
		$('#W56').text("");
	}

	//Match57
	if ($('input[name=scoreW49]').val() != "" && $('input[name=scoreW50]').val() != "") {
		if (parseInt($('input[name=scoreW49]').val()) > parseInt($('input[name=scoreW50]').val())) {
			$('#W50').css("font-weight","");
			$('#W49').css("font-weight","Bold");
			$('#W57').text($('#W49').text());
		} else {
			$('#W49').css("font-weight","");
			$('#W50').css("font-weight","Bold");
			$('#W57').text($('#W50').text());
		}
	} else {
		$('#W49').css("font-weight","");
		$('#W50').css("font-weight","");
		$('#W57').text("");
	}

	//Match58
	if ($('input[name=scoreW53]').val() != "" && $('input[name=scoreW54]').val() != "") {
		if (parseInt($('input[name=scoreW53]').val()) > parseInt($('input[name=scoreW54]').val())) {
			$('#W54').css("font-weight","");
			$('#W53').css("font-weight","Bold");
			$('#W58').text($('#W53').text());
		} else {
			$('#W53').css("font-weight","");
			$('#W54').css("font-weight","Bold");
			$('#W58').text($('#W54').text());
		}
	} else {
		$('#W53').css("font-weight","");
		$('#W54').css("font-weight","");
		$('#W58').text("");
	}

	//Match59
	if ($('input[name=scoreW51]').val() != "" && $('input[name=scoreW52]').val() != "") {
		if (parseInt($('input[name=scoreW51]').val()) > parseInt($('input[name=scoreW52]').val())) {
			$('#W52').css("font-weight","");
			$('#W51').css("font-weight","Bold");
			$('#W59').text($('#W51').text());
		} else {
			$('#W51').css("font-weight","");
			$('#W52').css("font-weight","Bold");
			$('#W59').text($('#W52').text());
		}
	} else {
		$('#W51').css("font-weight","");
		$('#W52').css("font-weight","");
		$('#W59').text("");
	}

	//Match60
	if ($('input[name=scoreW55]').val() != "" && $('input[name=scoreW56]').val() != "") {
		if (parseInt($('input[name=scoreW55]').val()) > parseInt($('input[name=scoreW56]').val())) {
			$('#W56').css("font-weight","");
			$('#W55').css("font-weight","Bold");
			$('#W60').text($('#W55').text());
		} else {
			$('#W55').css("font-weight","");
			$('#W56').css("font-weight","Bold");
			$('#W60').text($('#W56').text());
		}
	} else {
		$('#W55').css("font-weight","");
		$('#W56').css("font-weight","");
		$('#W60').text("");
	}

	//Match61
	if ($('input[name=scoreW57]').val() != "" && $('input[name=scoreW58]').val() != "") {
		if (parseInt($('input[name=scoreW57]').val()) > parseInt($('input[name=scoreW58]').val())) {
			$('#W58').css("font-weight","");
			$('#W57').css("font-weight","Bold");
			$('#W61').text($('#W57').text());
			$('#L61').text($('#W58').text());
		} else {
			$('#W57').css("font-weight","");
			$('#W58').css("font-weight","Bold");
			$('#W61').text($('#W58').text());
			$('#L61').text($('#W57').text());
		}
	} else {
		$('#W57').css("font-weight","");
		$('#W58').css("font-weight","");
		$('#W61').text("");
		$('#L61').text("");
	}

	//Match62
	if ($('input[name=scoreW59]').val() != "" && $('input[name=scoreW60]').val() != "") {
		if (parseInt($('input[name=scoreW59]').val()) > parseInt($('input[name=scoreW60]').val())) {
			$('#W60').css("font-weight","");
			$('#W59').css("font-weight","Bold");
			$('#W62').text($('#W59').text());
			$('#L62').text($('#W60').text());
		} else {
			$('#W59').css("font-weight","");
			$('#W60').css("font-weight","Bold");
			$('#W62').text($('#W60').text());
			$('#L62').text($('#W59').text());
		}
	} else {
		$('#W59').css("font-weight","");
		$('#W60').css("font-weight","");
		$('#W62').text("");
		$('#L62').text("");
	}

	//Match63
	if ($('input[name=scoreL61]').val() != "" && $('input[name=scoreL62]').val() != "") {
		if (parseInt($('input[name=scoreL61]').val()) > parseInt($('input[name=scoreL62]').val())) {
			$('#L62').css("font-weight","");
			$('#L61').css("font-weight","Bold");
			$('#W63').text($('#L61').text());
		} else {
			$('#L61').css("font-weight","");
			$('#L62').css("font-weight","Bold");
			$('#W63').text($('#L62').text());
		}
	} else {
		$('#L61').css("font-weight","");
		$('#L62').css("font-weight","");
		$('#W63').text("");
	}

	//Match64
	if ($('input[name=scoreW61]').val() != "" && $('input[name=scoreW62]').val() != "") {
		if (parseInt($('input[name=scoreW61]').val()) > parseInt($('input[name=scoreW62]').val())) {
			$('#W62').css("font-weight","");
			$('#W61').css("font-weight","Bold");
			$('#W64').text($('#W61').text());
			$('#L64').text($('#W62').text());
		} else {
			$('#W61').css("font-weight","");
			$('#W62').css("font-weight","Bold");
			$('#W64').text($('#W62').text());
			$('#L64').text($('#W61').text());
		}
	} else {
		$('#W61').css("font-weight","");
		$('#W62').css("font-weight","");
		$('#W64').text("");
		$('#L64').text("");
	}
	$('#W64').css("font-size", parseInt($('#L64').css("font-size")) + 5 + "px");
	$('#L64').css("font-size", parseInt($('#W63').css("font-size")) + 5 + "px");
}

function errorHandler(message, url, line) {
	out  = "Sorry, an error was encountered.\n\n";
	out += "Error: " + message + "\n";
	out += "URL: "   + url     + "\n";
	out += "Line: "  + line    + "\n\n";
	out += "Click OK to continue.\n\n";
	alert(out);
	return true;
}
